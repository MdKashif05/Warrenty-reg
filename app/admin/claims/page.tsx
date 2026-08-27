"use client";
import { useState, useEffect } from "react";

interface Claim {
  id: string;
  claimId: string;
  claimStatus: string;
  issueType: string;
  description: string;
  resolution?: string;
  createdAt: string;
  registration: {
    registrationId: string;
    productVariant?: string;
    customer: { firstName: string; lastName: string; email: string; phone?: string };
  };
}

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  OPEN: { bg: "#fef9c3", color: "#92400e" },
  IN_REVIEW: { bg: "#dbeafe", color: "#1d4ed8" },
  APPROVED: { bg: "#dcfce7", color: "#15803d" },
  REJECTED: { bg: "#fee2e2", color: "#b91c1c" },
  RESOLVED: { bg: "#f1f5f9", color: "#475569" },
};

export default function AdminClaimsPage() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Claim | null>(null);
  const [resolution, setResolution] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetch("/api/admin/claims")
      .then((r) => r.json())
      .then((data) => { setClaims(data.claims || []); setLoading(false); });
  }, []);

  const updateClaim = async (claimId: string, claimStatus: string, resolutionText?: string) => {
    setUpdating(true);
    await fetch("/api/admin/claims", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ claimId, claimStatus, resolution: resolutionText }),
    });
    // Refresh
    const res = await fetch("/api/admin/claims");
    const data = await res.json();
    setClaims(data.claims || []);
    setSelected(null);
    setResolution("");
    setUpdating(false);
  };

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: "900", color: "#0f172a", letterSpacing: "-1px" }}>Warranty Claims</h1>
        <p style={{ color: "#64748b", fontSize: "14px" }}>{claims.filter((c) => c.claimStatus === "OPEN").length} open claims</p>
      </div>

      <div className={`claims-grid ${selected ? "has-selected" : ""}`} style={{ gap: "20px", alignItems: "start" }}>
        {/* Claims Table */}
        <div className="brand-card" style={{ background: "#fff", border: "1px solid #e2e8f0", padding: "0", overflow: "hidden" }}>
          <div className="data-table-container">
            <table className="data-table" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>CLAIM ID</th>
                <th>CUSTOMER</th>
                <th>PRODUCT</th>
                <th>ISSUE</th>
                <th>STATUS</th>
                <th>DATE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} style={{ textAlign: "center", color: "#94a3b8", padding: "40px" }}>Loading…</td></tr>
              ) : claims.length === 0 ? (
                <tr><td colSpan={7} style={{ textAlign: "center", color: "#94a3b8", padding: "40px" }}>No claims yet</td></tr>
              ) : claims.map((claim) => {
                const sc = STATUS_COLORS[claim.claimStatus] || { bg: "#f1f5f9", color: "#475569" };
                return (
                  <tr key={claim.id} style={{ background: selected?.id === claim.id ? "#eff6ff" : undefined }}>
                    <td style={{ fontFamily: "monospace", fontWeight: "700", color: "#0284c7", fontSize: "12px" }}>{claim.claimId}</td>
                    <td>
                      <div style={{ fontWeight: "600", color: "#0f172a", fontSize: "13px" }}>
                        {claim.registration.customer.firstName} {claim.registration.customer.lastName}
                      </div>
                      <div style={{ fontSize: "11px", color: "#94a3b8" }}>{claim.registration.customer.email}</div>
                    </td>
                    <td style={{ fontSize: "12px", color: "#475569" }}>{claim.registration.productVariant || "—"}</td>
                    <td style={{ fontSize: "12px", color: "#475569", maxWidth: "150px" }}>{claim.issueType}</td>
                    <td>
                      <span style={{ background: sc.bg, color: sc.color, padding: "2px 8px", borderRadius: "12px", fontSize: "11px", fontWeight: "700" }}>
                        {claim.claimStatus}
                      </span>
                    </td>
                    <td style={{ fontSize: "12px", color: "#64748b" }}>
                      {new Date(claim.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </td>
                    <td>
                      <button onClick={() => { setSelected(claim); setResolution(claim.resolution || ""); }} style={{ fontSize: "12px", color: "#0284c7", background: "none", border: "none", cursor: "pointer", fontWeight: "600", fontFamily: "inherit" }}>
                        Review →
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

        {/* Detail Panel */}
        {selected && (
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "24px", position: "sticky", top: "100px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h2 style={{ fontSize: "15px", fontWeight: "800", color: "#0f172a" }}>Claim Detail</h2>
              <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: "18px" }}>✕</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
              {[
                { l: "Claim ID", v: selected.claimId },
                { l: "Registration", v: selected.registration.registrationId },
                { l: "Customer", v: `${selected.registration.customer.firstName} ${selected.registration.customer.lastName}` },
                { l: "Email", v: selected.registration.customer.email },
                { l: "Product", v: selected.registration.productVariant || "—" },
                { l: "Issue Type", v: selected.issueType },
              ].map(({ l, v }) => (
                <div key={l} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  <span style={{ fontSize: "10px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase" }}>{l}</span>
                  <span style={{ fontSize: "13px", fontWeight: "600", color: "#0f172a" }}>{v}</span>
                </div>
              ))}
              <div>
                <span style={{ fontSize: "10px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>Description</span>
                <p style={{ fontSize: "13px", color: "#475569", lineHeight: "1.5", background: "#f8fafc", padding: "10px", borderRadius: "6px" }}>{selected.description}</p>
              </div>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "11px", fontWeight: "700", color: "#475569", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>Resolution Notes</label>
              <textarea value={resolution} onChange={(e) => setResolution(e.target.value)} style={{ width: "100%", padding: "10px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "13px", fontFamily: "inherit", height: "80px", resize: "vertical" }} placeholder="Add resolution notes…" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <button onClick={() => updateClaim(selected.claimId, "IN_REVIEW")} disabled={updating} style={{ padding: "10px", background: "#dbeafe", color: "#1d4ed8", border: "none", borderRadius: "8px", fontWeight: "700", cursor: "pointer", fontFamily: "inherit" }}>Mark In Review</button>
              <button onClick={() => updateClaim(selected.claimId, "APPROVED", resolution)} disabled={updating} style={{ padding: "10px", background: "#dcfce7", color: "#15803d", border: "none", borderRadius: "8px", fontWeight: "700", cursor: "pointer", fontFamily: "inherit" }}>Approve Claim ✓</button>
              <button onClick={() => updateClaim(selected.claimId, "RESOLVED", resolution)} disabled={updating} style={{ padding: "10px", background: "#f1f5f9", color: "#475569", border: "none", borderRadius: "8px", fontWeight: "700", cursor: "pointer", fontFamily: "inherit" }}>Mark Resolved</button>
              <button onClick={() => updateClaim(selected.claimId, "REJECTED", resolution)} disabled={updating} style={{ padding: "10px", background: "#fee2e2", color: "#b91c1c", border: "none", borderRadius: "8px", fontWeight: "700", cursor: "pointer", fontFamily: "inherit" }}>Reject Claim ✗</button>
            </div>
          </div>
        )}
      </div>
      <style>{`
        .claims-grid { display: grid; grid-template-columns: 1fr; }
        @media (min-width: 1024px) {
          .claims-grid.has-selected { grid-template-columns: 1fr 380px !important; }
        }
      `}</style>
    </div>
  );
}

