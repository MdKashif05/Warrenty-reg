"use client";
import React from "react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const metrics = [
    { label: "Total Products", value: "5", change: "+1 this month", color: "#0284c7" },
    { label: "Active Warranties", value: "1,248", change: "+18% vs last month", color: "#16a34a" },
    { label: "Pending Reviews", value: "12", change: "Requires action", color: "#b45309" },
    { label: "Total Customers", value: "982", change: "Global registrations", color: "#2563eb" }
  ];

  const recentRegistrations = [
    { id: "TLW-2026-0819", product: "LX-TIM Pro", serial: "TLX-1001-2026", customer: "Javed Shaikh", date: "20 Aug 2026", status: "ACTIVE" },
    { id: "TLW-2026-0818", product: "LX-LM Elite", serial: "TLX-5512-3301", customer: "Rahul Sharma", date: "19 Aug 2026", status: "ACTIVE" },
    { id: "TLW-2026-0817", product: "LX-PAD Pro", serial: "TLX-7733-4411", customer: "Ananya Roy", date: "18 Aug 2026", status: "PENDING" },
    { id: "TLW-2026-0816", product: "LX-TIM Ultra", serial: "TLX-8821-9942", customer: "Vikram Patel", date: "17 Aug 2026", status: "ACTIVE" }
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#0f172a", letterSpacing: "-1px" }}>Executive Dashboard</h1>
          <p style={{ fontSize: "14px", color: "#64748b" }}>Real-time warranty analytics and system status.</p>
        </div>
        <Link href="/admin/warranties" className="btn-primary" style={{ padding: "10px 20px", fontSize: "12px" }}>
          + Manage Warranties
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="responsive-form-grid-4" style={{ marginBottom: "40px" }}>
        {metrics.map((m) => (
          <div key={m.label} className="brand-card" style={{ padding: "24px", background: "#ffffff", border: "1px solid #e2e8f0" }}>
            <div style={{ fontSize: "11px", color: "#64748b", letterSpacing: "1px", textTransform: "uppercase", fontWeight: "700" }}>{m.label}</div>
            <div style={{ fontSize: "32px", fontWeight: "900", color: m.color, margin: "8px 0" }}>{m.value}</div>
            <div style={{ fontSize: "12px", color: "#475569" }}>{m.change}</div>
          </div>
        ))}
      </div>

      {/* Table of recent registrations */}
      <div className="brand-card" style={{ padding: "28px", background: "#ffffff", border: "1px solid #e2e8f0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a" }}>Recent Warranty Registrations</h2>
          <Link href="/admin/warranties" style={{ fontSize: "13px", color: "#0284c7", textDecoration: "none", fontWeight: "700" }}>View All →</Link>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>REGISTRATION ID</th>
              <th>PRODUCT</th>
              <th>SERIAL NO</th>
              <th>CUSTOMER</th>
              <th>DATE</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {recentRegistrations.map((row) => (
              <tr key={row.id}>
                <td style={{ fontFamily: "JetBrains Mono, monospace", color: "#0284c7", fontWeight: "700" }}>{row.id}</td>
                <td style={{ color: "#0f172a", fontWeight: "700" }}>{row.product}</td>
                <td style={{ fontFamily: "JetBrains Mono, monospace", color: "#0f172a" }}>{row.serial}</td>
                <td style={{ color: "#0f172a", fontWeight: "600" }}>{row.customer}</td>
                <td style={{ color: "#64748b" }}>{row.date}</td>
                <td>
                  <span className={`badge ${row.status === "ACTIVE" ? "badge-active" : "badge-pending"}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
