"use client";
import React from "react";

export default function AdminProductsPage() {
  const products = [
    { id: "1", name: "LX-TIM Pro", category: "THERMAL_PASTE", warranty: "12 months", status: "ACTIVE", serials: 500 },
    { id: "2", name: "LX-TIM Ultra", category: "THERMAL_PASTE", warranty: "24 months", status: "ACTIVE", serials: 250 },
    { id: "3", name: "LX-LM Elite", category: "LIQUID_METAL", warranty: "24 months", status: "ACTIVE", serials: 150 },
    { id: "4", name: "LX-PAD Standard", category: "THERMAL_PADS", warranty: "12 months", status: "ACTIVE", serials: 400 },
    { id: "5", name: "LX-PAD Pro", category: "THERMAL_PADS", warranty: "24 months", status: "ACTIVE", serials: 300 }
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#fff" }}>Product Catalog Management</h1>
          <p style={{ fontSize: "14px", color: "var(--brand-gray)" }}>Configure Thermal Lexum products and warranty parameters.</p>
        </div>
        <button className="btn-primary" style={{ padding: "10px 20px", fontSize: "12px" }}>
          + Add New Product
        </button>
      </div>

      <div className="brand-card" style={{ padding: "28px" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>CATEGORY</th>
              <th>WARRANTY PERIOD</th>
              <th>TOTAL SERIALS</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td style={{ color: "#fff", fontWeight: "600" }}>{p.name}</td>
                <td style={{ fontFamily: "JetBrains Mono, monospace", color: "var(--brand-cyan)", fontSize: "12px" }}>{p.category}</td>
                <td>{p.warranty}</td>
                <td>{p.serials} batch units</td>
                <td><span className="badge badge-active">{p.status}</span></td>
                <td>
                  <button style={{ background: "none", border: "none", color: "var(--brand-cyan)", cursor: "pointer", fontSize: "12px" }}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
