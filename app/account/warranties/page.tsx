"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface Warranty {
  id: string;
  registrationId: string;
  purchasePlatform: string;
  warrantyStatus: string;
  warrantyEndDate?: string;
  productVariant?: string;
  purchaseDate: string;
  createdAt: string;
}

const STATUS_COLORS: Record<string, { bg: string; color: string; label: string }> = {
  ACTIVE: { bg: "#dcfce7", color: "#15803d", label: "✅ Active" },
  PENDING: { bg: "#fef9c3", color: "#92400e", label: "⏳ Pending Verification" },
  EXPIRED: { bg: "#fee2e2", color: "#b91c1c", label: "❌ Expired" },
  CLAIMED: { bg: "#dbeafe", color: "#1d4ed8", label: "📋 Claimed" },
  REJECTED: { bg: "#fee2e2", color: "#b91c1c", label: "🚫 Rejected" },
};

export default function AccountWarrantiesPage() {
  const router = useRouter();
  const [warranties, setWarranties] = useState<Warranty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const meRes = await fetch("/api/account/me");
      const meData = await meRes.json();
      if (!meData.customer) { router.push("/account/login"); return; }

      const res = await fetch("/api/account/warranties");
      const data = await res.json();
      setWarranties(data.warranties || []);
      setLoading(false);
    }
    load();
  }, [router]);

  const platformLabel: Record<string, string> = {
    OWN_WEBSITE: "🌐 Thermal Lexum",
    AMAZON: "📦 Amazon",
    FLIPKART: "🛒 Flipkart",
    OTHER: "🏪 Other",
  };

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#f8fafc", paddingTop: "80px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 16px" }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "28px" }}>
            <Link href="/account" style={{ color: "#64748b", textDecoration: "none", fontSize: "14px" }}>← Account</Link>
            <span style={{ color: "#e2e8f0" }}>/</span>
            <span style={{ fontWeight: "700", color: "#0f172a" }}>My Warranties</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
            <h1 style={{ fontSize: "28px", fontWeight: "900", color: "#0f172a" }}>🛡️ My Warranties</h1>
            <Link href="/warranty/register" style={{ background: "linear-gradient(135deg,#0284c7,#2563eb)", color: "#fff", padding: "10px 20px", borderRadius: "8px", textDecoration: "none", fontWeight: "700", fontSize: "13px" }}>+ Register New</Link>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "60px", color: "#64748b" }}>Loading…</div>
          ) : warranties.length === 0 ? (
            <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "60px", textAlign: "center" }}>
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>🛡️</div>
              <h2 style={{ fontWeight: "700", color: "#0f172a", marginBottom: "8px" }}>No warranties registered</h2>
              <p style={{ color: "#64748b", marginBottom: "20px" }}>Register your products to activate warranty coverage</p>
              <Link href="/warranty/register" style={{ display: "inline-block", background: "linear-gradient(135deg,#0284c7,#2563eb)", color: "#fff", padding: "10px 24px", borderRadius: "8px", textDecoration: "none", fontWeight: "700" }}>Register Warranty</Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {warranties.map((w) => {
                const statusInfo = STATUS_COLORS[w.warrantyStatus] || { bg: "#f1f5f9", color: "#475569", label: w.warrantyStatus };
                const isExpired = w.warrantyEndDate && new Date(w.warrantyEndDate) < new Date();
                const daysLeft = w.warrantyEndDate
                  ? Math.max(0, Math.ceil((new Date(w.warrantyEndDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
                  : null;
                return (
                  <div key={w.id} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "12px" }}>
                      <div>
                        <div style={{ fontFamily: "monospace", fontWeight: "700", color: "#0284c7", fontSize: "14px" }}>{w.registrationId}</div>
                        <div style={{ fontWeight: "700", color: "#0f172a", fontSize: "15px", marginTop: "2px" }}>{w.productVariant || "Product"}</div>
                      </div>
                      <span style={{ background: statusInfo.bg, color: statusInfo.color, padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "700" }}>{statusInfo.label}</span>
                    </div>
                    <div className="responsive-form-grid-3" style={{ gap: "12px", marginBottom: "16px" }}>
                      <div style={{ padding: "10px", background: "#f8fafc", borderRadius: "8px" }}>
                        <div style={{ fontSize: "10px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", marginBottom: "2px" }}>Purchased From</div>
                        <div style={{ fontSize: "13px", fontWeight: "600", color: "#0f172a" }}>{platformLabel[w.purchasePlatform] || w.purchasePlatform}</div>
                      </div>
                      <div style={{ padding: "10px", background: "#f8fafc", borderRadius: "8px" }}>
                        <div style={{ fontSize: "10px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", marginBottom: "2px" }}>Warranty Expiry</div>
                        <div style={{ fontSize: "13px", fontWeight: "600", color: isExpired ? "#ef4444" : "#0f172a" }}>
                          {w.warrantyEndDate ? new Date(w.warrantyEndDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—"}
                        </div>
                      </div>
                      <div style={{ padding: "10px", background: "#f8fafc", borderRadius: "8px" }}>
                        <div style={{ fontSize: "10px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", marginBottom: "2px" }}>Days Left</div>
                        <div style={{ fontSize: "13px", fontWeight: "700", color: (daysLeft !== null && daysLeft < 30) ? "#ef4444" : "#16a34a" }}>
                          {daysLeft !== null ? (daysLeft === 0 ? "Expired" : `${daysLeft} days`) : "—"}
                        </div>
                      </div>
                    </div>
                    {w.warrantyStatus === "ACTIVE" && (
                      <Link
                        href={`/warranty/claim?regId=${w.registrationId}`}
                        style={{ display: "inline-block", background: "#fff7ed", border: "1px solid #fed7aa", color: "#c2410c", padding: "8px 16px", borderRadius: "8px", textDecoration: "none", fontWeight: "700", fontSize: "13px" }}
                      >
                        📋 Submit Claim
                      </Link>
                    )}
                    {w.warrantyStatus === "PENDING" && (
                      <div style={{ fontSize: "12px", color: "#92400e", background: "#fef9c3", padding: "8px 12px", borderRadius: "8px" }}>
                        ⏳ Under admin verification. You'll be notified once approved.
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
