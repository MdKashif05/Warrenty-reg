"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Products", href: "/products", icon: "📦" },
  { label: "B2B / Bulk", href: "/b2b", icon: "🏢" },
  { label: "About", href: "/about", icon: "ℹ️" },
  { label: "Founder", href: "/founder", icon: "👨‍💼" },
  { label: "Contact", href: "/contact", icon: "📞" },
];

export interface CourseItem {
  slug: string;
  name: string;
  badge: string;
  price: string;
  lessons: number;
  students: number;
  desc: string;
}

export const nesaCoursesList: CourseItem[] = [
  { slug: "lx-tim-pro", name: "LX-TIM Pro (Thermal Paste)", badge: "BEST SELLER", price: "₹499", lessons: 0, students: 12000, desc: "17.6 W/mK ultra-high conductivity thermal compound for CPUs, GPUs & overclocking rigs." },
  { slug: "lx-tim-standard", name: "LX-TIM Standard (Thermal Paste)", badge: "POPULAR", price: "₹349", lessons: 0, students: 8400, desc: "Reliable everyday thermal paste for desktop builds and laptop repastes." },
  { slug: "lx-lm-pro", name: "LX-LM Pro (Liquid Metal)", badge: "PRO GRADE", price: "₹1,199", lessons: 0, students: 3200, desc: "73 W/mK gallium-alloy liquid metal for delidded CPUs and extreme overclockers." },
  { slug: "lx-pad-standard", name: "LX-PAD Standard (Thermal Pads)", badge: "NEW", price: "₹299", lessons: 0, students: 5100, desc: "High-compressibility silicone thermal pads for VRAM, VRMs & M.2 SSDs." },
  { slug: "lx-pad-pro", name: "LX-PAD Pro 12.8 W/mK (Thermal Pads)", badge: "PREMIUM", price: "₹549", lessons: 0, students: 2100, desc: "Premium 12.8 W/mK thermal pads for extreme builds and enterprise servers." },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: scrolled ? "rgba(255, 255, 255, 0.98)" : "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid #e2e8f0",
          boxShadow: scrolled ? "0 4px 24px rgba(0, 0, 0, 0.06)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        {/* ── Main Nav Bar ── */}
        <nav
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 12px",
            height: "56px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          {/* LEFT: Menu Trigger Button (Menu icon and text matching NESA) */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: mobileOpen ? "rgba(2, 132, 199, 0.06)" : "transparent",
              border: "1px solid #dde3ea",
              padding: "6px 10px",
              borderRadius: "8px",
              cursor: "pointer",
              color: "#0f172a",
              fontSize: "11px",
              fontWeight: "800",
              letterSpacing: "1px",
              textTransform: "uppercase",
              flexShrink: 0,
            }}
          >
            {mobileOpen ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#0284c7" strokeWidth="2.2" strokeLinecap="round">
                <line x1="2" y1="2" x2="14" y2="14" />
                <line x1="14" y1="2" x2="2" y2="14" />
              </svg>
            ) : (
              <svg width="18" height="12" viewBox="0 0 20 12" fill="none" stroke="#0284c7" strokeWidth="2.2" strokeLinecap="round">
                <line x1="0" y1="1" x2="20" y2="1" />
                <line x1="0" y1="6" x2="14" y2="6" />
                <line x1="0" y1="11" x2="20" y2="11" />
              </svg>
            )}
            <span className="hidden sm:inline">{mobileOpen ? "CLOSE" : "MENU"}</span>
          </button>

          {/* CENTER: Centered Logo Image (NESA alignment) */}
          <Link
            href="/"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ position: "relative", height: "50px", width: "260px" }}>
              <Image
                src="/logo.png"
                alt="Thermal Lexum"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </Link>

          {/* RIGHT: Actions (Lookup Icon + Sign In Icon) */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
            {/* Warranty Lookup Icon */}
            <Link
              href="/warranty/lookup"
              aria-label="Warranty Status Lookup"
              style={{
                background: "#f1f5f9",
                border: "1px solid #dde3ea",
                borderRadius: "8px",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
                fontSize: "16px",
                flexShrink: 0,
              }}
            >
              🔍
            </Link>

            {/* Admin Login Icon */}
            <Link
              href="/admin/login"
              aria-label="Admin Sign In"
              style={{
                background: "#f1f5f9",
                border: "1px solid #dde3ea",
                borderRadius: "8px",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
                fontSize: "16px",
                flexShrink: 0,
              }}
            >
              👤
            </Link>
          </div>
        </nav>
      </header>

      {/* ── SIDE DRAWER MENU (Identical responsive slide to NESA) ── */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            top: "56px",
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(15, 23, 42, 0.35)",
            backdropFilter: "blur(4px)",
            zIndex: 999,
          }}
          onClick={() => setMobileOpen(false)}
        >
          <div
            style={{
              width: "85%",
              maxWidth: "320px",
              height: "100%",
              background: "#fff",
              borderRight: "1px solid #e2e8f0",
              boxShadow: "8px 0 30px rgba(0, 0, 0, 0.12)",
              padding: "20px 16px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <div style={{ fontSize: "10px", fontWeight: "800", color: "#0284c7", letterSpacing: "2px", marginBottom: "8px" }}>NAVIGATE</div>

              {navLinks.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      padding: "12px 14px",
                      borderRadius: "10px",
                      fontSize: "14px",
                      fontWeight: isActive ? "800" : "600",
                      color: isActive ? "#0284c7" : "#0f172a",
                      background: isActive ? "rgba(2, 132, 199, 0.04)" : "transparent",
                      border: isActive ? "1px solid rgba(2, 132, 199, 0.15)" : "1px solid transparent",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span>{item.icon}</span>
                    <span style={{ flex: 1 }}>{item.label}</span>
                    <span style={{ fontSize: "11px", color: "#94a3b8" }}>›</span>
                  </Link>
                );
              })}

              <hr style={{ margin: "12px 0", borderColor: "#f1f5f9" }} />

              <div style={{ fontSize: "10px", fontWeight: "800", color: "#0284c7", letterSpacing: "2px", marginBottom: "6px" }}>SUPPORT & TOOLS</div>
              <Link
                href="/warranty/lookup"
                onClick={() => setMobileOpen(false)}
                style={{
                  padding: "8px 12px",
                  fontSize: "13px",
                  color: "#334155",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span>🔍</span>
                <span>Warranty Status Lookup</span>
              </Link>
            </div>

            {/* Bottom Drawer CTAs matching NESA structure */}
            <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <Link
                href="/admin/login"
                onClick={() => setMobileOpen(false)}
                className="btn-secondary"
                style={{ width: "100%", justifyContent: "center", padding: "11px", fontSize: "12px" }}
              >
                🔑 Admin Sign In
              </Link>
              <Link
                href="/warranty/register"
                onClick={() => setMobileOpen(false)}
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center", padding: "13px", fontSize: "13px" }}
              >
                Register Warranty Now 🚀
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
