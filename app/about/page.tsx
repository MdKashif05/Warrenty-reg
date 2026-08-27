"use client";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#ffffff", paddingTop: "80px", minHeight: "100vh" }}>

        {/* ─── HERO BANNER ─── */}
        <section style={{ position: "relative", borderBottom: "1px solid #1e3a5f" }}>
          <div style={{ position: "relative", width: "100%", height: "clamp(180px, 28vw, 360px)", overflow: "hidden" }}>
            <Image
              src="/banner.png"
              alt="Thermal Lexum – Maximum Cooling"
              fill
              priority
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.65) 100%)" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px", padding: "0 20px", textAlign: "center" }}>
              <div style={{ fontSize: "12px", letterSpacing: "3px", fontWeight: "800", color: "#ffd166", textTransform: "uppercase" }}>ABOUT THERMAL LEXUM</div>
              <h1 style={{ fontSize: "clamp(26px, 5vw, 52px)", fontWeight: "900", color: "#ffffff", letterSpacing: "-1px", lineHeight: "1.15" }}>
                Built on Engineering Integrity
              </h1>
              <p style={{ fontSize: "16px", color: "#e2e8f0", maxWidth: "560px", lineHeight: "1.6" }}>
                Thermal Lexum — where every gram of compound is engineered to last, perform, and protect your hardware.
              </p>
            </div>
          </div>
        </section>

        {/* ─── FOUNDER MESSAGE ─── */}
        <section style={{ padding: "80px 20px", background: "#ffffff" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "60px", alignItems: "center" }}>

              {/* Founder Photo Card */}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{
                  borderRadius: "24px",
                  overflow: "hidden",
                  border: "2px solid #0E4D92",
                  boxShadow: "0 24px 60px rgba(14,77,146,0.25)",
                  maxWidth: "360px",
                  width: "100%",
                  position: "relative"
                }}>
                  <div style={{ position: "relative", width: "100%", aspectRatio: "3/4" }}>
                    <Image
                      src="/founder.png"
                      alt="Javed Shaikh – Founder & CEO, Thermal Lexum"
                      fill
                      sizes="(max-width: 768px) 100vw, 360px"
                      style={{ objectFit: "cover", objectPosition: "center top" }}
                    />
                    {/* Name overlay */}
                    <div style={{
                      position: "absolute", bottom: 0, left: 0, right: 0,
                      background: "linear-gradient(to top, rgba(14,77,146,0.95) 0%, transparent 100%)",
                      padding: "40px 24px 24px"
                    }}>
                      <div style={{ fontSize: "22px", fontWeight: "900", color: "#ffffff", marginBottom: "4px" }}>Javed Shaikh</div>
                      <div style={{ fontSize: "12px", fontWeight: "700", color: "#ffd166", letterSpacing: "2px", textTransform: "uppercase" }}>Founder & CEO</div>
                    </div>
                  </div>
                  {/* Bottom bar */}
                  <div style={{ background: "#0E4D92", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: "11px", color: "#bfdbfe" }}>Company</div>
                      <div style={{ fontSize: "15px", fontWeight: "800", color: "#ffffff" }}>Thermal Lexum</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "11px", color: "#bfdbfe" }}>Location</div>
                      <div style={{ fontSize: "15px", fontWeight: "800", color: "#ffd166" }}>Bengaluru, India</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Founder Message Text */}
              <div>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  background: "rgba(14,77,146,0.08)", border: "1px solid rgba(14,77,146,0.2)",
                  borderRadius: "20px", padding: "6px 16px", marginBottom: "24px"
                }}>
                  <span style={{ fontSize: "12px", fontWeight: "700", color: "#0E4D92", letterSpacing: "1px", textTransform: "uppercase" }}>
                    MESSAGE FROM THE FOUNDER
                  </span>
                </div>

                <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: "900", color: "#0f172a", letterSpacing: "-1px", lineHeight: "1.2", marginBottom: "28px" }}>
                  "Cool Systems.<br />
                  <span style={{ color: "#0E4D92" }}>Unstoppable Performance.</span>"
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: "18px", fontSize: "16px", color: "#334155", lineHeight: "1.8" }}>
                  <p style={{ fontSize: "18px", fontWeight: "600", color: "#0f172a" }}>
                    I'm Javed Shaikh. I created Thermal Lexum because the world needed thermal solutions that actually deliver — no compromise, no shortcuts.
                  </p>
                  <p>
                    From liquid metal for extreme delidded builds to professional-grade thermal pads protecting VRAM and VRM — every product we make is engineered with precision and tested under real-world loads.
                  </p>
                  <p style={{ fontSize: "18px", fontWeight: "700", color: "#0E4D92" }}>
                    We don't sell products. We sell confidence.
                  </p>
                  <p>
                    Join the revolution. Cool your passion.
                  </p>
                </div>

                {/* Quote box */}
                <div style={{
                  marginTop: "32px", padding: "28px 32px", borderRadius: "16px",
                  background: "linear-gradient(135deg, rgba(14,77,146,0.05) 0%, rgba(37,99,235,0.05) 100%)",
                  borderLeft: "5px solid #0E4D92", border: "1px solid #e2e8f0",
                  borderLeftWidth: "5px", borderLeftColor: "#0E4D92"
                }}>
                  <p style={{ fontSize: "18px", fontWeight: "700", color: "#0f172a", fontStyle: "italic", lineHeight: "1.6", marginBottom: "14px" }}>
                    "Liquid metal to liquid courage. Thermal paste to trusted performance. Thermal pads to pure innovation."
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "24px", height: "3px", background: "#0E4D92" }} />
                    <span style={{ fontSize: "14px", fontWeight: "800", color: "#0E4D92" }}>Javed Shaikh, Founder — Thermal Lexum</span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginTop: "36px" }}>
                  <Link href="/founder" className="btn-primary">Read Full Message →</Link>
                  <Link href="/contact" className="btn-secondary">Contact Us</Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ─── MISSION & VALUES ─── */}
        <section style={{ padding: "80px 20px", background: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <span style={{ fontSize: "12px", letterSpacing: "2px", fontWeight: "800", color: "#0E4D92", textTransform: "uppercase" }}>
                OUR MISSION
              </span>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: "900", color: "#0f172a", marginTop: "10px" }}>
                Why Choose Thermal Lexum?
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
              {[
                { icon: "🧪", title: "Lab-Grade Formulation", desc: "Every compound is tested for thermal conductivity, viscosity, and long-term stability before reaching your hands." },
                { icon: "🛡️", title: "3-Year Official Warranty", desc: "Full replacement warranty on all products. Register online in 60 seconds — no paperwork, no hassle." },
                { icon: "🔬", title: "Zero-Compromise Quality", desc: "14.8 W/m·K conductivity ceiling — the highest in its class. Built for delidded CPUs, GPUs, and industrial systems." },
                { icon: "🇮🇳", title: "Proudly Indian Brand", desc: "Designed, formulated, and supported from Bengaluru. Trusted by 50,000+ Indian PC builders and system integrators." },
              ].map((item) => (
                <div
                  key={item.title}
                  style={{
                    padding: "32px", background: "#ffffff", borderRadius: "16px",
                    border: "1px solid #e2e8f0", boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                    transition: "transform 0.2s, box-shadow 0.2s"
                  }}
                >
                  <div style={{ fontSize: "36px", marginBottom: "16px" }}>{item.icon}</div>
                  <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", marginBottom: "10px" }}>{item.title}</h3>
                  <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.7" }}>{item.desc}</p>
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
