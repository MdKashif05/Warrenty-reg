import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCustomerFromCookie } from "@/lib/auth-customer";
import { generateClaimId } from "@/lib/utils";
import { sendWarrantyClaimEmail } from "@/lib/email";

// POST /api/warranty/claim — Submit a warranty claim
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { registrationId, issueType, description } = body;

    if (!registrationId || !issueType || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Find registration
    const registration = await db.warrantyRegistration.findUnique({
      where: { registrationId },
      include: { customer: true },
    });

    if (!registration) {
      return NextResponse.json({ error: "Warranty registration not found" }, { status: 404 });
    }

    if (registration.warrantyStatus !== "ACTIVE") {
      return NextResponse.json({ error: "Warranty is not active" }, { status: 400 });
    }

    // Check warranty expiry
    if (registration.warrantyEndDate && registration.warrantyEndDate < new Date()) {
      return NextResponse.json({ error: "Warranty has expired" }, { status: 400 });
    }

    // Optionally verify customer owns this registration
    const customer = await getCustomerFromCookie();
    if (customer && registration.customerId !== customer.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const claimId = generateClaimId();

    const claim = await db.warrantyClaim.create({
      data: {
        claimId,
        registrationId: registration.id,
        issueType,
        description,
        claimStatus: "OPEN",
      },
    });

    // Update warranty status
    await db.warrantyRegistration.update({
      where: { id: registration.id },
      data: { warrantyStatus: "CLAIMED" },
    });

    // Send email
    await sendWarrantyClaimEmail({
      customerName: `${registration.customer.firstName} ${registration.customer.lastName}`,
      customerEmail: registration.customer.email,
      claimId,
      registrationId: registration.registrationId,
      productName: registration.productVariant || "Your Product",
      issueType,
    });

    return NextResponse.json({ success: true, claimId, claim });
  } catch (error) {
    console.error("Warranty claim error:", error);
    return NextResponse.json({ error: "Failed to submit claim" }, { status: 500 });
  }
}

// GET /api/warranty/claim — Get claims for a registration
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const registrationId = searchParams.get("registrationId");

    if (!registrationId) {
      return NextResponse.json({ error: "registrationId required" }, { status: 400 });
    }

    const registration = await db.warrantyRegistration.findUnique({
      where: { registrationId },
      include: {
        claims: { orderBy: { createdAt: "desc" } },
        customer: { select: { firstName: true, lastName: true, email: true } },
      },
    });

    if (!registration) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ registration });
  } catch (error) {
    console.error("Warranty claim GET error:", error);
    return NextResponse.json({ error: "Failed to fetch claims" }, { status: 500 });
  }
}
