"use client";
import { useState, useEffect } from "react";

interface Registration {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  status: string;
  date: string;
}

export default function AdminRegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: "LX-TIM Pro (Thermal Paste)",
  });

  const fetchRegistrations = async () => {
    try {
      const res = await fetch("/api/registrations");
      const data = await res.json();
      if (data && data.registrations) {
        setRegistrations(data.registrations);
      }
    } catch (err) {
      console.error("Failed to fetch registrations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const toggleStatus = async (id: string) => {
    try {
      const res = await fetch("/api/registrations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Status updated to ${data.status} ✓`);
        setRegistrations((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status: data.status } : r))
        );
      }
    } catch (err) {
      console.error("Error toggling status:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(`Are you sure you want to delete registration ${id}?`)) return;
    try {
      const res = await fetch(`/api/registrations?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        showToast("Registration deleted from MongoDB 🗑️");
        setRegistrations((prev) => prev.filter((r) => r.id !== id));
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        showToast("Registration added to MongoDB! 🎉");
        setShowAddModal(false);
        setForm({ name: "", email: "", phone: "", course: "LX-TIM Pro (Thermal Paste)" });
        await fetchRegistrations();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const filtered = registrations.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase()) ||
      r.course.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase())
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
      <div
        style={{
          marginBottom: "28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <h1 style={{ fontSize: "28px", fontWeight: "900", color: "#0f172a" }}>
              Student & Warranty Registrations
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
            Manage online student batch enrollments & warranty records ({registrations.length} total)
          </p>
        </div>

        <button onClick={() => setShowAddModal(true)} className="btn-primary" style={{ padding: "12px 20px" }}>
          + New Registration 🎓
        </button>
      </div>

      {/* Search & Actions */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "12px", alignItems: "center" }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by student name, email, registration ID or course..."
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
        <button
          onClick={fetchRegistrations}
          disabled={loading}
          className="btn-secondary"
          style={{ padding: "12px 16px", fontSize: "13px" }}
        >
          {loading ? "Refreshing..." : "🔄 Refresh"}
        </button>
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
                <th style={{ padding: "14px 18px" }}>REG ID</th>
                <th style={{ padding: "14px 18px" }}>STUDENT / CUSTOMER</th>
                <th style={{ padding: "14px 18px" }}>CONTACT INFO</th>
                <th style={{ padding: "14px 18px" }}>COURSE / ITEM</th>
                <th style={{ padding: "14px 18px" }}>STATUS</th>
                <th style={{ padding: "14px 18px" }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                    🔄 Loading registrations from MongoDB Atlas...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                    No registrations found.
                  </td>
                </tr>
              ) : (
                filtered.map((reg) => (
                  <tr key={reg.id} style={{ borderBottom: "1px solid #f1f5f9", fontSize: "14px" }}>
                    <td style={{ padding: "16px 18px", fontWeight: "800", color: "#0E4D92" }}>{reg.id}</td>
                    <td style={{ padding: "16px 18px" }}>
                      <div style={{ fontWeight: "800", color: "#0f172a" }}>{reg.name}</div>
                      <div style={{ fontSize: "12px", color: "#64748b" }}>Date: {reg.date}</div>
                    </td>
                    <td style={{ padding: "16px 18px", fontSize: "13px", color: "#475569" }}>
                      <div>📧 {reg.email}</div>
                      <div>📞 {reg.phone || "—"}</div>
                    </td>
                    <td style={{ padding: "16px 18px", fontWeight: "700", color: "#0f172a" }}>{reg.course}</td>
                    <td style={{ padding: "16px 18px" }}>
                      <span
                        style={{
                          background: reg.status === "CONFIRMED" ? "#dcfce7" : "#fef9c3",
                          color: reg.status === "CONFIRMED" ? "#166534" : "#854d0e",
                          padding: "4px 10px",
                          borderRadius: "12px",
                          fontSize: "11px",
                          fontWeight: "800",
                        }}
                      >
                        {reg.status}
                      </span>
                    </td>
                    <td style={{ padding: "16px 18px" }}>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          onClick={() => toggleStatus(reg.id)}
                          style={{
                            padding: "6px 12px",
                            background: reg.status === "CONFIRMED" ? "#f1f5f9" : "#0E4D92",
                            color: reg.status === "CONFIRMED" ? "#475569" : "#ffffff",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: "700",
                            cursor: "pointer",
                          }}
                        >
                          {reg.status === "CONFIRMED" ? "Mark Pending" : "Confirm ✓"}
                        </button>
                        <button
                          onClick={() => handleDelete(reg.id)}
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

      {/* Add Modal */}
      {showAddModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div className="card-nesa" style={{ maxWidth: "500px", width: "100%", padding: "32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: "900", color: "#0f172a" }}>New Registration</h2>
              <button
                onClick={() => setShowAddModal(false)}
                style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#64748b" }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: "700", color: "#475569", display: "block", marginBottom: "4px" }}>
                  Student / Customer Name *
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Ramesh Kumar"
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: "700", color: "#475569", display: "block", marginBottom: "4px" }}>
                  Email Address *
                </label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="ramesh@example.com"
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: "700", color: "#475569", display: "block", marginBottom: "4px" }}>
                  Phone Number
                </label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: "700", color: "#475569", display: "block", marginBottom: "4px" }}>
                  Course / Product Enrolled *
                </label>
                <input
                  required
                  value={form.course}
                  onChange={(e) => setForm({ ...form, course: e.target.value })}
                  placeholder="LX-TIM Pro (Thermal Paste)"
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }}
                />
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "12px" }}>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary" style={{ padding: "10px 20px" }}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={saving} style={{ padding: "10px 24px" }}>
                  {saving ? "Saving..." : "Save to MongoDB 💾"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
