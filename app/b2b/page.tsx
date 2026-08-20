"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

const indianStates = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
  "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka",
  "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal"
];

const productOptions = [
  "LX-TIM Pro (Thermal Paste - 14.2 W/mK)",
  "LX-TIM Ultra (Extreme Thermal Paste - 16.8 W/mK)",
  "LX-LM Elite (Liquid Metal - 73.0 W/mK)",
  "LX-PAD Standard (Thermal Pad - 12.5 W/mK)",
  "LX-PAD Pro (High-Density Pad - 15.0 W/mK)",
  "Custom / Mixed Bulk Package"
];

export default function B2bPage() {
  const [form, setForm] = useState({
    companyName: "",
    contactPerson: "",
    businessEmail: "",
    phone: "",
    gstin: "",
    productRequired: productOptions[0],
    quantity: "10",
    deliveryCity: "",
    deliveryState: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.companyName || !form.contactPerson || !form.businessEmail || !form.phone || !form.deliveryCity || !form.deliveryState) {
      setErrorMsg("Please fill in all required fields.");
      setStatus("error");
      return;
    }

    if (parseInt(form.quantity, 10) < 10) {
      setErrorMsg("Minimum Order Quantity (MOQ) for B2B Direct Purchase is 10 units.");
      setStatus("error");
      return;
    }

    setLoading(true);
    setStatus("idle");
    setErrorMsg("");

    try {
      const res = await fetch("/api/b2b", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Failed to submit enquiry. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Connection error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#ffffff" }}>
        {/* Hero Section */}
        <section
          className="page-hero bg-grid"
          style={{
            background: "radial-gradient(circle at 50% 0%, rgba(2, 132, 199, 0.1) 0%, #ffffff 80%)",
            borderBottom: "1px solid #e2e8f0",
            paddingTop: "150px",
            paddingBottom: "80px",
            position: "relative"
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(2, 132, 199, 0.1)",
                border: "1px solid rgba(2, 132, 199, 0.25)",
                padding: "6px 16px",
                borderRadius: "20px",
                marginBottom: "20px"
              }}
            >
              <span style={{ fontSize: "12px", fontWeight: "800", color: "#0284c7", letterSpacing: "1.5px", textTransform: "uppercase" }}>
                💼 B2B & BULK PURCHASING
              </span>
            </div>

            <h1
              style={{
                fontSize: "clamp(38px, 6vw, 68px)",
                fontWeight: "900",
                letterSpacing: "-2px",
                color: "#0f172a",
                marginBottom: "20px",
                lineHeight: "1.1"
              }}
            >
              B2B DIRECT PURCHASE<br />
              <span className="text-gradient">30% OFF ON DIRECT B2B ORDERS</span>
            </h1>

            <p style={{ fontSize: "17px", color: "#475569", maxWidth: "720px", margin: "0 auto", lineHeight: "1.7" }}>
              Partner directly with Thermal Lexum for volume orders, SI integrations, and commercial deployments. Enjoy exclusive B2B pricing, dedicated billing, and GST tax credit support.
            </p>

            {/* Quick Badges */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "16px",
                marginTop: "36px",
                flexWrap: "wrap"
              }}
            >
              <div style={{ padding: "10px 20px", background: "#f0fdf4", border: "1px solid #86efac", borderRadius: "30px", color: "#166534", fontWeight: "800", fontSize: "13px" }}>
                ⚡ 30% OFF Direct B2B Pricing
              </div>
              <div style={{ padding: "10px 20px", background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: "30px", color: "#1e40af", fontWeight: "800", fontSize: "13px" }}>
                📦 MOQ: 10 Units
              </div>
              <div style={{ padding: "10px 20px", background: "#faf5ff", border: "1px solid #d8b4fe", borderRadius: "30px", color: "#6b21a8", fontWeight: "800", fontSize: "13px" }}>
                🧾 GST Invoice & Tax Credit
              </div>
            </div>
          </div>
          <div className="thermal-bar" style={{ position: "absolute", bottom: 0, left: 0, right: 0 }} />
        </section>

        {/* B2B Overview & Form Section */}
        <section style={{ padding: "80px 24px", background: "#ffffff" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
              {/* Left Column: Eligibility & B2B Benefits */}
              <div>
                <div className="section-label" style={{ marginBottom: "16px" }}>B2B ELIGIBILITY & CRITERIA</div>
                <h2 style={{ fontSize: "28px", fontWeight: "800", color: "#0f172a", marginBottom: "24px" }}>
                  Direct Factory Purchasing Requirements
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "40px" }}>
                  {[
                    {
                      title: "Valid GSTIN Required",
                      desc: "All B2B orders require a registered business GSTIN to claim full input tax credit (ITC) and official tax invoicing.",
                      icon: "📑"
                    },
                    {
                      title: "Minimum Order Quantity (MOQ): 10 Units",
                      desc: "Bulk wholesale pricing applies to orders of 10 units or more across pastes, liquid metals, or thermal pads.",
                      icon: "📦"
                    },
                    {
                      title: "Direct Purchase & Support",
                      desc: "Direct procurement from Thermal Lexum with priority commercial shipment and dedicated technical assistance.",
                      icon: "🤝"
                    }
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="brand-card"
                      style={{ padding: "24px", display: "flex", gap: "16px", alignItems: "flex-start", background: "#ffffff", border: "1px solid #e2e8f0" }}
                    >
                      <div style={{ fontSize: "24px", flexShrink: 0 }}>{item.icon}</div>
                      <div>
                        <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a", marginBottom: "4px" }}>{item.title}</h3>
                        <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.6" }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Important Notice Box */}
                <div
                  style={{
                    padding: "24px",
                    background: "rgba(2, 132, 199, 0.05)",
                    border: "1px solid rgba(2, 132, 199, 0.25)",
                    borderRadius: "16px",
                  }}
                >
                  <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "8px" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/>
                    </svg>
                    <h4 style={{ fontSize: "15px", fontWeight: "800", color: "#0f172a" }}>How B2B Ordering Works</h4>
                  </div>
                  <p style={{ fontSize: "13px", color: "#475569", lineHeight: "1.7" }}>
                    Submit your enquiry using the form. Our sales team will verify your requirements, generate a formal proforma invoice with 30% B2B discount, and share payment details for bank transfer/NEFT.
                  </p>
                </div>
              </div>

              {/* Right Column: B2B Enquiry Form */}
              <div className="brand-card" style={{ padding: "40px", background: "#ffffff", border: "1px solid #cbd5e1", boxShadow: "0 15px 35px rgba(0,0,0,0.04)" }}>
                <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#0f172a", marginBottom: "8px" }}>
                  B2B Direct Enquiry Form
                </h2>
                <p style={{ fontSize: "14px", color: "#475569", marginBottom: "28px" }}>
                  Fill in your company details below for custom quotation and volume discount pricing.
                </p>

                {status === "success" ? (
                  <div
                    style={{
                      background: "#f0fdf4",
                      border: "1px solid #86efac",
                      borderRadius: "16px",
                      padding: "40px 24px",
                      textAlign: "center"
                    }}
                  >
                    <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎉</div>
                    <h3 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", marginBottom: "8px" }}>
                      B2B Enquiry Received!
                    </h3>
                    <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.7", marginBottom: "24px" }}>
                      Thank you for contacting Thermal Lexum Commercial Sales. Our team will review your business request and send an official quotation & proforma invoice with 30% B2B discount to <strong>{form.businessEmail}</strong> within 24 business hours.
                    </p>
                    <button
                      onClick={() => { setStatus("idle"); setForm({ ...form, companyName: "", contactPerson: "", businessEmail: "", phone: "", gstin: "", message: "" }); }}
                      className="btn-secondary"
                    >
                      Submit Another B2B Enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                    {status === "error" && (
                      <div style={{ padding: "12px 16px", background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "8px", color: "#dc2626", fontSize: "13px", fontWeight: "600" }}>
                        {errorMsg}
                      </div>
                    )}

                    <div className="responsive-form-grid-2">
                      <div className="form-group">
                        <label className="form-label" htmlFor="companyName">Company Name *</label>
                        <input
                          id="companyName"
                          type="text"
                          className="input-field"
                          placeholder="Legal Business Name"
                          value={form.companyName}
                          onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="contactPerson">Contact Person *</label>
                        <input
                          id="contactPerson"
                          type="text"
                          className="input-field"
                          placeholder="Your Full Name"
                          value={form.contactPerson}
                          onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="responsive-form-grid-2">
                      <div className="form-group">
                        <label className="form-label" htmlFor="businessEmail">Business Email *</label>
                        <input
                          id="businessEmail"
                          type="email"
                          className="input-field"
                          placeholder="name@company.com"
                          value={form.businessEmail}
                          onChange={(e) => setForm({ ...form, businessEmail: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="phone">Phone Number *</label>
                        <input
                          id="phone"
                          type="tel"
                          className="input-field"
                          placeholder="+91 XXXXX XXXXX"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="gstin">GSTIN (GST Number)</label>
                      <input
                        id="gstin"
                        type="text"
                        className="input-field"
                        placeholder="22AAAAA0000A1Z5"
                        style={{ fontFamily: "JetBrains Mono, monospace" }}
                        value={form.gstin}
                        onChange={(e) => setForm({ ...form, gstin: e.target.value.toUpperCase() })}
                        maxLength={15}
                      />
                    </div>

                    <div className="responsive-form-grid-2">
                      <div className="form-group">
                        <label className="form-label" htmlFor="productRequired">Product Required *</label>
                        <select
                          id="productRequired"
                          className="input-field"
                          value={form.productRequired}
                          onChange={(e) => setForm({ ...form, productRequired: e.target.value })}
                          required
                        >
                          {productOptions.map((p) => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="quantity">Quantity (Min 10 Units) *</label>
                        <input
                          id="quantity"
                          type="number"
                          min={10}
                          className="input-field"
                          value={form.quantity}
                          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="responsive-form-grid-2">
                      <div className="form-group">
                        <label className="form-label" htmlFor="deliveryCity">Delivery City *</label>
                        <input
                          id="deliveryCity"
                          type="text"
                          className="input-field"
                          placeholder="e.g. Bengaluru"
                          value={form.deliveryCity}
                          onChange={(e) => setForm({ ...form, deliveryCity: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="deliveryState">Delivery State *</label>
                        <select
                          id="deliveryState"
                          className="input-field"
                          value={form.deliveryState}
                          onChange={(e) => setForm({ ...form, deliveryState: e.target.value })}
                          required
                        >
                          <option value="">Select State</option>
                          {indianStates.map((st) => (
                            <option key={st} value={st}>{st}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="message">Additional Requirements / Notes</label>
                      <textarea
                        id="message"
                        className="input-field"
                        rows={3}
                        placeholder="Mention any custom packaging, specific shipping requirements, or urgency..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={loading}
                      style={{ justifyContent: "center", padding: "14px", marginTop: "8px" }}
                    >
                      {loading ? "Submitting B2B Request..." : "Request B2B Quotation (30% OFF)"}
                    </button>
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
