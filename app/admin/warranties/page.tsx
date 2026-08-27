"use client";
import { useState, useEffect, useCallback } from "react";

interface WarrantyReg {
  id: string;
  registrationId: string;
  warrantyStatus: string;
  purchasePlatform: string;
  platformOrderId?: string;
  linkedOrderId?: string;
  productVariant?: string;
  warrantyEndDate?: string;
  purchaseDate: string;
  createdAt: string;
  customer: { firstName: string; lastName: string; email: string; phone?: string };
}

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  ACTIVE: { bg: "#dcfce7", color: "#15803d" },
  PENDING: { bg: "#fef9c3", color: "#92400e" },
  EXPIRED: { bg: "#fee2e2", color: "#b91c1c" },
  REJECTED: { bg: "#fee2e2", color: "#b91c1c" },
  CLAIMED: { bg: "#dbeafe", color: "#1d4ed8" },
};

const PLATFORM_LABELS: Record<string, string> = {
  OWN_WEBSITE: "🌐 Website",
  AMAZON: "📦 Amazon",
  FLIPKART: "🛒 Flipkart",
  OTHER: "🏪 Other",
};

export default function AdminWarrantiesPage() {
  const [registrations, setRegistrations] = useState<WarrantyReg[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("PENDING");
  const [search, setSearch] = useState("");
  const [verifying, setVerifying] = useState<string | null>(null);
  const [selected, setSelected] = useState<WarrantyReg | null>(null);
  const [adminNotes, setAdminNotes] = useState("");

  const fetchRegistrations = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (statusFilter) params.set("status", statusFilter);
    if (search) params.set("search", search);
    const res = await fetch(`/api/admin/warranties?${params}`);
    const data = await res.json();
    setRegistrations(data.registrations || []);
    setLoading(false);
  }, [statusFilter, search]);

  useEffect(() => { fetchRegistrations(); }, [fetchRegistrations]);

  const handleVerify = async (registrationId: string, action: "ACTIVATE" | "REJECT") => {
    setVerifying(registrationId);
    await fetch("/api/admin/warranties/verify", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ registrationId, action, adminNotes }),
    });
    setSelected(null);
    setAdminNotes("");
    await fetchRegistrations();
    setVerifying(null);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "26px", fontWeight: "900", color: "#0f172a", letterSpacing: "-1px" }}>Warranty Registrations</h1>
          <p style={{ color: "#64748b", fontSize: "14px" }}>Approve, audit, and inspect customer warranty coverage</p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, reg ID…"
          style={{ flex: 1, minWidth: "200px", padding: "10px 14px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "14px", fontFamily: "inherit" }}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ padding: "10px 14px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "14px", fontFamily: "inherit" }}>
          <option value="">All Statuses</option>
          <option value="PENDING">⏳ Pending Verification</option>
          <option value="ACTIVE">✅ Active</option>
          <option value="EXPIRED">❌ Expired</option>
          <option value="REJECTED">🚫 Rejected</option>
          <option value="CLAIMED">📋 Claimed</option>
        </select>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 360px" : "1fr", gap: "20px", alignItems: "start" }}>
        {/* Table */}
        <div className="brand-card" style={{ background: "#fff", border: "1px solid #e2e8f0", padding: "0", overflow: "hidden" }}>
          <table className="data-table" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>REG ID</th>
                <th>CUSTOMER</th>
                <th>PRODUCT</th>
                <th>PLATFORM</th>
                <th>ORDER/INVOICE</th>
                <th>STATUS</th>
                <th>DATE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8} style={{ textAlign: "center", color: "#94a3b8", padding: "40px" }}>Loading…</td></tr>
              ) : registrations.length === 0 ? (
                <tr><td colSpan={8} style={{ textAlign: "center", color: "#94a3b8", padding: "40px" }}>No registrations found</td></tr>
              ) : registrations.map((reg) => {
                const sc = STATUS_COLORS[reg.warrantyStatus] || { bg: "#f1f5f9", color: "#475569" };
                return (
                  <tr key={reg.id} style={{ background: selected?.id === reg.id ? "#eff6ff" : undefined }}>
                    <td style={{ fontFamily: "monospace", fontWeight: "700", color: "#0284c7", fontSize: "11px" }}>{reg.registrationId}</td>
                    <td>
                      <div style={{ fontWeight: "600", fontSize: "13px" }}>{reg.customer.firstName} {reg.customer.lastName}</div>
                      <div style={{ fontSize: "11px", color: "#94a3b8" }}>{reg.customer.email}</div>
                    </td>
                    <td style={{ fontSize: "12px", color: "#475569" }}>{reg.productVariant || "—"}</td>
                    <td style={{ fontSize: "12px" }}>{PLATFORM_LABELS[reg.purchasePlatform] || reg.purchasePlatform}</td>
                    <td style={{ fontSize: "11px", fontFamily: "monospace", color: "#64748b" }}>{reg.platformOrderId || reg.linkedOrderId || "—"}</td>
                    <td>
                      <span style={{ background: sc.bg, color: sc.color, padding: "2px 8px", borderRadius: "12px", fontSize: "11px", fontWeight: "700" }}>{reg.warrantyStatus}</span>
                    </td>
                    <td style={{ fontSize: "12px", color: "#64748b" }}>
                      {new Date(reg.purchaseDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td>
                      <button onClick={() => { setSelected(reg); setAdminNotes(""); }} style={{ fontSize: "12px", color: "#0284c7", background: "none", border: "none", cursor: "pointer", fontWeight: "600", fontFamily: "inherit" }}>
                        Review →
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Detail / Verify Panel */}
        {selected && (
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "24px", position: "sticky", top: "100px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
              <h2 style={{ fontSize: "15px", fontWeight: "800", color: "#0f172a" }}>Warranty Review</h2>
              <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: "18px" }}>✕</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
              {[
                { l: "Registration ID", v: selected.registrationId },
                { l: "Customer", v: `${selected.customer.firstName} ${selected.customer.lastName}` },
                { l: "Email", v: selected.customer.email },
                { l: "Phone", v: selected.customer.phone || "—" },
                { l: "Product", v: selected.productVariant || "—" },
                { l: "Platform", v: PLATFORM_LABELS[selected.purchasePlatform] || selected.purchasePlatform },
                { l: "Platform Order ID", v: selected.platformOrderId || "—" },
                { l: "Purchase Date", v: new Date(selected.purchaseDate).toLocaleDateString("en-IN") },
              ].map(({ l, v }) => (
                <div key={l}>
                  <span style={{ fontSize: "10px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", display: "block" }}>{l}</span>
                  <span style={{ fontSize: "13px", fontWeight: "600", color: "#0f172a" }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "11px", fontWeight: "700", color: "#475569", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>Admin Notes</label>
              <textarea value={adminNotes} onChange={(e) => setAdminNotes(e.target.value)} style={{ width: "100%", padding: "10px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "13px", fontFamily: "inherit", height: "80px", resize: "vertical" }} placeholder="Optional notes…" />
            </div>
            {selected.warrantyStatus === "PENDING" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <button onClick={() => handleVerify(selected.registrationId, "ACTIVATE")} disabled={!!verifying} style={{ padding: "12px", background: "#dcfce7", color: "#15803d", border: "1px solid #bbf7d0", borderRadius: "8px", fontWeight: "700", cursor: "pointer", fontFamily: "inherit" }}>
                  ✅ Activate Warranty
                </button>
                <button onClick={() => handleVerify(selected.registrationId, "REJECT")} disabled={!!verifying} style={{ padding: "12px", background: "#fee2e2", color: "#b91c1c", border: "1px solid #fecaca", borderRadius: "8px", fontWeight: "700", cursor: "pointer", fontFamily: "inherit" }}>
                  🚫 Reject
                </button>
              </div>
            )}
            {selected.warrantyStatus !== "PENDING" && (
              <div style={{ fontSize: "13px", color: "#64748b", textAlign: "center", padding: "12px", background: "#f8fafc", borderRadius: "8px" }}>
                Status: <strong>{selected.warrantyStatus}</strong>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
