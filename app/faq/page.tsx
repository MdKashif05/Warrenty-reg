"use client";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

const faqs = [
  {
    category: "Warranty Registration",
    items: [
      {
        q: "How do I register my Thermal Lexum product?",
        a: "Visit the Warranty Registration page, enter your product serial number (found on the product packaging), verify your product, fill in your personal and purchase details, upload a proof of purchase, and submit. You will receive a confirmation email with your warranty certificate.",
      },
      {
        q: "Where can I find my product serial number?",
        a: "The serial number is printed on the product packaging label. It typically follows the format TLX-XXXX-XXXX. Check the bottom or back panel of the packaging box.",
      },
      {
        q: "What documents do I need to register my warranty?",
        a: "You need: (1) Your product serial number, (2) Proof of purchase (invoice or receipt), and (3) Your contact details including a valid email address.",
      },
      {
        q: "How long do I have to register my warranty after purchase?",
        a: "You should register your product warranty within 30 days of purchase to ensure your warranty is activated. Late registrations may be subject to review.",
      },
      {
        q: "Can I register multiple products?",
        a: "Yes, each product with a unique serial number can be registered separately through the warranty registration portal.",
      },
    ],
  },
  {
    category: "Warranty Coverage",
    items: [
      {
        q: "What does the Thermal Lexum warranty cover?",
        a: "Our warranty covers manufacturing defects and material failures under normal operating conditions. Please refer to the Warranty Terms page for complete coverage details.",
      },
      {
        q: "How do I check my warranty status?",
        a: "Visit the Warranty Lookup page and enter your Registration ID or serial number to view your current warranty status, expiry date, and registration details.",
      },
      {
        q: "What is not covered by the warranty?",
        a: "The warranty does not cover: damage caused by improper application, physical damage, contamination, use outside recommended specifications, or unauthorized modifications. See our Warranty Terms for full details.",
      },
    ],
  },
  {
    category: "Technical",
    items: [
      {
        q: "My serial number shows as invalid. What should I do?",
        a: "Ensure you are entering the serial number exactly as printed, including any hyphens. If the issue persists, contact our support team at info@thermallexum.com with a photo of your product packaging.",
      },
      {
        q: "My serial number shows as already registered. What should I do?",
        a: "If you purchased the product as new but the serial number appears already registered, please contact us immediately at info@thermallexum.com with your purchase proof for investigation.",
      },
      {
        q: "I did not receive my warranty confirmation email. What should I do?",
        a: "Check your spam folder first. If not found, log in to our warranty lookup portal using your Registration ID. If you need further assistance, contact info@thermallexum.com.",
      },
    ],
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderBottom: "1px solid #e2e8f0",
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: "16px",
        }}
        aria-expanded={open}
      >
        <span style={{ fontSize: "16px", fontWeight: "700", color: open ? "#0284c7" : "#0f172a", transition: "color 0.2s", lineHeight: "1.4" }}>{q}</span>
        <div
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            border: `1px solid ${open ? "#0284c7" : "#cbd5e1"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            color: open ? "#0284c7" : "#64748b",
            transition: "all 0.2s",
            background: open ? "rgba(2, 132, 199, 0.08)" : "transparent",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </div>
      </button>
      {open && (
        <div style={{ paddingBottom: "20px" }}>
          <p style={{ fontSize: "15px", color: "#475569", lineHeight: "1.8" }}>{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#ffffff", minHeight: "100vh" }}>
        <section className="page-hero bg-grid" style={{ background: "radial-gradient(circle at 50% 0%, rgba(2, 132, 199, 0.08) 0%, #ffffff 80%)", borderBottom: "1px solid #e2e8f0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            <div className="section-label" style={{ marginBottom: "16px" }}>HELP CENTER</div>
            <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: "900", letterSpacing: "-2px", color: "#0f172a", marginBottom: "16px" }}>
              Frequently Asked<br />
              <span className="text-gradient">Questions.</span>
            </h1>
            <p style={{ fontSize: "16px", color: "#475569", maxWidth: "480px" }}>
              Everything you need to know about Thermal Lexum products, warranty registration, and support.
            </p>
          </div>
          <div className="thermal-bar" style={{ marginTop: "48px" }} />
        </section>

        <section style={{ padding: "80px 24px", background: "#ffffff" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            {faqs.map((section) => (
              <div key={section.category} style={{ marginBottom: "64px" }}>
                <div
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "12px",
                    letterSpacing: "3px",
                    color: "#0284c7",
                    marginBottom: "24px",
                    paddingBottom: "16px",
                    borderBottom: "2px solid #e2e8f0",
                    fontWeight: "800"
                  }}
                >
                  {section.category.toUpperCase()}
                </div>
                {section.items.map((item) => (
                  <FaqItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            ))}

            <div
              className="brand-card"
              style={{ padding: "40px", textAlign: "center", marginTop: "32px", background: "#ffffff", border: "1px solid #e2e8f0" }}
            >
              <h3 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", marginBottom: "12px" }}>Still Have Questions?</h3>
              <p style={{ fontSize: "14px", color: "#475569", marginBottom: "24px" }}>Our support team is ready to help you with any questions not covered above.</p>
              <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
                <Link href="/contact" className="btn-primary">Contact Support</Link>
                <a href="mailto:info@thermallexum.com" className="btn-secondary">Email Us</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
