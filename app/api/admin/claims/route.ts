import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

// GET /api/admin/claims
export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const claims = await db.warrantyClaim.findMany({
      where: status ? { claimStatus: status as "OPEN" | "IN_REVIEW" | "APPROVED" | "REJECTED" | "RESOLVED" } : undefined,
      include: {
        registration: {
          include: {
            customer: { select: { firstName: true, lastName: true, email: true, phone: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ claims });
  } catch (error) {
    console.error("Admin claims GET error:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

// PATCH /api/admin/claims — Update claim status
export async function PATCH(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const { claimId, claimStatus, resolution, adminNotes } = body;

    if (!claimId) return NextResponse.json({ error: "claimId required" }, { status: 400 });

    const claim = await db.warrantyClaim.update({
      where: { claimId },
      data: {
        claimStatus: claimStatus || undefined,
        resolution: resolution || undefined,
        adminNotes: adminNotes || undefined,
        resolvedAt: (claimStatus === "RESOLVED" || claimStatus === "REJECTED") ? new Date() : undefined,
      },
    });

    return NextResponse.json({ success: true, claim });
  } catch (error) {
    console.error("Admin claims PATCH error:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
