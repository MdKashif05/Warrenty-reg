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
  { value: "5 Years", label: "Warranty Backed" },
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
            minHeight: "100vh",
            background: "radial-gradient(circle at 50% -10%, rgba(56, 189, 248, 0.14) 0%, rgba(37, 99, 235, 0.04) 50%, #ffffff 85%)",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
          }}
          className="bg-grid"
        >
          {/* Ambient Light Orbs */}
          <div
            style={{
              position: "absolute",
              top: "15%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "900px",
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
              padding: "140px 24px 90px",
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
                gap: "10px",
                background: "rgba(2, 132, 199, 0.08)",
                border: "1px solid rgba(2, 132, 199, 0.25)",
                borderRadius: "100px",
                padding: "6px 18px",
                marginBottom: "32px",
                backdropFilter: "blur(12px)"
              }}
            >
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#0284c7", boxShadow: "0 0 8px #0284c7" }} />
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", letterSpacing: "3px", color: "#0284c7", fontWeight: "700" }}>
                EXTREME THERMAL DISSIPATION SCIENCE
              </span>
            </div>

            {/* Main Headline */}
            <h1
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "clamp(48px, 8vw, 92px)",
                fontWeight: "900",
                lineHeight: "1.02",
                letterSpacing: "-3px",
                color: "#0f172a",
                marginBottom: "28px",
                maxWidth: "850px",
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
                fontSize: "19px",
                color: "#475569",
                lineHeight: "1.7",
                maxWidth: "580px",
                marginBottom: "48px",
              }}
            >
              Thermal Lexum develops high-conductivity thermal interface compounds for gamers, overclockers, and workstation professionals who demand zero thermal throttling.
            </p>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Link href="/products" className="btn-primary" style={{ padding: "16px 36px", fontSize: "13px" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
                Explore Products
              </Link>
              <Link href="/warranty/register" className="btn-secondary" style={{ padding: "16px 32px", fontSize: "13px" }}>
                Register Warranty
              </Link>
            </div>

            {/* Stats row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "1px",
                maxWidth: "680px",
                marginTop: "72px",
                background: "#e2e8f0",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid #cbd5e1",
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
              }}
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    background: "#ffffff",
                    padding: "22px 18px",
                    textAlign: "center"
                  }}
                >
                  <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "24px", fontWeight: "800", color: "#0284c7", marginBottom: "4px" }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: "10px", letterSpacing: "1px", color: "#64748b", textTransform: "uppercase", fontWeight: "700" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Visual Graphic */}
          <div
            className="hide-mobile"
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

        {/* FOUNDER SPOTLIGHT BANNER ON HOME PAGE */}
        <section style={{ padding: "80px 24px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div
              className="brand-card"
              style={{
                padding: "40px",
                display: "grid",
                gridTemplateColumns: "220px 1fr",
                gap: "40px",
                alignItems: "center",
                background: "#ffffff",
                border: "1px solid #cbd5e1",
                boxShadow: "0 15px 35px rgba(0,0,0,0.04)"
              }}
            >
              <div style={{ position: "relative", width: "200px", height: "220px", borderRadius: "16px", overflow: "hidden", border: "3px solid #0284c7" }}>
                <Image
                  src="/founder.png"
                  alt="Javed Shaikh - Founder & CEO"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                />
              </div>

              <div>
                <div className="section-label" style={{ marginBottom: "10px" }}>FOUNDER'S MESSAGE</div>
                <h3 style={{ fontSize: "28px", fontWeight: "900", color: "#0f172a", marginBottom: "12px", letterSpacing: "-0.5px" }}>
                  “We don’t sell products. We sell confidence.”
                </h3>
                <p style={{ fontSize: "15px", color: "#475569", lineHeight: "1.7", marginBottom: "20px" }}>
                  Read the founder's message by <strong>Javed Shaikh</strong> on liquid metal to liquid courage, thermal paste to trusted performance, and our commitment to zero compromise.
                </p>
                <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                  <Link href="/founder" className="btn-primary" style={{ padding: "12px 24px", fontSize: "12px" }}>
                    Read Message
                  </Link>
                  <span style={{ fontSize: "14px", color: "#0284c7", fontWeight: "700" }}>— Javed Shaikh, Founder & CEO</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCTS PREVIEW */}
        <section style={{ padding: "100px 24px", background: "#ffffff" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <div className="section-label" style={{ marginBottom: "16px" }}>HIGH PERFORMANCE LINEUP</div>
              <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: "800", letterSpacing: "-1.5px", color: "#0f172a", marginBottom: "16px" }}>
                Precision Thermal Interface Solutions
              </h2>
              <p style={{ fontSize: "16px", color: "#475569", maxWidth: "580px", margin: "0 auto" }}>
                Formulated to maximize heat transfer efficiency and component lifespan across high-draw computing rigs.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "28px" }}>
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products?category=${product.label}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className="brand-card"
                    style={{
                      padding: "36px",
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
                          padding: "4px 12px",
                          borderRadius: "20px",
                          background: `rgba(${product.color === "#0284c7" ? "2,132,199" : product.color === "#2563eb" ? "37,99,235" : "13,148,136"},0.1)`,
                          border: `1px solid rgba(${product.color === "#0284c7" ? "2,132,199" : product.color === "#2563eb" ? "37,99,235" : "13,148,136"},0.3)`,
                          fontFamily: "JetBrains Mono, monospace",
                          fontSize: "10px",
                          letterSpacing: "2px",
                          color: product.color,
                          marginBottom: "20px",
                          fontWeight: "700"
                        }}
                      >
                        {product.category}
                      </div>

                      <h3 style={{ fontSize: "26px", fontWeight: "800", color: "#0f172a", marginBottom: "14px" }}>
                        {product.name}
                      </h3>
                      <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.7", marginBottom: "28px" }}>
                        {product.desc}
                      </p>

                      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
                        {product.specs.map((spec) => (
                          <li key={spec} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "#334155", fontWeight: "500" }}>
                            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: product.color, flexShrink: 0 }} />
                            {spec}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: product.color, fontWeight: "700" }}>
                      View Specifications
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "56px" }}>
              <Link href="/products" className="btn-secondary" style={{ padding: "14px 32px" }}>
                View Complete Catalog
              </Link>
            </div>
          </div>
        </section>

        {/* WARRANTY & AUTHENTICITY SECTION */}
        <section
          style={{
            padding: "100px 24px",
            background: "#f8fafc",
            position: "relative",
            borderTop: "1px solid #e2e8f0",
            borderBottom: "1px solid #e2e8f0"
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "64px",
                alignItems: "center",
              }}
            >
              <div>
                <div className="section-label" style={{ marginBottom: "16px" }}>DIGITAL WARRANTY PORTAL</div>
                <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: "800", letterSpacing: "-1.5px", color: "#0f172a", marginBottom: "20px" }}>
                  100% Authenticity.<br />Guaranteed Coverage.
                </h2>
                <p style={{ fontSize: "16px", color: "#475569", lineHeight: "1.7", marginBottom: "40px" }}>
                  Every genuine Thermal Lexum product carries a unique encrypted serial code. Verify your product authenticity and activate your 5-year replacement warranty in seconds.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "18px", marginBottom: "40px" }}>
                  {[
                    { step: "01", title: "Scan Serial Number", desc: "Locate the anti-counterfeit serial code on your package" },
                    { step: "02", title: "Instant Cryptographic Verification", desc: "Our database verifies origin & batch manufacturing log" },
                    { step: "03", title: "Claim Digital Warranty", desc: "Get your digital certificate emailed instantly" },
                  ].map((item) => (
                    <div key={item.step} style={{ display: "flex", gap: "18px", alignItems: "flex-start" }}>
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "10px",
                          background: "rgba(2, 132, 199, 0.1)",
                          border: "1px solid rgba(2, 132, 199, 0.25)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "JetBrains Mono, monospace",
                          fontSize: "12px",
                          color: "#0284c7",
                          fontWeight: "700",
                          flexShrink: 0,
                        }}
                      >
                        {item.step}
                      </div>
                      <div>
                        <div style={{ fontSize: "15px", fontWeight: "700", color: "#0f172a", marginBottom: "2px" }}>{item.title}</div>
                        <div style={{ fontSize: "13px", color: "#64748b" }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", gap: "16px" }}>
                  <Link href="/warranty/register" className="btn-primary">
                    Register Warranty Now
                  </Link>
                  <Link href="/warranty/lookup" className="btn-secondary">
                    Verify Serial Code
                  </Link>
                </div>
              </div>

              {/* Warranty Card Graphic */}
              <div style={{ position: "relative" }}>
                <div
                  className="brand-card glow-cyan"
                  style={{
                    padding: "44px",
                    borderRadius: "24px",
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
                      marginBottom: "32px",
                    }}
                  >
                    <div>
                      <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "16px", fontWeight: "900", letterSpacing: "3px", color: "#0f172a" }}>THERMAL LEXUM</div>
                      <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "10px", letterSpacing: "2px", color: "#0284c7", marginTop: "4px", fontWeight: "700" }}>OFFICIAL WARRANTY CERTIFICATE</div>
                    </div>
                    <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "linear-gradient(135deg, #0284c7 0%, #2563eb 100%)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff" }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ margin: "auto" }}>
                        <path d="M9 12l2 2 4-4"/><path d="M12 2l2.09 3.95L18 6.5l-2.64 3.31.53 4.19-3.89-1.85L8.11 14l.53-4.19L6 6.5l3.91-.55z"/>
                      </svg>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "32px" }}>
                    {[
                      { label: "Product", value: "Thermal Lexum LX-TIM Pro" },
                      { label: "Serial No.", value: "TLX-9982-4109-X" },
                      { label: "Verification Status", value: "AUTHENTIC & VERIFIED ●" },
                      { label: "Warranty Period", value: "5 Years Coverage" },
                    ].map((field) => (
                      <div key={field.label} style={{ display: "flex", justifyContent: "space-between", paddingBottom: "12px", borderBottom: "1px solid #f1f5f9" }}>
                        <span style={{ fontSize: "13px", color: "#64748b" }}>{field.label}</span>
                        <span style={{ fontSize: "13px", color: field.label === "Verification Status" ? "#16a34a" : "#0f172a", fontWeight: "700" }}>{field.value}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ background: "rgba(2, 132, 199, 0.06)", border: "1px solid rgba(2, 132, 199, 0.2)", borderRadius: "12px", padding: "18px", display: "flex", alignItems: "center", gap: "14px" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: "700", color: "#0f172a" }}>Direct Factory Guarantee</div>
                      <div style={{ fontSize: "11px", color: "#64748b" }}>Secured by Thermal Lexum Anti-Counterfeit Vault</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section
          style={{
            padding: "110px 24px",
            background: "#ffffff",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ maxWidth: "680px", margin: "0 auto", position: "relative" }}>
            <div className="section-label" style={{ marginBottom: "20px" }}>UNLEASH HARDWARE POTENTIAL</div>
            <h2 style={{ fontSize: "clamp(34px, 5vw, 58px)", fontWeight: "800", letterSpacing: "-2px", color: "#0f172a", marginBottom: "20px" }}>
              Join the Revolution.<br />
              <span className="text-gradient">Cool Your Passion.</span>
            </h2>
            <p style={{ fontSize: "17px", color: "#475569", lineHeight: "1.7", marginBottom: "44px" }}>
              Upgrade to Thermal Lexum interface materials today and keep your processors running cooler under extreme workloads.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/warranty/register" className="btn-primary" style={{ padding: "16px 40px" }}>
                Register Your Product
              </Link>
              <Link href="/contact" className="btn-secondary" style={{ padding: "16px 40px" }}>
                Contact Support
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
