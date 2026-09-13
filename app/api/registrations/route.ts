import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

// GET: Fetch all registrations
export async function GET() {
  try {
    const db = await getDatabase();
    const collection = db.collection("registrations");
    const list = await collection.find({}).sort({ createdAt: -1 }).toArray();

    const formatted = list.map((r) => ({
      id: r.id || String(r._id),
      name: r.name,
      email: r.email,
      phone: r.phone,
      course: r.course,
      status: r.status || "PENDING",
      date: r.date || (r.createdAt ? new Date(r.createdAt).toISOString().split("T")[0] : new Date().toISOString().split("T")[0]),
    }));

    return NextResponse.json({ success: true, registrations: formatted });
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return NextResponse.json({ success: true, registrations: [], fallback: true });
  }
}

// POST: Add a new registration
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, course } = body;

    if (!name || !email || !course) {
      return NextResponse.json(
        { success: false, error: "Name, email, and course selection are required." },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const collection = db.collection("registrations");

    const id = `REG-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const dateStr = now.toISOString().split("T")[0];

    const newReg = {
      id,
      name: name.trim(),
      email: email.trim(),
      phone: (phone || "").trim(),
      course: course.trim(),
      status: "PENDING",
      date: dateStr,
      createdAt: now,
      updatedAt: now,
    };

    await collection.insertOne(newReg);

    return NextResponse.json({
      success: true,
      message: "Registration created successfully",
      registration: newReg,
    });
  } catch (error) {
    console.error("Error adding registration:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save registration in MongoDB." },
      { status: 500 }
    );
  }
}

// PATCH: Toggle status (CONFIRMED / PENDING)
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Registration ID is required." }, { status: 400 });
    }

    const db = await getDatabase();
    const collection = db.collection("registrations");

    const reg = await collection.findOne({ id });
    if (!reg) {
      return NextResponse.json({ success: false, error: "Registration not found." }, { status: 404 });
    }

    const newStatus = status || (reg.status === "CONFIRMED" ? "PENDING" : "CONFIRMED");

    await collection.updateOne(
      { id },
      { $set: { status: newStatus, updatedAt: new Date() } }
    );

    return NextResponse.json({
      success: true,
      message: `Registration status changed to ${newStatus}`,
      status: newStatus,
    });
  } catch (error) {
    console.error("Error updating registration:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update registration status in MongoDB." },
      { status: 500 }
    );
  }
}

// DELETE: Remove registration
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "ID is required." }, { status: 400 });
    }

    const db = await getDatabase();
    const collection = db.collection("registrations");
    const result = await collection.deleteOne({ id });

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: "Registration not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Registration deleted successfully." });
  } catch (error) {
    console.error("Error deleting registration:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete registration from MongoDB." },
      { status: 500 }
    );
  }
}
