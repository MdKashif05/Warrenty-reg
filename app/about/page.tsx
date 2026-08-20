import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us | Thermal Lexum",
  description: "Learn about Thermal Lexum — our mission, engineering values, leadership under Founder Javed Shaikh, and commitment to performance.",
};

const values = [
  {
    icon: "⚡",
    title: "Performance First",
    desc: "Every decision we make is centered around delivering maximum thermal dissipation and stability for high-draw hardware.",
  },
  {
    icon: "🔬",
    title: "Engineering Excellence",
    desc: "Our thermal interface compounds are tested across thousands of heat cycles under intense overclocking scenarios.",
  },
  {
    icon: "🛡️",
    title: "Reliability & Longevity",
    desc: "Formulated to prevent drying out, pumping out, or breakdown, ensuring years of consistent cooling performance.",
  },
  {
    icon: "🌐",
    title: "Global Standards",
    desc: "Thermal Lexum products adhere to strict international quality, non-toxicity, and electrical isolation standards.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#ffffff" }}>
        {/* Hero */}
        <section
          className="page-hero bg-grid"
          style={{
            background: "radial-gradient(circle at 50% 0%, rgba(2, 132, 199, 0.08) 0%, #ffffff 80%)",
            borderBottom: "1px solid #e2e8f0",
            paddingTop: "140px",
            paddingBottom: "80px"
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            <div className="section-label" style={{ marginBottom: "16px" }}>ABOUT THERMAL LEXUM</div>
            <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: "900", letterSpacing: "-2px", color: "#0f172a", marginBottom: "16px" }}>
              Built for Those Who<br />
              <span className="text-gradient">Demand Thermal Mastery.</span>
            </h1>
            <p style={{ fontSize: "16px", color: "#475569", maxWidth: "600px", lineHeight: "1.7" }}>
              Thermal Lexum is a performance-focused thermal technology brand dedicated to engineering high-conductivity thermal interface solutions for modern computing.
            </p>
          </div>
          <div className="thermal-bar" style={{ marginTop: "48px" }} />
        </section>

        {/* Mission */}
        <section style={{ padding: "100px 24px", background: "#ffffff" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
              <div>
                <div className="section-label" style={{ marginBottom: "16px" }}>OUR MISSION</div>
                <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: "800", letterSpacing: "-1.5px", color: "#0f172a", marginBottom: "24px" }}>
                  Thermal Science Engineered Without Shortcuts.
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "20px", fontSize: "15px", color: "#475569", lineHeight: "1.8" }}>
                  <p>
                    Thermal Lexum was founded on a simple principle: cooling is not optional — it is the heartbeat of hardware performance and lifespan.
                  </p>
                  <p>
                    From enthusiasm-driven desktop rigs to workstation render nodes, poor heat transfer throttles power. We eliminate thermal bottlenecks through micro-particulate zinc and aluminum oxide matrix formulas.
                  </p>
                  <p>
                    Trusted by builders, overclockers, and professionals worldwide, every Thermal Lexum product is backed by digital warranty verification and direct engineering support.
                  </p>
                </div>
              </div>

              {/* Stats Box */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                {[
                  { num: "14.2 W/mK", label: "Peak Conductivity" },
                  { num: "100%", label: "Authenticity Verified" },
                  { num: "5 Years", label: "Product Durability" },
                  { num: "24/7", label: "Warranty Support" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="brand-card"
                    style={{
                      padding: "28px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      border: "1px solid #e2e8f0",
                      background: "#f8fafc"
                    }}
                  >
                    <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "32px", fontWeight: "900", color: "#0284c7", marginBottom: "4px" }}>
                      {stat.num}
                    </span>
                    <span style={{ fontSize: "13px", color: "#64748b", fontWeight: "600", letterSpacing: "0.5px" }}>
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Founder Spotlight Section */}
        <section
          style={{
            padding: "90px 24px",
            background: "#f8fafc",
            borderTop: "1px solid #e2e8f0",
            borderBottom: "1px solid #e2e8f0"
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div
              className="brand-card"
              style={{
                padding: "48px",
                display: "grid",
                gridTemplateColumns: "300px 1fr",
                gap: "48px",
                alignItems: "center",
                background: "#ffffff",
                border: "1px solid #cbd5e1",
                boxShadow: "0 15px 35px rgba(0,0,0,0.05)"
              }}
            >
              <div style={{ position: "relative", width: "100%", height: "320px", borderRadius: "16px", overflow: "hidden", border: "3px solid #0284c7" }}>
                <Image
                  src="/founder.png"
                  alt="Javed Shaikh - Founder of Thermal Lexum"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                />
              </div>

              <div>
                <div className="section-label" style={{ marginBottom: "12px" }}>FOUNDER SPOTLIGHT</div>
                <h3 style={{ fontSize: "30px", fontWeight: "800", color: "#0f172a", marginBottom: "16px" }}>
                  "We don't sell products. We sell confidence."
                </h3>
                <p style={{ fontSize: "16px", color: "#475569", lineHeight: "1.8", marginBottom: "24px" }}>
                  Founder <strong>Javed Shaikh</strong> established Thermal Lexum to deliver zero-compromise thermal solutions — liquid metal to liquid courage, thermal paste to trusted performance, thermal pads to pure innovation.
                </p>
                <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                  <Link href="/founder" className="btn-primary">
                    Read Javed Shaikh's Message
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                  <span style={{ fontSize: "14px", color: "#0284c7", fontWeight: "700" }}>— Javed Shaikh, Founder & CEO</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section style={{ padding: "100px 24px", background: "#ffffff" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <div className="section-label" style={{ marginBottom: "16px" }}>OUR CORE VALUES</div>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: "800", letterSpacing: "-1.5px", color: "#0f172a" }}>
                The Principles Behind Every Compound
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>
              {values.map((val) => (
                <div key={val.title} className="brand-card" style={{ padding: "36px" }}>
                  <div style={{ fontSize: "36px", marginBottom: "16px" }}>{val.icon}</div>
                  <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#0f172a", marginBottom: "12px" }}>{val.title}</h3>
                  <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.7" }}>{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: "80px 24px", background: "#f8fafc", textAlign: "center", borderTop: "1px solid #e2e8f0" }}>
          <div style={{ maxWidth: "540px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "36px", fontWeight: "800", letterSpacing: "-1.5px", color: "#0f172a", marginBottom: "16px" }}>
              Join the Revolution. Cool Your Passion.
            </h2>
            <p style={{ fontSize: "15px", color: "#475569", marginBottom: "32px", lineHeight: "1.7" }}>
              Join thousands of enthusiasts and professionals who rely on Thermal Lexum for peak system stability.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
              <Link href="/products" className="btn-primary">Explore Products</Link>
              <Link href="/contact" className="btn-secondary">Contact Us</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
