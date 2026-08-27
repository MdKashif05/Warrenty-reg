"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Don't render sidebar on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: "📊" },
    { label: "Orders", href: "/admin/orders", icon: "🛒" },
    { label: "Products", href: "/admin/products", icon: "📦" },
    { label: "Serial Numbers", href: "/admin/serials", icon: "🔑" },
    { label: "Warranties", href: "/admin/warranties", icon: "🛡️" },
    { label: "Claims", href: "/admin/claims", icon: "📋" },
    { label: "Customers", href: "/admin/customers", icon: "👥" },
    { label: "Campaigns", href: "/admin/campaigns", icon: "📧" },
    { label: "Analytics", href: "/admin/analytics", icon: "📈" },
    { label: "B2B Enquiries", href: "/admin/b2b", icon: "💼" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#f8fafc" }} className="admin-wrapper">
      {/* Admin Sidebar */}
      <aside className="admin-sidebar" style={{ background: "#ffffff", borderRight: "1px solid #e2e8f0", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "20px 16px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "15px", fontWeight: "900", color: "#0f172a", letterSpacing: "2px" }}>
              THERMAL <span style={{ color: "#0284c7" }}>LEXUM</span>
            </div>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "10px", color: "#0284c7", letterSpacing: "1px", marginTop: "2px", fontWeight: "700" }}>
              ADMIN PORTAL
            </div>
          </div>
          <Link href="/" className="btn-secondary hide-desktop-exit" style={{ fontSize: "11px", padding: "6px 12px" }}>
            Exit 🌐
          </Link>
        </div>

        <nav style={{ padding: "12px 0", flex: 1 }}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-nav-item ${pathname === item.href ? "active" : ""}`}
              style={{
                color: pathname === item.href ? "#0284c7" : "#475569",
                background: pathname === item.href ? "rgba(2, 132, 199, 0.08)" : "transparent",
                fontWeight: pathname === item.href ? "700" : "500"
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div style={{ padding: "16px" }} className="sidebar-exit-btn">
          <Link href="/" className="btn-secondary" style={{ width: "100%", justifyContent: "center", fontSize: "12px", padding: "8px" }}>
            Exit to Website 🌐
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "24px 16px" }} className="admin-content-area">
        {children}
      </div>
      <style>{`
        @media (min-width: 769px) {
          .admin-wrapper { flex-direction: row !important; }
          .admin-content-area { margin-left: 240px !important; padding: 32px 40px !important; }
          .hide-desktop-exit { display: none !important; }
        }
        @media (max-width: 768px) {
          .sidebar-exit-btn { display: none !important; }
        }
      `}</style>
    </div>
  );
}
