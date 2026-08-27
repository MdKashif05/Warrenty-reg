import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { sendBulkCampaignEmail } from "@/lib/email";

// GET /api/admin/campaigns
export async function GET() {
  try {
    await requireAdmin();
    const campaigns = await db.emailCampaign.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ campaigns });
  } catch (error) {
    console.error("Campaigns GET error:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

// POST /api/admin/campaigns — Create and optionally send campaign
export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const { name, subject, bodyHtml, segment, send = false } = body;

    if (!name || !subject || !bodyHtml) {
      return NextResponse.json({ error: "name, subject, bodyHtml required" }, { status: 400 });
    }

    // Get email list based on segment
    let emails: string[] = [];
    if (send) {
      emails = await getEmailsForSegment(segment || "all");
    }

    const campaign = await db.emailCampaign.create({
      data: {
        name,
        subject,
        body: bodyHtml,
        segment: segment || "all",
        recipientCount: emails.length,
        status: send ? "SENDING" : "DRAFT",
      },
    });

    if (send && emails.length > 0) {
      // Send in background
      sendBulkCampaignEmail(emails, subject, bodyHtml)
        .then(async ({ sent, failed }) => {
          await db.emailCampaign.update({
            where: { id: campaign.id },
            data: {
              sentCount: sent,
              status: failed > 0 && sent === 0 ? "FAILED" : "SENT",
              sentAt: new Date(),
            },
          });
        })
        .catch(console.error);
    }

    return NextResponse.json({ success: true, campaign });
  } catch (error) {
    console.error("Campaign POST error:", error);
    return NextResponse.json({ error: "Failed to create campaign" }, { status: 500 });
  }
}

async function getEmailsForSegment(segment: string): Promise<string[]> {
  switch (segment) {
    case "all":
      const allCustomers = await db.customer.findMany({ select: { email: true } });
      return allCustomers.map((c) => c.email);

    case "active_warranty":
      const activeWarranties = await db.warrantyRegistration.findMany({
        where: { warrantyStatus: "ACTIVE" },
        include: { customer: { select: { email: true } } },
        distinct: ["customerId"],
      });
      return [...new Set(activeWarranties.map((w) => w.customer.email))];

    case "pending_warranty":
      const pendingWarranties = await db.warrantyRegistration.findMany({
        where: { warrantyStatus: "PENDING" },
        include: { customer: { select: { email: true } } },
        distinct: ["customerId"],
      });
      return [...new Set(pendingWarranties.map((w) => w.customer.email))];

    case "customers_with_orders":
      const orderedCustomers = await db.customer.findMany({
        where: { orders: { some: { paymentStatus: "PAID" } } },
        select: { email: true },
      });
      return orderedCustomers.map((c) => c.email);

    default:
      return [];
  }
}
