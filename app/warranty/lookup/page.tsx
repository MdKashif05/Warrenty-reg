"use client";
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function WarrantyLookupPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<any>(null);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) { setError("Please enter a Serial Number or Registration ID."); return; }
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(`/api/warranty/lookup?query=${encodeURIComponent(query.trim())}`);
      const data = await res.json();
      if (data.success) {
        setResult(data.data);
      } else {
        setError(data.error || "No active warranty record found.");
      }
    } catch {
      setError("Network connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#ffffff", paddingTop: "72px" }}>
        <section className="page-hero bg-grid" style={{ background: "radial-gradient(circle at 50% 0%, rgba(2, 132, 199, 0.08) 0%, #ffffff 80%)", borderBottom: "1px solid #e2e8f0" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
            <div className="section-label" style={{ marginBottom: "16px" }}>VERIFICATION PORTAL</div>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: "800", letterSpacing: "-1.5px", color: "#0f172a", marginBottom: "16px" }}>
              Verify Warranty Status
            </h1>
            <p style={{ fontSize: "15px", color: "#475569", maxWidth: "540px", margin: "0 auto" }}>
              Enter your Serial Number or Registration ID to inspect product authenticity, activation date, and remaining warranty coverage.
            </p>
          </div>
          <div className="thermal-bar" style={{ marginTop: "48px" }} />
        </section>

        <section style={{ padding: "64px 24px", background: "#ffffff" }}>
          <div style={{ maxWidth: "640px", margin: "0 auto" }}>
            <div className="brand-card" style={{ padding: "36px", marginBottom: "40px", background: "#ffffff", border: "1px solid #e2e8f0" }}>
              <form onSubmit={handleLookup} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="lookup-input">Serial Number or Registration ID *</label>
                  <input
                    id="lookup-input"
                    type="text"
                    className="input-field"
                    placeholder="e.g. TLX-1001-2026 or TLW-..."
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setError(""); }}
                    style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "16px", padding: "14px", textTransform: "uppercase", fontWeight: "700" }}
                  />
                </div>
                {error && (
                  <div style={{ padding: "12px", background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "8px", color: "#dc2626", fontSize: "13px", fontWeight: "600" }}>
                    ⚠️ {error}
                  </div>
                )}
                <button type="submit" className="btn-primary" disabled={loading} style={{ justifyContent: "center" }}>
                  {loading ? "Searching Records..." : "Check Warranty Status"}
                </button>
              </form>
            </div>

            {/* Results Card */}
            {result && (
              <div className="brand-card" style={{ padding: "36px", border: "2px solid #0284c7", background: "#ffffff" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                  <div>
                    <span className="badge badge-active">✓ WARRANTY {result.status}</span>
                    <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", marginTop: "8px" }}>{result.productName}</h2>
                  </div>
                  <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "13px", color: "#0284c7", fontWeight: "700" }}>
                    {result.registrationId}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                    <span style={{ color: "#64748b" }}>Serial Number</span>
                    <span style={{ color: "#0f172a", fontFamily: "JetBrains Mono, monospace", fontWeight: "700" }}>{result.serialNumber}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                    <span style={{ color: "#64748b" }}>Registered Owner</span>
                    <span style={{ color: "#0f172a", fontWeight: "700" }}>{result.customerName}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                    <span style={{ color: "#64748b" }}>Purchase Date</span>
                    <span style={{ color: "#0f172a", fontWeight: "600" }}>{result.purchaseDate}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                    <span style={{ color: "#64748b" }}>Warranty Expiry</span>
                    <span style={{ color: "#0284c7", fontWeight: "700" }}>{result.expiryDate}</span>
                  </div>
                </div>

                <Link href={`/warranty/certificate/${result.registrationId}`} className="btn-secondary" style={{ width: "100%", justifyContent: "center" }}>
                  View Full Certificate
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
