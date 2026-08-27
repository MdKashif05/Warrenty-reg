"use client";
import React from "react";
import Link from "next/link";
import { nesaCoursesList } from "./Navbar";

export default function Footer() {
  return (
    <footer style={{ background: "#0E4D92", color: "#ffffff", borderTop: "4px solid #ffd166" }} role="contentinfo">
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px 20px 32px" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10" style={{ marginBottom: "48px" }}>
          {/* Col 1: Brand Info */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{ background: "#ffffff", color: "#0E4D92", padding: "6px 12px", borderRadius: "8px", fontWeight: "900", fontSize: "20px" }}>
                NESA
              </div>
              <div style={{ fontWeight: "800", fontSize: "16px", color: "#ffffff" }}>NESA INSTITUTE</div>
            </div>
            <div style={{ fontSize: "12px", color: "#93c5fd", fontWeight: "700", letterSpacing: "1px", marginBottom: "16px" }}>
              LET'S SPEAK IN ENGLISH
            </div>
            <p style={{ fontSize: "14px", color: "#e2e8f0", lineHeight: "1.7", marginBottom: "20px" }}>
              Unlock your English fluency at NESA: The premier English speaking center where language mastery comes to life. Interactive sessions, expert guidance, and tailored programs.
            </p>
            <div style={{ fontSize: "13px", color: "#ffd166", fontWeight: "700" }}>
              📍 Spoken English & IELTS Excellence
            </div>
          </div>

          {/* Col 2: Popular Courses */}
          <div>
            <h4 style={{ fontSize: "15px", fontWeight: "800", color: "#ffffff", marginBottom: "20px", textTransform: "uppercase", letterSpacing: "1px" }}>
              Popular Courses
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", padding: 0 }}>
              {nesaCoursesList.slice(0, 6).map((c) => (
                <li key={c.slug}>
                  <Link href={`/courses/${c.slug}`} style={{ color: "#cbd5e1", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "#ffffff"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "#cbd5e1"}
                  >
                    • {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h4 style={{ fontSize: "15px", fontWeight: "800", color: "#ffffff", marginBottom: "20px", textTransform: "uppercase", letterSpacing: "1px" }}>
              Quick Navigation
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", padding: 0 }}>
              {[
                { label: "Home Page", href: "/" },
                { label: "About NESA", href: "/about" },
                { label: "Why Choose Us", href: "/why-nesa" },
                { label: "Student Testimonials", href: "/testimonials" },
                { label: "IELTS Preparation", href: "/courses/nesa-ielts" },
                { label: "Corporate English", href: "/courses/nesa-addons" },
                { label: "Contact Us", href: "/contact" },
                { label: "Student Portal Login", href: "/account/login" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} style={{ color: "#cbd5e1", textDecoration: "none", fontSize: "14px" }}>
                    → {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Enquiry */}
          <div>
            <h4 style={{ fontSize: "15px", fontWeight: "800", color: "#ffffff", marginBottom: "20px", textTransform: "uppercase", letterSpacing: "1px" }}>
              Contact NESA
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "14px", color: "#e2e8f0" }}>
              <div>
                <strong style={{ color: "#93c5fd", display: "block", fontSize: "11px", letterSpacing: "1px" }}>EMAIL ADMISSIONS:</strong>
                <a href="mailto:admissions@nesainstitute.com" style={{ color: "#ffffff", textDecoration: "none", fontWeight: "600" }}>admissions@nesainstitute.com</a>
              </div>
              <div>
                <strong style={{ color: "#93c5fd", display: "block", fontSize: "11px", letterSpacing: "1px" }}>HELP DESK / CALL:</strong>
                <a href="tel:+919876543210" style={{ color: "#ffffff", textDecoration: "none", fontWeight: "700" }}>+91 98765 43210</a>
              </div>
              <div>
                <strong style={{ color: "#93c5fd", display: "block", fontSize: "11px", letterSpacing: "1px" }}>CAMPUS ADDRESS:</strong>
                <span>NESA Language Hub, Main Boulevard, Education City Campus</span>
              </div>
              <div style={{ marginTop: "10px" }}>
                <Link href="/contact" className="btn-primary" style={{ background: "#ffffff", color: "#0E4D92", padding: "10px 18px", fontSize: "13px", fontWeight: "800" }}>
                  Enquire Now 📝
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & Tech Maxsize credit */}
        <div style={{ paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.15)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", fontSize: "13px", color: "#94a3b8" }}>
          <div>
            © 2026 All Rights Reserved by NESA Institute.
          </div>
          <div>
            Designed & Powered by <span style={{ color: "#ffffff", fontWeight: "700" }}>Tech Maxsize</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
