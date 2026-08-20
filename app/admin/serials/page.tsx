"use client";
import React from "react";

export default function AdminSerialsPage() {
  const serials = [
    { serial: "TLX-1001-2026", product: "LX-TIM Pro", status: "Registered", batch: "BATCH-2026-A" },
    { serial: "TLX-8821-9942", product: "LX-TIM Ultra", status: "Registered", batch: "BATCH-2026-B" },
    { serial: "TLX-5512-3301", product: "LX-LM Elite", status: "Registered", batch: "BATCH-2026-B" },
    { serial: "TLX-9940-1122", product: "LX-PAD Standard", status: "Available", batch: "BATCH-2026-C" },
    { serial: "TLX-7733-4411", product: "LX-PAD Pro", status: "Available", batch: "BATCH-2026-C" }
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#fff" }}>Serial Number Inventory</h1>
          <p style={{ fontSize: "14px", color: "var(--brand-gray)" }}>Manage and batch generate product authenticity serial keys.</p>
        </div>
        <button className="btn-primary" style={{ padding: "10px 20px", fontSize: "12px" }}>
          + Batch Generate Serials
        </button>
      </div>

      <div className="brand-card" style={{ padding: "28px" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>SERIAL NUMBER</th>
              <th>PRODUCT</th>
              <th>BATCH CODE</th>
              <th>REGISTRATION STATUS</th>
            </tr>
          </thead>
          <tbody>
            {serials.map((s) => (
              <tr key={s.serial}>
                <td style={{ fontFamily: "JetBrains Mono, monospace", color: "var(--brand-cyan)", fontWeight: "600" }}>{s.serial}</td>
                <td style={{ color: "#fff" }}>{s.product}</td>
                <td style={{ color: "var(--brand-gray)", fontSize: "12px" }}>{s.batch}</td>
                <td>
                  <span className={`badge ${s.status === "Registered" ? "badge-active" : "badge-pending"}`}>
                    {s.status}
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
