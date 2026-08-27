"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function AccountRegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) { setError("Passwords do not match"); return; }
    setLoading(true); setError("");
    const res = await fetch("/api/account/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName: form.firstName, lastName: form.lastName, email: form.email, phone: form.phone, password: form.password }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error || "Registration failed"); return; }
    router.push("/account");
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "13px 16px", border: "1px solid #e2e8f0",
    borderRadius: "10px", fontSize: "14px", fontFamily: "inherit",
    outline: "none", background: "#f8fafc", color: "#0f172a", marginTop: "6px",
  };

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "linear-gradient(135deg,#f8fafc 0%,#eff6ff 100%)", paddingTop: "80px", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 16px 40px" }}>
        <div style={{ width: "100%", maxWidth: "460px" }}>
          <div style={{ background: "#fff", borderRadius: "16px", padding: "40px", boxShadow: "0 8px 32px rgba(0,0,0,0.08)", border: "1px solid #e2e8f0" }}>
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>🚀</div>
              <h1 style={{ fontSize: "24px", fontWeight: "900", color: "#0f172a", marginBottom: "4px" }}>Create Account</h1>
              <p style={{ color: "#64748b", fontSize: "14px" }}>Join Thermal Lexum — manage orders & warranties</p>
            </div>

            {error && (
              <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", padding: "10px 14px", borderRadius: "8px", fontSize: "13px", marginBottom: "16px" }}>{error}</div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: "700", color: "#475569" }}>First Name *</label>
                  <input name="firstName" value={form.firstName} onChange={handleChange} required style={inputStyle} placeholder="Rahul" />
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: "700", color: "#475569" }}>Last Name *</label>
                  <input name="lastName" value={form.lastName} onChange={handleChange} required style={inputStyle} placeholder="Sharma" />
                </div>
              </div>
              <div>
                <label style={{ fontSize: "12px", fontWeight: "700", color: "#475569" }}>Email *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required style={inputStyle} placeholder="rahul@email.com" />
              </div>
              <div>
                <label style={{ fontSize: "12px", fontWeight: "700", color: "#475569" }}>Mobile</label>
                <input name="phone" type="tel" value={form.phone} onChange={handleChange} style={inputStyle} placeholder="9876543210" />
              </div>
              <div>
                <label style={{ fontSize: "12px", fontWeight: "700", color: "#475569" }}>Password *</label>
                <input name="password" type="password" value={form.password} onChange={handleChange} required minLength={8} style={inputStyle} placeholder="Min. 8 characters" />
              </div>
              <div>
                <label style={{ fontSize: "12px", fontWeight: "700", color: "#475569" }}>Confirm Password *</label>
                <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} required style={inputStyle} placeholder="Repeat password" />
              </div>
              <button type="submit" disabled={loading} style={{ padding: "13px", background: "linear-gradient(135deg,#0284c7,#2563eb)", color: "#fff", border: "none", borderRadius: "10px", fontWeight: "700", fontSize: "15px", cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit", opacity: loading ? 0.7 : 1, marginTop: "4px" }}>
                {loading ? "Creating…" : "Create Account"}
              </button>
            </form>

            <p style={{ textAlign: "center", marginTop: "20px", fontSize: "13px", color: "#64748b" }}>
              Already have an account?{" "}
              <Link href="/account/login" style={{ color: "#0284c7", fontWeight: "700", textDecoration: "none" }}>Sign In</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
