import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, error: "All required fields must be provided." }, { status: 400 });
    }

    // Save to MongoDB Atlas
    try {
      const mongoDb = await getDatabase();
      const id = `ENQ-${Math.floor(100 + Math.random() * 900)}`;
      const now = new Date();
      await mongoDb.collection("enquiries").insertOne({
        id,
        name,
        email,
        phone: phone || "",
        course: subject,
        message,
        status: "NEW",
        date: now.toISOString().split("T")[0],
        createdAt: now,
        updatedAt: now,
      });
    } catch (mongoErr) {
      console.error("MongoDB contact save warning:", mongoErr);
    }

    // Also attempt PostgreSQL save if available
    try {
      await db.contactMessage.create({
        data: { name, email, phone, subject, message },
      });
    } catch {
      // ignore postgres fallback errors
    }

    return NextResponse.json({ success: true, message: "Contact inquiry recorded successfully." });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ success: false, error: "Failed to send message." }, { status: 500 });
  }
}
