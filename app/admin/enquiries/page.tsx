"use client";
import { useState, useEffect } from "react";

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  message: string;
  status: string;
  date: string;
}

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState<string | null>(null);

  const fetchEnquiries = async () => {
    try {
      const res = await fetch("/api/enquiries");
      const data = await res.json();
      if (data && data.enquiries) {
        setEnquiries(data.enquiries);
      }
    } catch (err) {
      console.error("Failed to fetch enquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const toggleResponded = async (id: string) => {
    try {
      const res = await fetch("/api/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Status updated to ${data.status} ✓`);
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: data.status } : e))
        );
      }
    } catch (err) {
      console.error("Error toggling enquiry status:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(`Are you sure you want to delete enquiry ${id}?`)) return;
    try {
      const res = await fetch(`/api/enquiries?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        showToast("Enquiry deleted from MongoDB 🗑️");
        setEnquiries((prev) => prev.filter((e) => e.id !== id));
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const filtered = enquiries.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.message.toLowerCase().includes(search.toLowerCase()) ||
      (e.course && e.course.toLowerCase().includes(search.toLowerCase())) ||
      e.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Toast */}
      {notification && (
        <div
          style={{
            position: "fixed",
            top: "24px",
            right: "24px",
            background: "#16a34a",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: "8px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            zIndex: 9999,
            fontWeight: "700",
            fontSize: "14px",
          }}
        >
          {notification}
        </div>
      )}

      {/* Header */}
      <div style={{ marginBottom: "28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <h1 style={{ fontSize: "28px", fontWeight: "900", color: "#0f172a" }}>
              Contact & Academic Enquiries
            </h1>
            <span
              style={{
                background: "#dcfce7",
                color: "#166534",
                padding: "3px 10px",
                borderRadius: "12px",
                fontSize: "11px",
                fontWeight: "800",
              }}
            >
              🍃 MongoDB Atlas Live
            </span>
          </div>
          <p style={{ fontSize: "14px", color: "#64748b", marginTop: "4px" }}>
            View and respond to prospective customer messages & B2B requests ({enquiries.length} total)
          </p>
        </div>

        <button
          onClick={fetchEnquiries}
          disabled={loading}
          className="btn-secondary"
          style={{ padding: "10px 18px", fontSize: "13px" }}
        >
          {loading ? "Refreshing..." : "🔄 Refresh Messages"}
        </button>
      </div>

      {/* Search */}
      <div style={{ marginBottom: "20px" }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by sender, email, subject, or message content..."
          style={{
            width: "100%",
            maxWidth: "450px",
            padding: "12px",
            border: "1px solid #cbd5e1",
            borderRadius: "8px",
            fontSize: "14px",
            outline: "none",
            background: "#ffffff",
          }}
        />
      </div>

      {/* Table */}
      <div className="card-nesa" style={{ overflow: "hidden", padding: 0 }}>
        <div className="data-table-container">
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", minWidth: "750px" }}>
            <thead>
              <tr
                style={{
                  background: "#f8fafc",
                  borderBottom: "1px solid #e2e8f0",
                  fontSize: "12px",
                  color: "#64748b",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                <th style={{ padding: "14px 18px" }}>ENQUIRY ID</th>
                <th style={{ padding: "14px 18px" }}>SENDER</th>
                <th style={{ padding: "14px 18px" }}>SUBJECT / TOPIC</th>
                <th style={{ padding: "14px 18px" }}>MESSAGE</th>
                <th style={{ padding: "14px 18px" }}>STATUS</th>
                <th style={{ padding: "14px 18px" }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                    🔄 Loading enquiries from MongoDB Atlas...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                    No messages found.
                  </td>
                </tr>
              ) : (
                filtered.map((enq) => (
                  <tr key={enq.id} style={{ borderBottom: "1px solid #f1f5f9", fontSize: "14px" }}>
                    <td style={{ padding: "16px 18px", fontWeight: "800", color: "#0E4D92" }}>{enq.id}</td>
                    <td style={{ padding: "16px 18px" }}>
                      <div style={{ fontWeight: "800", color: "#0f172a" }}>{enq.name}</div>
                      <div style={{ fontSize: "12px", color: "#64748b" }}>📞 {enq.phone || "—"}</div>
                      <div style={{ fontSize: "12px", color: "#0E4D92" }}>✉️ {enq.email}</div>
                    </td>
                    <td style={{ padding: "16px 18px", fontWeight: "700", color: "#0f172a" }}>{enq.course || "General"}</td>
                    <td style={{ padding: "16px 18px", color: "#475569", maxWidth: "320px", fontSize: "13px", lineHeight: "1.5" }}>
                      {enq.message}
                    </td>
                    <td style={{ padding: "16px 18px" }}>
                      <span
                        style={{
                          background: enq.status === "NEW" ? "#fee2e2" : "#dcfce7",
                          color: enq.status === "NEW" ? "#991b1b" : "#166534",
                          padding: "4px 10px",
                          borderRadius: "12px",
                          fontSize: "11px",
                          fontWeight: "800",
                        }}
                      >
                        {enq.status}
                      </span>
                    </td>
                    <td style={{ padding: "16px 18px" }}>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          onClick={() => toggleResponded(enq.id)}
                          style={{
                            padding: "6px 12px",
                            background: enq.status === "NEW" ? "#0E4D92" : "#f1f5f9",
                            color: enq.status === "NEW" ? "#ffffff" : "#475569",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: "700",
                            cursor: "pointer",
                          }}
                        >
                          {enq.status === "NEW" ? "Mark Responded ✓" : "Mark New"}
                        </button>
                        <button
                          onClick={() => handleDelete(enq.id)}
                          style={{
                            padding: "6px 10px",
                            background: "#fee2e2",
                            color: "#b91c1c",
                            border: "1px solid #fecaca",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: "700",
                            cursor: "pointer",
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
