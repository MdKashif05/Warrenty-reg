"use client";
import React from "react";

export default function AdminWarrantiesPage() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#fff" }}>Warranty Registrations</h1>
          <p style={{ fontSize: "14px", color: "var(--brand-gray)" }}>Approve, audit, and inspect active customer warranty coverage.</p>
        </div>
      </div>

      <div className="brand-card" style={{ padding: "28px" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>REG ID</th>
              <th>SERIAL</th>
              <th>CUSTOMER</th>
              <th>PURCHASE DATE</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontFamily: "JetBrains Mono, monospace", color: "var(--brand-cyan)" }}>TLW-2026-0819</td>
              <td style={{ fontFamily: "JetBrains Mono, monospace" }}>TLX-1001-2026</td>
              <td>Javed Shaikh</td>
              <td>15 Jan 2026</td>
              <td><span className="badge badge-active">ACTIVE</span></td>
              <td><button style={{ background: "none", border: "none", color: "var(--brand-cyan)", cursor: "pointer" }}>View Details</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
