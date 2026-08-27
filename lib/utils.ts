import { db } from "./db";

/**
 * Generate sequential order ID in format TL-2026-001
 */
export async function generateOrderId(): Promise<string> {
  const year = new Date().getFullYear();

  // Upsert counter for this year
  const counter = await db.orderCounter.upsert({
    where: { id: 1 },
    update: { count: { increment: 1 }, year },
    create: { id: 1, count: 1, year },
  });

  // If year rolled over, reset
  if (counter.year !== year) {
    await db.orderCounter.update({
      where: { id: 1 },
      data: { count: 1, year },
    });
    return `TL-${year}-001`;
  }

  const seq = String(counter.count).padStart(3, "0");
  return `TL-${year}-${seq}`;
}

/**
 * Generate warranty registration ID: TLW-2026-0001
 */
export function generateRegistrationId(): string {
  const year = new Date().getFullYear();
  const rand = Math.floor(Math.random() * 9000) + 1000;
  const ts = Date.now().toString().slice(-4);
  return `TLW-${year}-${rand}${ts}`.slice(0, 15);
}

/**
 * Generate warranty claim ID: TLC-2026-001
 */
export function generateClaimId(): string {
  const year = new Date().getFullYear();
  const rand = String(Math.floor(Math.random() * 900) + 100);
  return `TLC-${year}-${rand}`;
}

/**
 * Calculate warranty expiry date from purchase date + months
 */
export function calculateWarrantyExpiry(
  purchaseDate: Date,
  warrantyMonths: number
): Date {
  const expiry = new Date(purchaseDate);
  expiry.setMonth(expiry.getMonth() + warrantyMonths);
  return expiry;
}

/**
 * Format price in paise to INR string
 */
export function formatPrice(paise: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(paise / 100);
}

/**
 * Generate OTP
 */
export function generateOTP(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}
