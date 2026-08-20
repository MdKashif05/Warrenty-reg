import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Founder | Javed Shaikh | Thermal Lexum",
  description: "Read the founder's message from Javed Shaikh, Founder & CEO of Thermal Lexum.",
};

export default function FounderPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#ffffff" }}>
        {/* Hero Header */}
        <section
          className="page-hero bg-grid"
          style={{
            background: "radial-gradient(circle at 50% 0%, rgba(2, 132, 199, 0.08) 0%, #ffffff 80%)",
            borderBottom: "1px solid #e2e8f0",
            paddingTop: "150px",
            paddingBottom: "80px",
            position: "relative"
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
            <div className="section-label" style={{ marginBottom: "20px" }}>
              FOUNDER'S MESSAGE
            </div>
            <h1
              style={{
                fontSize: "clamp(40px, 6vw, 72px)",
                fontWeight: "900",
                letterSpacing: "-2.5px",
                color: "#0f172a",
                marginBottom: "20px",
                lineHeight: "1.1"
              }}
            >
              Cool Systems.<br />
              <span className="text-gradient">Unstoppable Performance.</span>
            </h1>
            <p
              style={{
                fontSize: "18px",
                color: "#475569",
                maxWidth: "680px",
                margin: "0 auto",
                lineHeight: "1.7"
              }}
            >
              A personal note from Javed Shaikh on engineering integrity, zero-compromise thermal materials, and customer trust.
            </p>
          </div>
          <div className="thermal-bar" style={{ position: "absolute", bottom: 0, left: 0, right: 0 }} />
        </section>

        {/* Main Founder Profile Section */}
        <section style={{ padding: "100px 24px", background: "#ffffff" }}>
          <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.5fr",
                gap: "64px",
                alignItems: "start"
              }}
            >
              {/* Founder Image & Card */}
              <div style={{ position: "sticky", top: "100px" }}>
                <div
                  className="brand-card"
                  style={{
                    padding: "16px",
                    overflow: "hidden",
                    border: "1px solid #cbd5e1",
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08), 0 0 30px rgba(2, 132, 199, 0.1)",
                    borderRadius: "24px",
                    background: "#ffffff"
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "1/1.1",
                      borderRadius: "16px",
                      overflow: "hidden",
                      background: "#f8fafc"
                    }}
                  >
                    <Image
                      src="/founder.png"
                      alt="Javed Shaikh - Founder & CEO, Thermal Lexum"
                      fill
                      sizes="(max-width: 768px) 100vw, 450px"
                      priority
                      style={{
                        objectFit: "cover",
                        objectPosition: "center top",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.1) 50%, transparent 100%)"
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: "20px",
                        left: "20px",
                        right: "20px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-end"
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontFamily: "Space Grotesk, sans-serif",
                            fontSize: "24px",
                            fontWeight: "900",
                            color: "#ffffff",
                            marginBottom: "4px"
                          }}
                        >
                          Javed Shaikh
                        </div>
                        <div
                          style={{
                            fontFamily: "JetBrains Mono, monospace",
                            fontSize: "11px",
                            letterSpacing: "2px",
                            color: "#38bdf8",
                            textTransform: "uppercase",
                            fontWeight: "700"
                          }}
                        >
                          FOUNDER & CEO
                        </div>
                      </div>
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          background: "#ffffff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#0284c7",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                        }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "20px 12px 8px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderTop: "1px solid #f1f5f9",
                      marginTop: "16px"
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "12px", color: "#64748b" }}>Company</div>
                      <div style={{ fontSize: "15px", fontWeight: "700", color: "#0f172a" }}>Thermal Lexum</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "12px", color: "#64748b" }}>Location</div>
                      <div style={{ fontSize: "15px", fontWeight: "700", color: "#0284c7" }}>Bengaluru, India</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Founder Narrative & Message */}
              <div>
                <div style={{ marginBottom: "40px" }}>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      background: "rgba(2, 132, 199, 0.08)",
                      border: "1px solid rgba(2, 132, 199, 0.2)",
                      borderRadius: "20px",
                      padding: "6px 16px",
                      marginBottom: "24px"
                    }}
                  >
                    <span style={{ fontSize: "12px", fontWeight: "700", color: "#0284c7", letterSpacing: "1px" }}>
                      MESSAGE FROM JAVED SHAIKH
                    </span>
                  </div>

                  <h2 style={{ fontSize: "38px", fontWeight: "900", color: "#0f172a", letterSpacing: "-1.5px", lineHeight: "1.2", marginBottom: "28px" }}>
                    “Cool Systems. Unstoppable Performance.”
                  </h2>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "22px",
                      fontSize: "18px",
                      color: "#334155",
                      lineHeight: "1.8",
                      fontWeight: "400"
                    }}
                  >
                    <p style={{ fontSize: "20px", fontWeight: "600", color: "#0f172a" }}>
                      I’m Javed Shaikh. I created Thermal Lexum because the world needed thermal solutions that actually deliver—no compromise, no shortcuts.
                    </p>
                    <p>
                      Liquid metal to liquid courage. Thermal paste to trusted performance. Thermal pads to pure innovation.
                    </p>
                    <p style={{ fontSize: "22px", fontWeight: "800", color: "#0284c7" }}>
                      We don’t sell products. We sell confidence.
                    </p>
                    <p style={{ fontSize: "18px", fontWeight: "600", color: "#0f172a" }}>
                      Join the revolution. Cool your passion.
                    </p>
                  </div>
                </div>

                {/* Highlight Quote Box */}
                <div
                  style={{
                    padding: "36px",
                    borderRadius: "20px",
                    background: "linear-gradient(135deg, rgba(2, 132, 199, 0.05) 0%, rgba(37, 99, 235, 0.05) 100%)",
                    borderLeft: "5px solid #0284c7",
                    borderTop: "1px solid #e2e8f0",
                    borderRight: "1px solid #e2e8f0",
                    borderBottom: "1px solid #e2e8f0",
                    marginBottom: "48px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.02)"
                  }}
                >
                  <p style={{ fontSize: "22px", fontWeight: "700", color: "#0f172a", fontStyle: "italic", lineHeight: "1.5", marginBottom: "16px" }}>
                    "We don't sell products. We sell confidence. Join the revolution. Cool your passion."
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "24px", height: "3px", background: "#0284c7" }} />
                    <span style={{ fontSize: "15px", fontWeight: "800", color: "#0284c7" }}>
                      Javed Shaikh, Founder, Thermal Lexum
                    </span>
                  </div>
                </div>

                {/* Innovation Highlights */}
                <div style={{ marginBottom: "48px" }}>
                  <h3 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", marginBottom: "24px" }}>
                    Our Tri-Pillar Commitment
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {[
                      { title: "Liquid Metal to Liquid Courage", desc: "Extreme conductivity engineered for ultra-high TDP overclocks and delidded processors." },
                      { title: "Thermal Paste to Trusted Performance", desc: "Formulated for non-drying, zero-bleed thermal interface stability under years of continuous load." },
                      { title: "Thermal Pads to Pure Innovation", desc: "Uniform phase-change compression pads protecting sensitive VRAM and VRM components." },
                    ].map((item, index) => (
                      <div
                        key={item.title}
                        className="brand-card"
                        style={{
                          padding: "24px",
                          display: "flex",
                          gap: "20px",
                          alignItems: "flex-start",
                          background: "#ffffff",
                          border: "1px solid #e2e8f0"
                        }}
                      >
                        <div
                          style={{
                            fontFamily: "JetBrains Mono, monospace",
                            fontSize: "14px",
                            fontWeight: "800",
                            color: "#0284c7",
                            background: "rgba(2, 132, 199, 0.08)",
                            padding: "8px 12px",
                            borderRadius: "8px",
                            border: "1px solid rgba(2, 132, 199, 0.2)"
                          }}
                        >
                          0{index + 1}
                        </div>
                        <div>
                          <h4 style={{ fontSize: "17px", fontWeight: "800", color: "#0f172a", marginBottom: "4px" }}>
                            {item.title}
                          </h4>
                          <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.6" }}>
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                  <Link href="/about" className="btn-primary">
                    About Thermal Lexum
                  </Link>
                  <Link href="/contact" className="btn-secondary">
                    Contact Us
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
