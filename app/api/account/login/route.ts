import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { signCustomerToken, verifyCustomerPassword } from "@/lib/auth-customer";
import { sendOTPEmail as sendOTP } from "@/lib/email";
import { generateOTP as genOTP } from "@/lib/utils";

// POST /api/account/login
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, otp, mode = "password" } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const customer = await db.customer.findUnique({ where: { email } });
    if (!customer) {
      return NextResponse.json({ error: "Account not found. Please register first." }, { status: 404 });
    }

    if (mode === "otp") {
      if (!otp) {
        // Step 1: Send OTP
        const code = genOTP();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        await db.customer.update({
          where: { id: customer.id },
          data: { otpCode: code, otpExpiresAt: expiresAt },
        });

        await sendOTP(
          customer.email,
          `${customer.firstName} ${customer.lastName}`,
          code
        );

        return NextResponse.json({ success: true, otpSent: true });
      } else {
        // Step 2: Verify OTP
        if (
          customer.otpCode !== otp ||
          !customer.otpExpiresAt ||
          customer.otpExpiresAt < new Date()
        ) {
          return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 401 });
        }

        // Clear OTP
        await db.customer.update({
          where: { id: customer.id },
          data: { otpCode: null, otpExpiresAt: null, lastLoginAt: new Date() },
        });
      }
    } else {
      // Password mode
      if (!password) {
        return NextResponse.json({ error: "Password is required" }, { status: 400 });
      }
      if (!customer.passwordHash) {
        return NextResponse.json({ error: "Please use OTP login for this account" }, { status: 400 });
      }
      const { verifyCustomerPassword } = await import("@/lib/auth-customer");
      const valid = await verifyCustomerPassword(password, customer.passwordHash);
      if (!valid) {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
      }
      await db.customer.update({
        where: { id: customer.id },
        data: { lastLoginAt: new Date() },
      });
    }

    const { signCustomerToken } = await import("@/lib/auth-customer");
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
    console.error("Login error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}

// DELETE /api/account/login — logout
export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set("customer_token", "", { maxAge: 0, path: "/" });
  return response;
}
