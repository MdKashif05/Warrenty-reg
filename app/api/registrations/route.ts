import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

const sampleRegistrations = [
  { id: "REG-1001", name: "Rahul Sharma", email: "rahul.sharma@example.com", phone: "+91 98765 43210", course: "LX-TIM Pro (Thermal Paste)", status: "CONFIRMED", date: "2026-08-27" },
  { id: "REG-1002", name: "Priya Patel", email: "priya.patel@gmail.com", phone: "+91 91234 56789", course: "LX-LM Pro (Liquid Metal)", status: "CONFIRMED", date: "2026-08-26" },
  { id: "REG-1003", name: "Anish Verma", email: "anish.verma@techcorp.in", phone: "+91 99887 76655", course: "LX-PAD Pro (Thermal Pads)", status: "PENDING", date: "2026-08-26" },
  { id: "REG-1004", name: "Sunita Gupta", email: "sunita.gupta@yahoo.com", phone: "+91 98111 22334", course: "LX-PAD Standard (Thermal Pads)", status: "CONFIRMED", date: "2026-08-25" },
  { id: "REG-1005", name: "Karan Johar", email: "karan.j@creative.io", phone: "+91 97777 88888", course: "LX-TIM Standard (Thermal Paste)", status: "PENDING", date: "2026-08-24" },
];

async function ensureSeedRegistrations() {
  const db = await getDatabase();
  const collection = db.collection("registrations");
  const count = await collection.countDocuments();
  if (count === 0) {
    const data = sampleRegistrations.map((r) => ({
      ...r,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await collection.insertMany(data);
  }
  return collection;
}

// GET: Fetch all registrations
export async function GET() {
  try {
    const collection = await ensureSeedRegistrations();
    const list = await collection.find({}).sort({ createdAt: -1 }).toArray();

    const formatted = list.map((r) => ({
      id: r.id || String(r._id),
      name: r.name,
      email: r.email,
      phone: r.phone,
      course: r.course,
      status: r.status || "PENDING",
      date: r.date || (r.createdAt ? new Date(r.createdAt).toISOString().split("T")[0] : "2026-08-27"),
    }));

    return NextResponse.json({ success: true, registrations: formatted });
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return NextResponse.json({ success: true, registrations: sampleRegistrations, fallback: true });
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
      name,
      email,
      phone: phone || "",
      course,
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
