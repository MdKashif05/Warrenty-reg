"use client";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#ffffff", paddingTop: "100px", minHeight: "100vh" }}>
        <div style={{ background: "linear-gradient(135deg, #0E4D92 0%, #1a5ca4 100%)", color: "#ffffff", padding: "60px 20px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <span style={{ fontSize: "12px", letterSpacing: "2px", fontWeight: "800", color: "#ffd166", textTransform: "uppercase" }}>ABOUT NESA INSTITUTE</span>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 54px)", fontWeight: "900", color: "#ffffff", marginTop: "8px", marginBottom: "16px" }}>
              Welcome to Nesa: Your English Speaking Hub for Confidence
            </h1>
            <p style={{ fontSize: "17px", color: "#e2e8f0", maxWidth: "720px", lineHeight: "1.6" }}>
              At Nesa, we create a friendly and immersive environment where you can enhance your speaking skills with ease.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "80px 20px" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center marginBottom-60">
            <div>
              <h2 style={{ fontSize: "32px", fontWeight: "900", color: "#0f172a", marginBottom: "20px" }}>
                Our Mission & Vision
              </h2>
              <p style={{ fontSize: "16px", color: "#475569", lineHeight: "1.8", marginBottom: "20px" }}>
                Welcome to Nesa, your ultimate destination for building English fluency and boosting your confidence! Our experienced instructors provide personalized guidance, engaging activities, and practical conversations to help you excel in English.
              </p>
              <p style={{ fontSize: "16px", color: "#475569", lineHeight: "1.8", marginBottom: "32px" }}>
                Whether you're a beginner or advanced learner, Nesa is here to support you on your journey towards becoming a confident English speaker. Join us and unlock your linguistic potential today!
              </p>

              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <Link href="/courses" className="btn-primary">
                  Explore Programs
                </Link>
                <Link href="/contact" className="btn-secondary">
                  Contact Admissions
                </Link>
              </div>
            </div>

            <div className="card-nesa" style={{ padding: "40px", background: "#f0fcff", border: "1px solid #cceeff" }}>
              <h3 style={{ fontSize: "24px", fontWeight: "800", color: "#0E4D92", marginBottom: "16px" }}>
                Why Learners Trust NESA
              </h3>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "14px", padding: 0, fontSize: "15px", color: "#334155" }}>
                <li>✅ <strong>Certified Language Tutors:</strong> Dedicated experts skilled in conversational pedagogy.</li>
                <li>✅ <strong>Time-Efficient Modules:</strong> Accelerated 30, 60, and 90-day learning tracks.</li>
                <li>✅ <strong>Immersive Speaking Practice:</strong> Group discussions, debates, and role play sessions.</li>
                <li>✅ <strong>Comprehensive Exam Preparation:</strong> Specialized IELTS and Business English modules.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
