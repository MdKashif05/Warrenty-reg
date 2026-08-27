import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { generateRegistrationId, calculateWarrantyExpiry } from "@/lib/utils";
import { sendWarrantyConfirmationEmail } from "@/lib/email";

// GET /api/warranty/register — lookup by orderId for auto-fill
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId");

  if (!orderId) return NextResponse.json({ error: "orderId required" }, { status: 400 });

  try {
    const order = await db.order.findUnique({
      where: { orderId },
      include: {
        customer: { select: { firstName: true, lastName: true, email: true, phone: true, address: true } },
        items: { include: { product: true, productVariant: true } },
        warrantyRegistration: true,
      },
    });

    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
    if (order.paymentStatus !== "PAID") return NextResponse.json({ error: "Order not paid" }, { status: 400 });

    const firstItem = order.items[0];
    return NextResponse.json({
      orderId: order.orderId,
      alreadyRegistered: !!order.warrantyRegistration,
      prefill: {
        firstName: order.customer?.firstName || order.guestName?.split(" ")[0] || "",
        lastName: order.customer?.lastName || order.guestName?.split(" ").slice(1).join(" ") || "",
        email: order.customer?.email || order.guestEmail || "",
        phone: order.customer?.phone || order.shippingPhone || "",
        address: `${order.shippingAddress}, ${order.shippingCity}, ${order.shippingState} - ${order.shippingPincode}`,
        productId: firstItem?.productId || "",
        productName: firstItem?.product?.name || "",
        productVariant: firstItem?.productVariant?.name || firstItem?.variant || "",
        purchaseDate: order.createdAt.toISOString().split("T")[0],
        platform: "OWN_WEBSITE",
        warrantyMonths: firstItem?.product?.warrantyMonths || 12,
      },
    });
  } catch (error) {
    console.error("Warranty prefill GET error:", error);
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
  }
}

// POST /api/warranty/register — Submit warranty registration
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      firstName, lastName, email, phone, address,
      productId, productVariant, serialNumberId,
      purchasePlatform,
      purchaseType,
      purchaseDate,
      platformOrderId,
      linkedOrderId,
      warrantyMonths = 12,
    } = body;

    if (!firstName || !lastName || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    // Find or create customer
    let customer = await db.customer.findUnique({ where: { email } });
    if (!customer) {
      customer = await db.customer.create({
        data: { firstName, lastName, email, phone: phone || null, address: address || null, isVerified: false },
      });
    } else {
      await db.customer.update({
        where: { id: customer.id },
        data: { phone: phone || customer.phone, address: address || customer.address },
      });
    }

    const isOwnWebsite = purchasePlatform === "OWN_WEBSITE";
    const warrantyStatus = isOwnWebsite ? "ACTIVE" : "PENDING";
    const now = new Date();
    const purchaseDateObj = purchaseDate ? new Date(purchaseDate) : now;
    const warrantyStartDate = isOwnWebsite ? purchaseDateObj : null;
    const warrantyEndDate = isOwnWebsite ? calculateWarrantyExpiry(purchaseDateObj, warrantyMonths) : null;

    // Check for duplicate (own website order)
    if (linkedOrderId) {
      const existing = await db.warrantyRegistration.findUnique({ where: { linkedOrderId } });
      if (existing) {
        return NextResponse.json({ error: "This order already has a warranty registered", registrationId: existing.registrationId }, { status: 409 });
      }
    }

    const registrationId = generateRegistrationId();

    const registration = await db.warrantyRegistration.create({
      data: {
        registrationId,
        customerId: customer.id,
        serialNumberId: serialNumberId || null,
        purchasePlatform: purchasePlatform || "OTHER",
        purchaseType: purchaseType || "ONLINE",
        purchaseDate: purchaseDateObj,
        platformOrderId: platformOrderId || null,
        linkedOrderId: linkedOrderId || null,
        productId: productId || null,
        productVariant: productVariant || null,
        warrantyStatus,
        warrantyStartDate,
        warrantyEndDate,
        warrantyMonths,
        ipAddress: req.headers.get("x-forwarded-for") || "unknown",
      },
    });

    if (serialNumberId) {
      await db.serialNumber.update({ where: { id: serialNumberId }, data: { isRegistered: true } });
    }

    // Send confirmation email
    try {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
      await sendWarrantyConfirmationEmail({
        customerName: `${firstName} ${lastName}`,
        customerEmail: email,
        productName: productVariant || "Your Product",
        serialNumber: serialNumberId || platformOrderId || "—",
        registrationId,
        warrantyStatus,
        warrantyEndDate: warrantyEndDate
          ? warrantyEndDate.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
          : "Pending verification",
        certificateUrl: `${siteUrl}/warranty/certificate/${registrationId}`,
      });
      await db.warrantyRegistration.update({ where: { id: registration.id }, data: { emailSent: true } });
    } catch (emailErr) {
      console.error("Warranty email failed:", emailErr);
    }

    return NextResponse.json({
      success: true,
      registrationId,
      warrantyStatus,
      warrantyEndDate: warrantyEndDate?.toISOString(),
      message: isOwnWebsite ? "Warranty activated successfully!" : "Registration submitted. Pending admin verification.",
    });
  } catch (error) {
    console.error("Warranty register POST error:", error);
    return NextResponse.json({ error: "Failed to register warranty" }, { status: 500 });
  }
}
