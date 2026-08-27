"use client";
import { useState } from "react";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState([
    { id: "ENQ-501", name: "Rohan Kapoor", email: "rohan@gmail.com", phone: "+91 98123 45678", course: "NESA Fluent English Level 2", message: "Hi, do you offer morning batches for working professionals?", status: "NEW", date: "2026-08-27" },
    { id: "ENQ-502", name: "Megha Mehta", email: "megha.m@outlook.com", phone: "+91 97890 12345", course: "NESA IELTS Preparation", message: "What is the total fee structure and study material provided?", status: "RESPONDED", date: "2026-08-26" },
    { id: "ENQ-503", name: "Deepak Chawla", email: "deepak@chawla.com", phone: "+91 96543 21098", course: "NESA Corporate English Course", message: "Can we arrange group corporate training for our 15 team members?", status: "NEW", date: "2026-08-25" },
  ]);

  const toggleResponded = (id: string) => {
    setEnquiries(
      enquiries.map((e) => (e.id === id ? { ...e, status: e.status === "NEW" ? "RESPONDED" : "NEW" } : e))
    );
  };

  return (
    <div>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "900", color: "#0f172a" }}>
          Contact & Academic Enquiries
        </h1>
        <p style={{ fontSize: "14px", color: "#64748b" }}>
          View and respond to prospective student messages ({enquiries.length} enquiries)
        </p>
      </div>

      <div className="card-nesa" style={{ overflow: "hidden", padding: 0 }}>
        <div className="data-table-container">
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", minWidth: "750px" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", fontSize: "12px", color: "#64748b", textTransform: "uppercase", letterSpacing: "1px" }}>
                <th style={{ padding: "14px 18px" }}>ENQUIRY ID</th>
                <th style={{ padding: "14px 18px" }}>SENDER</th>
                <th style={{ padding: "14px 18px" }}>COURSE</th>
                <th style={{ padding: "14px 18px" }}>MESSAGE</th>
                <th style={{ padding: "14px 18px" }}>STATUS</th>
                <th style={{ padding: "14px 18px" }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((enq) => (
                <tr key={enq.id} style={{ borderBottom: "1px solid #f1f5f9", fontSize: "14px" }}>
                  <td style={{ padding: "16px 18px", fontWeight: "800", color: "#0E4D92" }}>{enq.id}</td>
                  <td style={{ padding: "16px 18px" }}>
                    <div style={{ fontWeight: "800", color: "#0f172a" }}>{enq.name}</div>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>{enq.phone}</div>
                    <div style={{ fontSize: "12px", color: "#0E4D92" }}>{enq.email}</div>
                  </td>
                  <td style={{ padding: "16px 18px", fontWeight: "700", color: "#0f172a" }}>{enq.course || "General"}</td>
                  <td style={{ padding: "16px 18px", color: "#475569", maxWidth: "300px" }}>{enq.message}</td>
                  <td style={{ padding: "16px 18px" }}>
                    <span style={{ background: enq.status === "NEW" ? "#fee2e2" : "#dcfce7", color: enq.status === "NEW" ? "#991b1b" : "#166534", padding: "4px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: "800" }}>
                      {enq.status}
                    </span>
                  </td>
                  <td style={{ padding: "16px 18px" }}>
                    <button onClick={() => toggleResponded(enq.id)} style={{ padding: "6px 12px", background: enq.status === "NEW" ? "#0E4D92" : "#f1f5f9", color: enq.status === "NEW" ? "#ffffff" : "#475569", border: "none", borderRadius: "6px", fontSize: "12px", fontWeight: "700", cursor: "pointer" }}>
                      {enq.status === "NEW" ? "Mark Responded ✓" : "Mark New"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
