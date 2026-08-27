"use client";
import Link from "next/link";
import { nesaCoursesList, CourseItem } from "@/components/layout/Navbar";

export default function AdminDashboardPage() {
  const stats = [
    { label: "Total Products", value: `${nesaCoursesList.length}`, change: "Active catalog items", icon: "📦", color: "#0E4D92" },
    { label: "Warranty Cards", value: "3,250", change: "+148 this month", icon: "🛡️", color: "#16a34a" },
    { label: "Pending Claims", value: "4", change: "Requires admin review", icon: "📋", color: "#d97706" },
    { label: "Total Revenue", value: "₹18,45,000", change: "+24% growth", icon: "💰", color: "#9333ea" },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: "900", color: "#0f172a" }}>
            Thermal Lexum Admin Control Panel
          </h1>
          <p style={{ fontSize: "14px", color: "#64748b" }}>
            Overview of product inventory, warranty registrations, support inquiries, and sales metrics
          </p>
        </div>

        <Link href="/admin/courses" className="btn-primary" style={{ padding: "12px 20px" }}>
          + Add New Item 📦
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="responsive-grid-4" style={{ marginBottom: "36px" }}>
        {stats.map((s) => (
          <div key={s.label} className="card-nesa" style={{ padding: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span style={{ fontSize: "13px", fontWeight: "700", color: "#64748b" }}>{s.label}</span>
              <span style={{ fontSize: "24px" }}>{s.icon}</span>
            </div>
            <div style={{ fontSize: "28px", fontWeight: "900", color: s.color, fontFamily: "Outfit, sans-serif", marginBottom: "4px" }}>
              {s.value}
            </div>
            <div style={{ fontSize: "12px", color: "#16a34a", fontWeight: "700" }}>{s.change}</div>
          </div>
        ))}
      </div>

      {/* Quick Action Navigation Cards */}
      <div className="responsive-grid-3" style={{ marginBottom: "36px" }}>
        <div className="card-nesa" style={{ padding: "28px", background: "#f0fcff", border: "1px solid #cceeff" }}>
          <div style={{ fontSize: "32px", marginBottom: "12px" }}>📦</div>
          <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0E4D92", marginBottom: "8px" }}>Manage Products</h3>
          <p style={{ fontSize: "13px", color: "#475569", lineHeight: "1.6", marginBottom: "20px" }}>
            Create, edit prices, update specifications, and manage product inventory.
          </p>
          <Link href="/admin/courses" className="btn-primary" style={{ fontSize: "13px", padding: "10px 18px" }}>
            Go to Products →
          </Link>
        </div>

        <div className="card-nesa" style={{ padding: "28px", background: "#f8fafc", border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: "32px", marginBottom: "12px" }}>🛡️</div>
          <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", marginBottom: "8px" }}>Warranty Cards</h3>
          <p style={{ fontSize: "13px", color: "#475569", lineHeight: "1.6", marginBottom: "20px" }}>
            Review customer warranty registrations, verify platform order IDs, and issue certificates.
          </p>
          <Link href="/admin/registrations" className="btn-secondary" style={{ fontSize: "13px", padding: "10px 18px" }}>
            View Warranties →
          </Link>
        </div>

        <div className="card-nesa" style={{ padding: "28px", background: "#f8fafc", border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: "32px", marginBottom: "12px" }}>💬</div>
          <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", marginBottom: "8px" }}>Customer Support</h3>
          <p style={{ fontSize: "13px", color: "#475569", lineHeight: "1.6", marginBottom: "20px" }}>
            Answer B2B bulk inquiries, technical questions, and customer support messages.
          </p>
          <Link href="/admin/enquiries" className="btn-secondary" style={{ fontSize: "13px", padding: "10px 18px" }}>
            View Messages →
          </Link>
        </div>
      </div>

      {/* Top Products Table */}
      <div className="card-nesa" style={{ padding: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a" }}>
            Top Thermal Lexum Products
          </h2>
          <Link href="/admin/courses" style={{ color: "#0E4D92", fontSize: "13px", fontWeight: "700", textDecoration: "none" }}>
            View All →
          </Link>
        </div>

        <div className="data-table-container">
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", minWidth: "600px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #e2e8f0", fontSize: "12px", color: "#64748b", textTransform: "uppercase" }}>
                <th style={{ padding: "10px 12px" }}>PRODUCT</th>
                <th style={{ padding: "10px 12px" }}>PRICE</th>
                <th style={{ padding: "10px 12px" }}>WARRANTY</th>
                <th style={{ padding: "10px 12px" }}>UNITS DELIVERED</th>
              </tr>
            </thead>
            <tbody>
              {nesaCoursesList.slice(0, 5).map((c: CourseItem) => (
                <tr key={c.slug} style={{ borderBottom: "1px solid #f1f5f9", fontSize: "14px" }}>
                  <td style={{ padding: "14px 12px", fontWeight: "800", color: "#0f172a" }}>{c.name}</td>
                  <td style={{ padding: "14px 12px", fontWeight: "800", color: "#0E4D92" }}>{c.price}</td>
                  <td style={{ padding: "14px 12px", color: "#475569" }}>3 Years Warranty</td>
                  <td style={{ padding: "14px 12px", fontWeight: "700", color: "#16a34a" }}>{c.students} Units</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
