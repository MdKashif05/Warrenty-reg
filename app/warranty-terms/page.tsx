import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Warranty Terms | Thermal Lexum",
  description: "Thermal Lexum warranty terms and conditions for all registered products.",
};

const sections = [
  {
    title: "1. Warranty Coverage",
    content: `Thermal Lexum warrants its products against defects in materials and workmanship for the warranty period specified on the product packaging or documentation, commencing from the date of original purchase.

This warranty covers:
• Manufacturing defects in materials and workmanship
• Packaging defects that affect product integrity
• Premature performance degradation under normal use conditions

The warranty period varies by product and is stated on the product packaging. Register your product within 30 days of purchase to activate warranty coverage.`,
  },
  {
    title: "2. Warranty Exclusions",
    content: `This warranty does not cover:
• Damage resulting from improper application or installation
• Damage caused by use with incompatible hardware or in excess of recommended operating conditions
• Physical damage, including contamination of the product with foreign substances
• Damage caused by unauthorized modification, misuse, or accident
• Normal wear and degradation within manufacturer specifications
• Products purchased from unauthorized resellers
• Products without valid proof of purchase`,
  },
  {
    title: "3. Warranty Registration",
    content: `To activate warranty coverage, you must:
1. Register your product at www.thermallexum.com/warranty/register within 30 days of purchase
2. Provide valid proof of purchase (invoice or sales receipt)
3. Provide accurate personal and purchase information

Failure to register within the specified period may result in delayed or denied warranty claims. A Registration ID will be issued upon successful registration.`,
  },
  {
    title: "4. Making a Warranty Claim",
    content: `To submit a warranty claim:
1. Contact Thermal Lexum support at info@thermallexum.com
2. Provide your Registration ID and describe the issue
3. Our support team will review your claim and provide instructions

Thermal Lexum reserves the right to inspect the claimed defective product before processing any warranty action. Unauthorized returns will not be accepted.`,
  },
  {
    title: "5. Warranty Remedies",
    content: `At our discretion, Thermal Lexum may:
• Replace the defective product with an equivalent or better product
• Provide a refund for the purchase price of the defective product
• Offer alternative remedies as deemed appropriate by our support team

Remedy decisions are made on a case-by-case basis and are final. Thermal Lexum is not responsible for any indirect, incidental, or consequential damages.`,
  },
  {
    title: "6. Limitation of Liability",
    content: `To the maximum extent permitted by applicable law, Thermal Lexum's liability under this warranty is limited to the original purchase price of the product. Thermal Lexum shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from the use or inability to use our products.`,
  },
  {
    title: "7. Governing Law",
    content: `This warranty is governed by the laws of India. Any disputes arising in connection with this warranty shall be subject to the exclusive jurisdiction of the courts in Bengaluru, Karnataka, India.`,
  },
];

export default function WarrantyTermsPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#ffffff", minHeight: "100vh" }}>
        <section className="page-hero bg-grid" style={{ background: "radial-gradient(circle at 50% 0%, rgba(2, 132, 199, 0.08) 0%, #ffffff 80%)", borderBottom: "1px solid #e2e8f0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            <div className="section-label" style={{ marginBottom: "16px" }}>LEGAL</div>
            <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: "900", letterSpacing: "-2px", color: "#0f172a", marginBottom: "16px" }}>
              Warranty Terms<br />
              <span className="text-gradient">& Conditions</span>
            </h1>
            <p style={{ fontSize: "14px", color: "#64748b" }}>Last updated: August 2026</p>
          </div>
          <div className="thermal-bar" style={{ marginTop: "48px" }} />
        </section>

        <section style={{ padding: "80px 24px", background: "#ffffff" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div
              style={{
                background: "rgba(2, 132, 199, 0.06)",
                border: "1px solid rgba(2, 132, 199, 0.2)",
                borderRadius: "12px",
                padding: "24px",
                marginBottom: "48px",
                display: "flex",
                gap: "16px",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" style={{ flexShrink: 0, marginTop: "2px" }}>
                <circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/>
              </svg>
              <div>
                <p style={{ fontSize: "15px", color: "#0284c7", fontWeight: "700", marginBottom: "4px" }}>Important Notice</p>
                <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.7" }}>
                  These warranty terms are subject to change. Please register your product promptly after purchase and retain your proof of purchase. For the most current warranty information, contact info@thermallexum.com.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
              {sections.map((section) => (
                <div key={section.title}>
                  <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", marginBottom: "16px", paddingBottom: "12px", borderBottom: "1px solid #e2e8f0" }}>
                    {section.title}
                  </h2>
                  <div style={{ fontSize: "15px", color: "#475569", lineHeight: "1.9", whiteSpace: "pre-line" }}>
                    {section.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="brand-card" style={{ padding: "32px", textAlign: "center", marginTop: "64px", background: "#ffffff", border: "1px solid #e2e8f0" }}>
              <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", marginBottom: "12px" }}>Ready to Register Your Warranty?</h3>
              <p style={{ fontSize: "14px", color: "#475569", marginBottom: "24px" }}>Protect your Thermal Lexum product today. Registration takes less than 5 minutes.</p>
              <Link href="/warranty/register" className="btn-primary">Register Warranty Now</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
