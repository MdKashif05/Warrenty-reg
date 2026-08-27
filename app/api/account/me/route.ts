import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCustomerFromCookie } from "@/lib/auth-customer";

// GET /api/account/me
export async function GET() {
  try {
    const payload = await getCustomerFromCookie();
    if (!payload) {
      return NextResponse.json({ customer: null });
    }

    const customer = await db.customer.findUnique({
      where: { id: payload.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        address: true,
        city: true,
        state: true,
        postalCode: true,
        country: true,
        createdAt: true,
        _count: {
          select: { orders: true, registrations: true },
        },
      },
    });

    if (!customer) {
      return NextResponse.json({ customer: null });
    }

    return NextResponse.json({ customer });
  } catch (error) {
    console.error("Me error:", error);
    return NextResponse.json({ customer: null });
  }
}

// PATCH /api/account/me — update profile
export async function PATCH(req: NextRequest) {
  try {
    const payload = await getCustomerFromCookie();
    if (!payload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { firstName, lastName, phone, address, city, state, postalCode } = body;

    const customer = await db.customer.update({
      where: { id: payload.id },
      data: {
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        phone: phone || undefined,
        address: address || undefined,
        city: city || undefined,
        state: state || undefined,
        postalCode: postalCode || undefined,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        address: true,
        city: true,
        state: true,
        postalCode: true,
      },
    });

    return NextResponse.json({ success: true, customer });
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
