"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  COMPANY: [
    { label: "B2B Direct Purchase (30% OFF)", href: "/b2b" },
    { label: "About Us", href: "/about" },
    { label: "Founder's Message", href: "/founder" },
    { label: "Contact", href: "/contact" },
  ],
  PRODUCTS: [
    { label: "Thermal Paste", href: "/products?category=THERMAL_PASTE" },
    { label: "Liquid Metal", href: "/products?category=LIQUID_METAL" },
    { label: "Thermal Pads", href: "/products?category=THERMAL_PADS" },
  ],
  SUPPORT: [
    { label: "Register Warranty", href: "/warranty/register" },
    { label: "Warranty Lookup", href: "/warranty/lookup" },
    { label: "FAQ", href: "/faq" },
    { label: "Warranty Terms", href: "/warranty-terms" },
  ],
};

const socialLinks = [
  { label: "Instagram", href: "#", icon: "instagram" },
  { label: "Facebook", href: "#", icon: "facebook" },
  { label: "YouTube", href: "#", icon: "youtube" },
  { label: "X (Twitter)", href: "#", icon: "x" },
];

function SocialIcon({ type }: { type: string }): React.ReactNode {
  const icons: Record<string, React.ReactNode> = {
    instagram: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
    facebook: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
      </svg>
    ),
    youtube: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
      </svg>
    ),
    x: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  };
  return icons[type] || null;
}

export default function Footer() {
  return (
    <footer
      style={{
        background: "#f8fafc",
        borderTop: "1px solid #e2e8f0",
      }}
      role="contentinfo"
    >
      <div className="thermal-bar" />
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "72px 24px 40px" }}>
        {/* Top section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr repeat(3, 1fr)",
            gap: "48px",
            marginBottom: "64px",
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ position: "relative", height: "42px", width: "180px", marginBottom: "12px" }}>
              <Image
                src="/logo.png"
                alt="Thermal Lexum"
                fill
                style={{ objectFit: "contain", objectPosition: "left center" }}
              />
            </div>
            <div
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "10px",
                letterSpacing: "3px",
                color: "#0284c7",
                marginBottom: "20px",
                fontWeight: "700"
              }}
            >
              COOL SYSTEMS. UNSTOPPABLE PERFORMANCE.
            </div>
            <p
              style={{
                fontSize: "14px",
                color: "#475569",
                lineHeight: "1.7",
                maxWidth: "300px",
                marginBottom: "24px",
              }}
            >
              High-performance thermal interface solutions engineered under Founder <strong>Javed Shaikh</strong> for gamers, overclockers, and workstation professionals.
            </p>
            {/* Social Links */}
            <div style={{ display: "flex", gap: "8px" }}>
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: "#ffffff",
                    border: "1px solid #cbd5e1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#475569",
                    transition: "all 0.2s",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#0284c7";
                    (e.currentTarget as HTMLElement).style.borderColor = "#0284c7";
                    (e.currentTarget as HTMLElement).style.background = "rgba(2, 132, 199, 0.08)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#475569";
                    (e.currentTarget as HTMLElement).style.borderColor = "#cbd5e1";
                    (e.currentTarget as HTMLElement).style.background = "#ffffff";
                  }}
                >
                  <SocialIcon type={s.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <div
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "11px",
                  letterSpacing: "2px",
                  color: "#64748b",
                  marginBottom: "20px",
                  fontWeight: "700"
                }}
              >
                {title}
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      style={{
                        color: "#475569",
                        textDecoration: "none",
                        fontSize: "14px",
                        fontWeight: "500",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#0284c7"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#475569"; }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact bar */}
        <div
          style={{
            padding: "24px 32px",
            background: "#ffffff",
            border: "1px solid #cbd5e1",
            borderRadius: "12px",
            display: "flex",
            gap: "48px",
            flexWrap: "wrap",
            marginBottom: "40px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.03)"
          }}
        >
          <div>
            <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#0284c7", marginBottom: "4px", fontFamily: "JetBrains Mono, monospace", fontWeight: "700" }}>EMAIL SUPPORT</div>
            <a href="mailto:info@thermallexum.com" style={{ fontSize: "14px", color: "#0f172a", textDecoration: "none", fontWeight: "700" }}>info@thermallexum.com</a>
          </div>
          <div>
            <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#0284c7", marginBottom: "4px", fontFamily: "JetBrains Mono, monospace", fontWeight: "700" }}>PHONE DIRECT</div>
            <a href="tel:+918864817544" style={{ fontSize: "14px", color: "#0f172a", textDecoration: "none", fontWeight: "700" }}>+91 8864-817544</a>
          </div>
          <div>
            <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#0284c7", marginBottom: "4px", fontFamily: "JetBrains Mono, monospace", fontWeight: "700" }}>HQ LOCATION</div>
            <span style={{ fontSize: "14px", color: "#475569", fontWeight: "600" }}>Bengaluru - 560042, India</span>
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            paddingTop: "24px",
            borderTop: "1px solid #e2e8f0",
          }}
        >
          <p style={{ fontSize: "13px", color: "#64748b" }}>
            © 2026 Thermal Lexum. All Rights Reserved. Founder Javed Shaikh.
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms & Conditions", href: "/terms" },
              { label: "Warranty Terms", href: "/warranty-terms" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{ fontSize: "13px", color: "#64748b", textDecoration: "none", fontWeight: "500" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
