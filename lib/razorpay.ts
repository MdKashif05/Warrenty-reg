import Razorpay from "razorpay";
import crypto from "crypto";

export function getRazorpay(): Razorpay {
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder",
    key_secret: process.env.RAZORPAY_KEY_SECRET || "placeholder_secret",
  });
}

export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const body = orderId + "|" + paymentId;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
    .update(body.toString())
    .digest("hex");
  return expectedSignature === signature;
}

export interface RazorpayOrderResult {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: string;
}

export async function createRazorpayOrder(
  amountPaise: number,
  receipt: string,
  notes?: Record<string, string>
): Promise<RazorpayOrderResult> {
  const rzp = getRazorpay();
  const order = await rzp.orders.create({
    amount: amountPaise,
    currency: "INR",
    receipt,
    notes,
  });
  return order as unknown as RazorpayOrderResult;
}
