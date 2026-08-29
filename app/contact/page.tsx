"use client";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#ffffff" }}>
        {/* Hero */}
        <section className="page-hero bg-grid" style={{ background: "radial-gradient(circle at 50% 0%, rgba(2, 132, 199, 0.08) 0%, #ffffff 80%)", borderBottom: "1px solid #e2e8f0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            <div className="section-label" style={{ marginBottom: "16px" }}>GET IN TOUCH</div>
            <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: "900", letterSpacing: "-2px", color: "#0f172a", marginBottom: "16px" }}>
              We&apos;re Here<br />
              <span className="text-gradient">to Help.</span>
            </h1>
            <p style={{ fontSize: "16px", color: "#475569", maxWidth: "480px" }}>
              Have a question, need support, or want to discuss a partnership? Reach out to the Thermal Lexum team.
            </p>
          </div>
          <div className="thermal-bar" style={{ marginTop: "48px" }} />
        </section>

        <section style={{ padding: "80px 24px", background: "#ffffff" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div className="contact-grid">
              {/* Contact info */}
              <div>
                <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#0f172a", marginBottom: "32px" }}>Contact Information</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "48px" }}>
                  {[
                    { icon: "✉️", label: "EMAIL SUPPORT", value: "info@thermallexum.com", href: "mailto:info@thermallexum.com" },
                    { icon: "📞", label: "PHONE DIRECT", value: "+91 8864-817544", href: "tel:+918864817544" },
                    { icon: "🌐", label: "OFFICIAL WEBSITE", value: "www.thermallexum.com", href: "http://www.thermallexum.com" },
                  ].map((item) => (
                    <a key={item.label} href={item.href} style={{ textDecoration: "none", display: "flex", gap: "16px", alignItems: "flex-start" }}>
                      <div style={{ fontSize: "20px", width: "40px", flexShrink: 0, marginTop: "2px" }}>{item.icon}</div>
                      <div>
                        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "10px", letterSpacing: "2px", color: "#64748b", marginBottom: "4px", fontWeight: "700" }}>{item.label}</div>
                        <div style={{ fontSize: "15px", color: "#0284c7", fontWeight: "700" }}>{item.value}</div>
                      </div>
                    </a>
                  ))}
                </div>

                <div className="brand-card" style={{ padding: "28px", background: "#ffffff", border: "1px solid #e2e8f0" }}>
                  <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", letterSpacing: "2px", color: "#64748b", marginBottom: "12px", fontWeight: "700" }}>OFFICE ADDRESS</div>
                  <p style={{ fontSize: "15px", color: "#0f172a", lineHeight: "1.8", fontWeight: "500" }}>
                    Thermal Lexum<br />
                    6th Floor, Southblock, Manipal Center,<br />
                    Dickenson Road, MG Road,<br />
                    Bengaluru - 560042, India
                  </p>
                </div>

                <div style={{ marginTop: "32px" }}>
                  <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", letterSpacing: "2px", color: "#64748b", marginBottom: "16px", fontWeight: "700" }}>RESPONSE GUARANTEE</div>
                  <div className="brand-card" style={{ padding: "18px 24px", display: "flex", gap: "12px", alignItems: "center", background: "#ffffff", border: "1px solid #e2e8f0" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981" }} />
                    <span style={{ fontSize: "14px", color: "#475569", fontWeight: "500" }}>We typically respond within 24-48 business hours.</span>
                  </div>
                </div>
              </div>

              {/* Contact form */}
              <div className="brand-card" style={{ padding: "40px", background: "#ffffff", border: "1px solid #e2e8f0" }}>
                <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#0f172a", marginBottom: "8px" }}>Send a Message</h2>
                <p style={{ fontSize: "14px", color: "#475569", marginBottom: "32px" }}>Fill out the form below and we&apos;ll get back to you shortly.</p>

                {status === "sent" ? (
                  <div
                    style={{
                      background: "#ecfdf5",
                      border: "1px solid #a7f3d0",
                      borderRadius: "12px",
                      padding: "40px",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
                    <div style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", marginBottom: "8px" }}>Message Sent!</div>
                    <p style={{ fontSize: "14px", color: "#475569" }}>Thank you for reaching out. We&apos;ll get back to you within 24-48 hours.</p>
                    <button onClick={() => setStatus("idle")} className="btn-secondary" style={{ marginTop: "24px" }}>Send Another Message</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div className="responsive-form-grid-2">
                      <div className="form-group">
                        <label className="form-label" htmlFor="contact-name">Full Name *</label>
                        <input
                          id="contact-name"
                          type="text"
                          className="input-field"
                          placeholder="Your full name"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="contact-email">Email Address *</label>
                        <input
                          id="contact-email"
                          type="email"
                          className="input-field"
                          placeholder="your@email.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="responsive-form-grid-2">
                      <div className="form-group">
                        <label className="form-label" htmlFor="contact-phone">Phone Number</label>
                        <input
                          id="contact-phone"
                          type="tel"
                          className="input-field"
                          placeholder="+91 XXXXX XXXXX"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="contact-subject">Subject *</label>
                        <select
                          id="contact-subject"
                          className="input-field"
                          value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                          required
                        >
                          <option value="">Select subject</option>
                          <option value="Warranty Support">Warranty Support</option>
                          <option value="Product Inquiry">Product Inquiry</option>
                          <option value="Technical Support">Technical Support</option>
                          <option value="Partnership">Partnership</option>
                          <option value="General Inquiry">General Inquiry</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-message">Message *</label>
                      <textarea
                        id="contact-message"
                        className="input-field"
                        placeholder="Tell us how we can help..."
                        rows={6}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        required
                        style={{ resize: "vertical" }}
                      />
                    </div>
                    {status === "error" && (
                      <div style={{ color: "#dc2626", fontSize: "13px", background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "8px", padding: "12px", fontWeight: "600" }}>
                        Something went wrong. Please try again or email us directly at info@thermallexum.com.
                      </div>
                    )}
                    <button type="submit" className="btn-primary" disabled={status === "sending"} style={{ justifyContent: "center" }}>
                      {status === "sending" ? (
                        <>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "spin 1s linear infinite" }}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4"/></svg>
                          Sending...
                        </>
                      ) : "Send Message"}
                    </button>
                    <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
