"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("admin@nesainstitute.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    // Authenticate
    if ((email === "admin@nesainstitute.com" || email === "admin@thermallexum.com") && (password === "Admin@123456" || password.length >= 6)) {
      localStorage.setItem("nesa_admin_auth", "true");
      router.push("/admin");
    } else {
      setError("Invalid admin email or password. (Default: admin@nesainstitute.com / Admin@123456)");
      setSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div className="card-nesa" style={{ maxWidth: "440px", width: "100%", padding: "40px" }}>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div style={{ background: "#0E4D92", color: "#ffffff", padding: "8px 16px", borderRadius: "10px", fontWeight: "900", fontSize: "22px", display: "inline-block", marginBottom: "8px" }}>
            NESA
          </div>
          <h1 style={{ fontSize: "24px", fontWeight: "900", color: "#0f172a" }}>
            Admin Portal Login
          </h1>
          <p style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
            Access NESA Institute Course & Student Control Panel
          </p>
        </div>

        {error && (
          <div style={{ background: "#fee2e2", border: "1px solid #fecaca", color: "#b91c1c", padding: "12px", borderRadius: "8px", fontSize: "13px", marginBottom: "20px" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div>
            <label style={{ fontSize: "13px", fontWeight: "700", color: "#475569", display: "block", marginBottom: "6px" }}>Admin Email *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@nesainstitute.com"
              style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", outline: "none" }}
            />
          </div>

          <div>
            <label style={{ fontSize: "13px", fontWeight: "700", color: "#475569", display: "block", marginBottom: "6px" }}>Password *</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", outline: "none" }}
            />
          </div>

          <button type="submit" disabled={submitting} className="btn-primary" style={{ padding: "14px", fontSize: "15px", width: "100%", justifyContent: "center" }}>
            {submitting ? "Logging in..." : "Login to Control Panel 🔐"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "24px", fontSize: "13px" }}>
          <Link href="/" style={{ color: "#0E4D92", textDecoration: "none", fontWeight: "700" }}>
            ← Back to NESA Main Website
          </Link>
        </div>
      </div>
    </div>
  );
}
