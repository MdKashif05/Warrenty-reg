"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

function ThermalParticle({ x, y, size, delay }: { x: number; y: number; size: number; delay: number }) {
  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background: "#0284c7",
        boxShadow: "0 0 10px rgba(2, 132, 199, 0.4)",
        opacity: 0,
        animation: `fadeIn 2.5s ease-out ${delay}s infinite alternate`,
        filter: "blur(0.5px)",
      }}
    />
  );
}

const products = [
  {
    id: 1,
    name: "LX-TIM Series",
    category: "THERMAL PASTE",
    label: "THERMAL_PASTE",
    desc: "Ultra-high performance thermal compound engineered for extreme heat dissipation in high-TDP processors and graphics cards.",
    specs: ["14.2 W/mK Thermal Conductivity", "Non-Electrically Conductive", "Zero Dry-Out Technology"],
    color: "#0284c7",
  },
  {
    id: 2,
    name: "LX-LM Series",
    category: "LIQUID METAL",
    label: "LIQUID_METAL",
    desc: "Next-generation liquid metal alloy thermal interface material for delidded CPUs, custom loops, and hardcore overclockers.",
    specs: ["73 W/mK Thermal Transfer", "100% Gallium Alloy Matrix", "Maximum Heat Flow"],
    color: "#2563eb",
  },
  {
    id: 3,
    name: "LX-PAD Series",
    category: "THERMAL PADS",
    label: "THERMAL PADS",
    desc: "Premium phase-change thermal pads designed for uniform compression and heat bridge across VRAM and VRM components.",
    specs: ["15.0 W/mK Conductivity", "Multi-Thickness Options", "High Compressibility"],
    color: "#0d9488",
  },
];

