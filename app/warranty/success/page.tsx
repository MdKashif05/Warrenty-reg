"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Suspense } from "react";

function SuccessContent() {
  const params = useSearchParams();
  const registrationId = params.get("id");

  return (
    <main style={{ minHeight: "100vh", background: "#ffffff", paddingTop: "72px" }}>
      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
        {/* Success icon */}
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "#dcfce7",
            border: "2px solid #86efac",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 32px",
            boxShadow: "0 10px 30px rgba(16, 185, 129, 0.2)",
          }}
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
            <path d="M9 12l2 2 4-4"/>
            <circle cx="12" cy="12" r="10"/>
          </svg>
        </div>

        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#dcfce7", border: "1px solid #86efac", borderRadius: "100px", padding: "6px 16px", marginBottom: "24px" }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#16a34a" }} />
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", letterSpacing: "2px", color: "#15803d", fontWeight: "700" }}>WARRANTY ACTIVATED</span>
        </div>

        <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: "900", letterSpacing: "-1.5px", color: "#0f172a", marginBottom: "16px" }}>
          Registration Successful!
        </h1>
        <p style={{ fontSize: "16px", color: "#475569", lineHeight: "1.7", marginBottom: "40px" }}>
          Your Thermal Lexum product warranty has been successfully registered. A confirmation email with your warranty certificate has been sent to your email address.
        </p>

        {registrationId && (
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "16px",
              padding: "32px",
              marginBottom: "40px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.04)"
            }}
          >
            <div className="thermal-bar" style={{ marginBottom: "28px" }} />
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", letterSpacing: "3px", color: "#64748b", marginBottom: "12px", fontWeight: "700" }}>YOUR REGISTRATION ID</div>
            <div
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "clamp(18px, 3vw, 26px)",
                fontWeight: "800",
                color: "#0284c7",
                letterSpacing: "3px",
                background: "rgba(2, 132, 199, 0.08)",
                border: "1px solid rgba(2, 132, 199, 0.25)",
                borderRadius: "10px",
                padding: "20px",
                marginBottom: "16px",
              }}
            >
              {registrationId}
            </div>
            <p style={{ fontSize: "13px", color: "#64748b" }}>
              Save this Registration ID. You will need it for warranty claims and support requests.
            </p>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {registrationId && (
            <Link href={`/warranty/certificate/${registrationId}`} className="btn-primary" style={{ justifyContent: "center", padding: "16px" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              View Warranty Certificate
            </Link>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <Link href="/warranty/lookup" className="btn-secondary" style={{ justifyContent: "center" }}>
              Check Warranty Status
            </Link>
            <Link href="/" className="btn-ghost" style={{ justifyContent: "center" }}>
              Return to Home
            </Link>
          </div>
        </div>

        <div
          style={{
            marginTop: "48px",
            padding: "24px",
            background: "rgba(2, 132, 199, 0.04)",
            border: "1px solid rgba(2, 132, 199, 0.15)",
            borderRadius: "12px",
          }}
        >
          <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.7" }}>
            Need help? Contact us at{" "}
            <a href="mailto:info@thermallexum.com" style={{ color: "#0284c7", textDecoration: "none", fontWeight: "700" }}>
              info@thermallexum.com
            </a>{" "}
            or call{" "}
            <a href="tel:+918864817544" style={{ color: "#0284c7", textDecoration: "none", fontWeight: "700" }}>
              +91 8864-817544
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div style={{ minHeight: "100vh", background: "#ffffff", paddingTop: "72px", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b" }}>Loading...</div>}>
        <SuccessContent />
      </Suspense>
      <Footer />
    </>
  );
}
