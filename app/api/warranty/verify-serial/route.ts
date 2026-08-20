import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Pre-seeded fallback serials for local development testing without live DB
const DEV_SERIALS: Record<string, { productName: string; category: string; warrantyMonths: number; productModelName?: string }> = {
  "TLX-1001-2026": { productName: "LX-TIM Pro", category: "THERMAL_PASTE", warrantyMonths: 12, productModelName: "4g Syringe" },
  "TLX-8821-9942": { productName: "LX-TIM Ultra", category: "THERMAL_PASTE", warrantyMonths: 24, productModelName: "5g Syringe" },
  "TLX-5512-3301": { productName: "LX-LM Elite", category: "LIQUID_METAL", warrantyMonths: 24, productModelName: "1.0g Applicator" },
  "TLX-9940-1122": { productName: "LX-PAD Standard", category: "THERMAL_PADS", warrantyMonths: 12, productModelName: "1.5mm Sheet" },
  "TLX-7733-4411": { productName: "LX-PAD Pro", category: "THERMAL_PADS", warrantyMonths: 24, productModelName: "2.0mm Sheet" },
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { serialNumber } = body;

    if (!serialNumber || typeof serialNumber !== "string") {
      return NextResponse.json({ success: false, error: "Invalid serial number provided." }, { status: 400 });
    }

    const cleanSerial = serialNumber.trim().toUpperCase();

    // Check DB first
    try {
      const serialRecord = await db.serialNumber.findUnique({
        where: { serialNumber: cleanSerial },
        include: { product: true, productModel: true, registration: true }
      });

      if (serialRecord) {
        if (serialRecord.isRegistered || serialRecord.registration) {
          return NextResponse.json({
            success: false,
            error: "This serial number has already been registered for warranty coverage."
          }, { status: 400 });
        }
        if (!serialRecord.isActive) {
          return NextResponse.json({
            success: false,
            error: "This serial number is currently inactive. Contact customer support."
          }, { status: 400 });
        }

        return NextResponse.json({
          success: true,
          data: {
            id: serialRecord.id,
            productName: serialRecord.product.name,
            category: serialRecord.product.category,
            warrantyMonths: serialRecord.product.warrantyMonths,
            productModelName: serialRecord.productModel?.name
          }
        });
      }
    } catch (dbErr) {
      // Fall back to DEV_SERIALS if DB is not populated/connected yet
    }

    // Dev fallback check
    const fallback = DEV_SERIALS[cleanSerial];
    if (fallback) {
      return NextResponse.json({
        success: true,
        data: {
          id: `dev-${cleanSerial}`,
          ...fallback
        }
      });
    }

    return NextResponse.json({
      success: false,
      error: "Serial number not found in Thermal Lexum database. Please check packaging and try again."
    }, { status: 444 });

  } catch (error) {
    return NextResponse.json({ success: false, error: "Server error verifying serial number." }, { status: 500 });
  }
}
