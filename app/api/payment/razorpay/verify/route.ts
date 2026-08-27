import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyRazorpaySignature } from "@/lib/razorpay";
import { sendOrderConfirmationEmail, sendPostPurchaseWarrantyEmail } from "@/lib/email";
import { getCustomerFromCookie } from "@/lib/auth-customer";

// POST /api/payment/razorpay/verify
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !orderId) {
      return NextResponse.json({ error: "Missing payment fields" }, { status: 400 });
    }

    // Verify signature
    const isValid = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    // Update order in DB
    const order = await db.order.update({
      where: { orderId },
      data: {
        paymentStatus: "PAID",
        status: "CONFIRMED",
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      },
      include: {
        items: true,
        customer: true,
      },
    });

    // Clear cart
    if (order.customerId) {
      const cart = await db.cart.findUnique({ where: { customerId: order.customerId } });
      if (cart) await db.cartItem.deleteMany({ where: { cartId: cart.id } });
    }

    // Send order confirmation + warranty registration email
    const customerEmail = order.customer?.email || order.guestEmail || "";
    const customerName = order.customer
      ? `${order.customer.firstName} ${order.customer.lastName}`
      : order.guestName || "Customer";
    const productNames = order.items.map((i) => i.name).join(", ");

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const warrantyRegUrl = `${siteUrl}/warranty/register?orderId=${order.orderId}`;

    if (customerEmail && !order.warrantyEmailSent) {
      await sendOrderConfirmationEmail({
        customerName,
        customerEmail,
        orderId: order.orderId,
        items: order.items.map((i) => ({
          name: i.name,
          variant: i.variant || undefined,
          qty: i.qty,
          price: i.price,
        })),
        totalAmount: order.totalAmount,
        shippingAddress: `${order.shippingAddress}, ${order.shippingCity}, ${order.shippingState} - ${order.shippingPincode}`,
        warrantyRegUrl,
      });

      await db.order.update({
        where: { orderId },
        data: { warrantyEmailSent: true },
      });
    }

    return NextResponse.json({
      success: true,
      orderId: order.orderId,
      status: "CONFIRMED",
    });
  } catch (error) {
    console.error("Payment verify error:", error);
    return NextResponse.json({ error: "Payment verification failed" }, { status: 500 });
  }
}
