"use client";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function WhyLexumPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#ffffff", paddingTop: "100px", minHeight: "100vh" }}>
        <div style={{ background: "linear-gradient(135deg, #0E4D92 0%, #1a5ca4 100%)", color: "#ffffff", padding: "60px 20px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <span style={{ fontSize: "12px", letterSpacing: "2px", fontWeight: "800", color: "#ffd166", textTransform: "uppercase" }}>EXCELLENCE IN THERMAL ENGINEERING</span>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 54px)", fontWeight: "900", color: "#ffffff", marginTop: "8px", marginBottom: "16px" }}>
              Why Choose Thermal Lexum?
            </h1>
            <p style={{ fontSize: "17px", color: "#e2e8f0", maxWidth: "700px", lineHeight: "1.6" }}>
              Discover what makes Thermal Lexum the most trusted thermal interface brand for PC builders, overclockers, and industrial engineers across India.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "80px 20px" }}>
          <div className="responsive-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            {[
              {
                icon: "🧪",
                title: "Lab-Grade Nano-Diamond Formula",
                desc: "Our TL-X1 Ultra uses nano-diamond particles suspended in a carrier compound to achieve 14.2 W/m·K thermal conductivity — engineered for peak CPU and GPU performance.",
              },
              {
                icon: "🛡️",
                title: "3-Year Official Replacement Warranty",
                desc: "Every Thermal Lexum product comes with a full 3-year official warranty. Register online in under 60 seconds and get a QR-verified warranty certificate instantly.",
              },
              {
                icon: "🔬",
                title: "Non-Conductive & Non-Corrosive",
                desc: "Our standard thermal paste lineup is 100% non-electrically-conductive, safe for all PCB surfaces, capacitors, and IHS edges — zero shorting risk.",
              },
              {
                icon: "⚡",
                title: "Extreme Overclocking Ready",
                desc: "From delidded Intel CPUs to direct-die AMD Ryzen builds — Thermal Lexum Liquid Metal Extreme delivers 73 W/m·K conductivity, the highest available for consumer hardware.",
              },
            ].map((card) => (
              <div key={card.title} className="card-nesa" style={{ padding: "36px" }}>
                <div style={{ fontSize: "44px", marginBottom: "16px" }}>{card.icon}</div>
                <h3 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", marginBottom: "12px" }}>{card.title}</h3>
                <p style={{ fontSize: "15px", color: "#475569", lineHeight: "1.7", marginBottom: "24px" }}>{card.desc}</p>
                <Link href="/products" className="btn-primary">
                  Explore Products →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
