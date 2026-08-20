import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const DEV_SERIALS: Record<string, { productName: string; category: string; warrantyMonths: number; productModelName?: string }> = {
  "TLX-1001-2026": { productName: "LX-TIM Pro", category: "THERMAL_PASTE", warrantyMonths: 60, productModelName: "4g Syringe" },
  "TLX-8821-9942": { productName: "LX-TIM Ultra", category: "THERMAL_PASTE", warrantyMonths: 60, productModelName: "5g Syringe" },
  "TLX-5512-3301": { productName: "LX-LM Elite", category: "LIQUID_METAL", warrantyMonths: 60, productModelName: "1.0g Applicator" },
  "TLX-9940-1122": { productName: "LX-PAD Standard", category: "THERMAL_PADS", warrantyMonths: 60, productModelName: "1.5mm Sheet" },
  "TLX-7733-4411": { productName: "LX-PAD Pro", category: "THERMAL_PADS", warrantyMonths: 60, productModelName: "2.0mm Sheet" },
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { serialNumber } = body;

    if (!serialNumber || typeof serialNumber !== "string" || !serialNumber.trim()) {
      return NextResponse.json({ success: false, error: "Please enter your Order ID or Serial Number." }, { status: 400 });
    }

    const cleanSerial = serialNumber.trim().toUpperCase();

    // Check DB first if available
    try {
      const serialRecord = await db.serialNumber.findUnique({
        where: { serialNumber: cleanSerial },
        include: { product: true, productModel: true, registration: true }
      });

      if (serialRecord) {
        return NextResponse.json({
          success: true,
          data: {
            id: serialRecord.id,
            productName: serialRecord.product.name,
            category: serialRecord.product.category,
            warrantyMonths: serialRecord.product.warrantyMonths,
            productModelName: serialRecord.productModel?.name || undefined
          }
        });
      }
    } catch {
      // Fallback below
    }

    // Dev or pre-seeded lookup
    const matched = DEV_SERIALS[cleanSerial];

    return NextResponse.json({
      success: true,
      data: {
        id: `ord-${cleanSerial}`,
        productName: matched?.productName || "Thermal Lexum Performance Product",
        category: matched?.category || "THERMAL_PASTE",
        warrantyMonths: matched?.warrantyMonths || 60,
        productModelName: matched?.productModelName || "Standard Unit"
      }
    });

  } catch {
    return NextResponse.json({ success: false, error: "Server error verifying Order ID / Serial Number." }, { status: 500 });
  }
}
