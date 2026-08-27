import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashCustomerPassword, signCustomerToken } from "@/lib/auth-customer";

// POST /api/account/register
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, password } = body;

    if (!firstName || !lastName || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    // Check if customer exists
    const existing = await db.customer.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const passwordHash = password ? await hashCustomerPassword(password) : null;

    const customer = await db.customer.create({
      data: {
        firstName,
        lastName,
        email,
        phone: phone || null,
        passwordHash,
        isVerified: true,
      },
    });

    const token = signCustomerToken({
      id: customer.id,
      email: customer.email,
      firstName: customer.firstName,
      lastName: customer.lastName,
    });

    const response = NextResponse.json({
      success: true,
      customer: {
        id: customer.id,
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
      },
    });

    response.cookies.set("customer_token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
