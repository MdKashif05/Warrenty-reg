import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions | Thermal Lexum",
  description: "Terms and Conditions for using Thermal Lexum website and services.",
};

const sections = [
  { title: "1. Acceptance of Terms", content: "By accessing and using the Thermal Lexum website and services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services." },
  { title: "2. Use of Website", content: "You agree to use the Thermal Lexum website only for lawful purposes and in accordance with these Terms. You must not use the website in any way that may cause damage to the website or impair its availability." },
  { title: "3. Warranty Registration Service", content: "The warranty registration service is provided to enable customers to register their Thermal Lexum products. You agree to provide accurate information during registration. False information may result in warranty invalidation." },
  { title: "4. Intellectual Property", content: "All content on the Thermal Lexum website, including text, graphics, logos, and software, is the property of Thermal Lexum and is protected by applicable intellectual property laws." },
  { title: "5. Disclaimer of Warranties", content: "The website and its content are provided on an 'as is' basis without warranties of any kind, either express or implied, except as provided in the product warranty documentation." },
  { title: "6. Limitation of Liability", content: "To the fullest extent permitted by law, Thermal Lexum shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of this website or its services." },
  { title: "7. Changes to Terms", content: "Thermal Lexum reserves the right to modify these Terms at any time. Continued use of the website after changes constitutes acceptance of the new Terms." },
  { title: "8. Governing Law", content: "These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Bengaluru, Karnataka, India." },
];

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#ffffff", minHeight: "100vh" }}>
        <section className="page-hero bg-grid" style={{ background: "radial-gradient(circle at 50% 0%, rgba(2, 132, 199, 0.08) 0%, #ffffff 80%)", borderBottom: "1px solid #e2e8f0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            <div className="section-label" style={{ marginBottom: "16px" }}>LEGAL</div>
            <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: "900", letterSpacing: "-2px", color: "#0f172a", marginBottom: "16px" }}>Terms & Conditions</h1>
            <p style={{ fontSize: "14px", color: "#64748b" }}>Last updated: August 2026</p>
          </div>
          <div className="thermal-bar" style={{ marginTop: "48px" }} />
        </section>
        <section style={{ padding: "80px 24px", background: "#ffffff" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "48px" }}>
            {sections.map((section) => (
              <div key={section.title}>
                <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", marginBottom: "16px", paddingBottom: "12px", borderBottom: "1px solid #e2e8f0" }}>
                  {section.title}
                </h2>
                <p style={{ fontSize: "15px", color: "#475569", lineHeight: "1.9" }}>{section.content}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
