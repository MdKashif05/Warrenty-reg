"use client";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", course: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <main style={{ background: "#ffffff", paddingTop: "100px", minHeight: "100vh" }}>
        <div style={{ background: "linear-gradient(135deg, #0E4D92 0%, #1a5ca4 100%)", color: "#ffffff", padding: "60px 20px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <span style={{ fontSize: "12px", letterSpacing: "2px", fontWeight: "800", color: "#ffd166", textTransform: "uppercase" }}>GET IN TOUCH</span>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 54px)", fontWeight: "900", color: "#ffffff", marginTop: "8px", marginBottom: "16px" }}>
              Contact NESA Admissions
            </h1>
            <p style={{ fontSize: "17px", color: "#e2e8f0", maxWidth: "680px", lineHeight: "1.6" }}>
              Have questions about courses, class timings, or fee structure? Speak with our academic counselors today.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "80px 20px" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <div className="card-nesa" style={{ padding: "40px" }}>
              {submitted ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: "54px", marginBottom: "16px" }}>✅</div>
                  <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#0E4D92", marginBottom: "12px" }}>Enquiry Submitted!</h2>
                  <p style={{ color: "#475569", fontSize: "15px", lineHeight: "1.6" }}>
                    Thank you for contacting NESA Institute. Our academic counselor will call you within 2 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", marginBottom: "4px" }}>
                    Send Us a Message
                  </h2>

                  <div>
                    <label style={{ fontSize: "13px", fontWeight: "700", color: "#475569", display: "block", marginBottom: "6px" }}>Your Full Name *</label>
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Rahul Sharma" style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", outline: "none" }} />
                  </div>

                  <div className="responsive-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div>
                      <label style={{ fontSize: "13px", fontWeight: "700", color: "#475569", display: "block", marginBottom: "6px" }}>Email Address *</label>
                      <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="rahul@example.com" style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", outline: "none" }} />
                    </div>
                    <div>
                      <label style={{ fontSize: "13px", fontWeight: "700", color: "#475569", display: "block", marginBottom: "6px" }}>Phone Number *</label>
                      <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 9876543210" style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", outline: "none" }} />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: "13px", fontWeight: "700", color: "#475569", display: "block", marginBottom: "6px" }}>Interested Course</label>
                    <select value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", outline: "none", background: "#fff" }}>
                      <option value="">Select Course...</option>
                      <option value="Level 1">NESA Fluent English Level 1</option>
                      <option value="Level 2">NESA Fluent English Level 2</option>
                      <option value="Foundation">NESA English Foundation</option>
                      <option value="Professional">NESA Professional English</option>
                      <option value="IELTS">NESA IELTS Preparation</option>
                      <option value="Corporate">NESA Corporate English</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: "13px", fontWeight: "700", color: "#475569", display: "block", marginBottom: "6px" }}>Your Message / Query</label>
                    <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your learning goals..." style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", outline: "none" }} />
                  </div>

                  <button type="submit" className="btn-primary" style={{ padding: "14px", fontSize: "16px" }}>
                    Submit Enquiry Now 🚀
                  </button>
                </form>
              )}
            </div>

            {/* Info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div className="card-nesa" style={{ padding: "30px", background: "#f0fcff", border: "1px solid #cceeff" }}>
                <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#0E4D92", marginBottom: "16px" }}>
                  Admissions Contact Info
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "15px", color: "#334155" }}>
                  <div>
                    <strong>📧 Email:</strong> admissions@nesainstitute.com
                  </div>
                  <div>
                    <strong>📞 Phone / WhatsApp:</strong> +91 98765 43210
                  </div>
                  <div>
                    <strong>🕒 Center Hours:</strong> Monday – Saturday: 8:00 AM – 8:00 PM
                  </div>
                  <div>
                    <strong>📍 Location:</strong> NESA Language Hub, Main Boulevard, Education City Campus
                  </div>
                </div>
              </div>

              <div className="card-nesa" style={{ padding: "30px", background: "#0E4D92", color: "#ffffff" }}>
                <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#ffffff", marginBottom: "12px" }}>
                  Need Immediate Assistance?
                </h3>
                <p style={{ fontSize: "14px", color: "#cbd5e1", lineHeight: "1.6", marginBottom: "20px" }}>
                  Call our Student Support Hotline directly or visit our campus for a free demo class.
                </p>
                <a href="tel:+919876543210" className="btn-primary" style={{ background: "#ffffff", color: "#0E4D92", display: "inline-block", textAlign: "center" }}>
                  Call Hotline Now 📞
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
