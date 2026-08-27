import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { calculateWarrantyExpiry } from "@/lib/utils";
import { sendWarrantyConfirmationEmail } from "@/lib/email";

// PATCH /api/admin/warranties/verify — Verify and activate a warranty
export async function PATCH(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const { registrationId, action, adminNotes } = body; // action: "ACTIVATE" | "REJECT"

    if (!registrationId || !action) {
      return NextResponse.json({ error: "registrationId and action required" }, { status: 400 });
    }

    const registration = await db.warrantyRegistration.findUnique({
      where: { registrationId },
      include: { customer: true },
    });

    if (!registration) return NextResponse.json({ error: "Not found" }, { status: 404 });

    if (action === "ACTIVATE") {
      const warrantyEndDate = calculateWarrantyExpiry(registration.purchaseDate, registration.warrantyMonths);
      const updated = await db.warrantyRegistration.update({
        where: { registrationId },
        data: {
          warrantyStatus: "ACTIVE",
          warrantyStartDate: registration.purchaseDate,
          warrantyEndDate,
          adminNotes: adminNotes || null,
        },
      });

      // Send activation email
      try {
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
        await sendWarrantyConfirmationEmail({
          customerName: `${registration.customer.firstName} ${registration.customer.lastName}`,
          customerEmail: registration.customer.email,
          productName: registration.productVariant || "Your Product",
          serialNumber: registration.platformOrderId || "—",
          registrationId: registration.registrationId,
          warrantyStatus: "ACTIVE",
          warrantyEndDate: warrantyEndDate.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
          certificateUrl: `${siteUrl}/warranty/certificate/${registration.registrationId}`,
        });
      } catch (e) {
        console.error("Email failed after verify:", e);
      }

      return NextResponse.json({ success: true, registration: updated });
    } else if (action === "REJECT") {
      const updated = await db.warrantyRegistration.update({
        where: { registrationId },
        data: { warrantyStatus: "REJECTED", adminNotes: adminNotes || "Rejected by admin" },
      });
      return NextResponse.json({ success: true, registration: updated });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Warranty verify error:", error);
    return NextResponse.json({ error: "Unauthorized or failed" }, { status: 401 });
  }
}
