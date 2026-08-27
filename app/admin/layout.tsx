"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    if (pathname === "/admin/login") {
      setAuthenticated(true);
      return;
    }
    const isLoggedIn = localStorage.getItem("nesa_admin_auth") === "true";
    if (!isLoggedIn) {
      router.push("/admin/login");
    } else {
      setAuthenticated(true);
    }
  }, [pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (authenticated === null) {
    return <div style={{ textAlign: "center", padding: "100px", color: "#64748b" }}>Verifying Admin Authentication...</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem("nesa_admin_auth");
    router.push("/admin/login");
  };

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: "📊" },
    { label: "Manage Courses", href: "/admin/courses", icon: "📚" },
    { label: "Registrations", href: "/admin/registrations", icon: "🎓" },
    { label: "Contact Enquiries", href: "/admin/enquiries", icon: "💬" },
    { label: "Analytics", href: "/admin/analytics", icon: "📈" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#f8fafc" }} className="admin-wrapper">
      {/* Admin Sidebar */}
      <aside className="admin-sidebar" style={{ background: "#ffffff", borderRight: "1px solid #e2e8f0", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "20px 16px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "Outfit, sans-serif", fontSize: "18px", fontWeight: "900", color: "#0E4D92", letterSpacing: "1px" }}>
              NESA INSTITUTE
            </div>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "10px", color: "#64748b", letterSpacing: "1px", marginTop: "2px", fontWeight: "700" }}>
              ADMIN CONTROL PANEL
            </div>
          </div>
          <button onClick={handleLogout} className="btn-secondary hide-desktop-exit" style={{ fontSize: "11px", padding: "6px 12px" }}>
            Logout 🚪
          </button>
        </div>

        <nav style={{ padding: "12px 0", flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="admin-nav-item"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "12px 20px",
                  fontSize: "14px",
                  textDecoration: "none",
                  color: isActive ? "#0E4D92" : "#475569",
                  background: isActive ? "rgba(14, 77, 146, 0.08)" : "transparent",
                  fontWeight: isActive ? "800" : "600",
                  borderLeft: isActive ? "4px solid #0E4D92" : "4px solid transparent",
                }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "8px" }} className="sidebar-exit-btn">
          <button onClick={handleLogout} className="btn-secondary" style={{ width: "100%", justifyContent: "center", fontSize: "12px", padding: "8px", background: "#fee2e2", color: "#b91c1c", border: "1px solid #fecaca" }}>
            Logout 🚪
          </button>
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
        .admin-sidebar {
          width: 240px;
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          z-index: 100;
        }
        @media (min-width: 769px) {
          .admin-wrapper { flex-direction: row !important; }
          .admin-content-area { margin-left: 240px !important; padding: 32px 40px !important; }
          .hide-desktop-exit { display: none !important; }
        }
        @media (max-width: 768px) {
          .admin-sidebar {
            position: relative !important;
            width: 100% !important;
            height: auto !important;
            border-right: none !important;
            border-bottom: 1px solid #e2e8f0;
          }
          .admin-sidebar nav {
            flex-direction: row !important;
            overflow-x: auto;
            padding: 8px 16px !important;
            -webkit-overflow-scrolling: touch;
          }
          .admin-nav-item {
            white-space: nowrap;
            border-radius: 8px;
            border-left: none !important;
            padding: 8px 14px !important;
          }
          .admin-content-area {
            margin-left: 0 !important;
            padding: 20px 16px !important;
          }
          .sidebar-exit-btn { display: none !important; }
        }
      `}</style>
    </div>
  );
}
