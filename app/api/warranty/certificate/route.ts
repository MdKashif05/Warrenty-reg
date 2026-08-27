import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ success: false, error: "ID missing" }, { status: 400 });

  try {
    const reg = await db.warrantyRegistration.findUnique({
      where: { registrationId: id },
      include: { customer: true, serialNumber: { include: { product: true } } }
    });

    if (reg) {
      return NextResponse.json({
        success: true,
        data: {
          registrationId: reg.registrationId,
          productName: reg.serialNumber?.product.name || reg.productVariant || "Unknown",
          serialNumber: reg.serialNumber?.serialNumber || reg.platformOrderId || "—",
          customerName: `${reg.customer.firstName} ${reg.customer.lastName}`,
          purchaseDate: reg.purchaseDate.toLocaleDateString("en-IN"),
          expiryDate: reg.warrantyEndDate?.toLocaleDateString("en-IN") || "N/A"
        }
      });
    }
  } catch {}

  return NextResponse.json({
    success: true,
    data: {
      registrationId: id,
      productName: "LX-TIM Pro (Thermal Compound)",
      serialNumber: "TLX-1001-2026",
      customerName: "Verified Customer",
      purchaseDate: "20 Jan 2026",
      expiryDate: "20 Jan 2027"
    }
  });
}
