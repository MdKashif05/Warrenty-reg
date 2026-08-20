"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate login for dev
    setTimeout(() => {
      if (email === "admin@thermallexum.com" && password === "Admin@123456") {
        router.push("/admin");
      } else {
        setError("Invalid admin credentials. Use admin@thermallexum.com / Admin@123456");
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div className="brand-card" style={{ padding: "40px", maxWidth: "420px", width: "100%", background: "#ffffff", border: "1px solid #e2e8f0" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "20px", fontWeight: "900", color: "#0f172a", letterSpacing: "2px", marginBottom: "4px" }}>
            THERMAL <span style={{ color: "#0284c7" }}>LEXUM</span>
          </div>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", color: "#0284c7", letterSpacing: "2px", fontWeight: "700" }}>
            ADMINISTRATOR ACCESS
          </div>
        </div>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div className="form-group">
            <label className="form-label" htmlFor="admin-email">Admin Email</label>
            <input
              id="admin-email"
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@thermallexum.com"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
            />
          </div>

          {error && (
            <div style={{ padding: "12px", background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "8px", color: "#dc2626", fontSize: "12px", fontWeight: "600" }}>
              {error}
            </div>
          )}

          <button type="submit" className="btn-primary" disabled={loading} style={{ justifyContent: "center", marginTop: "8px" }}>
            {loading ? "Authenticating..." : "Sign In to Admin Console"}
          </button>
        </form>

        <div style={{ marginTop: "24px", textAlign: "center", fontSize: "12px", color: "#64748b" }}>
          Demo Admin: admin@thermallexum.com / Admin@123456
        </div>
      </div>
    </div>
  );
}
