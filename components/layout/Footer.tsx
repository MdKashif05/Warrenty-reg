"use client";
import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#0E4D92", color: "#ffffff", borderTop: "4px solid #ffd166" }} role="contentinfo">
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px 20px 32px" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10" style={{ marginBottom: "48px" }}>
          {/* Col 1: Brand Info */}
          <div>
            <div style={{ fontWeight: "900", fontSize: "22px", color: "#ffffff", fontFamily: "Outfit, sans-serif", letterSpacing: "0.5px", marginBottom: "4px" }}>
              THERMAL LEXUM
            </div>
            <div style={{ fontSize: "11px", color: "#93c5fd", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "16px" }}>
              High Performance Thermal Solutions
            </div>
            <p style={{ fontSize: "14px", color: "#e2e8f0", lineHeight: "1.7", marginBottom: "20px" }}>
              Official manufacturer of premium high-conductivity thermal paste, thermal pads, liquid metal, and cooling accessories for PC builders, gamers, and industrial cooling.
            </p>
            <div style={{ fontSize: "13px", color: "#ffd166", fontWeight: "700" }}>
              📍 100% Genuine Products & Official Warranty Coverage
            </div>
          </div>

          {/* Col 2: Products */}
          <div>
            <h4 style={{ fontSize: "15px", fontWeight: "800", color: "#ffffff", marginBottom: "20px", textTransform: "uppercase", letterSpacing: "1px" }}>
              Popular Products
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", padding: 0 }}>
              {[
                { label: "TL-X1 Ultra Thermal Paste (4g)", href: "/products/tl-x1-ultra" },
                { label: "TL-X1 Ultra Thermal Paste (8g)", href: "/products/tl-x1-ultra-8g" },
                { label: "TL-PRO Extreme Thermal Paste", href: "/products/tl-pro-extreme" },
                { label: "Thermal Pad Matrix (12.8 W/mK)", href: "/products/thermal-pad-matrix" },
                { label: "Liquid Metal Extreme", href: "/products/liquid-metal-extreme" },
              ].map((p) => (
                <li key={p.href}>
                  <Link href={p.href} style={{ color: "#cbd5e1", textDecoration: "none", fontSize: "14px" }}>
                    • {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 style={{ fontSize: "15px", fontWeight: "800", color: "#ffffff", marginBottom: "20px", textTransform: "uppercase", letterSpacing: "1px" }}>
              Quick Navigation
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", padding: 0 }}>
              {[
                { label: "Home Page", href: "/" },
                { label: "Product Catalog", href: "/products" },
                { label: "Register Product Warranty", href: "/warranty/register" },
                { label: "Check Warranty Status", href: "/warranty/lookup" },
                { label: "B2B & Bulk Supply", href: "/b2b" },
                { label: "About Us", href: "/about" },
                { label: "Contact Support", href: "/contact" },
                { label: "Admin Portal Login", href: "/admin/login" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} style={{ color: "#cbd5e1", textDecoration: "none", fontSize: "14px" }}>
                    → {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Support */}
          <div>
            <h4 style={{ fontSize: "15px", fontWeight: "800", color: "#ffffff", marginBottom: "20px", textTransform: "uppercase", letterSpacing: "1px" }}>
              Customer Support
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "14px", color: "#e2e8f0" }}>
              <div>
                <strong style={{ color: "#93c5fd", display: "block", fontSize: "11px", letterSpacing: "1px" }}>SUPPORT EMAIL:</strong>
                <a href="mailto:support@thermallexum.com" style={{ color: "#ffffff", textDecoration: "none", fontWeight: "600" }}>support@thermallexum.com</a>
              </div>
              <div>
                <strong style={{ color: "#93c5fd", display: "block", fontSize: "11px", letterSpacing: "1px" }}>TOLL FREE HELPLINE:</strong>
                <a href="tel:+911800123456" style={{ color: "#ffffff", textDecoration: "none", fontWeight: "700" }}>1800-123-4567</a>
              </div>
              <div>
                <strong style={{ color: "#93c5fd", display: "block", fontSize: "11px", letterSpacing: "1px" }}>HEADQUARTERS:</strong>
                <span>Thermal Lexum Innovation Hub, Tech City</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div style={{ paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.15)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", fontSize: "13px", color: "#94a3b8" }}>
          <div>
            © 2026 All Rights Reserved by Thermal Lexum.
          </div>
          <div>
            Designed & Powered by <span style={{ color: "#ffffff", fontWeight: "700" }}>Tech Maxsize</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
