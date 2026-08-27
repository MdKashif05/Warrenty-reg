"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

/* ── ADMIN CREDENTIALS ──────────────────────────
   Email    : admin@thermallexum.com
   Password : Admin@123456
   URL      : /admin/login
─────────────────────────────────────────────── */

const ADMIN_EMAIL = "admin@thermallexum.com";
const ADMIN_PASS = "Admin@123456";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
        localStorage.setItem("nesa_admin_auth", "true");
        router.push("/admin");
      } else {
        setError("❌ Wrong email or password. Use the credentials shown below.");
        setSubmitting(false);
      }
    }, 600);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0a1628 0%, #0E4D92 50%, #0a1628 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "Outfit, sans-serif",
      }}
    >
      {/* Card */}
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "#ffffff",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 60px rgba(14,77,146,0.4)",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #0E4D92 0%, #1565C0 100%)",
            padding: "36px 36px 28px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "11px", letterSpacing: "3px", fontWeight: "700", color: "#ffd166", textTransform: "uppercase", marginBottom: "6px" }}>
            ADMIN CONTROL PANEL
          </div>
          <div style={{ fontSize: "30px", fontWeight: "900", color: "#ffffff", letterSpacing: "-0.5px" }}>
            THERMAL LEXUM
          </div>
          <div style={{ fontSize: "13px", color: "#bfdbfe", marginTop: "6px" }}>
            Secure administrative access
          </div>
        </div>

        {/* Login Form */}
        <div style={{ padding: "36px" }}>
          {error && (
            <div
              style={{
                background: "#fee2e2",
                border: "1px solid #fca5a5",
                color: "#b91c1c",
                padding: "14px 16px",
                borderRadius: "10px",
                fontSize: "14px",
                marginBottom: "24px",
                fontWeight: "600",
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label
                style={{ fontSize: "13px", fontWeight: "700", color: "#374151", display: "block", marginBottom: "8px" }}
              >
                Admin Email
              </label>
              <input
                id="admin-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@thermallexum.com"
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: "10px",
                  border: "2px solid #e5e7eb",
                  fontSize: "15px",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#0E4D92")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>

            <div>
              <label
                style={{ fontSize: "13px", fontWeight: "700", color: "#374151", display: "block", marginBottom: "8px" }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  id="admin-password"
                  type={showPass ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  style={{
                    width: "100%",
                    padding: "14px 50px 14px 16px",
                    borderRadius: "10px",
                    border: "2px solid #e5e7eb",
                    fontSize: "15px",
                    outline: "none",
                    boxSizing: "border-box",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#0E4D92")}
                  onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "#6b7280"
                  }}
                >
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <button
              id="admin-login-btn"
              type="submit"
              disabled={submitting}
              style={{
                background: submitting ? "#94a3b8" : "linear-gradient(135deg, #0E4D92 0%, #1565C0 100%)",
                color: "#ffffff",
                border: "none",
                borderRadius: "12px",
                padding: "16px",
                fontSize: "16px",
                fontWeight: "800",
                cursor: submitting ? "not-allowed" : "pointer",
                width: "100%",
                letterSpacing: "0.3px",
                boxShadow: submitting ? "none" : "0 8px 24px rgba(14,77,146,0.35)",
                transition: "all 0.2s",
              }}
            >
              {submitting ? "Logging in..." : "🔐 Login to Admin Panel"}
            </button>
          </form>

          {/* Credentials Box */}
          <div
            style={{
              marginTop: "28px",
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
              borderRadius: "12px",
              padding: "20px",
            }}
          >
            <div style={{ fontSize: "11px", fontWeight: "800", color: "#15803d", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "12px" }}>
              🔑 Admin Credentials
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "13px", color: "#374151", fontWeight: "600" }}>Email:</span>
                <code
                  style={{
                    fontSize: "13px", background: "#dcfce7", padding: "4px 10px",
                    borderRadius: "6px", color: "#15803d", fontWeight: "700", userSelect: "all"
                  }}
                  onClick={() => setEmail(ADMIN_EMAIL)}
                  title="Click to auto-fill"
                >
                  {ADMIN_EMAIL}
                </code>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "13px", color: "#374151", fontWeight: "600" }}>Password:</span>
                <code
                  style={{
                    fontSize: "13px", background: "#dcfce7", padding: "4px 10px",
                    borderRadius: "6px", color: "#15803d", fontWeight: "700", userSelect: "all"
                  }}
                  onClick={() => setPassword(ADMIN_PASS)}
                  title="Click to auto-fill"
                >
                  {ADMIN_PASS}
                </code>
              </div>
            </div>
            <div style={{ fontSize: "11px", color: "#6b7280", marginTop: "10px" }}>
              💡 Click on email or password to auto-fill
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "24px" }}>
            <Link
              href="/"
              style={{ color: "#0E4D92", textDecoration: "none", fontWeight: "700", fontSize: "14px" }}
            >
              ← Back to Thermal Lexum Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
