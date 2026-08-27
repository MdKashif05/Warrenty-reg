"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface Order {
  id: string;
  orderId: string;
  status: string;
  paymentStatus: string;
  totalAmount: number;
  createdAt: string;
  items: { name: string; qty: number }[];
}

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  CONFIRMED: { bg: "#dcfce7", color: "#15803d" },
  DELIVERED: { bg: "#dbeafe", color: "#1d4ed8" },
  SHIPPED: { bg: "#e0f2fe", color: "#0369a1" },
  PROCESSING: { bg: "#fef9c3", color: "#92400e" },
  PENDING: { bg: "#fef9c3", color: "#92400e" },
  CANCELLED: { bg: "#fee2e2", color: "#b91c1c" },
  REFUNDED: { bg: "#f1f5f9", color: "#475569" },
};

export default function AccountOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/account/me").then(async (res) => {
      const data = await res.json();
      if (!data.customer) { router.push("/account/login"); return; }
    });
    fetch("/api/orders").then(async (res) => {
      const data = await res.json();
      setOrders(data.orders || []);
      setLoading(false);
    });
  }, [router]);

  const formatPrice = (paise: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(paise / 100);

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#f8fafc", paddingTop: "80px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 16px" }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "28px" }}>
            <Link href="/account" style={{ color: "#64748b", textDecoration: "none", fontSize: "14px" }}>← Account</Link>
            <span style={{ color: "#e2e8f0" }}>/</span>
            <span style={{ fontWeight: "700", color: "#0f172a" }}>My Orders</span>
          </div>
          <h1 style={{ fontSize: "28px", fontWeight: "900", color: "#0f172a", marginBottom: "24px" }}>📦 My Orders</h1>

          {loading ? (
            <div style={{ textAlign: "center", padding: "60px", color: "#64748b" }}>Loading…</div>
          ) : orders.length === 0 ? (
            <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "60px", textAlign: "center" }}>
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>📦</div>
              <h2 style={{ fontWeight: "700", color: "#0f172a", marginBottom: "8px" }}>No orders yet</h2>
              <p style={{ color: "#64748b", marginBottom: "20px" }}>Start shopping to see your orders here</p>
              <Link href="/products" style={{ display: "inline-block", background: "linear-gradient(135deg,#0284c7,#2563eb)", color: "#fff", padding: "10px 24px", borderRadius: "8px", textDecoration: "none", fontWeight: "700" }}>Browse Products</Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {orders.map((order) => {
                const statusStyle = STATUS_COLORS[order.status] || { bg: "#f1f5f9", color: "#475569" };
                return (
                  <div key={order.id} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "12px" }}>
                      <div>
                        <div style={{ fontFamily: "monospace", fontWeight: "700", color: "#0284c7", fontSize: "15px" }}>{order.orderId}</div>
                        <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "2px" }}>
                          {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                        <span style={{ background: statusStyle.bg, color: statusStyle.color, padding: "3px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "700" }}>{order.status}</span>
                        <span style={{ fontWeight: "900", color: "#0284c7", fontSize: "16px" }}>{formatPrice(order.totalAmount)}</span>
                      </div>
                    </div>
                    <div style={{ fontSize: "13px", color: "#475569", marginBottom: "12px" }}>
                      {order.items.map((i) => `${i.name} × ${i.qty}`).join(", ")}
                    </div>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      <Link href={`/order-confirmation/${order.orderId}`} style={{ fontSize: "13px", color: "#0284c7", textDecoration: "none", fontWeight: "600" }}>View Details →</Link>
                      <Link href={`/warranty/register?orderId=${order.orderId}`} style={{ fontSize: "13px", color: "#16a34a", textDecoration: "none", fontWeight: "600" }}>🛡️ Register Warranty</Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
