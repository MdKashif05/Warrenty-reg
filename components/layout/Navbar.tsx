"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const nesaCoursesList = [
  { slug: "nesa-fluent-english-level-1", name: "NESA Fluent English Level 1", badge: "POPULAR", price: "₹4,999", lessons: 12, students: 240, desc: "Comprehensive spoken English training focused on grammar, vocabulary & sentence framing." },
  { slug: "nesa-fluent-english-level-2", name: "NESA Fluent English Level 2", badge: "ADVANCED", price: "₹5,999", lessons: 15, students: 180, desc: "Immersive learning experience to enhance communication skills and public speaking." },
  { slug: "nesa-english-foundation", name: "NESA English Foundation", badge: "BEGINNER", price: "₹3,999", lessons: 10, students: 310, desc: "Build strong fundamental English grammar, reading comprehension, and pronunciation." },
  { slug: "spoken-english-competency", name: "NESA Professional English Course", badge: "CAREER", price: "₹6,999", lessons: 18, students: 140, desc: "Empower sentence formation, professional vocabulary, email writing & interview mastery." },
  { slug: "spoken-english-proficiency", name: "NESA Spoken English Advance", badge: "PRO", price: "₹7,999", lessons: 20, students: 195, desc: "Master accent neutralization, fluent debate, group discussions and voice modulation." },
  { slug: "nesa-addons", name: "NESA Corporate English Course", badge: "BUSINESS", price: "₹8,999", lessons: 16, students: 290, desc: "Executive communication, presentation skills, business negotiations & corporate etiquette." },
  { slug: "nesa-kids", name: "NESA English Course for Kids", badge: "KIDS", price: "₹3,499", lessons: 12, students: 420, desc: "Fun, interactive story-telling and phonics sessions designed specifically for young learners." },
  { slug: "nesa-domestic", name: "NESA Domestic English Course", badge: "DAILY LIFE", price: "₹2,999", lessons: 9, students: 116, desc: "Practical everyday English for household, shopping, social interactions and family converse." },
  { slug: "nesa-summer-camp", name: "NESA English Summer Camp", badge: "SPECIAL", price: "₹3,999", lessons: 8, students: 85, desc: "Accelerated summer workshop for drama, public speaking and creative writing." },
  { slug: "nesa-ielts", name: "NESA IELTS Preparation", badge: "EXAM", price: "₹9,999", lessons: 24, students: 520, desc: "Target 8+ band score with intensive Speaking, Listening, Reading & Writing mock drills." },
  { slug: "nesa-job-skills", name: "NESA Job Skills & Interviewing", badge: "INTERVIEW", price: "₹4,999", lessons: 12, students: 290, desc: "Resume building, GD preparation, body language, and mock interview coaching." },
  { slug: "nesa-businesspro", name: "NESA BusinessPro", badge: "EXECUTIVE", price: "₹11,999", lessons: 22, students: 165, desc: "High-level leadership communication, client pitching and global cross-cultural fluency." },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
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
      {/* Top Notification Bar */}
      <div style={{ background: "#0E4D92", color: "#ffffff", padding: "6px 16px", fontSize: "12px", textAlign: "center", fontWeight: "600" }}>
        🎓 Admissions Open 2026: Join NESA English Speaking & IELTS Batches! <Link href="/courses" style={{ color: "#ffd166", textDecoration: "underline", marginLeft: "6px", fontWeight: "700" }}>Register Free Now →</Link>
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
        {/* LOGO */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ background: "#0E4D92", color: "#ffffff", padding: "8px 14px", borderRadius: "10px", fontWeight: "900", fontSize: "20px", fontFamily: "Outfit, sans-serif", letterSpacing: "1px" }}>
            NESA
          </div>
          <div>
            <div style={{ fontWeight: "800", fontSize: "16px", color: "#0E4D92", lineHeight: "1", letterSpacing: "-0.5px" }}>NESA INSTITUTE</div>
            <div style={{ fontSize: "10px", color: "#64748b", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase" }}>Let's Speak in English</div>
          </div>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }} className="hidden lg:flex">
          <Link href="/" style={{ padding: "8px 14px", color: pathname === "/" ? "#0E4D92" : "#334155", fontWeight: pathname === "/" ? "800" : "600", textDecoration: "none", fontSize: "14px" }}>
            Home
          </Link>

          {/* Courses Dropdown */}
          <div
            style={{ position: "relative" }}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <Link href="/courses" style={{ padding: "8px 14px", color: pathname.startsWith("/courses") ? "#0E4D92" : "#334155", fontWeight: "700", textDecoration: "none", fontSize: "14px", display: "inline-flex", alignItems: "center", gap: "4px" }}>
              All Courses <span style={{ fontSize: "10px" }}>▼</span>
            </Link>

            {dropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  width: "360px",
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "14px",
                  boxShadow: "0 16px 36px rgba(0,0,0,0.12)",
                  padding: "12px",
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "4px",
                  maxHeight: "440px",
                  overflowY: "auto",
                }}
              >
                {nesaCoursesList.map((course) => (
                  <Link
                    key={course.slug}
                    href={`/courses/${course.slug}`}
                    style={{
                      padding: "10px 12px",
                      borderRadius: "8px",
                      textDecoration: "none",
                      color: "#0f172a",
                      fontSize: "13px",
                      fontWeight: "600",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#f0fcff"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                  >
                    <span>{course.name}</span>
                    <span style={{ fontSize: "11px", color: "#0E4D92", fontWeight: "800" }}>{course.price}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/about" style={{ padding: "8px 14px", color: pathname === "/about" ? "#0E4D92" : "#334155", fontWeight: pathname === "/about" ? "800" : "600", textDecoration: "none", fontSize: "14px" }}>
            About Us
          </Link>
          <Link href="/why-nesa" style={{ padding: "8px 14px", color: pathname === "/why-nesa" ? "#0E4D92" : "#334155", fontWeight: pathname === "/why-nesa" ? "800" : "600", textDecoration: "none", fontSize: "14px" }}>
            Why NESA
          </Link>
          <Link href="/testimonials" style={{ padding: "8px 14px", color: pathname === "/testimonials" ? "#0E4D92" : "#334155", fontWeight: pathname === "/testimonials" ? "800" : "600", textDecoration: "none", fontSize: "14px" }}>
            Testimonials
          </Link>
          <Link href="/contact" style={{ padding: "8px 14px", color: pathname === "/contact" ? "#0E4D92" : "#334155", fontWeight: pathname === "/contact" ? "800" : "600", textDecoration: "none", fontSize: "14px" }}>
            Contact Us
          </Link>
        </div>

        {/* DESKTOP CTAS */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }} className="hidden lg:flex">
          <Link href="/account/login" className="btn-secondary" style={{ padding: "10px 18px", fontSize: "13px" }}>
            Student Login
          </Link>
          <Link href="/register" className="btn-primary" style={{ padding: "10px 20px", fontSize: "13px" }}>
            Enroll Now 🚀
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <div className="flex lg:hidden" style={{ alignItems: "center", gap: "8px" }}>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Navigation"
            style={{
              padding: "8px 12px",
              background: "#0E4D92",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              fontWeight: "700",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            {mobileOpen ? "✕ Close" : "☰ Menu"}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div style={{ background: "#ffffff", borderTop: "1px solid #e2e8f0", padding: "16px", display: "flex", flexDirection: "column", gap: "8px", maxHeight: "calc(100vh - 100px)", overflowY: "auto" }}>
          <Link href="/" style={{ padding: "12px", fontWeight: "700", color: "#0E4D92", textDecoration: "none", borderBottom: "1px solid #f1f5f9" }}>🏠 Home</Link>
          <Link href="/courses" style={{ padding: "12px", fontWeight: "700", color: "#0f172a", textDecoration: "none", borderBottom: "1px solid #f1f5f9" }}>📚 Explore All Courses</Link>
          <div style={{ padding: "8px 12px", fontSize: "11px", fontWeight: "800", color: "#64748b", letterSpacing: "1px" }}>POPULAR COURSES:</div>
          {nesaCoursesList.slice(0, 6).map((c) => (
            <Link key={c.slug} href={`/courses/${c.slug}`} style={{ padding: "8px 16px", fontSize: "13px", color: "#334155", textDecoration: "none" }}>
              • {c.name}
            </Link>
          ))}
          <Link href="/about" style={{ padding: "12px", fontWeight: "700", color: "#0f172a", textDecoration: "none", borderBottom: "1px solid #f1f5f9" }}>ℹ️ About Us</Link>
          <Link href="/why-nesa" style={{ padding: "12px", fontWeight: "700", color: "#0f172a", textDecoration: "none", borderBottom: "1px solid #f1f5f9" }}>⭐ Why NESA</Link>
          <Link href="/testimonials" style={{ padding: "12px", fontWeight: "700", color: "#0f172a", textDecoration: "none", borderBottom: "1px solid #f1f5f9" }}>💬 Student Reviews</Link>
          <Link href="/contact" style={{ padding: "12px", fontWeight: "700", color: "#0f172a", textDecoration: "none", borderBottom: "1px solid #f1f5f9" }}>📞 Contact Us</Link>
          <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
            <Link href="/account/login" className="btn-secondary" style={{ flex: 1, textAlign: "center", justifyContent: "center" }}>Login</Link>
            <Link href="/register" className="btn-primary" style={{ flex: 1, textAlign: "center", justifyContent: "center" }}>Enroll Free</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
