import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

// GET /api/admin/warranties
export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const where: Record<string, unknown> = {};
    if (status) where.warrantyStatus = status;
    if (search) {
      where.OR = [
        { registrationId: { contains: search, mode: "insensitive" } },
        { customer: { email: { contains: search, mode: "insensitive" } } },
        { customer: { firstName: { contains: search, mode: "insensitive" } } },
        { customer: { lastName: { contains: search, mode: "insensitive" } } },
        { platformOrderId: { contains: search, mode: "insensitive" } },
      ];
    }

    const registrations = await db.warrantyRegistration.findMany({
      where,
      include: {
        customer: { select: { firstName: true, lastName: true, email: true, phone: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    return NextResponse.json({ registrations });
  } catch (error) {
    console.error("Admin warranties GET error:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
