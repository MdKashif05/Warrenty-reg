"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface OrderDetails {
  orderId: string;
  status: string;
  paymentStatus: string;
  totalAmount: number;
  shippingName: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingPincode: string;
  items: { name: string; variant?: string; qty: number; price: number }[];
  createdAt: string;
}

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderId = params.orderId as string;
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      const res = await fetch(`/api/orders/${orderId}`);
      if (res.ok) {
        const data = await res.json();
        setOrder(data.order);
      }
      setLoading(false);
    }
    fetchOrder();
  }, [orderId]);

  const formatPrice = (paise: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(paise / 100);

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#f8fafc", paddingTop: "80px" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "40px 16px" }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "#64748b" }}>Loading…</div>
          ) : !order ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <p style={{ color: "#64748b" }}>Order not found.</p>
              <Link href="/" style={{ color: "#0284c7" }}>Go Home</Link>
            </div>
          ) : (
            <>
              {/* Success Banner */}
              <div style={{ background: "linear-gradient(135deg,#0f172a,#1e3a5f)", borderRadius: "16px", padding: "40px", textAlign: "center", marginBottom: "24px", border: "1px solid #1e40af" }}>
                <div style={{ width: "72px", height: "72px", background: "rgba(34,197,94,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: "36px" }}>✅</div>
                <h1 style={{ fontSize: "28px", fontWeight: "900", color: "#fff", marginBottom: "8px" }}>Order Confirmed!</h1>
                <p style={{ color: "#94a3b8", marginBottom: "16px" }}>Thank you for your purchase. We'll start processing it right away.</p>
                <div style={{ background: "rgba(2,132,199,0.15)", border: "1px solid rgba(2,132,199,0.3)", borderRadius: "10px", padding: "14px 20px", display: "inline-block" }}>
                  <div style={{ fontSize: "11px", color: "#94a3b8", letterSpacing: "2px", marginBottom: "4px" }}>ORDER ID</div>
                  <div style={{ fontSize: "22px", fontWeight: "900", color: "#38bdf8", letterSpacing: "2px", fontFamily: "monospace" }}>{order.orderId}</div>
                </div>
              </div>

              {/* Order Details */}
              <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
                <h2 style={{ fontSize: "15px", fontWeight: "800", color: "#0f172a", marginBottom: "16px" }}>Order Details</h2>
                {order.items.map((item, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i < order.items.length - 1 ? "1px solid #f1f5f9" : "none", fontSize: "14px" }}>
                    <span style={{ color: "#0f172a" }}>{item.name}{item.variant ? ` · ${item.variant}` : ""} × {item.qty}</span>
                    <span style={{ fontWeight: "600" }}>{formatPrice(item.price * item.qty)}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px", paddingTop: "12px", borderTop: "2px solid #e2e8f0", fontWeight: "900", fontSize: "16px" }}>
                  <span>Total Paid</span>
                  <span style={{ color: "#0284c7" }}>{formatPrice(order.totalAmount)}</span>
                </div>
              </div>

              {/* Shipping */}
              <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
                <h2 style={{ fontSize: "15px", fontWeight: "800", color: "#0f172a", marginBottom: "12px" }}>Shipping To</h2>
                <p style={{ color: "#475569", fontSize: "14px", lineHeight: "1.6" }}>
                  {order.shippingName}<br />
                  {order.shippingAddress}, {order.shippingCity}, {order.shippingState} - {order.shippingPincode}
                </p>
              </div>

              {/* Warranty CTA */}
              <div style={{ background: "linear-gradient(135deg,#eff6ff,#f0fdf4)", border: "2px solid #bfdbfe", borderRadius: "12px", padding: "24px", marginBottom: "24px" }}>
                <div style={{ fontSize: "24px", marginBottom: "8px" }}>🛡️</div>
                <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#1e40af", marginBottom: "6px" }}>Register Your Warranty</h3>
                <p style={{ color: "#475569", fontSize: "13px", marginBottom: "16px", lineHeight: "1.5" }}>
                  A warranty registration email has been sent to you. Click the link in the email or use the button below — all fields are pre-filled!
                </p>
                <Link
                  href={`/warranty/register?orderId=${order.orderId}`}
                  style={{ display: "inline-block", background: "linear-gradient(135deg,#1d4ed8,#2563eb)", color: "#fff", padding: "12px 24px", borderRadius: "8px", textDecoration: "none", fontWeight: "700", fontSize: "14px" }}
                >
                  Activate My Warranty →
                </Link>
              </div>

              {/* Actions */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <Link href="/account/orders" style={{ display: "block", textAlign: "center", background: "#fff", border: "1px solid #e2e8f0", color: "#0f172a", padding: "12px", borderRadius: "8px", textDecoration: "none", fontWeight: "600", fontSize: "14px" }}>
                  View All Orders
                </Link>
                <Link href="/products" style={{ display: "block", textAlign: "center", background: "linear-gradient(135deg,#0284c7,#2563eb)", color: "#fff", padding: "12px", borderRadius: "8px", textDecoration: "none", fontWeight: "700", fontSize: "14px" }}>
                  Continue Shopping
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
