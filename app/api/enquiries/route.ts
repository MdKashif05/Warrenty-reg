import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

const sampleEnquiries = [
  { id: "ENQ-501", name: "Rohan Kapoor", email: "rohan@gmail.com", phone: "+91 98123 45678", course: "LX-TIM Pro 17.6 W/mK", message: "Hi, what is the bulk price for 100 units for our PC building service?", status: "NEW", date: "2026-08-27" },
  { id: "ENQ-502", name: "Megha Mehta", email: "megha.m@outlook.com", phone: "+91 97890 12345", course: "Liquid Metal Extreme", message: "What is the warranty and shelf life of the liquid metal compound?", status: "RESPONDED", date: "2026-08-26" },
  { id: "ENQ-503", name: "Deepak Chawla", email: "deepak@chawla.com", phone: "+91 96543 21098", course: "Thermal Pad Matrix (12.8 W/mK)", message: "Can we get custom cut dimensions (100x100mm) for mining rigs?", status: "NEW", date: "2026-08-25" },
];

async function ensureSeedEnquiries() {
  const db = await getDatabase();
  const collection = db.collection("enquiries");
  const count = await collection.countDocuments();
  if (count === 0) {
    const data = sampleEnquiries.map((e) => ({
      ...e,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await collection.insertMany(data);
  }
  return collection;
}

// GET: Fetch all enquiries
export async function GET() {
  try {
    const collection = await ensureSeedEnquiries();
    const list = await collection.find({}).sort({ createdAt: -1 }).toArray();

    const formatted = list.map((e) => ({
      id: e.id || String(e._id),
      name: e.name,
      email: e.email,
      phone: e.phone || "",
      course: e.course || e.subject || "General",
      message: e.message,
      status: e.status || "NEW",
      date: e.date || (e.createdAt ? new Date(e.createdAt).toISOString().split("T")[0] : "2026-08-27"),
    }));

    return NextResponse.json({ success: true, enquiries: formatted });
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    return NextResponse.json({ success: true, enquiries: sampleEnquiries, fallback: true });
  }
}

// POST: Add a new enquiry (from contact form or direct)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, course, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const collection = db.collection("enquiries");

    const id = `ENQ-${Math.floor(100 + Math.random() * 900)}`;
    const now = new Date();
    const dateStr = now.toISOString().split("T")[0];

    const newEnquiry = {
      id,
      name,
      email,
      phone: phone || "",
      course: course || subject || "General Inquiry",
      message,
      status: "NEW",
      date: dateStr,
      createdAt: now,
      updatedAt: now,
    };

    await collection.insertOne(newEnquiry);

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully",
      enquiry: newEnquiry,
    });
  } catch (error) {
    console.error("Error creating enquiry:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit enquiry to MongoDB." },
      { status: 500 }
    );
  }
}

// PATCH: Toggle responded status
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Enquiry ID is required." }, { status: 400 });
    }

    const db = await getDatabase();
    const collection = db.collection("enquiries");

    const enq = await collection.findOne({ id });
    if (!enq) {
      return NextResponse.json({ success: false, error: "Enquiry not found." }, { status: 404 });
    }

    const newStatus = status || (enq.status === "NEW" ? "RESPONDED" : "NEW");

    await collection.updateOne(
      { id },
      { $set: { status: newStatus, updatedAt: new Date() } }
    );

    return NextResponse.json({
      success: true,
      message: `Enquiry status changed to ${newStatus}`,
      status: newStatus,
    });
  } catch (error) {
    console.error("Error updating enquiry:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update enquiry status in MongoDB." },
      { status: 500 }
    );
  }
}

// DELETE: Delete enquiry
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "ID is required." }, { status: 400 });
    }

    const db = await getDatabase();
    const collection = db.collection("enquiries");
    const result = await collection.deleteOne({ id });

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: "Enquiry not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Enquiry deleted successfully." });
  } catch (error) {
    console.error("Error deleting enquiry:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete enquiry from MongoDB." },
      { status: 500 }
    );
  }
}
