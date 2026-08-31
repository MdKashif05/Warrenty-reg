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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <nav
      className={`navbar ${scrolled ? "scrolled" : ""}`}
      role="navigation"
      aria-label="Main navigation"
      style={{
        background: scrolled ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid #e2e8f0",
        boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.06)" : "none",
      }}
    >
      {/* ── Top Bar ─────────────────────────── */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 16px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="Thermal Lexum - Home"
          style={{ textDecoration: "none", display: "flex", alignItems: "center", flexShrink: 0 }}
        >
          <div 
            className="w-[140px] h-[36px] md:w-[180px] md:h-[46px]"
            style={{ position: "relative" }}
          >
            <Image
              src="/logo.png"
              alt="Thermal Lexum"
              fill
              style={{ objectFit: "contain", objectPosition: "left center" }}
              priority
            />
          </div>
        </Link>

        {/* Desktop Nav Links (hidden on < 1024px) */}
        <div className="hidden lg:flex items-center gap-1" style={{ flex: 1, justifyContent: "center" }}>
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
                  letterSpacing: "0.5px",
                  color: isActive ? "#0284c7" : "#475569",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
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

        {/* Right side actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
          {/* Desktop CTAs */}
          <Link
            href="/warranty/lookup"
            className="hidden lg:inline-flex btn-ghost"
            style={{ fontSize: "13px", whiteSpace: "nowrap" }}
          >
            Warranty Lookup
          </Link>
          <Link
            href="/warranty/register"
            className="hidden lg:inline-flex btn-primary"
            style={{ padding: "10px 18px", fontSize: "12px", whiteSpace: "nowrap" }}
          >
            Register Warranty
          </Link>

          {/* Hamburger — visible only on < 1024px */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-drawer"
            className="lg:hidden"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "44px",
              height: "44px",
              background: mobileOpen ? "rgba(2,132,199,0.1)" : "#f1f5f9",
              border: `1.5px solid ${mobileOpen ? "rgba(2,132,199,0.4)" : "#cbd5e1"}`,
              borderRadius: "10px",
              cursor: "pointer",
              flexShrink: 0,
              transition: "all 0.2s ease",
              padding: 0,
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              stroke={mobileOpen ? "#0284c7" : "#1e293b"}
              strokeWidth="2"
              strokeLinecap="round"
            >
              {mobileOpen ? (
                <>
                  <line x1="4" y1="4" x2="18" y2="18" />
                  <line x1="18" y1="4" x2="4" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="19" y2="6" />
                  <line x1="3" y1="11" x2="19" y2="11" />
                  <line x1="3" y1="16" x2="19" y2="16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ─────────────────── */}
      {mobileOpen && (
        <div
          id="mobile-drawer"
          className="lg:hidden"
          style={{
            background: "#ffffff",
            borderTop: "1px solid #e2e8f0",
            boxShadow: "0 16px 40px rgba(0,0,0,0.13)",
          }}
        >
          {/* Nav links list */}
          <div style={{ padding: "8px 16px 0" }}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "14px 12px",
                    borderBottom: "1px solid #f1f5f9",
                    fontSize: "15px",
                    color: isActive ? "#0284c7" : "#0f172a",
                    textDecoration: "none",
                    fontWeight: isActive ? "700" : "500",
                    background: isActive ? "rgba(2,132,199,0.04)" : "transparent",
                    borderRadius: "8px",
                    transition: "background 0.15s",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: isActive ? "#0284c7" : "#94a3b8",
                      flexShrink: 0,
                    }}
                  />
                  {link.label}
                </Link>
              );
            })}

            {/* Warranty Lookup link */}
            <Link
              href="/warranty/lookup"
              onClick={() => setMobileOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "14px 12px",
                fontSize: "15px",
                color: "#0284c7",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              <span style={{ display: "inline-block", width: "7px", height: "7px", borderRadius: "50%", background: "#0284c7", flexShrink: 0 }} />
              Warranty Lookup
            </Link>
          </div>

          {/* CTA Button */}
          <div style={{ padding: "12px 16px 20px" }}>
            <Link
              href="/warranty/register"
              onClick={() => setMobileOpen(false)}
              className="btn-primary"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                padding: "14px 20px",
                fontSize: "13px",
                boxSizing: "border-box",
              }}
            >
              Register Warranty →
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
