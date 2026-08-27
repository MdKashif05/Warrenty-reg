"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

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
  { slug: "tl-x1-ultra-4g", name: "Thermal Lexum TL-X1 Ultra (4g)", badge: "BEST SELLER", price: "₹499", lessons: 12, students: 240, desc: "14.2 W/mK high-density nano-diamond thermal paste for CPUs, GPUs & Overclocking." },
  { slug: "tl-x1-ultra-8g", name: "Thermal Lexum TL-X1 Ultra (8g)", badge: "VALUE PACK", price: "₹899", lessons: 15, students: 180, desc: "8-gram applicator syringe for multi-system builds, workstation maintenance & gaming rigs." },
  { slug: "tl-pro-extreme", name: "Thermal Lexum TL-PRO Extreme", badge: "PRO CHOICE", price: "₹1,299", lessons: 18, students: 140, desc: "Premium non-conductive thermal compound engineered for extreme thermal endurance." },
  { slug: "thermal-pad-matrix", name: "Thermal Lexum Pad Matrix (12.8 W/mK)", badge: "POPULAR", price: "₹399", lessons: 10, students: 310, desc: "High-compressibility silicone thermal pads for VRAM, VRM MOSFETs & M.2 NVMe SSDs." },
  { slug: "liquid-metal-extreme", name: "Thermal Lexum Liquid Metal Extreme", badge: "ULTIMATE", price: "₹1,499", lessons: 20, students: 195, desc: "73 W/mK gallium-alloy liquid metal compound for direct-die cooling & delidded CPUs." },
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

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled ? "rgba(255, 255, 255, 0.98)" : "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.06)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      {/* Top Announcement Bar */}
      <div style={{ background: "#0E4D92", color: "#ffffff", padding: "6px 16px", fontSize: "12px", textAlign: "center", fontWeight: "600" }}>
        🔥 Thermal Lexum Official Store & Warranty Portal | Free Shipping on Orders Over ₹499! <Link href="/products" style={{ color: "#ffd166", textDecoration: "underline", marginLeft: "6px", fontWeight: "700" }}>Shop Products →</Link>
      </div>

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 16px",
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        {/* LOGO + BRAND */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
          <div className="nav-logo" style={{ position: "relative", flexShrink: 0 }}>
            <Image
              src="/logo.png"
              alt="Thermal Lexum Logo"
              fill
              sizes="(max-width: 768px) 38px, 52px"
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
          <div>
            <div className="nav-title" style={{ fontWeight: "900", fontSize: "20px", color: "#0E4D92", fontFamily: "Outfit, sans-serif", letterSpacing: "-0.5px", lineHeight: "1" }}>
              THERMAL <span style={{ color: "#ff6b35" }}>LEXUM</span>
            </div>
            <div className="nav-subtitle" style={{ fontSize: "10px", color: "#64748b", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase", marginTop: "2px" }}>
              High Performance Thermal Solutions
            </div>
          </div>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }} className="hidden lg:flex">
          <Link href="/" style={{ padding: "8px 14px", color: pathname === "/" ? "#0E4D92" : "#334155", fontWeight: pathname === "/" ? "800" : "600", textDecoration: "none", fontSize: "14px" }}>Home</Link>
          <Link href="/products" style={{ padding: "8px 14px", color: pathname.startsWith("/products") ? "#0E4D92" : "#334155", fontWeight: pathname.startsWith("/products") ? "800" : "600", textDecoration: "none", fontSize: "14px" }}>Products</Link>
          <Link href="/warranty/register" style={{ padding: "8px 14px", color: pathname.startsWith("/warranty") ? "#0E4D92" : "#334155", fontWeight: pathname.startsWith("/warranty") ? "800" : "600", textDecoration: "none", fontSize: "14px" }}>Register Warranty 🛡️</Link>
          <Link href="/b2b" style={{ padding: "8px 14px", color: pathname === "/b2b" ? "#0E4D92" : "#334155", fontWeight: pathname === "/b2b" ? "800" : "600", textDecoration: "none", fontSize: "14px" }}>B2B Bulk Orders</Link>
          <Link href="/about" style={{ padding: "8px 14px", color: pathname === "/about" ? "#0E4D92" : "#334155", fontWeight: pathname === "/about" ? "800" : "600", textDecoration: "none", fontSize: "14px" }}>About Us</Link>
          <Link href="/contact" style={{ padding: "8px 14px", color: pathname === "/contact" ? "#0E4D92" : "#334155", fontWeight: pathname === "/contact" ? "800" : "600", textDecoration: "none", fontSize: "14px" }}>Contact Us</Link>
        </div>

        {/* DESKTOP CTAS */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }} className="hidden lg:flex">
          <Link href="/cart" className="btn-secondary" style={{ padding: "9px 16px", fontSize: "13px" }}>🛒 Cart</Link>
          <Link href="/account" className="btn-primary" style={{ padding: "9px 18px", fontSize: "13px" }}>👤 Account</Link>
        </div>

        {/* MOBILE TOGGLE */}
        <div className="flex lg:hidden" style={{ alignItems: "center", gap: "8px" }}>
          <Link href="/cart" style={{ padding: "8px 12px", background: "#f0fcff", color: "#0E4D92", borderRadius: "8px", fontWeight: "700", fontSize: "13px", textDecoration: "none" }}>🛒</Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Navigation"
            style={{ padding: "8px 12px", background: "#0E4D92", color: "#ffffff", border: "none", borderRadius: "8px", fontWeight: "700", fontSize: "14px", cursor: "pointer" }}
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div style={{ background: "#ffffff", borderTop: "1px solid #e2e8f0", padding: "16px", display: "flex", flexDirection: "column", gap: "4px" }}>
          <Link href="/" style={{ padding: "12px 16px", fontWeight: "700", color: "#0E4D92", textDecoration: "none", borderRadius: "8px", background: pathname === "/" ? "#f0f7ff" : "transparent" }}>🏠 Home</Link>
          <Link href="/products" style={{ padding: "12px 16px", fontWeight: "700", color: "#0f172a", textDecoration: "none", borderRadius: "8px" }}>📦 Products Catalog</Link>
          <Link href="/warranty/register" style={{ padding: "12px 16px", fontWeight: "700", color: "#0f172a", textDecoration: "none", borderRadius: "8px" }}>🛡️ Register Warranty</Link>
          <Link href="/b2b" style={{ padding: "12px 16px", fontWeight: "700", color: "#0f172a", textDecoration: "none", borderRadius: "8px" }}>💼 B2B / Bulk Enquiries</Link>
          <Link href="/about" style={{ padding: "12px 16px", fontWeight: "700", color: "#0f172a", textDecoration: "none", borderRadius: "8px" }}>ℹ️ About Us</Link>
          <Link href="/contact" style={{ padding: "12px 16px", fontWeight: "700", color: "#0f172a", textDecoration: "none", borderRadius: "8px" }}>📞 Contact Us</Link>
          <div style={{ display: "flex", gap: "10px", marginTop: "12px", borderTop: "1px solid #f1f5f9", paddingTop: "12px" }}>
            <Link href="/cart" className="btn-secondary" style={{ flex: 1, textAlign: "center", justifyContent: "center" }}>🛒 Cart</Link>
            <Link href="/account" className="btn-primary" style={{ flex: 1, textAlign: "center", justifyContent: "center" }}>👤 Account</Link>
          </div>
        </div>
      )}

      <style>{`
        .nav-logo {
          width: 52px;
          height: 52px;
        }
        @media (max-width: 768px) {
          .nav-logo {
            width: 36px !important;
            height: 36px !important;
          }
          .nav-title {
            font-size: 16px !important;
          }
          .nav-subtitle {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
}
