"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

function WarrantyClaimForm() {
  const searchParams = useSearchParams();
  const [registrationId, setRegistrationId] = useState(searchParams.get("regId") || "");
  const [registration, setRegistration] = useState<{ warrantyStatus: string; warrantyEndDate?: string; productVariant?: string } | null>(null);
  const [lookupError, setLookupError] = useState("");
  const [looking, setLooking] = useState(false);
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState("");

  // Auto-lookup if regId in URL
  useEffect(() => {
    if (searchParams.get("regId")) {
      handleLookup();
    }
  }, []);

  const handleLookup = async () => {
    if (!registrationId.trim()) return;
    setLooking(true); setLookupError("");
    const res = await fetch(`/api/warranty/claim?registrationId=${registrationId.trim()}`);
    const data = await res.json();
    setLooking(false);
    if (!res.ok) { setLookupError(data.error || "Not found"); setRegistration(null); return; }
    setRegistration(data.registration);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true); setError("");
    const res = await fetch("/api/warranty/claim", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ registrationId: registrationId.trim(), issueType, description }),
    });
    const data = await res.json();
    setSubmitting(false);
    if (!res.ok) { setError(data.error || "Failed to submit"); return; }
    setSuccess(data.claimId);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "12px 14px", border: "1px solid #e2e8f0",
    borderRadius: "8px", fontSize: "14px", fontFamily: "inherit",
    outline: "none", background: "#fff", color: "#0f172a",
  };

  const ISSUE_TYPES = [
    "Product defect / not working",
    "Seal broken / tampered",
    "Wrong product delivered",
    "Leakage",
    "Colour / consistency issue",
    "Other",
  ];

  if (success) {
    return (
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "40px", textAlign: "center" }}>
        <div style={{ fontSize: "48px", marginBottom: "12px" }}>✅</div>
        <h2 style={{ fontSize: "22px", fontWeight: "900", color: "#0f172a", marginBottom: "8px" }}>Claim Submitted!</h2>
        <p style={{ color: "#64748b", marginBottom: "20px" }}>Your claim ID is:</p>
        <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "8px", padding: "14px", marginBottom: "24px" }}>
          <span style={{ fontFamily: "monospace", fontWeight: "900", color: "#0284c7", fontSize: "22px", letterSpacing: "2px" }}>{success}</span>
        </div>
        <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "20px" }}>A confirmation email has been sent. Our team will review and respond within 24–48 hours.</p>
        <Link href="/account/warranties" style={{ display: "inline-block", background: "linear-gradient(135deg,#0284c7,#2563eb)", color: "#fff", padding: "10px 24px", borderRadius: "8px", textDecoration: "none", fontWeight: "700" }}>View My Warranties</Link>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Step 1: Enter Registration ID */}
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "24px" }}>
        <h2 style={{ fontSize: "15px", fontWeight: "800", color: "#0f172a", marginBottom: "16px" }}>Step 1: Find Your Warranty</h2>
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            value={registrationId}
            onChange={(e) => setRegistrationId(e.target.value)}
            placeholder="Enter Warranty Registration ID (e.g. TLW-2026-1234)"
            style={{ ...inputStyle, flex: 1 }}
          />
          <button onClick={handleLookup} disabled={looking} style={{ padding: "12px 20px", background: "linear-gradient(135deg,#0284c7,#2563eb)", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "700", cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>
            {looking ? "…" : "Find"}
          </button>
        </div>
        {lookupError && <div style={{ color: "#b91c1c", fontSize: "13px", marginTop: "8px" }}>{lookupError}</div>}
      </div>

      {/* Warranty Found */}
      {registration && (
        <>
          <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "12px", padding: "16px" }}>
            <div style={{ fontWeight: "700", color: "#166534", marginBottom: "4px" }}>✅ Warranty Found</div>
            <div style={{ fontSize: "13px", color: "#475569" }}>
              Product: <strong>{registration.productVariant || "Your Product"}</strong> ·
              Status: <strong>{registration.warrantyStatus}</strong> ·
              {registration.warrantyEndDate && ` Expires: ${new Date(registration.warrantyEndDate).toLocaleDateString("en-IN")}`}
            </div>
          </div>

          {registration.warrantyStatus !== "ACTIVE" ? (
            <div style={{ background: "#fef9c3", border: "1px solid #fde68a", borderRadius: "12px", padding: "16px", color: "#92400e", fontSize: "14px" }}>
              ⚠️ Claims can only be submitted for <strong>ACTIVE</strong> warranties. Your warranty is currently <strong>{registration.warrantyStatus}</strong>.
            </div>
          ) : (
            <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "24px" }}>
              <h2 style={{ fontSize: "15px", fontWeight: "800", color: "#0f172a", marginBottom: "16px" }}>Step 2: Describe the Issue</h2>
              {error && <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", padding: "10px 14px", borderRadius: "8px", fontSize: "13px", marginBottom: "16px" }}>{error}</div>}
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "6px", display: "block" }}>Issue Type *</label>
                  <select value={issueType} onChange={(e) => setIssueType(e.target.value)} required style={inputStyle}>
                    <option value="">Select issue type</option>
                    {ISSUE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "6px", display: "block" }}>Detailed Description *</label>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} required style={{ ...inputStyle, height: "120px", resize: "vertical" }} placeholder="Please describe the issue in detail — when it started, what you observe, etc." />
                </div>
                <button type="submit" disabled={submitting} style={{ padding: "13px", background: "linear-gradient(135deg,#0284c7,#2563eb)", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "700", fontSize: "15px", cursor: submitting ? "not-allowed" : "pointer", fontFamily: "inherit", opacity: submitting ? 0.7 : 1 }}>
                  {submitting ? "Submitting…" : "Submit Warranty Claim"}
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function WarrantyClaimPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#f8fafc", paddingTop: "80px" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "40px 16px" }}>
          <div style={{ marginBottom: "28px" }}>
            <div style={{ fontSize: "11px", color: "#0284c7", letterSpacing: "3px", fontWeight: "700", textTransform: "uppercase", marginBottom: "8px" }}>WARRANTY</div>
            <h1 style={{ fontSize: "clamp(26px,4vw,38px)", fontWeight: "900", letterSpacing: "-1px", color: "#0f172a", marginBottom: "4px" }}>Submit a Claim</h1>
            <p style={{ color: "#64748b", fontSize: "14px" }}>Enter your warranty registration ID to submit a claim</p>
          </div>
          <Suspense fallback={<div style={{ color: "#64748b" }}>Loading…</div>}>
            <WarrantyClaimForm />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
