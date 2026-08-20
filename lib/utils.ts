import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, addMonths } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRegistrationId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `TLW-${timestamp}-${random}`;
}

export function formatDate(date: Date | string): string {
  return format(new Date(date), "dd MMM yyyy");
}

export function formatDateTime(date: Date | string): string {
  return format(new Date(date), "dd MMM yyyy, HH:mm");
}

export function calculateWarrantyEndDate(
  startDate: Date,
  months: number
): Date {
  return addMonths(startDate, months);
}

export function isWarrantyActive(endDate: Date | null): boolean {
  if (!endDate) return false;
  return new Date() < new Date(endDate);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
}

export const PRODUCT_CATEGORIES = {
  THERMAL_PASTE: "Thermal Paste",
  LIQUID_METAL: "Liquid Metal",
  THERMAL_PADS: "Thermal Pads",
  OTHER: "Other",
} as const;

export const WARRANTY_STATUS_LABELS = {
  PENDING: "Pending Review",
  ACTIVE: "Active",
  EXPIRED: "Expired",
  REJECTED: "Rejected",
  CLAIMED: "Claimed",
} as const;

export const PURCHASE_TYPE_LABELS = {
  ONLINE: "Online Store",
  RETAIL_STORE: "Retail Store",
  DISTRIBUTOR: "Distributor",
  OTHER: "Other",
} as const;
