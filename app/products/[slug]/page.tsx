"use client";
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { useParams } from "next/navigation";

const productDatabase: Record<string, {
  name: string;
  category: string;
  tagline: string;
  description: string;
  highlights: string[];
  specs: { label: string; value: string }[];
  applications: string[];
  whatsIncluded: string[];
  warrantyMonths: number;
  color: string;
}> = {
  "lx-tim-pro": {
    name: "LX-TIM Pro",
    category: "THERMAL PASTE",
    tagline: "Professional-Grade Thermal Interface Material",
    description: "Engineered specifically for high-density modern processors and graphics cards. LX-TIM Pro provides low thermal resistance, high spreadability, and zero electrical conductivity for extreme reliability.",
    highlights: [
      "Low thermal resistance for optimal heat transfer",
      "Non-conductive and non-capacitive formula",
      "Long-term stability without drying or bleeding",
      "Easy application spreader included in packaging"
    ],
    specs: [
      { label: "Thermal Conductivity", value: "14.2 W/mK" },
      { label: "Viscosity", value: "85,000 Pas" },
      { label: "Density", value: "2.6 g/cm³" },
      { label: "Operating Temp Range", value: "-50°C to +250°C" },
      { label: "Color", value: "Dark Grey" },
      { label: "Net Weight", value: "4g / 8g" }
    ],
    applications: ["High-end Gaming CPUs", "Overclocked GPUs", "Workstation Systems", "Gaming Laptops"],
    whatsIncluded: ["LX-TIM Pro Syringe", "Precision Spreader Applicator", "Cleaning Wipe", "Authenticity Label"],
    warrantyMonths: 60,
    color: "#0284c7"
  },
  "lx-tim-ultra": {
    name: "LX-TIM Ultra",
    category: "THERMAL PASTE",
    tagline: "Ultimate Extreme Performance Formula",
    description: "Formulated for competitive overclockers and extreme enthusiast rigs. LX-TIM Ultra delivers maximum thermal performance near liquid metal levels without electrical risk.",
    highlights: [
      "Extreme thermal conductivity micro-particle matrix",
      "Optimized for sub-zero liquid nitrogen and custom loop setups",
      "Zero curing time required",
      "Non-corrosive to aluminium or copper surfaces"
    ],
    specs: [
      { label: "Thermal Conductivity", value: "16.8 W/mK" },
      { label: "Viscosity", value: "92,000 Pas" },
      { label: "Density", value: "2.8 g/cm³" },
      { label: "Operating Temp Range", value: "-150°C to +300°C" },
      { label: "Color", value: "Silver Grey" },
      { label: "Net Weight", value: "5g" }
    ],
    applications: ["Extreme Overclocking", "Liquid Nitrogen (LN2) Benchmarking", "Server Processors", "Custom Water Loops"],
    whatsIncluded: ["LX-TIM Ultra Syringe", "Dual Spreading Nozzles", "Alcohol Prep Pad", "Verification Certificate"],
    warrantyMonths: 60,
    color: "#0284c7"
  },
  "lx-lm-elite": {
    name: "LX-LM Elite",
    category: "LIQUID METAL",
    tagline: "Maximum Thermal Transfer Metal Alloy",
    description: "Eutectic alloy formulation delivering unrivaled thermal interface performance for delidded CPUs and high-power density liquid cooling blocks.",
    highlights: [
      "Absolute highest thermal conductivity alloy ratio",
      "Designed exclusively for copper or nickel-plated heatspreaders",
      "Precision needle applicator tip for exact micro-dosing",
      "Superior heat dissipation for extreme TDP processors"
    ],
    specs: [
      { label: "Thermal Conductivity", value: "73.0 W/mK" },
      { label: "Viscosity", value: "Liquid Alloy" },
      { label: "Density", value: "6.2 g/cm³" },
      { label: "Operating Temp Range", value: "+10°C to +140°C" },
      { label: "Electrical Conductivity", value: "HIGHLY CONDUCTIVE (Exercise Caution)" },
      { label: "Net Volume", value: "1.0g / 5.0g" }
    ],
    applications: ["Delidded Intel & AMD CPUs", "Direct-Die Liquid Cooling Blocks", "Extreme Overclocking Rigs"],
    whatsIncluded: ["LX-LM Elite Syringe", "Micro-Needle Tips (x2)", "Cotton Swab Applicators", "Conformal Coating Shield Mask"],
    warrantyMonths: 60,
    color: "#2563eb"
  },
  "lx-pad-standard": {
    name: "LX-PAD Standard",
    category: "THERMAL PADS",
    tagline: "Versatile High-Conductivity Thermal Pad",
    description: "Engineered phase-change thermal pad providing seamless compression and uniform gap-filling across GPU memory modules, VRMs, and secondary heat sinks.",
    highlights: [
      "Excellent compressibility and gap adaptability",
      "High dielectric strength & electrical isolation",
      "Available in multiple standard thickness options",
      "Easy cut-to-size grid pattern"
    ],
    specs: [
      { label: "Thermal Conductivity", value: "12.0 W/mK" },
      { label: "Hardness (Shore OO)", value: "35-50" },
      { label: "Breakdown Voltage", value: "> 5kV/mm" },
      { label: "Operating Temp Range", value: "-40°C to +200°C" },
      { label: "Dimensions", value: "100 x 50 mm" }
    ],
    applications: ["GPU VRAM Modules", "VRM Power Stages", "M.2 SSD Heatsinks", "Power Supplies"],
    whatsIncluded: ["LX-PAD Standard Sheet", "Precision Cutting Grid Guide", "Protective Film Cover"],
    warrantyMonths: 60,
    color: "#0d9488"
  },
  "lx-pad-pro": {
    name: "LX-PAD Pro",
    category: "THERMAL PADS",
    tagline: "Premium Phase-Change High-Density Thermal Pad",
    description: "Next-gen phase change thermal pad material engineered to soften under operating temperatures for minimal thermal impedance.",
    highlights: [
      "Phase-change technology activates under system thermal load",
      "Zero oil bleed and ultra-low thermal resistance",
      "Ideal replacement for factory thermal putty and pads",
      "Long-term structural integrity without degradation"
    ],
    specs: [
      { label: "Thermal Conductivity", value: "15.5 W/mK" },
      { label: "Phase Change Temp", value: "45°C" },
      { label: "Density", value: "3.1 g/cm³" },
      { label: "Operating Temp Range", value: "-40°C to +150°C" }
    ],
    applications: ["High-power GPU Memory VRAM", "Gaming Laptops", "High-density Industrial VRMs"],
    whatsIncluded: ["LX-PAD Pro Sheet", "Application Tweezers", "Cutting Template"],
    warrantyMonths: 60,
    color: "#0d9488"
  }
};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "lx-tim-pro";
  const product = productDatabase[slug] || productDatabase["lx-tim-pro"];
  const [selectedTab, setSelectedTab] = useState<"overview" | "specs" | "applications">("overview");

  return (
    <>
      <Navbar />
      <main style={{ background: "#ffffff", minHeight: "100vh" }}>
        {/* Header Hero */}
        <section className="page-hero bg-grid" style={{ background: "radial-gradient(circle at 50% 0%, rgba(2, 132, 199, 0.08) 0%, #ffffff 80%)", borderBottom: "1px solid #e2e8f0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "16px" }}>
              <Link href="/products" style={{ color: "#64748b", fontSize: "14px", textDecoration: "none", fontWeight: "600" }}>Products</Link>
              <span style={{ color: "#cbd5e1", fontSize: "14px" }}>/</span>
              <span style={{ color: product.color, fontSize: "14px", fontFamily: "JetBrains Mono, monospace", fontWeight: "700" }}>{product.category}</span>
            </div>
            <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: "900", letterSpacing: "-2px", color: "#0f172a", marginBottom: "12px" }}>
              {product.name}
            </h1>
            <p style={{ fontSize: "18px", color: product.color, fontWeight: "700", marginBottom: "16px" }}>
              {product.tagline}
            </p>
            <p style={{ fontSize: "16px", color: "#475569", maxWidth: "680px", lineHeight: "1.7" }}>
              {product.description}
            </p>
            <div style={{ display: "flex", gap: "16px", marginTop: "32px", flexWrap: "wrap" }}>
              <Link href="/warranty/register" className="btn-primary">
                Register Warranty
              </Link>
              <Link href="/contact" className="btn-secondary">
                Technical Inquiry
              </Link>
            </div>
          </div>
          <div className="thermal-bar" style={{ marginTop: "48px" }} />
        </section>

        {/* Content Section */}
        <section style={{ padding: "80px 24px", background: "#ffffff" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            {/* Tabs */}
            <div style={{ display: "flex", gap: "12px", borderBottom: "2px solid #e2e8f0", marginBottom: "48px" }}>
              {[
                { id: "overview", label: "Overview & Highlights" },
                { id: "specs", label: "Technical Specifications" },
                { id: "applications", label: "Applications & Scope" }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id as any)}
                  style={{
                    padding: "14px 24px",
                    background: "none",
                    border: "none",
                    borderBottom: selectedTab === tab.id ? `3px solid ${product.color}` : "3px solid transparent",
                    color: selectedTab === tab.id ? "#0f172a" : "#64748b",
                    fontSize: "15px",
                    fontWeight: selectedTab === tab.id ? "800" : "600",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            {selectedTab === "overview" && (
              <div className="responsive-grid-2" style={{ gap: "32px" }}>
                <div className="brand-card" style={{ padding: "36px", background: "#ffffff", border: "1px solid #e2e8f0" }}>
                  <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", marginBottom: "20px" }}>
                    Engineering Highlights
                  </h2>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "16px" }}>
                    {product.highlights.map((h, i) => (
                      <li key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", color: "#475569", lineHeight: "1.6" }}>
                        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: product.color, marginTop: "8px", flexShrink: 0 }} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="brand-card" style={{ padding: "36px", background: "#ffffff", border: "1px solid #e2e8f0" }}>
                  <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", marginBottom: "20px" }}>
                    What&apos;s Included in Box
                  </h2>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "14px", marginBottom: "32px" }}>
                    {product.whatsIncluded.map((item, i) => (
                      <li key={i} style={{ display: "flex", gap: "12px", alignItems: "center", fontSize: "15px", color: "#0f172a", fontWeight: "600" }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={product.color} strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div style={{ padding: "18px", background: "rgba(2,132,199,0.06)", border: "1px solid rgba(2,132,199,0.2)", borderRadius: "10px" }}>
                    <div style={{ fontSize: "12px", color: "#0284c7", fontWeight: "700", marginBottom: "4px" }}>WARRANTY COVERAGE</div>
                    <div style={{ fontSize: "14px", color: "#475569" }}>
                      This product comes with {product.warrantyMonths} Months limited manufacturer warranty upon online registration.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === "specs" && (
              <div className="brand-card" style={{ padding: "36px", maxWidth: "800px", background: "#ffffff", border: "1px solid #e2e8f0" }}>
                <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", marginBottom: "24px" }}>
                  Technical Parameters & Datasheet
                </h2>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {product.specs.map((spec, i) => (
                    <div
                      key={spec.label}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "14px 16px",
                        background: i % 2 === 0 ? "#f8fafc" : "#ffffff",
                        borderBottom: "1px solid #f1f5f9"
                      }}
                    >
                      <span style={{ fontSize: "14px", color: "#64748b" }}>{spec.label}</span>
                      <span style={{ fontSize: "14px", color: "#0f172a", fontFamily: "JetBrains Mono, monospace", fontWeight: "700" }}>{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === "applications" && (
              <div className="brand-card" style={{ padding: "36px", maxWidth: "800px", background: "#ffffff", border: "1px solid #e2e8f0" }}>
                <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", marginBottom: "20px" }}>
                  Recommended Use Cases
                </h2>
                <div className="responsive-form-grid-2" style={{ gap: "16px" }}>
                  {product.applications.map((app, i) => (
                    <div key={i} style={{ padding: "16px 20px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "10px", color: "#0f172a", fontSize: "15px", fontWeight: "600" }}>
                      ⚡ {app}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
