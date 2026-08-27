"use client";
import { useState } from "react";
import type { WarrantyState } from "@/types/warranty";

interface Props {
  state: WarrantyState;
  updateState: (updates: Partial<WarrantyState>) => void;
}

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu and Kashmir", "Ladakh",
];

export default function Step2Customer({ state, updateState }: Props) {
  const [form, setForm] = useState(
    state.customerDetails || {
      firstName: "", lastName: "", email: "", phone: "",
      city: "", state: "", country: "India", postalCode: "",
    }
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.firstName) errs.firstName = "First name is required";
    if (!form.lastName) errs.lastName = "Last name is required";
    if (!form.email || !/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) errs.email = "Valid email is required";
    if (!form.phone) errs.phone = "Phone number is required";
    if (!form.city) errs.city = "City is required";
    if (!form.state) errs.state = "State is required";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    updateState({ step: 3, customerDetails: form });
  };

  return (
    <div style={{ maxWidth: "720px" }}>
      {/* Product confirmed banner */}
      {state.verifiedProduct && (
        <div
          style={{
            background: "#ecfdf5",
            border: "1px solid #a7f3d0",
            borderRadius: "10px",
            padding: "16px 20px",
            display: "flex",
            gap: "14px",
            alignItems: "center",
            marginBottom: "32px",
          }}
        >
          <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
          </div>
          <div>
            <div style={{ fontSize: "12px", color: "#059669", fontWeight: "700", marginBottom: "2px" }}>PRODUCT VERIFIED</div>
            <div style={{ fontSize: "15px", color: "#0f172a", fontWeight: "700" }}>
              {state.verifiedProduct.productName}
              {state.verifiedProduct.productModelName && ` — ${state.verifiedProduct.productModelName}`}
            </div>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", color: "#475569", marginTop: "2px", fontWeight: "600" }}>
              SN: {state.serialNumber} · {state.verifiedProduct.warrantyMonths}-Month Warranty
            </div>
          </div>
        </div>
      )}

      <div className="brand-card" style={{ padding: "40px", background: "#ffffff", border: "1px solid #e2e8f0" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", marginBottom: "8px" }}>Your Details</h2>
        <p style={{ fontSize: "14px", color: "#475569", marginBottom: "32px" }}>Enter your personal information to register the warranty.</p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div className="responsive-form-grid-2">
            {[
              { id: "firstName", label: "First Name", placeholder: "First name", required: true },
              { id: "lastName", label: "Last Name", placeholder: "Last name", required: true },
            ].map((f) => (
              <div key={f.id} className="form-group">
                <label className="form-label" htmlFor={f.id}>{f.label} {f.required && "*"}</label>
                <input
                  id={f.id}
                  type="text"
                  className="input-field"
                  placeholder={f.placeholder}
                  value={(form as Record<string, string>)[f.id]}
                  onChange={(e) => { setForm({ ...form, [f.id]: e.target.value }); setErrors({ ...errors, [f.id]: "" }); }}
                />
                {errors[f.id] && <span className="form-error">{errors[f.id]}</span>}
              </div>
            ))}
          </div>

          <div className="responsive-form-grid-2">
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address *</label>
              <input id="email" type="email" className="input-field" placeholder="your@email.com" value={form.email} onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: "" }); }} />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="phone">Phone Number *</label>
              <input id="phone" type="tel" className="input-field" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={(e) => { setForm({ ...form, phone: e.target.value }); setErrors({ ...errors, phone: "" }); }} />
              {errors.phone && <span className="form-error">{errors.phone}</span>}
            </div>
          </div>

          <div className="responsive-form-grid-3">
            <div className="form-group">
              <label className="form-label" htmlFor="city">City *</label>
              <input id="city" type="text" className="input-field" placeholder="City" value={form.city} onChange={(e) => { setForm({ ...form, city: e.target.value }); setErrors({ ...errors, city: "" }); }} />
              {errors.city && <span className="form-error">{errors.city}</span>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="state-select">State *</label>
              <select id="state-select" className="input-field" value={form.state} onChange={(e) => { setForm({ ...form, state: e.target.value }); setErrors({ ...errors, state: "" }); }}>
                <option value="">Select state</option>
                {indianStates.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.state && <span className="form-error">{errors.state}</span>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="postalCode">Postal Code</label>
              <input id="postalCode" type="text" className="input-field" placeholder="560001" value={form.postalCode} onChange={(e) => setForm({ ...form, postalCode: e.target.value })} maxLength={6} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="country">Country</label>
            <select id="country" className="input-field" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })}>
              <option value="India">India</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: "12px", paddingTop: "8px", flexWrap: "wrap" }} className="step-btn-row">
            <button type="button" className="btn-secondary" onClick={() => updateState({ step: 1 })}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back
            </button>
            <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: "center" }}>
              Continue to Purchase Details
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
