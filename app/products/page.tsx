"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface CatalogProduct {
  id: string;
  slug: string;
  name: string;
  category: "THERMAL_PASTE" | "LIQUID_METAL" | "THERMAL_PADS" | "ALL";
  categoryLabel: string;
  tagline: string;
  description: string;
  price: string;
  badge: string;
  specs: { label: string; value: string }[];
  color: string;
  tag: string;
}

const categories = [
  { id: "ALL", label: "All Products" },
  { id: "THERMAL_PASTE", label: "Thermal Paste" },
  { id: "LIQUID_METAL", label: "Liquid Metal" },
  { id: "THERMAL_PADS", label: "Thermal Pads" },
];

function inferCategory(name: string, desc: string): "THERMAL_PASTE" | "LIQUID_METAL" | "THERMAL_PADS" {
  const text = `${name} ${desc}`.toLowerCase();
  if (text.includes("liquid metal") || text.includes("liquid") || text.includes("gallium")) {
    return "LIQUID_METAL";
  }
  if (text.includes("pad") || text.includes("pads") || text.includes("phase-change")) {
    return "THERMAL_PADS";
  }
  return "THERMAL_PASTE";
}

function getCategoryColor(category: string): string {
  switch (category) {
    case "LIQUID_METAL":
      return "#2563eb";
    case "THERMAL_PADS":
      return "#0d9488";
    default:
      return "#0284c7";
  }
}

