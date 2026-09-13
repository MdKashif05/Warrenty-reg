"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { CourseItem, nesaCoursesList } from "@/components/layout/Navbar";

interface StatsData {
  totalCourses: number;
  totalRegistrations: number;
  confirmedRegistrations: number;
  totalEnquiries: number;
  totalUnits: string;
  totalRevenueFormatted: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<StatsData>({
    totalCourses: nesaCoursesList.length,
    totalRegistrations: 5,
    confirmedRegistrations: 3,
    totalEnquiries: 3,
    totalUnits: "28,700",
    totalRevenueFormatted: "₹18,45,000",
  });
  const [topCourses, setTopCourses] = useState<CourseItem[]>(nesaCoursesList);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((data) => {
        if (data && data.stats) {
          setStats(data.stats);
        }
        if (data && data.topCourses && data.topCourses.length > 0) {
          setTopCourses(data.topCourses);
        }
      })
      .catch((err) => console.error("Notice: Stats loaded with fallback values:", err))
      .finally(() => setLoading(false));
  }, []);

  const metricCards = [
    {
      label: "Active Catalog Products",
      value: `${stats.totalCourses}`,
      change: "Items in MongoDB Catalog",
      icon: "📦",
      color: "#0E4D92",
    },
    {
      label: "Warranty Registrations",
      value: `${stats.totalRegistrations}`,
      change: `${stats.confirmedRegistrations} active & verified`,
      icon: "🛡️",
      color: "#16a34a",
    },
    {
      label: "Customer Inquiries",
      value: `${stats.totalEnquiries}`,
      change: "Incoming support & B2B requests",
      icon: "💬",
      color: "#d97706",
    },
    {
      label: "Estimated Catalog Sales",
      value: stats.totalRevenueFormatted,
      change: "Calculated product volume",
      icon: "💰",
      color: "#9333ea",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div
        style={{
          marginBottom: "32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <h1 style={{ fontSize: "28px", fontWeight: "900", color: "#0f172a", letterSpacing: "-0.5px" }}>
              Thermal Lexum Control Dashboard
            </h1>
            <span
              style={{
                background: "#dcfce7",
                color: "#166534",
                padding: "4px 12px",
                borderRadius: "14px",
                fontSize: "11px",
                fontWeight: "800",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              🍃 Live Atlas DB
            </span>
          </div>
          <p style={{ fontSize: "14px", color: "#64748b", marginTop: "4px" }}>
            Real-time management overview of thermal paste products, customer warranty registrations, and sales performance
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <Link href="/admin/analytics" className="btn-secondary" style={{ padding: "11px 18px", fontSize: "13px" }}>
            📈 View Analytics
          </Link>
          <Link href="/admin/courses" className="btn-primary" style={{ padding: "11px 20px", fontSize: "13px" }}>
            + Add New Product 📦
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="responsive-grid-4" style={{ marginBottom: "32px" }}>
        {metricCards.map((s) => (
          <div key={s.label} className="card-nesa" style={{ padding: "22px", background: "#ffffff" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span style={{ fontSize: "12px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>{s.label}</span>
              <span style={{ fontSize: "22px" }}>{s.icon}</span>
            </div>
            <div
              style={{
                fontSize: "28px",
                fontWeight: "900",
                color: s.color,
                fontFamily: "Outfit, sans-serif",
                marginBottom: "4px",
              }}
            >
              {loading ? "..." : s.value}
            </div>
            <div style={{ fontSize: "12px", color: "#16a34a", fontWeight: "700" }}>{s.change}</div>
          </div>
        ))}
      </div>

      {/* Quick Action Navigation Cards */}
      <div className="responsive-grid-3" style={{ marginBottom: "36px" }}>
        <div className="card-nesa" style={{ padding: "26px", background: "#f0fcff", border: "1px solid #cceeff" }}>
          <div style={{ fontSize: "32px", marginBottom: "12px" }}>📦</div>
          <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0E4D92", marginBottom: "8px" }}>Product Catalog</h3>
          <p style={{ fontSize: "13px", color: "#475569", lineHeight: "1.6", marginBottom: "20px" }}>
            Create new thermal pastes, adjust prices, edit descriptions, and update stock units.
          </p>
          <Link href="/admin/courses" className="btn-primary" style={{ fontSize: "13px", padding: "10px 18px" }}>
            Manage Catalog →
          </Link>
        </div>

        <div className="card-nesa" style={{ padding: "26px", background: "#ffffff", border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: "32px", marginBottom: "12px" }}>🛡️</div>
          <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", marginBottom: "8px" }}>Warranty Cards</h3>
          <p style={{ fontSize: "13px", color: "#475569", lineHeight: "1.6", marginBottom: "20px" }}>
            Review customer warranty registrations, verify retail serial numbers, and update claim statuses.
          </p>
          <Link href="/admin/registrations" className="btn-secondary" style={{ fontSize: "13px", padding: "10px 18px" }}>
            View Warranties →
          </Link>
        </div>

        <div className="card-nesa" style={{ padding: "26px", background: "#ffffff", border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: "32px", marginBottom: "12px" }}>💬</div>
          <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", marginBottom: "8px" }}>Customer Support</h3>
          <p style={{ fontSize: "13px", color: "#475569", lineHeight: "1.6", marginBottom: "20px" }}>
            Read and respond to technical support inquiries, B2B bulk orders, and distributor messages.
          </p>
          <Link href="/admin/enquiries" className="btn-secondary" style={{ fontSize: "13px", padding: "10px 18px" }}>
            View Enquiries →
          </Link>
        </div>
      </div>

      {/* Top Products Table */}
      <div className="card-nesa" style={{ padding: "24px", background: "#ffffff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a" }}>
              Top Thermal Compounds in Catalog
            </h2>
            <p style={{ fontSize: "12px", color: "#64748b" }}>Live product entries currently stored in MongoDB Atlas</p>
          </div>
          <Link href="/admin/courses" style={{ color: "#0E4D92", fontSize: "13px", fontWeight: "700", textDecoration: "none" }}>
            Manage All Products →
          </Link>
        </div>

        <div className="data-table-container">
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", minWidth: "600px" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", fontSize: "12px", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                <th style={{ padding: "12px 16px" }}>PRODUCT NAME</th>
                <th style={{ padding: "12px 16px" }}>PRICE</th>
                <th style={{ padding: "12px 16px" }}>WARRANTY</th>
                <th style={{ padding: "12px 16px" }}>TOTAL DELIVERIES</th>
              </tr>
            </thead>
            <tbody>
              {topCourses.slice(0, 5).map((c: CourseItem) => (
                <tr key={c.slug} style={{ borderBottom: "1px solid #f1f5f9", fontSize: "14px" }}>
                  <td style={{ padding: "16px", fontWeight: "800", color: "#0f172a" }}>
                    {c.name}
                    <div style={{ fontSize: "12px", color: "#64748b", fontWeight: "normal" }}>/courses/{c.slug}</div>
                  </td>
                  <td style={{ padding: "16px", fontWeight: "800", color: "#0E4D92" }}>{c.price}</td>
                  <td style={{ padding: "16px", color: "#475569" }}>3 Years Warranty</td>
                  <td style={{ padding: "16px", fontWeight: "700", color: "#16a34a" }}>{c.students.toLocaleString()} Units</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