const stats = [
  { value: "50K+", label: "Systems Cooled" },
  { value: "35+", label: "Global Distributors" },
  { value: "99.4%", label: "Satisfaction Rate" },
  { value: "12 Months", label: "Warranty Backed" },
];

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      <Navbar />
      <main style={{ background: "#ffffff" }}>
        {/* HERO SECTION */}
        <section
          style={{
            minHeight: "85vh",
            background: "radial-gradient(circle at 50% -10%, rgba(56, 189, 248, 0.14) 0%, rgba(37, 99, 235, 0.04) 50%, #ffffff 85%)",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
          }}
          className="bg-grid hero-container"
        >
          {/* Ambient Light Orbs */}
          <div
            style={{
              position: "absolute",
              top: "15%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",
              maxWidth: "900px",
              height: "450px",
              background: "radial-gradient(ellipse, rgba(56, 189, 248, 0.18) 0%, rgba(37, 99, 235, 0.05) 50%, transparent 75%)",
              pointerEvents: "none",
              filter: "blur(40px)"
            }}
          />

          {/* Thermal particles */}
          {mounted && [
            { x: 12, y: 25, size: 4, delay: 0 },
            { x: 82, y: 18, size: 5, delay: 0.5 },
            { x: 65, y: 68, size: 4, delay: 1 },
            { x: 22, y: 55, size: 6, delay: 1.5 },
            { x: 92, y: 48, size: 4, delay: 2 },
          ].map((p, i) => <ThermalParticle key={i} {...p} />)}

          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              padding: "110px 16px 50px",
              position: "relative",
              zIndex: 1,
              width: "100%",
            }}
          >
            {/* Eyebrow */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(2, 132, 199, 0.08)",
                border: "1px solid rgba(2, 132, 199, 0.25)",
                borderRadius: "100px",
                padding: "6px 14px",
                marginBottom: "20px",
                backdropFilter: "blur(12px)",
                maxWidth: "100%",
              }}
            >
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#0284c7", boxShadow: "0 0 8px #0284c7", flexShrink: 0 }} />
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "10px", letterSpacing: "1.5px", color: "#0284c7", fontWeight: "700" }}>
                EXTREME THERMAL DISSIPATION SCIENCE
              </span>
            </div>

            {/* Main Headline */}
            <h1
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "clamp(30px, 6.5vw, 84px)",
                fontWeight: "900",
                lineHeight: "1.08",
                letterSpacing: "-1.5px",
                color: "#0f172a",
                marginBottom: "20px",
                maxWidth: "850px",
                wordBreak: "break-word",
              }}
            >
              ENGINEERED FOR{" "}
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #0284c7 0%, #2563eb 50%, #4f46e5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}
              >
                UNSTOPPABLE
              </span>
              <br />
              PERFORMANCE.
            </h1>

            <p
              style={{
                fontSize: "clamp(14px, 4vw, 18px)",
                color: "#475569",
                lineHeight: "1.6",
                maxWidth: "580px",
                marginBottom: "32px",
              }}
            >
              Thermal Lexum develops high-conductivity thermal interface compounds for gamers, overclockers, and workstation professionals who demand zero thermal throttling.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link href="/products" className="btn-primary" style={{ padding: "14px 28px", fontSize: "13px" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
                Explore Products
              </Link>
              <Link href="/warranty/register" className="btn-secondary" style={{ padding: "14px 24px", fontSize: "13px" }}>
                Register Warranty (12 Months)
              </Link>
            </div>

            {/* Stats row */}
            <div
              className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-slate-200 rounded-2xl overflow-hidden border border-slate-200 shadow-sm max-w-[680px] mt-10 w-full"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    background: "#ffffff",
                    padding: "16px 12px",
                    textAlign: "center"
                  }}
                >
                  <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(18px, 4vw, 24px)", fontWeight: "800", color: "#0284c7", marginBottom: "2px" }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: "9px", letterSpacing: "0.5px", color: "#64748b", textTransform: "uppercase", fontWeight: "700" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Visual Graphic */}
          <div
            className="hidden lg:block"
            style={{
              position: "absolute",
              right: "5%",
              top: "50%",
              transform: "translateY(-50%)",
              width: "440px",
              height: "440px",
              opacity: 0.25,
              pointerEvents: "none"
            }}
          >
            <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="200,10 380,110 380,290 200,390 20,290 20,110" stroke="#0284c7" strokeWidth="1.5" fill="none"/>
              <polygon points="200,50 340,130 340,270 200,350 60,270 60,130" stroke="#2563eb" strokeWidth="1" fill="none"/>
              <polygon points="200,90 300,150 300,250 200,310 100,250 100,150" stroke="#0284c7" strokeWidth="0.8" fill="none"/>
              <circle cx="200" cy="200" r="60" stroke="#0284c7" strokeWidth="1" fill="rgba(2,132,199,0.06)"/>
            </svg>
          </div>

          <div className="thermal-bar" style={{ position: "absolute", bottom: 0, left: 0, right: 0 }} />
        </section>

        {/* OFFICIAL BRAND BANNER SHOWCASE */}
        <section style={{ padding: "32px 16px", background: "#0f172a" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div
              className="banner-wrapper"
              style={{
                position: "relative",
                width: "100%",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid #334155",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4)"
              }}
            >
              <Image
                src="/banner.png"
                alt="Thermal Lexum - Maximum Cooling Official Banner"
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>
          </div>
        </section>

        {/* FOUNDER SPOTLIGHT BANNER ON HOME PAGE */}
        <section style={{ padding: "50px 16px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div
              className="brand-card grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 md:gap-10 items-center p-5 sm:p-8"
              style={{
                background: "#ffffff",
                border: "1px solid #cbd5e1",
                boxShadow: "0 15px 35px rgba(0,0,0,0.04)"
              }}
            >
              <div style={{ position: "relative", width: "160px", height: "180px", borderRadius: "16px", overflow: "hidden", border: "3px solid #0284c7", margin: "0 auto" }}>
                <Image
                  src="/founder.png"
                  alt="Javed Shaikh - Founder & CEO"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                />
              </div>

              <div>
                <div className="section-label" style={{ marginBottom: "8px" }}>FOUNDER'S MESSAGE</div>
                <h3 style={{ fontSize: "clamp(20px, 4vw, 28px)", fontWeight: "900", color: "#0f172a", marginBottom: "12px", letterSpacing: "-0.5px" }}>
                  “We don’t sell products. We sell confidence.”
                </h3>
                <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.6", marginBottom: "16px" }}>
                  Read the founder's message by <strong>Javed Shaikh</strong> on liquid metal to liquid courage, thermal paste to trusted performance, and our commitment to zero compromise.
                </p>
                <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
                  <Link href="/founder" className="btn-primary" style={{ padding: "10px 20px", fontSize: "12px" }}>
                    Read Message
                  </Link>
                  <span style={{ fontSize: "13px", color: "#0284c7", fontWeight: "700" }}>— Javed Shaikh, Founder & CEO</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCTS PREVIEW */}
        <section style={{ padding: "60px 16px", background: "#ffffff" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <div className="section-label" style={{ marginBottom: "12px" }}>HIGH PERFORMANCE LINEUP</div>
              <h2 style={{ fontSize: "clamp(26px, 5vw, 48px)", fontWeight: "800", letterSpacing: "-1px", color: "#0f172a", marginBottom: "12px" }}>
                Precision Thermal Interface Solutions
              </h2>
              <p style={{ fontSize: "14px", color: "#475569", maxWidth: "580px", margin: "0 auto" }}>
                Formulated to maximize heat transfer efficiency and component lifespan across high-draw computing rigs.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products?category=${product.label}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className="brand-card"
                    style={{
                      padding: "24px",
                      cursor: "pointer",
                      position: "relative",
                      overflow: "hidden",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between"
                    }}
                  >
                    {/* Top Accent line */}
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: product.color }} />

                    <div>
                      {/* Category badge */}
                      <div
                        style={{
                          display: "inline-block",
                          padding: "4px 10px",
                          borderRadius: "20px",
                          background: `rgba(${product.color === "#0284c7" ? "2,132,199" : product.color === "#2563eb" ? "37,99,235" : "13,148,136"},0.1)`,
                          border: `1px solid rgba(${product.color === "#0284c7" ? "2,132,199" : product.color === "#2563eb" ? "37,99,235" : "13,148,136"},0.3)`,
                          fontFamily: "JetBrains Mono, monospace",
                          fontSize: "10px",
                          letterSpacing: "1px",
                          color: product.color,
                          marginBottom: "14px",
                          fontWeight: "700"
                        }}
                      >
                        {product.category}
                      </div>

                      <h3 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", marginBottom: "10px" }}>
                        {product.name}
                      </h3>
                      <p style={{ fontSize: "13px", color: "#475569", lineHeight: "1.6", marginBottom: "20px" }}>
                        {product.desc}
                      </p>

                      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
                        {product.specs.map((spec) => (
                          <li key={spec} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#334155", fontWeight: "500" }}>
                            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: product.color, flexShrink: 0 }} />
                            {spec}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: product.color, fontWeight: "700" }}>
                      View Specifications
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <Link href="/products" className="btn-secondary" style={{ padding: "12px 28px" }}>
                View Complete Catalog
              </Link>
            </div>
          </div>
        </section>

        {/* WARRANTY & AUTHENTICITY SECTION */}
        <section
          style={{
            padding: "60px 16px",
            background: "#f8fafc",
            position: "relative",
            borderTop: "1px solid #e2e8f0",
            borderBottom: "1px solid #e2e8f0"
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
            >
              <div>
                <div className="section-label" style={{ marginBottom: "12px" }}>DIGITAL WARRANTY PORTAL</div>
                <h2 style={{ fontSize: "clamp(26px, 4.5vw, 48px)", fontWeight: "800", letterSpacing: "-1px", color: "#0f172a", marginBottom: "16px" }}>
                  100% Authenticity.<br />Guaranteed Coverage.
                </h2>
                <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.6", marginBottom: "28px" }}>
                  Every genuine Thermal Lexum product carries a unique anti-counterfeit serial code. Verify your product authenticity and register for 12-month replacement warranty in seconds.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
                  {[
                    { step: "01", title: "Scan Serial Number / Order ID", desc: "Locate the serial code on your box label or enter your retailer Order ID." },
                    { step: "02", title: "Instant Cryptographic Verification", desc: "Our database verifies origin & batch manufacturing parameters in real time." },
                    { step: "03", title: "Claim 12-Month Warranty", desc: "Get your digital certificate emailed instantly with 12 months guarantee." }
                  ].map((item) => (
                    <div key={item.step} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "8px",
                          background: "rgba(2, 132, 199, 0.1)",
                          border: "1px solid rgba(2, 132, 199, 0.25)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "JetBrains Mono, monospace",
                          fontSize: "11px",
                          color: "#0284c7",
                          fontWeight: "700",
                          flexShrink: 0,
                        }}
                      >
                        {item.step}
                      </div>
                      <div>
                        <div style={{ fontSize: "14px", fontWeight: "700", color: "#0f172a", marginBottom: "2px" }}>{item.title}</div>
                        <div style={{ fontSize: "12px", color: "#64748b" }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <Link href="/warranty/register" className="btn-primary" style={{ padding: "14px 24px", fontSize: "13px" }}>
                    Register Warranty Now
                  </Link>
                  <Link href="/warranty/lookup" className="btn-secondary" style={{ padding: "14px 24px", fontSize: "13px" }}>
                    Verify Serial Code
                  </Link>
                </div>
              </div>

              {/* Warranty Card Graphic */}
              <div style={{ position: "relative" }}>
                <div
                  className="brand-card glow-cyan"
                  style={{
                    padding: "24px 18px",
                    borderRadius: "20px",
                    position: "relative",
                    background: "#ffffff",
                    border: "1px solid #cbd5e1"
                  }}
                >
                  <div className="thermal-bar" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "8px",
                      marginBottom: "20px",
                      borderBottom: "1px solid #f1f5f9",
                      paddingBottom: "14px"
                    }}
                  >
                    <div>
                      <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "15px", fontWeight: "900", letterSpacing: "1px", color: "#0f172a" }}>
                        THERMAL <span style={{ color: "#0284c7" }}>LEXUM</span>
                      </div>
                      <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "9px", letterSpacing: "1px", color: "#0284c7", marginTop: "2px", fontWeight: "700" }}>
                        OFFICIAL WARRANTY CERTIFICATE
                      </div>
                    </div>
                    <span className="badge badge-active">12 MONTHS VALID</span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
                    {[
                      { label: "Product", val: "Thermal Lexum LX-TIM Pro" },
                      { label: "Warranty Period", val: "12 Months (1 Year)" },
                      { label: "Coverage", val: "Full Replacement Guarantee" },
                      { label: "Verification", val: "Cryptographic Hash Verified" },
                    ].map((row) => (
                      <div key={row.label} style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "4px", fontSize: "12px", borderBottom: "1px solid #f8fafc", paddingBottom: "6px" }}>
                        <span style={{ color: "#64748b" }}>{row.label}</span>
                        <span style={{ color: "#0f172a", fontWeight: "700", textAlign: "right" }}>{row.val}</span>
                      </div>
                    ))}
                  </div>

                  <div
                    style={{
                      padding: "12px 14px",
                      background: "#f8fafc",
                      borderRadius: "10px",
                      border: "1px solid #e2e8f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "8px"
                    }}
                  >
                    <div style={{ fontSize: "11px", color: "#64748b" }}>
                      Instant PDF Certificate Download
                    </div>
                    <span style={{ fontSize: "11px", color: "#0284c7", fontWeight: "700" }}>Available On Registration →</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <style>{`
        .banner-wrapper {
          aspect-ratio: 3.2 / 1;
          min-height: 200px;
        }
        @media (max-width: 640px) {
          .banner-wrapper {
            aspect-ratio: 2 / 1 !important;
            min-height: 150px !important;
          }
        }
      `}</style>
    </>
  );
}
