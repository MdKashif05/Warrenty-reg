import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// POST: Create new B2B Enquiry
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      companyName,
      contactPerson,
      businessEmail,
      phone,
      gstin,
      productRequired,
      quantity,
      deliveryCity,
      deliveryState,
      message,
    } = body;

    // Validation
    if (!companyName || !contactPerson || !businessEmail || !phone || !productRequired || !deliveryCity || !deliveryState) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty < 10) {
      return NextResponse.json(
        { success: false, error: "Minimum order quantity for B2B is 10 units." },
        { status: 400 }
      );
    }

    // Save to Database if DB is connected
    let enquiryId = `b2b-${Date.now()}`;
    try {
      const enquiryRecord = await db.b2bEnquiry.create({
        data: {
          companyName: companyName.trim(),
          contactPerson: contactPerson.trim(),
          businessEmail: businessEmail.trim().toLowerCase(),
          phone: phone.trim(),
          gstin: gstin ? gstin.trim().toUpperCase() : null,
          productRequired: productRequired.trim(),
          quantity: qty,
          deliveryCity: deliveryCity.trim(),
          deliveryState: deliveryState.trim(),
          message: message ? message.trim() : null,
        },
      });
      enquiryId = enquiryRecord.id;
    } catch {
      // Fallback logging for local/dev
      console.log("B2B Enquiry received:", { companyName, contactPerson, businessEmail, phone, qty });
    }

    return NextResponse.json({
      success: true,
      message: "B2B Enquiry submitted successfully. Our commercial sales team will review your requirements and send a official quotation & invoice within 24 business hours.",
      enquiryId,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to submit B2B enquiry. Please try again." },
      { status: 500 }
    );
  }
}

// GET: Fetch B2B Enquiries for Admin Panel
export async function GET() {
  try {
    try {
      const enquiries = await db.b2bEnquiry.findMany({
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json({ success: true, data: enquiries });
    } catch {
      return NextResponse.json({ success: true, data: [] });
    }
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch B2B enquiries." },
      { status: 500 }
    );
  }
}
