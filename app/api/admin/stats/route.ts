import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    const db = await getDatabase();

    // Fetch counts across collections concurrently
    const [coursesCount, regCount, enqCount, confirmedRegCount] = await Promise.all([
      db.collection("courses").countDocuments().catch(() => 0),
      db.collection("registrations").countDocuments().catch(() => 0),
      db.collection("enquiries").countDocuments().catch(() => 0),
      db.collection("registrations").countDocuments({ status: "CONFIRMED" }).catch(() => 0),
    ]);

    // Calculate approximate sales / revenue from real items
    const courses = await db.collection("courses").find({}).toArray().catch(() => []);
    let totalUnits = 0;
    let totalRevenue = 0;

    courses.forEach((c) => {
      const priceNum = parseInt((c.price || "0").replace(/[^0-9]/g, ""), 10) || 0;
      const units = Number(c.students) || 0;
      totalUnits += units;
      totalRevenue += priceNum * units;
    });

    const topCourses = courses.slice(0, 5).map((c) => ({
      slug: c.slug,
      name: c.name,
      badge: c.badge || "POPULAR",
      price: c.price || "₹0",
      students: c.students || 0,
      desc: c.desc || "",
    }));

    return NextResponse.json({
      success: true,
      stats: {
        totalCourses: coursesCount || 0,
        totalRegistrations: regCount || 0,
        confirmedRegistrations: confirmedRegCount || 0,
        totalEnquiries: enqCount || 0,
        totalUnits: totalUnits.toLocaleString(),
        totalRevenueFormatted: new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }).format(totalRevenue),
      },
      topCourses,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json({
      success: true,
      stats: {
        totalCourses: 0,
        totalRegistrations: 0,
        confirmedRegistrations: 0,
        totalEnquiries: 0,
        totalUnits: "0",
        totalRevenueFormatted: "₹0",
      },
      topCourses: [],
      fallback: true,
    });
  }
}
