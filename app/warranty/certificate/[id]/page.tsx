"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useParams } from "next/navigation";

export default function CertificatePage() {
  const params = useParams();
  const regId = (params?.id as string) || "TLW-DEMO";
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/warranty/certificate?id=${encodeURIComponent(regId)}`)
      .then(res => res.json())
      .then(json => {
        if (json.success) setData(json.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [regId]);

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#ffffff", paddingTop: "72px", paddingBottom: "80px" }}>
        <div style={{ maxWidth: "800px", margin: "40px auto 0", padding: "0 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <h1 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a" }}>Official Warranty Certificate</h1>
            <button onClick={() => window.print()} className="btn-primary" style={{ padding: "10px 22px", fontSize: "13px" }}>
              🖨️ Print / Download PDF
            </button>
          </div>

          {/* Printable Certificate Frame */}
          <div
            id="certificate-print-area"
            style={{
              background: "#ffffff",
              border: "3px solid #0284c7",
              borderRadius: "20px",
              padding: "48px",
              position: "relative",
              boxShadow: "0 20px 40px rgba(2, 132, 199, 0.12)"
            }}
          >
            {/* Header branding */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "2px solid #e2e8f0", paddingBottom: "24px", marginBottom: "32px" }}>
              <div>
                <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "26px", fontWeight: "900", letterSpacing: "3px", color: "#0f172a" }}>
                  THERMAL <span style={{ color: "#0284c7" }}>LEXUM</span>
                </div>
                <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "10px", letterSpacing: "3px", color: "#0284c7", marginTop: "4px", fontWeight: "700" }}>
                  COOL SYSTEMS. UNSTOPPABLE PERFORMANCE.
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", color: "#64748b", letterSpacing: "1px", fontWeight: "700" }}>CERTIFICATE ID</div>
                <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "18px", fontWeight: "800", color: "#0284c7" }}>
                  {data?.registrationId || regId}
                </div>
              </div>
            </div>

            <div style={{ textAlign: "center", margin: "40px 0" }}>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", letterSpacing: "3px", color: "#16a34a", marginBottom: "8px", fontWeight: "800" }}>
                ✓ AUTHENTICITY & WARRANTY COVERAGE CONFIRMED
              </div>
              <h2 style={{ fontSize: "34px", fontWeight: "900", color: "#0f172a", letterSpacing: "-1px" }}>
                WARRANTY CERTIFICATE
              </h2>
            </div>

            <div className="responsive-form-grid-2" style={{ background: "#f8fafc", padding: "28px", borderRadius: "12px", border: "1px solid #e2e8f0", marginBottom: "40px" }}>
              <div>
                <div style={{ fontSize: "12px", color: "#64748b", textTransform: "uppercase", fontWeight: "700" }}>Registered Customer</div>
                <div style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a", marginTop: "4px" }}>{data?.customerName || "Customer Record"}</div>
              </div>
              <div>
                <div style={{ fontSize: "12px", color: "#64748b", textTransform: "uppercase", fontWeight: "700" }}>Product Name</div>
                <div style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a", marginTop: "4px" }}>{data?.productName || "Thermal Lexum Hardware"}</div>
              </div>
              <div>
                <div style={{ fontSize: "12px", color: "#64748b", textTransform: "uppercase", fontWeight: "700" }}>Serial Number</div>
                <div style={{ fontSize: "15px", fontFamily: "JetBrains Mono, monospace", color: "#0284c7", marginTop: "4px", fontWeight: "800" }}>{data?.serialNumber || "TLX-XXXX-XXXX"}</div>
              </div>
              <div>
                <div style={{ fontSize: "12px", color: "#64748b", textTransform: "uppercase", fontWeight: "700" }}>Warranty End Date</div>
                <div style={{ fontSize: "15px", fontWeight: "800", color: "#16a34a", marginTop: "4px" }}>{data?.expiryDate || "Active Coverage"}</div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: "2px solid #e2e8f0", paddingTop: "24px" }}>
              <div style={{ fontSize: "12px", color: "#475569", lineHeight: "1.6" }}>
                Thermal Lexum Technologies India<br />
                Manipal Center, MG Road, Bengaluru - 560042<br />
                info@thermallexum.com | www.thermallexum.com
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ width: "72px", height: "72px", background: "#fff", padding: "4px", borderRadius: "8px", margin: "0 auto 6px", border: "1px solid #cbd5e1" }}>
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`https://www.thermallexum.com/warranty/lookup?query=${regId}`)}`} alt="Verification QR" style={{ width: "100%", height: "100%" }} />
                </div>
                <div style={{ fontSize: "9px", color: "#64748b", fontFamily: "JetBrains Mono, monospace", fontWeight: "700" }}>SCAN TO VERIFY</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
