"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  const productsList = [
    { slug: "tl-x1-ultra-4g", name: "Thermal Lexum TL-X1 Ultra (4g)", badge: "BEST SELLER", price: "₹499", rating: "4.9 ★", desc: "14.2 W/mK high-density nano-diamond thermal paste for CPUs, GPUs & Overclocking." },
    { slug: "tl-x1-ultra-8g", name: "Thermal Lexum TL-X1 Ultra (8g)", badge: "VALUE PACK", price: "₹899", rating: "4.9 ★", desc: "8-gram applicator syringe for multi-system builds, workstation maintenance & gaming rigs." },
    { slug: "tl-pro-extreme", name: "Thermal Lexum TL-PRO Extreme", badge: "PRO CHOICE", price: "₹1,299", rating: "5.0 ★", desc: "Premium non-conductive thermal compound engineered for extreme thermal endurance." },
    { slug: "thermal-pad-matrix", name: "Thermal Lexum Pad Matrix (12.8 W/mK)", badge: "POPULAR", price: "₹399", rating: "4.8 ★", desc: "High-compressibility silicone thermal pads for VRAM, VRM MOSFETs & M.2 NVMe SSDs." },
    { slug: "liquid-metal-extreme", name: "Thermal Lexum Liquid Metal Extreme", badge: "ULTIMATE", price: "₹1,499", rating: "4.9 ★", desc: "73 W/mK gallium-alloy liquid metal compound for direct-die cooling & delidded CPUs." },
    { slug: "thermal-cleaner-kit", name: "Thermal Lexum Surface Cleaner & Spatula", badge: "ACCESSORY", price: "₹249", rating: "4.7 ★", desc: "Citrus-based thermal compound remover & non-scratch spreader tool kit." },
  ];

  return (
    <>
      <Navbar />
      <main style={{ background: "#ffffff", paddingTop: "100px" }}>
        
        {/* ─── 1. HERO BANNER — uses real /public/banner.png ─── */}
        <section style={{ position: "relative", borderBottom: "1px solid #1e3a5f" }}>
          {/* Full-width responsive banner image with fixed height constraints */}
          <div className="banner-container">
            <Image
              src="/banner.png"
              alt="Thermal Lexum – Maximum Cooling"
              fill
              priority
              style={{ objectFit: "contain", objectPosition: "center" }}
            />
            {/* Desktop-only subtle overlay gradient */}
            <div className="banner-overlay" style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0) 60%, rgba(0,0,0,0.5) 100%)" }} />

            {/* Responsive CTA buttons */}
            <div className="banner-cta-section">
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
                <Link href="/products" className="btn-primary" style={{ fontSize: "15px", padding: "12px 26px", boxShadow: "0 6px 20px rgba(14,77,146,0.25)" }}>Shop Products 📦</Link>
                <Link href="/warranty/register" className="btn-secondary" style={{ fontSize: "15px", padding: "12px 24px", background: "#f8fafc", color: "#0E4D92", fontWeight: "800", border: "1px solid #cbd5e1" }}>Register Warranty 🛡️</Link>
              </div>
            </div>
          </div>

          {/* Stats strip below banner */}
          <div style={{ background: "#0E4D92", padding: "18px 20px" }}>
            <div style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "12px" }}>
              {[
                { value: "50,000+", label: "Units Delivered" },
                { value: "14.2 W/mK", label: "Max Conductivity" },
                { value: "3 Years", label: "Official Warranty" },
                { value: "4.9 ★", label: "Customer Rating" },
              ].map((st) => (
                <div key={st.label} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "22px", fontWeight: "900", color: "#ffd166", fontFamily: "Outfit, sans-serif" }}>{st.value}</div>
                  <div style={{ fontSize: "11px", color: "#bfdbfe", fontWeight: "700", marginTop: "2px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{st.label}</div>
                </div>
              ))}
            </div>
          </div>

          <style>{`
            .banner-container {
              position: relative;
              width: 100%;
              height: 420px;
              background-color: #000000;
              overflow: hidden;
            }
            .banner-cta-section {
              padding: 24px 20px;
              background: #ffffff;
              border-bottom: 1px solid #e2e8f0;
            }
            @media (min-width: 769px) {
              .banner-cta-section {
                position: absolute;
                bottom: 30px;
                left: 0;
                right: 0;
                background: transparent !important;
                border-bottom: none !important;
                padding: 0 !important;
                z-index: 10;
              }
              .banner-cta-section .btn-secondary {
                background: rgba(255,255,255,0.9) !important;
                border: none !important;
              }
            }
            @media (max-width: 1024px) {
              .banner-container {
                height: 300px;
              }
            }
            @media (max-width: 768px) {
              .banner-container {
                height: 180px;
              }
              .banner-overlay {
                display: none !important;
              }
            }
            @media (max-width: 480px) {
              .banner-container {
                height: 120px;
              }
            }
          `}</style>
        </section>

        {/* ─── 2. PRODUCTS CATALOG SHOWCASE ─── */}
        <section style={{ padding: "90px 20px", background: "#ffffff" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "50px" }}>
              <span className="section-subtitle" style={{ marginBottom: "14px" }}>POPULAR PRODUCTS</span>
              <h2 style={{ fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: "900", color: "#0f172a", marginBottom: "16px" }}>
                Thermal Lexum Product Showcase
              </h2>
              <p style={{ fontSize: "16px", color: "#64748b", maxWidth: "620px", margin: "0 auto" }}>
                Engineered for maximum thermal dissipation, lower CPU/GPU temperatures, and long-lasting stability.
              </p>
            </div>

            <div className="responsive-grid-3">
              {productsList.map((prod) => (
                <div key={prod.slug} className="card-nesa" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "28px" }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                      <span style={{ background: "#f0fcff", color: "#0E4D92", padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: "800", border: "1px solid #cceeff" }}>
                        {prod.badge}
                      </span>
                      <span style={{ fontSize: "20px", fontWeight: "900", color: "#0E4D92" }}>
                        {prod.price}
                      </span>
                    </div>

                    <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", marginBottom: "12px", lineHeight: "1.3" }}>
                      <Link href={`/products/${prod.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                        {prod.name}
                      </Link>
                    </h3>

                    <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.6", marginBottom: "24px" }}>
                      {prod.desc}
                    </p>
                  </div>

                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9", marginBottom: "20px", fontSize: "12px", color: "#64748b", fontWeight: "600" }}>
                      <span>⭐ Rating: {prod.rating}</span>
                      <span>🚚 In Stock</span>
                    </div>

                    <Link href={`/products/${prod.slug}`} className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                      Buy Now & Register →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <Link href="/products" className="btn-secondary" style={{ fontSize: "15px", padding: "14px 32px" }}>
                View Full Product Range →
              </Link>
            </div>
          </div>
        </section>

        {/* ─── 3. ABOUT US SECTION ─── */}
        <section style={{ padding: "90px 20px", background: "#f8fafc", borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
              <div>
                <span className="section-subtitle" style={{ marginBottom: "14px" }}>ABOUT THERMAL LEXUM</span>
                <h2 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: "900", color: "#0f172a", marginBottom: "20px", lineHeight: "1.2" }}>
                  Welcome to Thermal Lexum: Your Premier Cooling Hub
                </h2>
                <p style={{ fontSize: "15px", color: "#475569", lineHeight: "1.8", marginBottom: "28px" }}>
                  Welcome to Thermal Lexum, your ultimate destination for high-efficiency thermal management solutions! We engineer cutting-edge thermal paste and pads designed to lower temperatures and prolong hardware lifespan under extreme workloads.
                </p>

                <div className="responsive-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "36px" }}>
                  {[
                    { icon: "⚡", title: "High Conductivity", desc: "Up to 14.2 W/mK performance" },
                    { icon: "🛡️", title: "Non-Conductive", desc: "Safe application for CPU & GPU" },
                    { icon: "⏳", title: "Long-Term Stability", desc: "No pump-out effect for years" },
                    { icon: "📜", title: "Official Warranty", desc: "Easy replacement warranty claim" },
                  ].map((feat) => (
                    <div key={feat.title} style={{ background: "#ffffff", padding: "16px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                      <div style={{ fontSize: "24px", marginBottom: "6px" }}>{feat.icon}</div>
                      <div style={{ fontSize: "15px", fontWeight: "800", color: "#0f172a", marginBottom: "2px" }}>{feat.title}</div>
                      <div style={{ fontSize: "12px", color: "#64748b" }}>{feat.desc}</div>
                    </div>
                  ))}
                </div>

                <Link href="/about" className="btn-primary">
                  Learn More About Us →
                </Link>
              </div>

              <div>
                <div className="card-nesa" style={{ padding: "40px", background: "#0E4D92", color: "#ffffff" }}>
                  <div style={{ fontSize: "13px", fontWeight: "800", color: "#ffd166", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "14px" }}>
                    WHY BUILDERS CHOOSE THERMAL LEXUM
                  </div>
                  <h3 style={{ fontSize: "26px", fontWeight: "900", color: "#ffffff", marginBottom: "20px" }}>
                    "The gold standard in CPU & GPU thermal compounds."
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {[
                      { num: "01", title: "Zero Electrical Conductivity", text: "Prevents short circuits even if excess compound spills onto motherboard." },
                      { num: "02", title: "Easy Spreading Formula", text: "Optimal viscosity for effortless application without air gaps." },
                      { num: "03", title: "Multi-Platform Warranty", text: "Register purchases from Amazon, Flipkart, or local retailers seamlessly." },
                    ].map((step) => (
                      <div key={step.num} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                        <span style={{ fontSize: "18px", fontWeight: "900", color: "#ffd166", fontFamily: "Outfit, sans-serif" }}>{step.num}</span>
                        <div>
                          <div style={{ fontSize: "16px", fontWeight: "800", color: "#ffffff" }}>{step.title}</div>
                          <div style={{ fontSize: "13px", color: "#cbd5e1", marginTop: "2px" }}>{step.text}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 4. REVIEWS & TESTIMONIALS SECTION ─── */}
        <section style={{ padding: "90px 20px", background: "#f0fcff", borderTop: "1px solid #cceeff" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "50px" }}>
              <span className="section-subtitle" style={{ marginBottom: "14px" }}>CUSTOMER REVIEWS</span>
              <h2 style={{ fontSize: "clamp(28px, 4.5vw, 46px)", fontWeight: "900", color: "#0f172a", marginBottom: "14px" }}>
                What Builders Say About Thermal Lexum
              </h2>
              <p style={{ fontSize: "16px", color: "#64748b", maxWidth: "620px", margin: "0 auto" }}>
                Verified customer reviews from PC builders, gamers, and system integrators.
              </p>
            </div>

            <div className="responsive-grid-3">
              {[
                { quote: "Applied Thermal Lexum TL-X1 on my i9-14900K and temperatures dropped by 11°C under full stress test load! Incredible compound.", name: "Amit Verma", role: "Custom PC Builder" },
                { quote: "The warranty registration process was so smooth! Bought from Amazon, entered order ID, and got my digital warranty certificate immediately.", name: "Siddharth Rao", role: "Gaming Enthusiast" },
                { quote: "Excellent thermal pads for my RTX 3080 VRAM. Memory junction temps reduced significantly.", name: "Kunal Shah", role: "Hardware Modder" },
              ].map((t) => (
                <div key={t.name} className="card-nesa" style={{ padding: "30px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <p style={{ fontSize: "14px", color: "#334155", lineHeight: "1.7", fontStyle: "italic", marginBottom: "20px" }}>
                    "{t.quote}"
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", borderTop: "1px solid #f1f5f9", paddingTop: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "#0E4D92", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "16px" }}>
                      {t.name[0]}
                    </div>
                    <div>
                      <div style={{ fontSize: "15px", fontWeight: "800", color: "#0f172a" }}>{t.name}</div>
                      <div style={{ fontSize: "12px", color: "#0E4D92", fontWeight: "600" }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
