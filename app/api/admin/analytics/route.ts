import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

// GET /api/admin/analytics
export async function GET(req: NextRequest) {
  try {
    await requireAdmin();

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    // Parallel queries for all stats
    const [
      totalOrders,
      ordersThisMonth,
      totalRevenuePaise,
      revenueThisMonth,
      totalCustomers,
      customersThisMonth,
      totalWarranties,
      pendingWarranties,
      activeWarranties,
      totalClaims,
      openClaims,
      ordersByMonth,
      warrantyByPlatform,
      recentOrders,
      topProducts,
    ] = await Promise.all([
      db.order.count({ where: { paymentStatus: "PAID" } }),
      db.order.count({ where: { paymentStatus: "PAID", createdAt: { gte: startOfMonth } } }),
      db.order.aggregate({ where: { paymentStatus: "PAID" }, _sum: { totalAmount: true } }),
      db.order.aggregate({ where: { paymentStatus: "PAID", createdAt: { gte: startOfMonth } }, _sum: { totalAmount: true } }),
      db.customer.count(),
      db.customer.count({ where: { createdAt: { gte: startOfMonth } } }),
      db.warrantyRegistration.count(),
      db.warrantyRegistration.count({ where: { warrantyStatus: "PENDING" } }),
      db.warrantyRegistration.count({ where: { warrantyStatus: "ACTIVE" } }),
      db.warrantyClaim.count(),
      db.warrantyClaim.count({ where: { claimStatus: "OPEN" } }),
      // Orders by month for current year
      db.$queryRaw`
        SELECT DATE_TRUNC('month', created_at) as month,
               COUNT(*) as count,
               SUM(total_amount) as revenue
        FROM orders
        WHERE payment_status = 'PAID'
          AND created_at >= ${startOfYear}
        GROUP BY DATE_TRUNC('month', created_at)
        ORDER BY month
      `,
      // Warranty by platform
      db.warrantyRegistration.groupBy({
        by: ["purchasePlatform"],
        _count: { id: true },
      }),
      // Recent orders
      db.order.findMany({
        where: { paymentStatus: "PAID" },
        include: { customer: { select: { firstName: true, lastName: true } }, items: { take: 1 } },
        orderBy: { createdAt: "desc" },
        take: 10,
      }),
      // Top products by revenue
      db.orderItem.groupBy({
        by: ["productId", "name"],
        _sum: { price: true },
        _count: { id: true },
        orderBy: { _sum: { price: "desc" } },
        take: 5,
      }),
    ]);

    return NextResponse.json({
      overview: {
        totalOrders,
        ordersThisMonth,
        totalRevenue: totalRevenuePaise._sum.totalAmount || 0,
        revenueThisMonth: revenueThisMonth._sum.totalAmount || 0,
        totalCustomers,
        customersThisMonth,
        totalWarranties,
        pendingWarranties,
        activeWarranties,
        totalClaims,
        openClaims,
      },
      charts: {
        ordersByMonth,
        warrantyByPlatform,
        topProducts,
      },
      recentOrders,
    });
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
