"use client";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function WhyNesaPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#ffffff", paddingTop: "100px", minHeight: "100vh" }}>
        <div style={{ background: "linear-gradient(135deg, #0E4D92 0%, #1a5ca4 100%)", color: "#ffffff", padding: "60px 20px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <span style={{ fontSize: "12px", letterSpacing: "2px", fontWeight: "800", color: "#ffd166", textTransform: "uppercase" }}>EXCELLENCE IN EDUCATION</span>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 54px)", fontWeight: "900", color: "#ffffff", marginTop: "8px", marginBottom: "16px" }}>
              Unlock Your English Potential with NESA
            </h1>
            <p style={{ fontSize: "17px", color: "#e2e8f0", maxWidth: "700px", lineHeight: "1.6" }}>
              Discover your English potential at NESA. Transform your language skills with our expert guidance and immersive programs.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "80px 20px" }}>
          <div className="responsive-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            {[
              {
                icon: "🌱",
                title: "Immersive Environment",
                desc: "We provide an immersive environment where learners are surrounded by English-speaking activities. From day one, practice real conversations with peers.",
              },
              {
                icon: "👨‍🏫",
                title: "Experienced Language Tutors",
                desc: "We have a team of experienced and qualified language instructors who are skilled in teaching English to diverse background learners.",
              },
              {
                icon: "🛡️",
                title: "Customized Programs",
                desc: "We offer customized programs tailored to the specific needs, career goals, and current proficiency levels of learners.",
              },
              {
                icon: "💡",
                title: "Interactive Learning Approach",
                desc: "These include group discussions, role plays, debates, and public speaking activities to actively involve learners.",
              },
            ].map((card) => (
              <div key={card.title} className="card-nesa" style={{ padding: "36px" }}>
                <div style={{ fontSize: "44px", marginBottom: "16px" }}>{card.icon}</div>
                <h3 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", marginBottom: "12px" }}>{card.title}</h3>
                <p style={{ fontSize: "15px", color: "#475569", lineHeight: "1.7", marginBottom: "24px" }}>{card.desc}</p>
                <Link href="/register" className="btn-primary">
                  Enroll Today →
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
