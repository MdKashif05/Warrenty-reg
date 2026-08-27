"use client";
import { useState } from "react";
import type { WarrantyState } from "@/types/warranty";

interface Props {
  state: WarrantyState;
  updateState: (updates: Partial<WarrantyState>) => void;
}

export default function Step1Serial({ state, updateState }: Props) {
  const [serial, setSerial] = useState(state.serialNumber);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serial.trim()) { setError("Please enter your Order ID or Serial Number."); return; }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/warranty/verify-serial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serialNumber: serial.trim().toUpperCase() }),
      });
      const data = await res.json();

      if (data.success) {
        updateState({
          step: 2,
          serialNumber: serial.trim().toUpperCase(),
          verifiedProduct: data.data,
        });
      } else {
        setError(data.error || "Please enter a valid Order ID or Serial Number.");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="responsive-grid-2" style={{ alignItems: "start" }}>
      {/* Form */}
      <div className="brand-card" style={{ padding: "40px", background: "#ffffff", border: "1px solid #e2e8f0" }}>
        <div style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", marginBottom: "8px" }}>Enter Order ID / Serial Number</h2>
          <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.7" }}>
            Enter your Order ID from Amazon/retailer or the Serial Number on your packaging. Example: <span style={{ fontFamily: "JetBrains Mono, monospace", color: "#0284c7", fontWeight: "700" }}>ORD-2026-1001</span> or <span style={{ fontFamily: "JetBrains Mono, monospace", color: "#0284c7", fontWeight: "700" }}>TLX-XXXX-XXXX</span>
          </p>
        </div>

        <form onSubmit={handleVerify} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div className="form-group">
            <label className="form-label" htmlFor="serial-number-input">Order ID / Serial Number *</label>
            <input
              id="serial-number-input"
              type="text"
              className="input-field"
              placeholder="e.g. ORD-1001-2026 or TLX-XXXX-XXXX"
              value={serial}
              onChange={(e) => {
                setSerial(e.target.value.toUpperCase());
                setError("");
              }}
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "16px",
                letterSpacing: "2px",
                textAlign: "center",
                padding: "16px",
                background: "#ffffff",
                border: "1px solid #cbd5e1",
                color: "#0f172a",
                fontWeight: "700"
              }}
              autoFocus
              autoComplete="off"
              maxLength={50}
            />
          </div>

          {error && (
            <div
              style={{
                background: "#fef2f2",
                border: "1px solid #fca5a5",
                borderRadius: "8px",
                padding: "14px 16px",
                display: "flex",
                gap: "10px",
                alignItems: "flex-start",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" style={{ flexShrink: 0, marginTop: "2px" }}>
                <circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/>
              </svg>
              <span style={{ fontSize: "13px", color: "#dc2626", fontWeight: "600" }}>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{ justifyContent: "center", padding: "14px" }}
          >
            {loading ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "spin 1s linear infinite" }}>
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4"/>
                </svg>
                Processing...
              </>
            ) : (
              <>
                Continue Registration
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </>
            )}
          </button>
        </form>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>

      {/* Help */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div className="brand-card" style={{ padding: "28px", background: "#ffffff", border: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: "16px" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" style={{ flexShrink: 0, marginTop: "2px" }}>
              <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3m.08 4h.01"/>
            </svg>
            <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a" }}>Where to find your Order ID / Serial?</h3>
          </div>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              "Amazon / Ecommerce Order Confirmation Invoice",
              "Retail Purchase Receipt or Order ID",
              "Serial Number label on product packaging",
            ].map((tip) => (
              <li key={tip} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#0284c7", flexShrink: 0, marginTop: "6px" }} />
                <span style={{ fontSize: "14px", color: "#475569" }}>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="brand-card" style={{ padding: "28px", background: "#ffffff", border: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: "12px" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" style={{ flexShrink: 0 }}>
              <path d="M12 2l2.09 3.95L18 6.5l-2.64 3.31.53 4.19-3.89-1.85L8.11 14l.53-4.19L6 6.5l3.91-.55z"/>
            </svg>
            <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a" }}>Acceptable Formats</h3>
          </div>
          <div
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "16px",
              color: "#0284c7",
              letterSpacing: "2px",
              textAlign: "center",
              padding: "16px",
              background: "rgba(2, 132, 199, 0.08)",
              borderRadius: "8px",
              border: "1px solid rgba(2, 132, 199, 0.25)",
              fontWeight: "700"
            }}
          >
            ORD-XXXX-XXXX / TLX-XXXX-XXXX
          </div>
          <p style={{ fontSize: "12px", color: "#64748b", marginTop: "12px", textAlign: "center" }}>
            Order IDs and Serial Numbers are case-insensitive
          </p>
        </div>

        <div className="brand-card" style={{ padding: "24px", display: "flex", gap: "12px", alignItems: "center", background: "#ffffff", border: "1px solid #e2e8f0" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="1.5" style={{ flexShrink: 0 }}>
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
          </svg>
          <div>
            <p style={{ fontSize: "13px", fontWeight: "700", color: "#0f172a", marginBottom: "2px" }}>Need Help?</p>
            <a href="mailto:info@thermallexum.com" style={{ fontSize: "13px", color: "#0284c7", textDecoration: "none", fontWeight: "600" }}>info@thermallexum.com</a>
          </div>
        </div>
      </div>
    </div>
  );
}
