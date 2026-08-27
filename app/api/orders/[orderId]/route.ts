import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCustomerFromCookie } from "@/lib/auth-customer";

// GET /api/orders/[orderId]
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;
    const customer = await getCustomerFromCookie();

    const order = await db.order.findUnique({
      where: { orderId },
      include: { items: true, customer: true },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Allow access if customer owns order or it's a guest order (for confirmation page)
    if (customer && order.customerId && order.customerId !== customer.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    return NextResponse.json({ order });
  } catch (error) {
    console.error("Order GET error:", error);
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
  }
}
