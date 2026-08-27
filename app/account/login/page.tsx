"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function AccountLoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"password" | "otp">("password");
  const [step, setStep] = useState<"form" | "otp">("form");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/account/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, mode: "password" }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error || "Login failed"); return; }
    router.push("/account");
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/account/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, mode: "otp" }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error || "Failed to send OTP"); return; }
    setStep("otp");
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/account/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp, mode: "otp" }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error || "Invalid OTP"); return; }
    router.push("/account");
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "13px 16px", border: "1px solid #e2e8f0",
    borderRadius: "10px", fontSize: "15px", fontFamily: "inherit",
    outline: "none", background: "#f8fafc", color: "#0f172a", marginTop: "6px",
  };

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "linear-gradient(135deg,#f8fafc 0%,#eff6ff 100%)", paddingTop: "80px", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 16px 40px" }}>
        <div style={{ width: "100%", maxWidth: "420px" }}>
          {/* Card */}
          <div style={{ background: "#fff", borderRadius: "16px", padding: "40px", boxShadow: "0 8px 32px rgba(0,0,0,0.08)", border: "1px solid #e2e8f0" }}>
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>👤</div>
              <h1 style={{ fontSize: "24px", fontWeight: "900", color: "#0f172a", marginBottom: "4px" }}>Welcome Back</h1>
              <p style={{ color: "#64748b", fontSize: "14px" }}>Sign in to your Thermal Lexum account</p>
            </div>

            {/* Mode Toggle */}
            <div style={{ display: "flex", background: "#f1f5f9", borderRadius: "10px", padding: "4px", marginBottom: "24px" }}>
              {[{ value: "password", label: "Password" }, { value: "otp", label: "OTP Login" }].map((m) => (
                <button
                  key={m.value}
                  onClick={() => { setMode(m.value as "password" | "otp"); setStep("form"); setError(""); }}
                  style={{ flex: 1, padding: "8px", border: "none", borderRadius: "8px", cursor: "pointer", fontFamily: "inherit", fontWeight: "700", fontSize: "13px", background: mode === m.value ? "#fff" : "transparent", color: mode === m.value ? "#0284c7" : "#64748b", boxShadow: mode === m.value ? "0 1px 4px rgba(0,0,0,0.1)" : "none", transition: "all 0.2s" }}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {error && (
              <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", padding: "10px 14px", borderRadius: "8px", fontSize: "13px", marginBottom: "16px" }}>
                {error}
              </div>
            )}

            {mode === "password" ? (
              <form onSubmit={handlePasswordLogin}>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ fontSize: "13px", fontWeight: "700", color: "#475569" }}>Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} placeholder="you@email.com" />
                </div>
                <div style={{ marginBottom: "24px" }}>
                  <label style={{ fontSize: "13px", fontWeight: "700", color: "#475569" }}>Password</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={inputStyle} placeholder="••••••••" />
                </div>
                <button type="submit" disabled={loading} style={{ width: "100%", padding: "13px", background: "linear-gradient(135deg,#0284c7,#2563eb)", color: "#fff", border: "none", borderRadius: "10px", fontWeight: "700", fontSize: "15px", cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit", opacity: loading ? 0.7 : 1 }}>
                  {loading ? "Signing in…" : "Sign In"}
                </button>
              </form>
            ) : step === "form" ? (
              <form onSubmit={handleSendOTP}>
                <div style={{ marginBottom: "24px" }}>
                  <label style={{ fontSize: "13px", fontWeight: "700", color: "#475569" }}>Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} placeholder="you@email.com" />
                </div>
                <button type="submit" disabled={loading} style={{ width: "100%", padding: "13px", background: "linear-gradient(135deg,#0284c7,#2563eb)", color: "#fff", border: "none", borderRadius: "10px", fontWeight: "700", fontSize: "15px", cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit", opacity: loading ? 0.7 : 1 }}>
                  {loading ? "Sending…" : "Send OTP"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP}>
                <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "8px", padding: "10px 14px", marginBottom: "16px", fontSize: "13px", color: "#166534" }}>
                  OTP sent to <strong>{email}</strong>
                </div>
                <div style={{ marginBottom: "24px" }}>
                  <label style={{ fontSize: "13px", fontWeight: "700", color: "#475569" }}>Enter OTP</label>
                  <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required maxLength={6} style={{ ...inputStyle, textAlign: "center", fontSize: "24px", letterSpacing: "8px", fontWeight: "700" }} placeholder="000000" />
                </div>
                <button type="submit" disabled={loading} style={{ width: "100%", padding: "13px", background: "linear-gradient(135deg,#0284c7,#2563eb)", color: "#fff", border: "none", borderRadius: "10px", fontWeight: "700", fontSize: "15px", cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit", opacity: loading ? 0.7 : 1 }}>
                  {loading ? "Verifying…" : "Verify & Login"}
                </button>
                <button type="button" onClick={() => setStep("form")} style={{ width: "100%", padding: "10px", marginTop: "8px", background: "transparent", border: "none", color: "#64748b", cursor: "pointer", fontSize: "13px", fontFamily: "inherit" }}>
                  ← Resend OTP
                </button>
              </form>
            )}

            <p style={{ textAlign: "center", marginTop: "20px", fontSize: "13px", color: "#64748b" }}>
              Don't have an account?{" "}
              <Link href="/account/register" style={{ color: "#0284c7", fontWeight: "700", textDecoration: "none" }}>Register</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
