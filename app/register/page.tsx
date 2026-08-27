"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", product: "TL-X1 Ultra Thermal Paste (4g) — ₹499" });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <>
      <Navbar />
      <main style={{ background: "#f8fafc", paddingTop: "100px", minHeight: "100vh" }}>
        <div style={{ maxWidth: "600px", margin: "40px auto", padding: "0 20px" }}>
          <div className="card-nesa" style={{ padding: "40px" }}>
            {success ? (
              <div style={{ textAlign: "center", padding: "30px 0" }}>
                <div style={{ fontSize: "64px", marginBottom: "16px" }}>🎉</div>
                <h1 style={{ fontSize: "28px", fontWeight: "900", color: "#0E4D92", marginBottom: "12px" }}>
                  Registration Successful!
                </h1>
                <p style={{ fontSize: "16px", color: "#475569", lineHeight: "1.7", marginBottom: "28px" }}>
                  Welcome to Thermal Lexum, <strong>{form.name}</strong>! Your product warranty for <strong>{form.product}</strong> has been registered. Our team will email your official warranty certificate shortly.
                </p>
                <Link href="/products" className="btn-primary">
                  Browse More Products →
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ textAlign: "center", marginBottom: "10px" }}>
                  <span className="section-subtitle" style={{ marginBottom: "8px" }}>PRODUCT WARRANTY</span>
                  <h1 style={{ fontSize: "28px", fontWeight: "900", color: "#0f172a" }}>
                    Register Your Thermal Lexum Product
                  </h1>
                  <p style={{ fontSize: "14px", color: "#64748b", marginTop: "4px" }}>
                    Activate your 3-year official replacement warranty in 60 seconds!
                  </p>
                </div>

                <div>
                  <label style={{ fontSize: "13px", fontWeight: "700", color: "#475569", display: "block", marginBottom: "6px" }}>Full Name *</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Rahul Sharma" style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
                </div>

                <div>
                  <label style={{ fontSize: "13px", fontWeight: "700", color: "#475569", display: "block", marginBottom: "6px" }}>Email Address *</label>
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="rahul@example.com" style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
                </div>

                <div>
                  <label style={{ fontSize: "13px", fontWeight: "700", color: "#475569", display: "block", marginBottom: "6px" }}>Mobile Number *</label>
                  <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 9876543210" style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
                </div>

                <div>
                  <label style={{ fontSize: "13px", fontWeight: "700", color: "#475569", display: "block", marginBottom: "6px" }}>Select Product *</label>
                  <select value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", outline: "none", background: "#fff" }}>
                    <option value="TL-X1 Ultra Thermal Paste (4g) — ₹499">TL-X1 Ultra Thermal Paste (4g) — ₹499</option>
                    <option value="TL-X1 Ultra Thermal Paste (8g) — ₹899">TL-X1 Ultra Thermal Paste (8g) — ₹899</option>
                    <option value="TL-PRO Extreme Thermal Paste — ₹1,299">TL-PRO Extreme Thermal Paste — ₹1,299</option>
                    <option value="Thermal Pad Matrix 12.8 W/mK — ₹399">Thermal Pad Matrix 12.8 W/mK — ₹399</option>
                    <option value="Liquid Metal Extreme — ₹1,499">Liquid Metal Extreme — ₹1,499</option>
                  </select>
                </div>

                <button type="submit" className="btn-primary" style={{ padding: "14px", fontSize: "16px", marginTop: "10px" }}>
                  Register Warranty Now 🛡️
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
