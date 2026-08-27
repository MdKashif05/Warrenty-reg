import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret";

export interface CustomerPayload {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export async function hashCustomerPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyCustomerPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signCustomerToken(payload: CustomerPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "30d" });
}

export function verifyCustomerToken(token: string): CustomerPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as CustomerPayload;
  } catch {
    return null;
  }
}

export async function getCustomerFromCookie(): Promise<CustomerPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("customer_token")?.value;
  if (!token) return null;
  return verifyCustomerToken(token);
}

export async function requireCustomer(): Promise<CustomerPayload> {
  const customer = await getCustomerFromCookie();
  if (!customer) {
    throw new Error("Unauthorized");
  }
  return customer;
}
