"use client";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Step1Serial from "@/components/warranty/Step1Serial";
import Step2Customer from "@/components/warranty/Step2Customer";
import Step3Purchase from "@/components/warranty/Step3Purchase";
import Step4Review from "@/components/warranty/Step4Review";

export type WarrantyState = {
  step: number;
  serialNumber: string;
  verifiedProduct: {
    id: string;
    productName: string;
    category: string;
    warrantyMonths: number;
    productModelName?: string;
  } | null;
  customerDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  } | null;
  purchaseDetails: {
    purchaseType: string;
    purchaseDate: string;
    purchasedFrom: string;
    invoiceFile: File | null;
  } | null;
};

const steps = [
  { num: 1, label: "Serial Verification" },
  { num: 2, label: "Customer Details" },
  { num: 3, label: "Purchase Info" },
  { num: 4, label: "Review & Submit" },
];

export default function WarrantyRegisterPage() {
  const [state, setState] = useState<WarrantyState>({
    step: 1,
    serialNumber: "",
    verifiedProduct: null,
    customerDetails: null,
    purchaseDetails: null,
  });

  const updateState = (updates: Partial<WarrantyState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "var(--brand-black)", paddingTop: "80px" }}>
        {/* Header */}
        <div
          style={{
            background: "var(--brand-dark)",
            borderBottom: "1px solid var(--brand-border)",
            padding: "32px 16px",
          }}
        >
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div className="section-label" style={{ marginBottom: "12px" }}>WARRANTY REGISTRATION</div>
            <h1 style={{ fontSize: "clamp(22px, 4vw, 44px)", fontWeight: "800", letterSpacing: "-1.5px", color: "#0f172a", marginBottom: "32px" }}>
              Register Your Product
            </h1>

            {/* Step indicator */}
            <div style={{ display: "flex", alignItems: "center", gap: "0", overflowX: "auto" }}>
              {steps.map((step, i) => (
                <div key={step.num} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : "none", minWidth: "fit-content" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                    <div
                      className={`step-dot ${
                        state.step === step.num
                          ? "active"
                          : state.step > step.num
                          ? "completed"
                          : "pending"
                      }`}
                    >
                      {state.step > step.num ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M20 6L9 17l-5-5"/>
                        </svg>
                      ) : step.num}
                    </div>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: "600",
                        color: state.step === step.num ? "var(--brand-cyan)" : state.step > step.num ? "var(--brand-gray)" : "var(--brand-gray-dim)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {step.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      style={{
                        flex: 1,
                        minWidth: "20px",
                        height: "1px",
                        background: state.step > step.num ? "var(--brand-cyan)" : "var(--brand-border)",
                        margin: "0 8px",
                        transition: "background 0.3s",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Current step label */}
            <div style={{ marginTop: "12px", fontSize: "13px", color: "var(--brand-gray)" }}>
              Step {state.step} of {steps.length}: <span style={{ color: "var(--brand-cyan)", fontWeight: "600" }}>{steps[state.step - 1].label}</span>
            </div>
          </div>
          <div className="thermal-bar" style={{ marginTop: "32px" }} />
        </div>

        {/* Step content */}
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 16px" }}>
          {state.step === 1 && <Step1Serial state={state} updateState={updateState} />}
          {state.step === 2 && <Step2Customer state={state} updateState={updateState} />}
          {state.step === 3 && <Step3Purchase state={state} updateState={updateState} />}
          {state.step === 4 && <Step4Review state={state} updateState={updateState} />}
        </div>
      </main>
      <Footer />
    </>
  );
}
