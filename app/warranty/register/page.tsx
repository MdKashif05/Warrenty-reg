"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana",
  "Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur",
  "Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
  "Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Delhi","Chandigarh","Goa","Puducherry",
];

interface Prefill {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  productId: string;
  productName: string;
  productVariant: string;
  purchaseDate: string;
  platform: string;
  warrantyMonths: number;
}

function WarrantyRegisterForm() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [prefill, setPrefill] = useState<Prefill | null>(null);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [prefillLoading, setPrefillLoading] = useState(false);

  // Form state
  const [platform, setPlatform] = useState(orderId ? "OWN_WEBSITE" : "");
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", address: "",
    productName: "", productVariant: "",
    purchaseDate: "",
    platformOrderId: "",
    linkedOrderId: orderId || "",
    warrantyMonths: 12,
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{ registrationId: string; warrantyStatus: string; message: string } | null>(null);
  const [error, setError] = useState("");

  // Auto-fetch prefill data if orderId present
  useEffect(() => {
    if (!orderId) return;
    setPrefillLoading(true);
    fetch(`/api/warranty/register?orderId=${orderId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.prefill) {
          setPrefill(data.prefill);
          setAlreadyRegistered(data.alreadyRegistered);
          setForm((f) => ({
            ...f,
            firstName: data.prefill.firstName,
            lastName: data.prefill.lastName,
            email: data.prefill.email,
            phone: data.prefill.phone,
            address: data.prefill.address,
            productName: data.prefill.productName,
            productVariant: data.prefill.productVariant,
            purchaseDate: data.prefill.purchaseDate,
            warrantyMonths: data.prefill.warrantyMonths,
          }));
          setPlatform("OWN_WEBSITE");
        }
        setPrefillLoading(false);
      })
      .catch(() => setPrefillLoading(false));
  }, [orderId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true); setError("");

    const isOwnWebsite = platform === "OWN_WEBSITE";

    const payload = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      address: form.address,
      productVariant: form.productVariant || form.productName,
      purchasePlatform: platform,
      purchaseType: "ONLINE",
      purchaseDate: form.purchaseDate,
      platformOrderId: isOwnWebsite ? undefined : form.platformOrderId,
      linkedOrderId: isOwnWebsite ? form.linkedOrderId : undefined,
      warrantyMonths: form.warrantyMonths,
    };

    const res = await fetch("/api/warranty/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setSubmitting(false);
    if (!res.ok && data.error !== "This order already has a warranty registered") {
      setError(data.error || "Submission failed"); return;
    }
    setSuccess({
      registrationId: data.registrationId,
      warrantyStatus: data.warrantyStatus,
      message: data.message,
    });
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "11px 14px", border: "1px solid #e2e8f0",
    borderRadius: "8px", fontSize: "14px", fontFamily: "inherit",
    outline: "none", background: "#fff", color: "#0f172a",
  };
  const readOnlyStyle: React.CSSProperties = { ...inputStyle, background: "#f8fafc", color: "#64748b" };
  const labelStyle: React.CSSProperties = { fontSize: "12px", fontWeight: "700", color: "#475569", display: "block", marginBottom: "5px" };

  if (prefillLoading) return <div style={{ textAlign: "center", padding: "60px", color: "#64748b" }}>Loading order details…</div>;

  if (success) {
    const isActive = success.warrantyStatus === "ACTIVE";
    return (
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "40px", textAlign: "center" }}>
        <div style={{ fontSize: "56px", marginBottom: "12px" }}>{isActive ? "✅" : "⏳"}</div>
        <h2 style={{ fontSize: "24px", fontWeight: "900", color: "#0f172a", marginBottom: "8px" }}>
          {isActive ? "Warranty Activated!" : "Registration Submitted!"}
        </h2>
        <p style={{ color: "#64748b", marginBottom: "20px" }}>{success.message}</p>
        <div style={{ background: isActive ? "#eff6ff" : "#fef9c3", border: `1px solid ${isActive ? "#bfdbfe" : "#fde68a"}`, borderRadius: "8px", padding: "14px", marginBottom: "20px", display: "inline-block" }}>
          <div style={{ fontSize: "10px", fontWeight: "700", color: "#64748b", letterSpacing: "2px", marginBottom: "4px" }}>REGISTRATION ID</div>
          <div style={{ fontFamily: "monospace", fontWeight: "900", color: isActive ? "#0284c7" : "#92400e", fontSize: "20px", letterSpacing: "2px" }}>{success.registrationId}</div>
        </div>
        <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "20px" }}>
          {isActive
            ? "A warranty certificate has been sent to your email. Save your Registration ID for future claims."
            : "Our team will verify your purchase and activate your warranty within 24–48 hours. You'll receive an email confirmation."}
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/account/warranties" style={{ display: "inline-block", background: "linear-gradient(135deg,#0284c7,#2563eb)", color: "#fff", padding: "10px 24px", borderRadius: "8px", textDecoration: "none", fontWeight: "700", fontSize: "14px" }}>View My Warranties</a>
          {isActive && (
            <a href={`/warranty/certificate/${success.registrationId}`} style={{ display: "inline-block", background: "#fff", border: "1px solid #e2e8f0", color: "#0f172a", padding: "10px 24px", borderRadius: "8px", textDecoration: "none", fontWeight: "700", fontSize: "14px" }}>View Certificate</a>
          )}
        </div>
      </div>
    );
  }

  if (alreadyRegistered) {
    return (
      <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "12px", padding: "32px", textAlign: "center" }}>
        <div style={{ fontSize: "48px", marginBottom: "12px" }}>✅</div>
        <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#166534", marginBottom: "8px" }}>Already Registered!</h2>
        <p style={{ color: "#475569" }}>This order already has a warranty registered. <a href="/account/warranties" style={{ color: "#0284c7", fontWeight: "700" }}>View your warranties →</a></p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Step 0: Where did you buy? */}
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "24px" }}>
        <h2 style={{ fontSize: "15px", fontWeight: "800", color: "#0f172a", marginBottom: "16px" }}>📍 Kahan Se Kharida? (Where did you buy?)</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: "10px" }}>
          {[
            { value: "OWN_WEBSITE", label: "Thermal Lexum Website", icon: "🌐" },
            { value: "AMAZON", label: "Amazon", icon: "📦" },
            { value: "FLIPKART", label: "Flipkart", icon: "🛒" },
            { value: "OTHER", label: "Other / Offline", icon: "🏪" },
          ].map((p) => (
            <label key={p.value} style={{ display: "flex", gap: "10px", alignItems: "center", padding: "12px 14px", border: `2px solid ${platform === p.value ? "#0284c7" : "#e2e8f0"}`, borderRadius: "10px", cursor: orderId ? "default" : "pointer", background: platform === p.value ? "#eff6ff" : "#fff" }}>
              <input type="radio" name="platform" value={p.value} checked={platform === p.value} onChange={(e) => !orderId && setPlatform(e.target.value)} style={{ accentColor: "#0284c7" }} disabled={!!orderId} />
              <span style={{ fontSize: "18px" }}>{p.icon}</span>
              <span style={{ fontWeight: "600", color: "#0f172a", fontSize: "13px" }}>{p.label}</span>
            </label>
          ))}
        </div>
        {orderId && <div style={{ fontSize: "12px", color: "#16a34a", marginTop: "10px", fontWeight: "600" }}>✅ Detected from your Thermal Lexum order {orderId}</div>}
      </div>

      {platform && (
        <>
          {/* Customer Details */}
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "24px" }}>
            <h2 style={{ fontSize: "15px", fontWeight: "800", color: "#0f172a", marginBottom: "16px" }}>👤 Customer Details</h2>
            {prefill && (
              <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "8px", padding: "10px 14px", marginBottom: "14px", fontSize: "13px", color: "#1d4ed8" }}>
                ✅ Pre-filled from your order. Just verify and submit!
              </div>
            )}
            <div className="responsive-form-grid-2" style={{ gap: "14px" }}>
              <div>
                <label style={labelStyle}>First Name *</label>
                <input name="firstName" value={form.firstName} onChange={handleChange} required style={prefill ? readOnlyStyle : inputStyle} readOnly={!!prefill} placeholder="Rahul" />
              </div>
              <div>
                <label style={labelStyle}>Last Name *</label>
                <input name="lastName" value={form.lastName} onChange={handleChange} required style={prefill ? readOnlyStyle : inputStyle} readOnly={!!prefill} placeholder="Sharma" />
              </div>
              <div>
                <label style={labelStyle}>Email *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required style={prefill ? readOnlyStyle : inputStyle} readOnly={!!prefill} placeholder="rahul@email.com" />
              </div>
              <div>
                <label style={labelStyle}>Mobile *</label>
                <input name="phone" type="tel" value={form.phone} onChange={handleChange} required style={prefill ? readOnlyStyle : inputStyle} readOnly={!!prefill} placeholder="9876543210" />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Full Address *</label>
                <input name="address" value={form.address} onChange={handleChange} required style={prefill ? readOnlyStyle : inputStyle} readOnly={!!prefill} placeholder="House no, Street, City, State, PIN" />
              </div>
            </div>
          </div>

          {/* Product & Purchase Details */}
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "24px" }}>
            <h2 style={{ fontSize: "15px", fontWeight: "800", color: "#0f172a", marginBottom: "16px" }}>📦 Product & Purchase Details</h2>
            <div className="responsive-form-grid-2" style={{ gap: "14px" }}>
              <div>
                <label style={labelStyle}>Product Name *</label>
                <input name="productName" value={form.productName} onChange={handleChange} required style={prefill ? readOnlyStyle : inputStyle} readOnly={!!prefill} placeholder="LX-TIM Pro Thermal Paste" />
              </div>
              <div>
                <label style={labelStyle}>Variant / Size</label>
                <input name="productVariant" value={form.productVariant} onChange={handleChange} style={prefill ? readOnlyStyle : inputStyle} readOnly={!!prefill} placeholder="3.5g / 5g / 10g" />
              </div>
              <div>
                <label style={labelStyle}>Purchase Date *</label>
                <input name="purchaseDate" type="date" value={form.purchaseDate} onChange={handleChange} required style={prefill ? readOnlyStyle : inputStyle} readOnly={!!prefill} />
              </div>

              {/* Amazon/Flipkart — manual Order ID */}
              {(platform === "AMAZON" || platform === "FLIPKART" || platform === "OTHER") && (
                <div>
                  <label style={labelStyle}>
                    {platform === "AMAZON" ? "Amazon Order ID" : platform === "FLIPKART" ? "Flipkart Order ID" : "Invoice / Order Number"} *
                  </label>
                  <input
                    name="platformOrderId"
                    value={form.platformOrderId}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                    placeholder={platform === "AMAZON" ? "402-XXXXXXX-XXXXXXX" : platform === "FLIPKART" ? "OD-XXXXXXXXXXXXXXXXXX" : "INV-2026-XXXX"}
                  />
                </div>
              )}

              {/* Own website — show linked order ID */}
              {platform === "OWN_WEBSITE" && form.linkedOrderId && (
                <div>
                  <label style={labelStyle}>Order ID</label>
                  <input value={form.linkedOrderId} readOnly style={readOnlyStyle} />
                </div>
              )}
            </div>
          </div>

          {/* Platform-specific info box */}
          {platform !== "OWN_WEBSITE" && (
            <div style={{ background: "#fef9c3", border: "1px solid #fde68a", borderRadius: "10px", padding: "16px", fontSize: "13px", color: "#92400e" }}>
              <strong>⏳ Verification Required:</strong> Since you purchased from {platform === "AMAZON" ? "Amazon" : platform === "FLIPKART" ? "Flipkart" : "another platform"}, our team will verify your order and activate your warranty within 24–48 hours. You'll receive a confirmation email.
            </div>
          )}
          {platform === "OWN_WEBSITE" && (
            <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "10px", padding: "16px", fontSize: "13px", color: "#166534" }}>
              <strong>⚡ Instant Activation:</strong> Your warranty will be activated immediately after submission!
            </div>
          )}

          {error && <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", padding: "10px 14px", borderRadius: "8px", fontSize: "13px" }}>{error}</div>}

          <button type="submit" disabled={submitting} style={{ padding: "14px", background: submitting ? "#94a3b8" : "linear-gradient(135deg,#0284c7,#2563eb)", color: "#fff", border: "none", borderRadius: "10px", fontWeight: "700", fontSize: "16px", cursor: submitting ? "not-allowed" : "pointer", fontFamily: "inherit" }}>
            {submitting ? "Submitting…" : platform === "OWN_WEBSITE" ? "⚡ Activate Warranty Now" : "Submit for Verification"}
          </button>
        </>
      )}
    </form>
  );
}

export default function WarrantyRegisterPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#f8fafc", paddingTop: "80px" }}>
        <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "32px 16px" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ fontSize: "11px", color: "#0284c7", letterSpacing: "3px", fontWeight: "700", textTransform: "uppercase", marginBottom: "8px" }}>WARRANTY REGISTRATION</div>
            <h1 style={{ fontSize: "clamp(24px,4vw,40px)", fontWeight: "900", letterSpacing: "-1.5px", color: "#0f172a", marginBottom: "8px" }}>Register Your Product</h1>
            <p style={{ color: "#64748b", fontSize: "14px" }}>Register your Thermal Lexum product to activate your warranty coverage</p>
          </div>
        </div>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "32px 16px" }}>
          <Suspense fallback={<div style={{ color: "#64748b", textAlign: "center", padding: "40px" }}>Loading…</div>}>
            <WarrantyRegisterForm />
          </Suspense>
        </div>
      </main>
      <Footer />
      <style>{`
        @media (max-width: 640px) {
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: repeat(auto-fit"] { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </>
  );
}
