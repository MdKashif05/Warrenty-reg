"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  _count: { orders: number; registrations: number };
}

export default function AccountDashboardPage() {
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/account/me").then(async (res) => {
      const data = await res.json();
      if (!data.customer) { router.push("/account/login"); return; }
      setCustomer(data.customer);
      setLoading(false);
    });
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/account/login", { method: "DELETE" });
    router.push("/");
  };

  if (loading) return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", paddingTop: "120px", textAlign: "center", color: "#64748b" }}>Loading…</main>
      <Footer />
    </>
  );

  const quickLinks = [
    { href: "/account/orders", icon: "📦", label: "My Orders", desc: `${customer?._count.orders || 0} orders`, color: "#0284c7" },
    { href: "/account/warranties", icon: "🛡️", label: "My Warranties", desc: `${customer?._count.registrations || 0} registered`, color: "#16a34a" },
    { href: "/warranty/register", icon: "➕", label: "Register Warranty", desc: "For Amazon/Flipkart", color: "#7c3aed" },
    { href: "/warranty/claim", icon: "📋", label: "Warranty Claim", desc: "Submit a new claim", color: "#b45309" },
  ];

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#f8fafc", paddingTop: "80px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 16px" }}>
          {/* Header */}
          <div style={{ background: "linear-gradient(135deg,#0f172a,#1e3a5f)", borderRadius: "16px", padding: "32px", marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <div style={{ fontSize: "11px", color: "#64748b", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "8px" }}>MY ACCOUNT</div>
              <h1 style={{ fontSize: "28px", fontWeight: "900", color: "#fff", marginBottom: "4px" }}>
                Welcome, {customer?.firstName}! 👋
              </h1>
              <p style={{ color: "#64748b", fontSize: "14px" }}>{customer?.email}</p>
            </div>
            <button onClick={handleLogout} style={{ padding: "10px 20px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", color: "#94a3b8", borderRadius: "8px", cursor: "pointer", fontFamily: "inherit", fontWeight: "600", fontSize: "13px" }}>
              Sign Out
            </button>
          </div>

          {/* Quick Links */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "16px", marginBottom: "24px" }}>
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px", textDecoration: "none", display: "block", transition: "transform 0.2s,box-shadow 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ fontSize: "28px", marginBottom: "10px" }}>{link.icon}</div>
                <div style={{ fontWeight: "800", color: "#0f172a", marginBottom: "4px" }}>{link.label}</div>
                <div style={{ fontSize: "13px", color: link.color, fontWeight: "600" }}>{link.desc}</div>
              </Link>
            ))}
          </div>

          {/* Profile Card */}
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a" }}>Profile Details</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {[
                { label: "Name", value: `${customer?.firstName} ${customer?.lastName}` },
                { label: "Email", value: customer?.email },
                { label: "Mobile", value: customer?.phone || "Not set" },
                { label: "Member Since", value: "2026" },
              ].map((field) => (
                <div key={field.label} style={{ padding: "12px", background: "#f8fafc", borderRadius: "8px" }}>
                  <div style={{ fontSize: "11px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>{field.label}</div>
                  <div style={{ fontWeight: "600", color: "#0f172a", fontSize: "14px" }}>{field.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
