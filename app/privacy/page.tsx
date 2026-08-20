import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Thermal Lexum",
  description: "Thermal Lexum Privacy Policy — how we collect, use, and protect your personal information.",
};

const sections = [
  {
    title: "1. Information We Collect",
    content: `When you register a warranty or contact us, we may collect: name, email address, phone number, postal address, product serial number, proof of purchase, and IP address for security purposes.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use your information to: process warranty registrations, send warranty confirmation emails, provide customer support, and improve our products and services. We do not sell or share your information with third parties except as required to provide our services.`,
  },
  {
    title: "3. Data Security",
    content: `We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.`,
  },
  {
    title: "4. Data Retention",
    content: `We retain warranty registration data for the duration of your warranty period plus a reasonable period thereafter. Contact information is retained as long as necessary to provide support.`,
  },
  {
    title: "5. Your Rights",
    content: `You may request access to, correction of, or deletion of your personal data by contacting us at info@thermallexum.com. We will respond to requests within 30 days.`,
  },
  {
    title: "6. Cookies",
    content: `Our website uses essential cookies for functionality. We do not use tracking or advertising cookies. You may disable cookies in your browser settings, though this may affect site functionality.`,
  },
  {
    title: "7. Contact",
    content: `For privacy-related inquiries, contact us at info@thermallexum.com or write to: Thermal Lexum, 6th Floor, Southblock, Manipal Center, Dickenson Road, MG Road, Bengaluru - 560042, India.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#ffffff", minHeight: "100vh" }}>
        <section className="page-hero bg-grid" style={{ background: "radial-gradient(circle at 50% 0%, rgba(2, 132, 199, 0.08) 0%, #ffffff 80%)", borderBottom: "1px solid #e2e8f0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            <div className="section-label" style={{ marginBottom: "16px" }}>LEGAL</div>
            <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: "900", letterSpacing: "-2px", color: "#0f172a", marginBottom: "16px" }}>Privacy Policy</h1>
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
