import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { generateOrderId } from "@/lib/utils";
import { createRazorpayOrder } from "@/lib/razorpay";
import { getCustomerFromCookie } from "@/lib/auth-customer";
import { sendOrderConfirmationEmail } from "@/lib/email";

// POST /api/orders — Create a new order
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      items, // [{ productId, variantId, qty, price, name, variant }]
      shippingName,
      shippingPhone,
      shippingAddress,
      shippingCity,
      shippingState,
      shippingPincode,
      guestName,
      guestEmail,
      guestPhone,
      paymentGateway = "RAZORPAY",
      notes,
    } = body;

    if (!items?.length || !shippingName || !shippingPhone || !shippingAddress || !shippingCity || !shippingState || !shippingPincode) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const customer = await getCustomerFromCookie();
    const customerId = customer?.id || null;

    // Calculate totals
    const subtotal = items.reduce(
      (sum: number, item: { price: number; qty: number }) => sum + item.price * item.qty,
      0
    );
    const shippingCharge = subtotal >= 49900 ? 0 : 5900; // Free shipping above ₹499
    const totalAmount = subtotal + shippingCharge;

    // Generate order ID
    const orderId = await generateOrderId();

    // Create Razorpay order if gateway is Razorpay
    let razorpayOrderId: string | undefined;
    if (paymentGateway === "RAZORPAY") {
      const rzOrder = await createRazorpayOrder(totalAmount, orderId, {
        orderId,
        customerEmail: customer?.email || guestEmail || "",
      });
      razorpayOrderId = rzOrder.id;
    }

    // Create order in DB
    const order = await db.order.create({
      data: {
        orderId,
        customerId,
        guestName: customerId ? null : guestName,
        guestEmail: customerId ? null : guestEmail,
        guestPhone: customerId ? null : guestPhone,
        shippingName,
        shippingPhone,
        shippingAddress,
        shippingCity,
        shippingState,
        shippingPincode,
        subtotal,
        shippingCharge,
        totalAmount,
        paymentGateway: paymentGateway as "RAZORPAY" | "PAYU" | "COD",
        razorpayOrderId,
        notes,
        items: {
          create: items.map((item: {
            productId: string;
            variantId?: string;
            qty: number;
            price: number;
            name: string;
            variant?: string;
          }) => ({
            productId: item.productId,
            variantId: item.variantId || null,
            name: item.name,
            variant: item.variant || null,
            qty: item.qty,
            price: item.price,
          })),
        },
      },
    });

    return NextResponse.json({
      success: true,
      orderId: order.orderId,
      orderDbId: order.id,
      totalAmount,
      razorpayOrderId,
      razorpayKeyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}

// GET /api/orders — List orders for logged-in customer
export async function GET(req: NextRequest) {
  try {
    const customer = await getCustomerFromCookie();
    if (!customer) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const orders = await db.order.findMany({
      where: { customerId: customer.id },
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("List orders error:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
