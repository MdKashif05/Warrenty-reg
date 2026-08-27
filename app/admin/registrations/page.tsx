"use client";
import { useState } from "react";

export default function AdminRegistrationsPage() {
  const [registrations, setRegistrations] = useState([
    { id: "REG-1001", name: "Rahul Sharma", email: "rahul.sharma@example.com", phone: "+91 98765 43210", course: "NESA Fluent English Level 1", status: "CONFIRMED", date: "2026-08-27" },
    { id: "REG-1002", name: "Priya Patel", email: "priya.patel@gmail.com", phone: "+91 91234 56789", course: "NESA IELTS Preparation", status: "CONFIRMED", date: "2026-08-26" },
    { id: "REG-1003", name: "Anish Verma", email: "anish.verma@techcorp.in", phone: "+91 99887 76655", course: "NESA Corporate English Course", status: "PENDING", date: "2026-08-26" },
    { id: "REG-1004", name: "Sunita Gupta", email: "sunita.gupta@yahoo.com", phone: "+91 98111 22334", course: "NESA English Foundation", status: "CONFIRMED", date: "2026-08-25" },
    { id: "REG-1005", name: "Karan Johar", email: "karan.j@creative.io", phone: "+91 97777 88888", course: "NESA Spoken English Advance", status: "PENDING", date: "2026-08-24" },
  ]);

  const [search, setSearch] = useState("");

  const toggleStatus = (id: string) => {
    setRegistrations(
      registrations.map((r) =>
        r.id === id ? { ...r, status: r.status === "CONFIRMED" ? "PENDING" : "CONFIRMED" } : r
      )
    );
  };

  const filtered = registrations.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase()) ||
      r.course.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "900", color: "#0f172a" }}>
          Student Course Registrations
        </h1>
        <p style={{ fontSize: "14px", color: "#64748b" }}>
          Manage online student batch enrollments and verification status ({registrations.length} registrations)
        </p>
      </div>

      {/* Search */}
      <div style={{ marginBottom: "20px" }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by student name, email, or course..."
          style={{ width: "100%", maxWidth: "400px", padding: "12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", outline: "none" }}
        />
      </div>

      {/* Table */}
      <div className="card-nesa" style={{ overflow: "hidden", padding: 0 }}>
        <div className="data-table-container">
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", minWidth: "750px" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", fontSize: "12px", color: "#64748b", textTransform: "uppercase", letterSpacing: "1px" }}>
                <th style={{ padding: "14px 18px" }}>REG ID</th>
                <th style={{ padding: "14px 18px" }}>STUDENT NAME</th>
                <th style={{ padding: "14px 18px" }}>CONTACT INFO</th>
                <th style={{ padding: "14px 18px" }}>COURSE ENROLLED</th>
                <th style={{ padding: "14px 18px" }}>STATUS</th>
                <th style={{ padding: "14px 18px" }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((reg) => (
                <tr key={reg.id} style={{ borderBottom: "1px solid #f1f5f9", fontSize: "14px" }}>
                  <td style={{ padding: "16px 18px", fontWeight: "800", color: "#0E4D92" }}>{reg.id}</td>
                  <td style={{ padding: "16px 18px" }}>
                    <div style={{ fontWeight: "800", color: "#0f172a" }}>{reg.name}</div>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>Date: {reg.date}</div>
                  </td>
                  <td style={{ padding: "16px 18px", fontSize: "13px", color: "#475569" }}>
                    <div>📧 {reg.email}</div>
                    <div>📞 {reg.phone}</div>
                  </td>
                  <td style={{ padding: "16px 18px", fontWeight: "700", color: "#0f172a" }}>{reg.course}</td>
                  <td style={{ padding: "16px 18px" }}>
                    <span style={{ background: reg.status === "CONFIRMED" ? "#dcfce7" : "#fef9c3", color: reg.status === "CONFIRMED" ? "#166534" : "#854d0e", padding: "4px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: "800" }}>
                      {reg.status}
                    </span>
                  </td>
                  <td style={{ padding: "16px 18px" }}>
                    <button onClick={() => toggleStatus(reg.id)} style={{ padding: "6px 12px", background: reg.status === "CONFIRMED" ? "#f1f5f9" : "#0E4D92", color: reg.status === "CONFIRMED" ? "#475569" : "#ffffff", border: "none", borderRadius: "6px", fontSize: "12px", fontWeight: "700", cursor: "pointer" }}>
                      {reg.status === "CONFIRMED" ? "Mark Pending" : "Confirm Enrollment ✓"}
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
