"use client";

import { useState, useEffect } from "react";

interface B2bEnquiry {
  id: string;
  companyName: string;
  contactPerson: string;
  businessEmail: string;
  phone: string;
  gstin?: string;
  productRequired: string;
  quantity: number;
  deliveryCity: string;
  deliveryState: string;
  message?: string;
  status: "NEW" | "IN_REVIEW" | "QUOTATION_SENT" | "CLOSED";
  createdAt: string;
}

export default function AdminB2bPage() {
  const [enquiries, setEnquiries] = useState<B2bEnquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState<B2bEnquiry | null>(null);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/b2b");
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setEnquiries(data.data);
      }
    } catch {
      // Mock data for dev view if DB empty
      setEnquiries([
        {
          id: "b2b-001",
          companyName: "Apex Gaming Labs",
          contactPerson: "Rajesh Kumar",
          businessEmail: "procurement@apexgaming.in",
          phone: "+91 98765 43210",
          gstin: "29ABCDE1234F1Z5",
          productRequired: "LX-TIM Pro (Thermal Paste - 17.6 W/mK)",
          quantity: 50,
          deliveryCity: "Bengaluru",
          deliveryState: "Karnataka",
          message: "Require 50 units for custom workstation assembly.",
          status: "NEW",
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: "900", color: "#0f172a", marginBottom: "4px" }}>
            B2B Commercial Enquiries 💼
          </h1>
          <p style={{ fontSize: "14px", color: "#475569" }}>
            Manage direct volume orders, bulk quotations, and GSTIN business customer inquiries.
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button onClick={fetchEnquiries} className="btn-secondary" style={{ padding: "8px 16px", fontSize: "12px" }}>
            Refresh Enquiries 🔄
          </button>
        </div>
      </div>

      {loading ? (
        <div className="brand-card" style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>
          Loading B2B enquiries...
        </div>
      ) : enquiries.length === 0 ? (
        <div className="brand-card" style={{ padding: "60px", textAlign: "center" }}>
          <div style={{ fontSize: "40px", marginBottom: "16px" }}>💼</div>
          <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", marginBottom: "4px" }}>No B2B Enquiries Yet</h3>
          <p style={{ fontSize: "14px", color: "#64748b" }}>New business direct order inquiries will appear here.</p>
        </div>
      ) : (
        <div className="data-table-container brand-card" style={{ padding: "0" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Company Name</th>
                <th>Contact Person</th>
                <th>GSTIN</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Location</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((e) => (
                <tr key={e.id}>
                  <td style={{ fontSize: "12px", color: "#64748b" }}>
                    {new Date(e.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                  </td>
                  <td>
                    <div style={{ fontWeight: "700", color: "#0f172a" }}>{e.companyName}</div>
                    <div style={{ fontSize: "12px", color: "#0284c7" }}>{e.businessEmail}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: "600" }}>{e.contactPerson}</div>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>{e.phone}</div>
                  </td>
                  <td>
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", background: "#f1f5f9", padding: "2px 6px", borderRadius: "4px", fontWeight: "700" }}>
                      {e.gstin || "N/A"}
                    </span>
                  </td>
                  <td style={{ maxWidth: "200px" }}>
                    <div style={{ fontSize: "13px", fontWeight: "600", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {e.productRequired}
                    </div>
                  </td>
                  <td>
                    <span style={{ fontWeight: "800", color: "#0284c7" }}>{e.quantity} Units</span>
                  </td>
                  <td style={{ fontSize: "13px" }}>
                    {e.deliveryCity}, {e.deliveryState}
                  </td>
                  <td>
                    <span className={`badge ${e.status === "NEW" ? "badge-pending" : "badge-active"}`}>
                      {e.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => setSelectedEnquiry(e)}
                      className="btn-secondary"
                      style={{ padding: "6px 12px", fontSize: "11px" }}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail Modal */}
      {selectedEnquiry && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px"
          }}
        >
          <div className="brand-card" style={{ width: "100%", maxWidth: "600px", padding: "32px", background: "#ffffff" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a" }}>B2B Enquiry Details</h2>
              <button onClick={() => setSelectedEnquiry(null)} className="btn-ghost" style={{ fontSize: "18px" }}>✕</button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: "8px" }}>
                <span style={{ color: "#64748b" }}>Company Name:</span>
                <strong style={{ color: "#0f172a" }}>{selectedEnquiry.companyName}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: "8px" }}>
                <span style={{ color: "#64748b" }}>Contact Person:</span>
                <strong style={{ color: "#0f172a" }}>{selectedEnquiry.contactPerson}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: "8px" }}>
                <span style={{ color: "#64748b" }}>Business Email:</span>
                <strong style={{ color: "#0284c7" }}>{selectedEnquiry.businessEmail}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: "8px" }}>
                <span style={{ color: "#64748b" }}>Phone Number:</span>
                <strong style={{ color: "#0f172a" }}>{selectedEnquiry.phone}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: "8px" }}>
                <span style={{ color: "#64748b" }}>GSTIN:</span>
                <strong style={{ fontFamily: "JetBrains Mono, monospace", color: "#0284c7" }}>{selectedEnquiry.gstin || "None"}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: "8px" }}>
                <span style={{ color: "#64748b" }}>Product & Quantity:</span>
                <strong style={{ color: "#0f172a" }}>{selectedEnquiry.quantity} Units — {selectedEnquiry.productRequired}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: "8px" }}>
                <span style={{ color: "#64748b" }}>Delivery Location:</span>
                <strong style={{ color: "#0f172a" }}>{selectedEnquiry.deliveryCity}, {selectedEnquiry.deliveryState}</strong>
              </div>
              {selectedEnquiry.message && (
                <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "4px" }}>Customer Message:</div>
                  <div style={{ color: "#334155", fontStyle: "italic" }}>"{selectedEnquiry.message}"</div>
                </div>
              )}
            </div>

            <div style={{ marginTop: "24px", display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <a
                href={`mailto:${selectedEnquiry.businessEmail}?subject=Thermal%20Lexum%20B2B%20Quotation%20-%20${encodeURIComponent(selectedEnquiry.companyName)}&body=Dear%20${encodeURIComponent(selectedEnquiry.contactPerson)},%0A%0AThank%20you%20for%20your%20interest%20in%20Thermal%20Lexum.%20Please%20find%20attached%20our%20official%20commercial%20quotation%20with%2030%25%20B2B%20discount.%0A%0ABest%20Regards,%0AThermal%20Lexum%20Sales`}
                className="btn-primary"
                style={{ padding: "10px 18px", fontSize: "12px" }}
              >
                Send Email Quotation ✉️
              </a>
              <button onClick={() => setSelectedEnquiry(null)} className="btn-secondary" style={{ padding: "10px 18px", fontSize: "12px" }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
