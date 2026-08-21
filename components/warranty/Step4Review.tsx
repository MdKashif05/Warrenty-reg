"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { WarrantyState } from "@/app/warranty/register/page";

interface Props {
  state: WarrantyState;
  updateState: (updates: Partial<WarrantyState>) => void;
}

const PURCHASE_LABELS: Record<string, string> = {
  ONLINE: "Online Store", RETAIL_STORE: "Retail Store", DISTRIBUTOR: "Distributor", OTHER: "Other",
};

export default function Step4Review({ state, updateState }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("serialNumber", state.serialNumber);
      if (state.customerDetails) {
        Object.entries(state.customerDetails).forEach(([k, v]) => formData.append(`customer_${k}`, v));
      }
      if (state.purchaseDetails) {
        formData.append("purchaseType", state.purchaseDetails.purchaseType);
        formData.append("purchaseDate", state.purchaseDetails.purchaseDate);
        formData.append("purchasedFrom", state.purchaseDetails.purchasedFrom);
        if (state.purchaseDetails.invoiceFile) {
          formData.append("invoice", state.purchaseDetails.invoiceFile);
        }
      }

      const res = await fetch("/api/warranty/register", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        router.push(`/warranty/success?id=${data.data.registrationId}`);
      } else {
        setError(data.error || "Registration failed. Please try again.");
        setSubmitting(false);
      }
    } catch {
      setError("Connection error. Please try again.");
      setSubmitting(false);
    }
  };

  const ReviewSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div style={{ marginBottom: "24px" }}>
      <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", letterSpacing: "2px", color: "#0284c7", marginBottom: "12px", fontWeight: "700" }}>{title}</div>
      <div className="brand-card" style={{ padding: "20px", background: "#ffffff", border: "1px solid #e2e8f0" }}>{children}</div>
    </div>
  );

  const Field = ({ label, value }: { label: string; value: string }) => (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f1f5f9" }}>
      <span style={{ fontSize: "13px", color: "#64748b" }}>{label}</span>
      <span style={{ fontSize: "13px", color: "#0f172a", fontWeight: "700", textAlign: "right", maxWidth: "60%" }}>{value || "—"}</span>
    </div>
  );

  return (
    <div className="review-grid" style={{ alignItems: "start" }}>
      <div>
        <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", marginBottom: "8px" }}>Review Registration</h2>
        <p style={{ fontSize: "14px", color: "#475569", marginBottom: "32px" }}>Please verify all details before submitting. You cannot edit this information after submission.</p>

        <ReviewSection title="PRODUCT">
          <Field label="Product" value={state.verifiedProduct?.productName || ""} />
          {state.verifiedProduct?.productModelName && <Field label="Model" value={state.verifiedProduct.productModelName} />}
          <Field label="Serial Number" value={state.serialNumber} />
          <Field label="Warranty Period" value={`${state.verifiedProduct?.warrantyMonths} months`} />
        </ReviewSection>

        <ReviewSection title="CUSTOMER DETAILS">
          <Field label="Name" value={`${state.customerDetails?.firstName} ${state.customerDetails?.lastName}`} />
          <Field label="Email" value={state.customerDetails?.email || ""} />
          <Field label="Phone" value={state.customerDetails?.phone || ""} />
          <Field label="Location" value={`${state.customerDetails?.city}, ${state.customerDetails?.state}`} />
          <Field label="Country" value={state.customerDetails?.country || ""} />
        </ReviewSection>

        <ReviewSection title="PURCHASE DETAILS">
          <Field label="Purchase Type" value={PURCHASE_LABELS[state.purchaseDetails?.purchaseType || ""] || ""} />
          <Field label="Purchase Date" value={state.purchaseDetails?.purchaseDate ? new Date(state.purchaseDetails.purchaseDate).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" }) : ""} />
          {state.purchaseDetails?.purchasedFrom && <Field label="Purchased From" value={state.purchaseDetails.purchasedFrom} />}
          <Field label="Invoice" value={state.purchaseDetails?.invoiceFile?.name || "Not provided"} />
        </ReviewSection>

        {error && (
          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "8px", padding: "14px", color: "#dc2626", fontSize: "13px", marginBottom: "16px", fontWeight: "600" }}>
            {error}
          </div>
        )}

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }} className="step-btn-row">
          <button className="btn-secondary" onClick={() => updateState({ step: 3 })} disabled={submitting}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back
          </button>
          <button
            className="btn-primary"
            onClick={handleSubmit}
            disabled={submitting}
            style={{ flex: 1, justifyContent: "center" }}
          >
            {submitting ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "spin 1s linear infinite" }}>
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4"/>
                </svg>
                Registering Warranty...
              </>
            ) : (
              <>
                Confirm & Activate Warranty
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
              </>
            )}
          </button>
        </div>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>

      {/* Summary card */}
      <div className="brand-card" style={{ padding: "28px", position: "sticky", top: "96px", background: "#ffffff", border: "1px solid #e2e8f0" }}>
        <div className="thermal-bar" style={{ marginBottom: "24px", marginLeft: "-28px", marginRight: "-28px", marginTop: "-28px", borderRadius: "12px 12px 0 0" }} />
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", letterSpacing: "2px", color: "#64748b", marginBottom: "20px", fontWeight: "700" }}>REGISTRATION SUMMARY</div>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(2, 132, 199, 0.1)", border: "2px solid rgba(2, 132, 199, 0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2">
              <path d="M12 2l2.09 3.95L18 6.5l-2.64 3.31.53 4.19-3.89-1.85L8.11 14l.53-4.19L6 6.5l3.91-.55z"/>
            </svg>
          </div>
          <div style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a", marginBottom: "4px" }}>
            {state.verifiedProduct?.productName}
          </div>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", color: "#0284c7", letterSpacing: "1px", fontWeight: "700" }}>
            {state.serialNumber}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#64748b" }}>Customer</span>
            <span style={{ color: "#0f172a", fontWeight: "700" }}>{state.customerDetails?.firstName} {state.customerDetails?.lastName}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#64748b" }}>Warranty</span>
            <span style={{ color: "#0f172a", fontWeight: "700" }}>{state.verifiedProduct?.warrantyMonths} months</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#64748b" }}>Invoice</span>
            <span style={{ color: state.purchaseDetails?.invoiceFile ? "#059669" : "#dc2626", fontWeight: "700" }}>
              {state.purchaseDetails?.invoiceFile ? "Uploaded ✓" : "Missing ✗"}
            </span>
          </div>
        </div>
        <div
          style={{
            marginTop: "20px",
            padding: "12px",
            background: "rgba(2, 132, 199, 0.06)",
            border: "1px solid rgba(2, 132, 199, 0.15)",
            borderRadius: "8px",
            fontSize: "12px",
            color: "#475569",
            lineHeight: "1.6",
          }}
        >
          After registration, you will receive a confirmation email with your warranty certificate.
        </div>
      </div>
    </div>
  );
}
