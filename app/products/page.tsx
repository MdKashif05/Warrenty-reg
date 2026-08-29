"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const categories = [
  { id: "ALL", label: "All Products" },
  { id: "THERMAL_PASTE", label: "Thermal Paste" },
  { id: "LIQUID_METAL", label: "Liquid Metal" },
  { id: "THERMAL_PADS", label: "Thermal Pads" },
];

const products = [
  {
    id: "lx-tim-pro",
    name: "LX-TIM Pro",
    category: "THERMAL_PASTE",
    tagline: "Professional-Grade Thermal Compound",
    description:
      "Engineered for high-performance processors, LX-TIM Pro delivers 17.6 W/mK conductivity with long-term stability under heavy gaming and rendering workloads.",
    specs: [
      { label: "Category", value: "Thermal Paste" },
      { label: "Conductivity", value: "17.6 W/mK" },
      { label: "Warranty", value: "1 Year Coverage" },
    ],
    color: "#0284c7",
    tag: "RECOMMENDED",
  },
  {
    id: "lx-tim-ultra",
    name: "LX-TIM Ultra",
    category: "THERMAL_PASTE",
    tagline: "Ultimate Overclocking Formula",
    description:
      "The pinnacle of Thermal Lexum paste technology. Formulated for extreme overclockers pushing liquid nitrogen or high-boost TDP loads.",
    specs: [
      { label: "Category", value: "Thermal Paste" },
      { label: "Conductivity", value: "16.8 W/mK" },
      { label: "Warranty", value: "1 Year Coverage" },
    ],
    color: "#0284c7",
    tag: "EXTREME",
  },
  {
    id: "lx-lm-elite",
    name: "LX-LM Elite",
    category: "LIQUID_METAL",
    tagline: "Maximum Liquid Alloy Heat Transfer",
    description:
      "Gallium-alloy liquid metal interface for delidded CPUs and custom cooling loops requiring absolute maximum thermal transfer.",
    specs: [
      { label: "Category", value: "Liquid Metal" },
      { label: "Conductivity", value: "73.0 W/mK" },
      { label: "Warranty", value: "1 Year Coverage" },
    ],
    color: "#2563eb",
    tag: "PROFESSIONAL",
  },
  {
    id: "lx-pad-standard",
    name: "LX-PAD Standard",
    category: "THERMAL_PADS",
    tagline: "Versatile Phase-Change Interface Pad",
    description:
      "Phase-change thermal pads designed for uniform compression contact across VRMs, memory modules, and high-heat power stages.",
    specs: [
      { label: "Category", value: "Thermal Pads" },
      { label: "Conductivity", value: "12.5 W/mK" },
      { label: "Warranty", value: "1 Year Coverage" },
    ],
    color: "#0d9488",
    tag: "",
  },
  {
    id: "lx-pad-pro",
    name: "LX-PAD Pro",
    category: "THERMAL_PADS",
    tagline: "Premium High-Density Thermal Pad",
    description:
      "Advanced phase-change pad with high compressibility for modern GPU VRAM heatsinks and workstation motherboard power delivery.",
    specs: [
      { label: "Category", value: "Thermal Pads" },
      { label: "Conductivity", value: "15.0 W/mK" },
      { label: "Warranty", value: "1 Year Coverage" },
    ],
    color: "#0d9488",
    tag: "NEW",
  },
];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const filtered = products.filter(
    (p) => activeCategory === "ALL" || p.category === activeCategory
  );

  return (
    <>
      <Navbar />
      <main style={{ background: "#ffffff", minHeight: "100vh" }}>
        {/* Hero */}
        <section
          className="page-hero bg-grid"
          style={{
            background: "radial-gradient(circle at 50% 0%, rgba(2, 132, 199, 0.08) 0%, #ffffff 80%)",
            borderBottom: "1px solid #e2e8f0",
            paddingTop: "140px",
            paddingBottom: "70px"
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            <div className="section-label" style={{ marginBottom: "16px" }}>PRODUCT CATALOG</div>
            <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: "900", letterSpacing: "-2px", color: "#0f172a", marginBottom: "16px" }}>
              Thermal Solutions<br />
              <span className="text-gradient">Engineered to Excel</span>
            </h1>
            <p style={{ fontSize: "16px", color: "#475569", maxWidth: "540px" }}>
              Explore the complete Thermal Lexum product lineup — zero compromise, maximum thermal conductivity.
            </p>
          </div>
          <div className="thermal-bar" style={{ marginTop: "48px" }} />
        </section>

        {/* Products */}
        <section style={{ padding: "64px 24px", background: "#ffffff", minHeight: "60vh" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            {/* Filter tabs */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                marginBottom: "48px",
                flexWrap: "wrap",
              }}
            >
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: "700",
                    letterSpacing: "0.5px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    border: activeCategory === cat.id ? "1px solid #0284c7" : "1px solid #cbd5e1",
                    background: activeCategory === cat.id ? "rgba(2, 132, 199, 0.1)" : "#ffffff",
                    color: activeCategory === cat.id ? "#0284c7" : "#475569",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Product grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "28px",
              }}
            >
              {filtered.map((product) => (
                <div
                  key={product.id}
                  className="brand-card"
                  style={{ padding: "36px", position: "relative", overflow: "hidden", background: "#ffffff", border: "1px solid #e2e8f0" }}
                >
                  {/* Top accent */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "3px",
                      background: product.color,
                    }}
                  />

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                    <div
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: "10px",
                        letterSpacing: "2px",
                        color: product.color,
                        background: "rgba(2, 132, 199, 0.08)",
                        border: "1px solid rgba(2, 132, 199, 0.2)",
                        padding: "4px 10px",
                        borderRadius: "20px",
                        fontWeight: "700"
                      }}
                    >
                      {categories.find((c) => c.id === product.category)?.label}
                    </div>
                    {product.tag && (
                      <div
                        style={{
                          fontFamily: "JetBrains Mono, monospace",
                          fontSize: "10px",
                          letterSpacing: "2px",
                          color: "#b45309",
                          background: "#fef3c7",
                          border: "1px solid #fcd34d",
                          padding: "4px 10px",
                          borderRadius: "20px",
                          fontWeight: "700"
                        }}
                      >
                        {product.tag}
                      </div>
                    )}
                  </div>

                  <h2 style={{ fontSize: "26px", fontWeight: "800", color: "#0f172a", marginBottom: "4px" }}>
                    {product.name}
                  </h2>
                  <p style={{ fontSize: "14px", color: product.color, marginBottom: "16px", fontWeight: "700" }}>
                    {product.tagline}
                  </p>
                  <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.7", marginBottom: "24px" }}>
                    {product.description}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      marginBottom: "28px",
                      padding: "16px 20px",
                      background: "#f8fafc",
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    {product.specs.map((spec) => (
                      <div key={spec.label} style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontSize: "13px", color: "#64748b" }}>{spec.label}</span>
                        <span style={{ fontSize: "13px", color: "#0f172a", fontWeight: "700" }}>{spec.value}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: "12px" }}>
                    <Link href="/warranty/register" className="btn-primary" style={{ flex: 1, justifyContent: "center", padding: "12px 16px", fontSize: "12px" }}>
                      Register Warranty
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: "80px 0", color: "#64748b" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>📦</div>
                <p>No products found in this category.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
