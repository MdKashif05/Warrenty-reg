"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Products", href: "/products" },
  { label: "B2B / Bulk", href: "/b2b" },
  { label: "About", href: "/about" },
  { label: "Founder", href: "/founder" },
  { label: "Contact", href: "/contact" },
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

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid #e2e8f0",
        boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.06)" : "none",
        transition: "all 0.3s ease",
        maxWidth: "100vw",
      }}
    >
      {/* Main bar */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 16px",
          height: "68px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        {/* ─── LOGO ─── */}
        <Link href="/" style={{ textDecoration: "none", flexShrink: 0, display: "flex", alignItems: "center" }} aria-label="Thermal Lexum - Home">
          {/* objectFit:cover zooms into the center of the square PNG, showing THERMAL LEXUM clearly */}
          <div style={{ position: "relative", width: "140px", height: "46px", overflow: "hidden", borderRadius: "4px" }}>
            <Image
              src="/logo.png"
              alt="Thermal Lexum"
              fill
              sizes="140px"
              style={{ objectFit: "cover", objectPosition: "center 48%" }}
              priority
            />
          </div>
        </Link>

        {/* ─── DESKTOP NAV LINKS (hidden on < 1024px) ─── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            flex: 1,
            justifyContent: "center",
          }}
          className="hidden lg:flex"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: isActive ? "700" : "600",
                  color: isActive ? "#0284c7" : "#475569",
                  textDecoration: "none",
                  transition: "all 0.2s",
                  background: isActive ? "rgba(2,132,199,0.08)" : "transparent",
                  border: isActive ? "1px solid rgba(2,132,199,0.2)" : "1px solid transparent",
                  whiteSpace: "nowrap",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* ─── DESKTOP CTAs (hidden on < 1024px) ─── */}
        <div className="hidden lg:flex" style={{ alignItems: "center", gap: "10px", flexShrink: 0 }}>
          <Link href="/warranty/lookup" className="btn-ghost" style={{ fontSize: "13px" }}>
            Warranty Lookup
          </Link>
          <Link href="/warranty/register" className="btn-primary" style={{ padding: "10px 20px", fontSize: "12px", whiteSpace: "nowrap" }}>
            Register Warranty
          </Link>
        </div>

        {/* ─── MOBILE: Register Warranty + Hamburger ─── */}
        <div className="flex lg:hidden" style={{ alignItems: "center", gap: "8px", flexShrink: 0 }}>
          <Link
            href="/warranty/register"
            className="btn-primary"
            style={{ padding: "9px 14px", fontSize: "11px", letterSpacing: "0.5px", whiteSpace: "nowrap" }}
          >
            Register
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              background: mobileOpen ? "rgba(2,132,199,0.1)" : "#f1f5f9",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              cursor: "pointer",
              color: mobileOpen ? "#0284c7" : "#0f172a",
              flexShrink: 0,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M4 4l10 10M14 4L4 14"/>
              ) : (
                <path d="M2 4h14M2 9h14M2 14h14"/>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ─── MOBILE DRAWER ─── */}
      {mobileOpen && (
        <div
          style={{
            background: "#ffffff",
            borderTop: "1px solid #e2e8f0",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            boxShadow: "0 12px 32px rgba(0,0,0,0.1)",
          }}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "13px 16px",
                  borderRadius: "10px",
                  fontSize: "15px",
                  fontWeight: isActive ? "700" : "500",
                  color: isActive ? "#0284c7" : "#0f172a",
                  textDecoration: "none",
                  background: isActive ? "rgba(2,132,199,0.06)" : "transparent",
                  border: isActive ? "1px solid rgba(2,132,199,0.15)" : "1px solid transparent",
                }}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Divider */}
          <div style={{ height: "1px", background: "#f1f5f9", margin: "8px 0" }} />

          <Link
            href="/warranty/lookup"
            style={{
              display: "flex",
              alignItems: "center",
              padding: "13px 16px",
              borderRadius: "10px",
              fontSize: "15px",
              fontWeight: "600",
              color: "#0284c7",
              textDecoration: "none",
            }}
          >
            🔍 Warranty Lookup
          </Link>
          <Link
            href="/warranty/register"
            className="btn-primary"
            style={{ justifyContent: "center", padding: "14px", fontSize: "14px", marginTop: "4px" }}
          >
            Register Warranty
          </Link>
        </div>
      )}
    </nav>
  );
}
