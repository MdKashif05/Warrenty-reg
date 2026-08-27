import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCustomerFromCookie } from "@/lib/auth-customer";

// GET /api/account/warranties
export async function GET() {
  try {
    const customer = await getCustomerFromCookie();
    if (!customer) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const warranties = await db.warrantyRegistration.findMany({
      where: { customerId: customer.id },
      include: {
        claims: { orderBy: { createdAt: "desc" }, take: 3 },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ warranties });
  } catch (error) {
    console.error("Warranties GET error:", error);
    return NextResponse.json({ error: "Failed to fetch warranties" }, { status: 500 });
  }
}
