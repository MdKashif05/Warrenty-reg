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
          style={{ textDecoration: "none", display: "flex", alignItems: "center" }}
          aria-label="Thermal Lexum - Home"
        >
          <div style={{ position: "relative", height: "38px", width: "160px" }}>
            <Image
              src="/logo.png"
              alt="Thermal Lexum"
              fill
              style={{ objectFit: "contain", objectPosition: "left center" }}
              priority
            />
          </div>
        </Link>

        {/* Desktop Nav Links (Hidden on mobile/tablet < 1024px) */}
        <div className="hidden lg:flex items-center gap-1.5">
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

        {/* Desktop CTA & Mobile Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link
            href="/warranty/lookup"
            className="hidden lg:inline-flex btn-ghost"
            style={{ fontSize: "13px" }}
          >
            Warranty Lookup
          </Link>

          <Link
            href="/warranty/register"
            className="hidden sm:inline-flex btn-primary"
            style={{ padding: "10px 20px", fontSize: "12px" }}
          >
            Register Warranty
          </Link>

          {/* Mobile menu button (Visible ONLY on mobile/tablet < 1024px) */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex lg:hidden items-center justify-center bg-slate-100 border border-slate-300 text-slate-900 p-2 rounded-lg cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <svg width="20" height="20" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M4 4l10 10M14 4L4 14"/>
              ) : (
                <path d="M2 4h14M2 9h14M2 14h14"/>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div
          className="lg:hidden"
          style={{
            background: "#ffffff",
            borderTop: "1px solid #e2e8f0",
            padding: "16px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
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
                borderBottom: "1px solid #f1f5f9",
                fontSize: "15px",
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
              fontSize: "15px",
              color: "#0284c7",
              textDecoration: "none",
              fontWeight: "700"
            }}
          >
            Warranty Lookup
          </Link>
        </div>
      )}
    </nav>
  );
}