function extractSpecs(name: string, desc: string, badge: string): { label: string; value: string }[] {
  const specs: { label: string; value: string }[] = [];
  const text = `${name} ${desc}`;

  // Check conductivity
  const wmKMatch = text.match(/([0-9]+(?:\.[0-9]+)?)\s*W\/mK/i);
  if (wmKMatch) {
    specs.push({ label: "Thermal Conductivity", value: `${wmKMatch[1]} W/mK` });
  } else {
    specs.push({ label: "Thermal Grade", value: "Ultra High Efficiency" });
  }

  // Warranty
  specs.push({ label: "Warranty Coverage", value: "3 Years Replacement" });

  // Purity / Formulation
  if (text.toLowerCase().includes("silver")) {
    specs.push({ label: "Composition", value: "Silver-Based Formula" });
  } else if (text.toLowerCase().includes("liquid metal") || text.toLowerCase().includes("gallium")) {
    specs.push({ label: "Composition", value: "100% Gallium Eutectic Alloy" });
  } else {
    specs.push({ label: "Electrical Safety", value: "Non-Conductive Matrix" });
  }

  return specs;
}

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [productsList, setProductsList] = useState<CatalogProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/api/courses")
      .then((r) => r.json())
      .then((data) => {
        if (data && data.courses && Array.isArray(data.courses) && data.courses.length > 0) {
          const mapped: CatalogProduct[] = data.courses.map((item: any) => {
            const cat = inferCategory(item.name || "", item.desc || "");
            const catObj = categories.find((c) => c.id === cat);
            const color = getCategoryColor(cat);
            return {
              id: item.slug || `prod-${Math.random()}`,
              slug: item.slug || "",
              name: item.name || "Thermal Lexum Product",
              category: cat,
              categoryLabel: catObj ? catObj.label : "Thermal Solution",
              tagline: item.badge ? `${item.badge} Grade Solution` : "High Performance Cooling",
              description: item.desc || "High-performance thermal interface material engineered for extreme heat dissipation.",
              price: item.price?.startsWith("₹") ? item.price : `₹${item.price}`,
              badge: item.badge || "POPULAR",
              specs: extractSpecs(item.name || "", item.desc || "", item.badge || ""),
              color: color,
              tag: item.badge || "",
            };
          });
          setProductsList(mapped);
        }
      })
      .catch((err) => console.error("Error fetching live catalog:", err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = productsList.filter((p) => {
    const matchesCategory = activeCategory === "ALL" || p.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
            paddingBottom: "70px",
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            <div className="section-label" style={{ marginBottom: "16px" }}>OFFICIAL PRODUCT CATALOG</div>
            <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: "900", letterSpacing: "-2px", color: "#0f172a", marginBottom: "16px" }}>
              Thermal Solutions<br />
              <span className="text-gradient">Engineered to Excel</span>
            </h1>
            <p style={{ fontSize: "16px", color: "#475569", maxWidth: "620px", lineHeight: "1.7" }}>
              Explore the complete Thermal Lexum high-performance product lineup. Real-time pricing, guaranteed 3-year warranty, and instant digital registration.
            </p>
          </div>
          <div className="thermal-bar" style={{ marginTop: "48px" }} />
        </section>

        {/* Products */}
        <section style={{ padding: "64px 24px", background: "#ffffff", minHeight: "60vh" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            {/* Filter tabs & Search Bar */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "16px",
                marginBottom: "40px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    style={{
                      padding: "10px 18px",
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

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products or specs..."
                style={{
                  padding: "10px 16px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontSize: "14px",
                  outline: "none",
                  width: "100%",
                  maxWidth: "300px",
                }}
              />
            </div>

            {loading ? (
              <div style={{ textAlign: "center", padding: "80px 0", color: "#64748b", fontSize: "16px" }}>
                🔄 Loading official product catalog from database...
              </div>
            ) : filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 0", color: "#64748b" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>📦</div>
                <p style={{ fontSize: "18px", fontWeight: "700", color: "#0f172a" }}>No products found</p>
                <p style={{ fontSize: "14px", marginTop: "6px" }}>Try changing your filter category or search keyword.</p>
              </div>
            ) : (
              /* Product grid */
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                  gap: "28px",
                }}
              >
                {filtered.map((product) => (
                  <div
                    key={product.id}
                    className="brand-card"
                    style={{
                      padding: "32px",
                      position: "relative",
                      overflow: "hidden",
                      background: "#ffffff",
                      border: "1px solid #e2e8f0",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      borderRadius: "16px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                    }}
                  >
                    {/* Top accent */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "4px",
                        background: product.color,
                      }}
                    />

                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                        <span
                          style={{
                            fontFamily: "JetBrains Mono, monospace",
                            fontSize: "11px",
                            letterSpacing: "1px",
                            color: product.color,
                            background: "rgba(2, 132, 199, 0.08)",
                            border: `1px solid ${product.color}40`,
                            padding: "4px 10px",
                            borderRadius: "20px",
                            fontWeight: "800",
                          }}
                        >
                          {product.categoryLabel}
                        </span>

                        <span
                          style={{
                            fontSize: "22px",
                            fontWeight: "900",
                            color: "#0E4D92",
                            fontFamily: "Outfit, sans-serif",
                          }}
                        >
                          {product.price}
                        </span>
                      </div>

                      {product.tag && (
                        <div style={{ marginBottom: "10px" }}>
                          <span
                            style={{
                              fontFamily: "JetBrains Mono, monospace",
                              fontSize: "10px",
                              letterSpacing: "1.5px",
                              color: "#b45309",
                              background: "#fef3c7",
                              border: "1px solid #fcd34d",
                              padding: "3px 8px",
                              borderRadius: "6px",
                              fontWeight: "800",
                              textTransform: "uppercase",
                            }}
                          >
                            ⭐ {product.tag}
                          </span>
                        </div>
                      )}

                      <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", marginBottom: "12px", lineHeight: "1.35" }}>
                        <Link href={`/courses/${product.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                          {product.name}
                        </Link>
                      </h2>

                      <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.65", marginBottom: "20px", whiteSpace: "pre-line" }}>
                        {product.description}
                      </p>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                          marginBottom: "24px",
                          padding: "14px 16px",
                          background: "#f8fafc",
                          borderRadius: "10px",
                          border: "1px solid #e2e8f0",
                        }}
                      >
                        {product.specs.map((spec) => (
                          <div key={spec.label} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                            <span style={{ color: "#64748b" }}>{spec.label}</span>
                            <span style={{ color: "#0f172a", fontWeight: "700" }}>{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" }}>
                      <Link
                        href={`/courses/${product.slug}`}
                        className="btn-primary"
                        style={{ width: "100%", justifyContent: "center", padding: "12px 16px", fontSize: "13px" }}
                      >
                        View Specifications & Buy →
                      </Link>

                      <Link
                        href="/warranty/register"
                        className="btn-secondary"
                        style={{ width: "100%", justifyContent: "center", padding: "10px 16px", fontSize: "12px" }}
                      >
                        🛡️ Register Warranty (3 Years)
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
