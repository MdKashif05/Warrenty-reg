"use client";
import React from "react";

export default function AdminCustomersPage() {
  return (
    <div>
      <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#fff", marginBottom: "8px" }}>Customer Directory</h1>
      <p style={{ fontSize: "14px", color: "var(--brand-gray)", marginBottom: "32px" }}>Registered owners and contact records.</p>
      
      <div className="brand-card" style={{ padding: "28px" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>PHONE</th>
              <th>CITY/STATE</th>
              <th>COUNTRY</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ color: "#fff", fontWeight: "600" }}>Javed Shaikh</td>
              <td style={{ color: "var(--brand-cyan)" }}>info@thermallexum.com</td>
              <td>+91 8864-817544</td>
              <td>Bengaluru, Karnataka</td>
              <td>India</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
