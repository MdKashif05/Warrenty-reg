"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Products", href: "/products" },
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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`navbar ${scrolled ? "scrolled" : ""}`}
      role="navigation"
      aria-label="Main navigation"
      style={{
        background: scrolled ? "rgba(255, 255, 255, 0.98)" : "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid #e2e8f0",
        boxShadow: scrolled ? "0 4px 20px rgba(0, 0, 0, 0.05)" : "none"
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 24px",
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{ textDecoration: "none" }}
          aria-label="Thermal Lexum - Home"
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #0284c7 0%, #2563eb 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(2, 132, 199, 0.3)"
              }}
            >
              <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
                <path d="M9 2L15 6V12L9 16L3 12V6L9 2Z" fill="#ffffff" />
                <path d="M9 5L12 7V11L9 13L6 11V7L9 5Z" fill="rgba(2,132,199,0.9)" />
              </svg>
            </div>
            <div>
              <div
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "17px",
                  fontWeight: "900",
                  letterSpacing: "2.5px",
                  color: "#0f172a",
                }}
              >
                THERMAL <span style={{ color: "#0284c7" }}>LEXUM</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div
          className="hide-mobile"
          style={{ display: "flex", alignItems: "center", gap: "6px" }}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: "8px 18px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: isActive ? "700" : "600",
                  letterSpacing: "0.5px",
                  color: isActive ? "#0284c7" : "#475569",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  background: isActive ? "rgba(2, 132, 199, 0.08)" : "transparent",
                  border: isActive ? "1px solid rgba(2, 132, 199, 0.2)" : "1px solid transparent",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <Link
            href="/warranty/lookup"
            className="hide-mobile btn-ghost"
            style={{ fontSize: "13px" }}
          >
            Warranty Lookup
          </Link>
          <Link href="/warranty/register" className="btn-primary hide-mobile-cta" style={{ padding: "10px 22px", fontSize: "12px" }}>
            Register Warranty
          </Link>
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: "none",
              background: "#f8fafc",
              border: "1px solid #cbd5e1",
              color: "#0f172a",
              padding: "8px 10px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
            className="show-mobile-btn"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
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

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          style={{
            background: "#ffffff",
            borderTop: "1px solid #e2e8f0",
            padding: "16px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
          }}
        >
          <Link
            href="/warranty/register"
            onClick={() => setMobileOpen(false)}
            className="btn-primary"
            style={{ width: "100%", justifyContent: "center", marginBottom: "12px", padding: "12px" }}
          >
            Register Warranty
          </Link>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: "block",
                padding: "12px 0",
                borderBottom: "1px solid #e2e8f0",
                fontSize: "14px",
                color: pathname === link.href ? "#0284c7" : "#0f172a",
                textDecoration: "none",
                fontWeight: pathname === link.href ? "700" : "500"
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/warranty/lookup"
            onClick={() => setMobileOpen(false)}
            style={{
              display: "block",
              padding: "12px 0",
              fontSize: "14px",
              color: "#0284c7",
              textDecoration: "none",
              fontWeight: "700"
            }}
          >
            Warranty Lookup
          </Link>
        </div>
      )}
      <style>{`
        @media (max-width: 768px) {
          .show-mobile-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
