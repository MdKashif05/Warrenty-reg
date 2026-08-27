"use client";
import { useState, useEffect } from "react";

interface Campaign {
  id: string;
  name: string;
  subject: string;
  segment: string;
  recipientCount: number;
  sentCount: number;
  status: string;
  sentAt?: string;
  createdAt: string;
}

const SEGMENTS = [
  { value: "all", label: "All Customers", desc: "Send to every registered customer" },
  { value: "active_warranty", label: "Active Warranty Holders", desc: "Customers with active warranties" },
  { value: "pending_warranty", label: "Pending Verification", desc: "Customers awaiting admin verification" },
  { value: "customers_with_orders", label: "Customers Who Ordered", desc: "Customers with at least one paid order" },
];

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  DRAFT: { bg: "#f1f5f9", color: "#475569" },
  SENDING: { bg: "#fef9c3", color: "#92400e" },
  SENT: { bg: "#dcfce7", color: "#15803d" },
  FAILED: { bg: "#fee2e2", color: "#b91c1c" },
};

export default function AdminCampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", subject: "", bodyHtml: "", segment: "all" });

  const fetchCampaigns = async () => {
    const res = await fetch("/api/admin/campaigns");
    const data = await res.json();
    setCampaigns(data.campaigns || []);
    setLoading(false);
  };

  useEffect(() => { fetchCampaigns(); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSave = async (send: boolean) => {
    setSubmitting(true);
    const res = await fetch("/api/admin/campaigns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, send }),
    });
    if (res.ok) {
      await fetchCampaigns();
      setShowForm(false);
      setForm({ name: "", subject: "", bodyHtml: "", segment: "all" });
    }
    setSubmitting(false);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "10px 12px", border: "1px solid #e2e8f0",
    borderRadius: "8px", fontSize: "14px", fontFamily: "inherit", outline: "none",
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "26px", fontWeight: "900", color: "#0f172a", letterSpacing: "-1px" }}>Email Campaigns</h1>
          <p style={{ color: "#64748b", fontSize: "14px" }}>Send bulk emails to customer segments</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{ padding: "10px 20px", background: "linear-gradient(135deg,#0284c7,#2563eb)", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "700", cursor: "pointer", fontFamily: "inherit", fontSize: "13px" }}>
          + New Campaign
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "24px", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a", marginBottom: "20px" }}>New Email Campaign</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: "700", color: "#475569", display: "block", marginBottom: "6px" }}>Campaign Name *</label>
                <input name="name" value={form.name} onChange={handleChange} required style={inputStyle} placeholder="Summer Warranty Reminder" />
              </div>
              <div>
                <label style={{ fontSize: "12px", fontWeight: "700", color: "#475569", display: "block", marginBottom: "6px" }}>Recipient Segment *</label>
                <select name="segment" value={form.segment} onChange={handleChange} style={inputStyle}>
                  {SEGMENTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
                <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>
                  {SEGMENTS.find((s) => s.value === form.segment)?.desc}
                </div>
              </div>
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "700", color: "#475569", display: "block", marginBottom: "6px" }}>Email Subject *</label>
              <input name="subject" value={form.subject} onChange={handleChange} required style={inputStyle} placeholder="Important: Register Your Thermal Lexum Warranty" />
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "700", color: "#475569", display: "block", marginBottom: "6px" }}>Email Body (HTML or Plain Text) *</label>
              <textarea name="bodyHtml" value={form.bodyHtml} onChange={handleChange} required style={{ ...inputStyle, height: "200px", resize: "vertical" }}
                placeholder="<p>Dear Customer,</p><p>Don't forget to register your Thermal Lexum product warranty...</p>" />
            </div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button onClick={() => handleSave(false)} disabled={submitting} style={{ padding: "10px 20px", background: "#f1f5f9", color: "#0f172a", border: "none", borderRadius: "8px", fontWeight: "700", cursor: "pointer", fontFamily: "inherit" }}>
                Save as Draft
              </button>
              <button onClick={() => handleSave(true)} disabled={submitting} style={{ padding: "10px 20px", background: "linear-gradient(135deg,#0284c7,#2563eb)", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "700", cursor: "pointer", fontFamily: "inherit" }}>
                {submitting ? "Sending…" : "Send Now 📧"}
              </button>
              <button onClick={() => setShowForm(false)} style={{ padding: "10px 20px", background: "transparent", color: "#64748b", border: "1px solid #e2e8f0", borderRadius: "8px", cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Campaigns Table */}
      <div className="brand-card" style={{ background: "#fff", border: "1px solid #e2e8f0", padding: "0", overflow: "hidden" }}>
        <div className="data-table-container">
          <table className="data-table" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>CAMPAIGN</th>
              <th>SEGMENT</th>
              <th>RECIPIENTS</th>
              <th>SENT</th>
              <th>STATUS</th>
              <th>DATE</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} style={{ textAlign: "center", color: "#94a3b8", padding: "40px" }}>Loading…</td></tr>
            ) : campaigns.length === 0 ? (
              <tr><td colSpan={6} style={{ textAlign: "center", color: "#94a3b8", padding: "40px" }}>No campaigns yet. Create your first campaign!</td></tr>
            ) : campaigns.map((c) => {
              const sc = STATUS_COLORS[c.status] || { bg: "#f1f5f9", color: "#475569" };
              return (
                <tr key={c.id}>
                  <td>
                    <div style={{ fontWeight: "700", color: "#0f172a" }}>{c.name}</div>
                    <div style={{ fontSize: "11px", color: "#94a3b8" }}>{c.subject}</div>
                  </td>
                  <td style={{ fontSize: "13px", color: "#475569" }}>
                    {SEGMENTS.find((s) => s.value === c.segment)?.label || c.segment}
                  </td>
                  <td style={{ fontWeight: "600" }}>{c.recipientCount.toLocaleString()}</td>
                  <td style={{ fontWeight: "600", color: "#16a34a" }}>{c.sentCount.toLocaleString()}</td>
                  <td>
                    <span style={{ background: sc.bg, color: sc.color, padding: "2px 8px", borderRadius: "12px", fontSize: "11px", fontWeight: "700" }}>
                      {c.status}
                    </span>
                  </td>
                  <td style={{ fontSize: "12px", color: "#64748b" }}>
                    {c.sentAt
                      ? new Date(c.sentAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                      : new Date(c.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
