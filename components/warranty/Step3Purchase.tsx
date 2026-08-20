"use client";
import { useState, useCallback } from "react";
import type { WarrantyState } from "@/app/warranty/register/page";

interface Props {
  state: WarrantyState;
  updateState: (updates: Partial<WarrantyState>) => void;
}

const purchaseTypes = [
  { id: "ONLINE", label: "Online Store" },
  { id: "RETAIL_STORE", label: "Retail Store" },
  { id: "DISTRIBUTOR", label: "Distributor" },
  { id: "OTHER", label: "Other" },
];

export default function Step3Purchase({ state, updateState }: Props) {
  const [form, setForm] = useState(
    state.purchaseDetails || {
      purchaseType: "ONLINE",
      purchaseDate: "",
      purchasedFrom: "",
      invoiceFile: null as File | null,
    }
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dragging, setDragging] = useState(false);

  const handleFileDrop = useCallback((file: File) => {
    const allowedTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({ ...prev, invoiceFile: "Please upload a PDF, JPG, JPEG, or PNG file." }));
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, invoiceFile: "File size must be under 10MB." }));
      return;
    }
    setForm((prev) => ({ ...prev, invoiceFile: file }));
    setErrors((prev) => ({ ...prev, invoiceFile: "" }));
  }, []);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.purchaseDate) errs.purchaseDate = "Purchase date is required";
    if (!form.invoiceFile) errs.invoiceFile = "Please upload your invoice or proof of purchase";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    updateState({ step: 4, purchaseDetails: form });
  };

  return (
    <div style={{ maxWidth: "720px" }}>
      <div className="brand-card" style={{ padding: "40px", background: "#ffffff", border: "1px solid #e2e8f0" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", marginBottom: "8px" }}>Purchase Details</h2>
        <p style={{ fontSize: "14px", color: "#475569", marginBottom: "32px" }}>Provide information about where and when you purchased the product.</p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Purchase Type */}
          <div className="form-group">
            <label className="form-label">Purchase Type *</label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", marginTop: "4px" }}>
              {purchaseTypes.map((pt) => (
                <button
                  key={pt.id}
                  type="button"
                  onClick={() => setForm({ ...form, purchaseType: pt.id })}
                  style={{
                    padding: "12px 8px",
                    borderRadius: "8px",
                    border: `1px solid ${form.purchaseType === pt.id ? "#0284c7" : "#cbd5e1"}`,
                    background: form.purchaseType === pt.id ? "rgba(2, 132, 199, 0.1)" : "#ffffff",
                    color: form.purchaseType === pt.id ? "#0284c7" : "#475569",
                    fontSize: "13px",
                    fontWeight: "700",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    fontFamily: "Inter, sans-serif",
                    textAlign: "center",
                  }}
                >
                  {pt.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div className="form-group">
              <label className="form-label" htmlFor="purchaseDate">Date of Purchase *</label>
              <input
                id="purchaseDate"
                type="date"
                className="input-field"
                value={form.purchaseDate}
                max={new Date().toISOString().split("T")[0]}
                onChange={(e) => { setForm({ ...form, purchaseDate: e.target.value }); setErrors({ ...errors, purchaseDate: "" }); }}
              />
              {errors.purchaseDate && <span className="form-error">{errors.purchaseDate}</span>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="purchasedFrom">Store / Platform Name</label>
              <input id="purchasedFrom" type="text" className="input-field" placeholder="e.g. Amazon, Local Shop" value={form.purchasedFrom} onChange={(e) => setForm({ ...form, purchasedFrom: e.target.value })} />
            </div>
          </div>

          {/* File Upload */}
          <div className="form-group">
            <label className="form-label">Invoice / Proof of Purchase *</label>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                const file = e.dataTransfer.files[0];
                if (file) handleFileDrop(file);
              }}
              style={{
                border: `2px dashed ${dragging ? "#0284c7" : form.invoiceFile ? "#10b981" : "#cbd5e1"}`,
                borderRadius: "12px",
                padding: "40px",
                textAlign: "center",
                background: dragging ? "rgba(2, 132, 199, 0.06)" : form.invoiceFile ? "#ecfdf5" : "#f8fafc",
                transition: "all 0.2s",
                cursor: "pointer",
              }}
              onClick={() => document.getElementById("invoice-upload")?.click()}
            >
              <input
                id="invoice-upload"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileDrop(file);
                }}
              />
              {form.invoiceFile ? (
                <div>
                  <div style={{ fontSize: "32px", marginBottom: "8px" }}>✅</div>
                  <div style={{ fontSize: "14px", fontWeight: "700", color: "#059669", marginBottom: "4px" }}>{form.invoiceFile.name}</div>
                  <div style={{ fontSize: "12px", color: "#64748b" }}>
                    {(form.invoiceFile.size / 1024 / 1024).toFixed(2)} MB
                    · <button type="button" onClick={(e) => { e.stopPropagation(); setForm({ ...form, invoiceFile: null }); }} style={{ color: "#0284c7", background: "none", border: "none", cursor: "pointer", fontSize: "12px", fontWeight: "700" }}>Remove</button>
                  </div>
                </div>
              ) : (
                <div>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.5" style={{ marginBottom: "12px" }}>
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  <div style={{ fontSize: "14px", color: "#0f172a", fontWeight: "600", marginBottom: "4px" }}>Drop your file here or <span style={{ color: "#0284c7" }}>click to browse</span></div>
                  <div style={{ fontSize: "12px", color: "#64748b" }}>PDF, JPG, JPEG, PNG · Max 10MB</div>
                </div>
              )}
            </div>
            {errors.invoiceFile && <span className="form-error">{errors.invoiceFile}</span>}
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <button type="button" className="btn-secondary" onClick={() => updateState({ step: 2 })}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back
            </button>
            <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: "center" }}>
              Review Registration
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
