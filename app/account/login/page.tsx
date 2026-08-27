"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function CustomerLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoggedIn(true);
  };

  return (
    <>
      <Navbar />
      <main style={{ background: "#f8fafc", paddingTop: "100px", minHeight: "100vh" }}>
        <div style={{ maxWidth: "480px", margin: "60px auto", padding: "0 20px" }}>
          <div className="card-nesa" style={{ padding: "40px" }}>
            {loggedIn ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ fontSize: "54px", marginBottom: "16px" }}>🔥</div>
                <h1 style={{ fontSize: "24px", fontWeight: "900", color: "#0E4D92", marginBottom: "12px" }}>
                  Welcome Back!
                </h1>
                <p style={{ color: "#475569", fontSize: "14px", marginBottom: "24px" }}>
                  You are logged in as <strong>{email}</strong>. Access your warranty registrations and order history below.
                </p>
                <Link href="/warranty/register" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                  View My Warranties →
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ textAlign: "center" }}>
                  <span className="section-subtitle" style={{ marginBottom: "8px" }}>CUSTOMER PORTAL</span>
                  <h1 style={{ fontSize: "26px", fontWeight: "900", color: "#0f172a" }}>
                    Thermal Lexum Account Login
                  </h1>
                  <p style={{ fontSize: "13px", color: "#64748b", marginTop: "6px" }}>
                    Access your warranty certificates & order history
                  </p>
                </div>

                <div>
                  <label style={{ fontSize: "13px", fontWeight: "700", color: "#475569", display: "block", marginBottom: "6px" }}>Registered Email *</label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="customer@example.com" style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
                </div>

                <div>
                  <label style={{ fontSize: "13px", fontWeight: "700", color: "#475569", display: "block", marginBottom: "6px" }}>Password *</label>
                  <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
                </div>

                <button type="submit" className="btn-primary" style={{ padding: "14px", fontSize: "15px" }}>
                  Login to Account 🔑
                </button>

                <div style={{ textAlign: "center", fontSize: "13px", color: "#64748b", marginTop: "10px" }}>
                  New customer? <Link href="/register" style={{ color: "#0E4D92", fontWeight: "700" }}>Register Your Product →</Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
