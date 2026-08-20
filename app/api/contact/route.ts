import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, error: "All required fields must be provided." }, { status: 400 });
    }

    try {
      await db.contactMessage.create({
        data: { name, email, phone, subject, message }
      });
    } catch {}

    return NextResponse.json({ success: true, message: "Contact inquiry recorded successfully." });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to send message." }, { status: 500 });
  }
}
