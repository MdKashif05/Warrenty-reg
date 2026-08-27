"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  qty: number;
  product: { id: string; name: string; slug: string; imagePath?: string };
  variant?: { id: string; name: string; price: number; mrp: number } | null;
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchCart = useCallback(async () => {
    const res = await fetch("/api/cart");
    const data = await res.json();
    setItems(data.items || []);
    setTotal(data.total || 0);
    setLoading(false);
  }, []);

  useEffect(() => { fetchCart(); }, [fetchCart]);

  const updateQty = async (item: CartItem, qty: number) => {
    setUpdating(item.id);
    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: item.productId, variantId: item.variantId, qty }),
    });
    await fetchCart();
    setUpdating(null);
  };

  const formatPrice = (paise: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(paise / 100);

  const shippingCharge = total >= 49900 ? 0 : 5900;
  const grandTotal = total + shippingCharge;

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#f8fafc", paddingTop: "80px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 16px" }}>
          <div style={{ marginBottom: "32px" }}>
            <div style={{ fontSize: "11px", color: "#0284c7", letterSpacing: "3px", fontWeight: "700", textTransform: "uppercase", marginBottom: "8px" }}>SHOPPING</div>
            <h1 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: "900", letterSpacing: "-1.5px", color: "#0f172a" }}>Your Cart</h1>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "#64748b" }}>Loading cart…</div>
          ) : items.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <div style={{ fontSize: "64px", marginBottom: "16px" }}>🛒</div>
              <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#0f172a", marginBottom: "8px" }}>Your cart is empty</h2>
              <p style={{ color: "#64748b", marginBottom: "24px" }}>Add some products to get started</p>
              <Link href="/products" style={{ display: "inline-block", background: "linear-gradient(135deg,#0284c7,#2563eb)", color: "#fff", padding: "12px 28px", borderRadius: "8px", textDecoration: "none", fontWeight: "700" }}>
                Browse Products
              </Link>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr min(340px,40%)", gap: "24px", alignItems: "start" }}>
              {/* Items */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {items.map((item) => (
                  <div key={item.id} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px", display: "flex", gap: "16px", alignItems: "center" }}>
                    {/* Image */}
                    <div style={{ width: "80px", height: "80px", background: "#f1f5f9", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {item.product.imagePath ? (
                        <img src={item.product.imagePath} alt={item.product.name} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }} />
                      ) : (
                        <span style={{ fontSize: "28px" }}>🧪</span>
                      )}
                    </div>
                    {/* Details */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: "700", color: "#0f172a", marginBottom: "2px" }}>{item.product.name}</div>
                      {item.variant && <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "8px" }}>{item.variant.name}</div>}
                      <div style={{ fontWeight: "800", color: "#0284c7", fontSize: "16px" }}>
                        {item.variant ? formatPrice(item.variant.price) : "—"}
                        {item.variant && item.variant.mrp > item.variant.price && (
                          <span style={{ fontSize: "12px", color: "#94a3b8", textDecoration: "line-through", marginLeft: "8px" }}>{formatPrice(item.variant.mrp)}</span>
                        )}
                      </div>
                    </div>
                    {/* Qty Controls */}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                      <button
                        onClick={() => updateQty(item, item.qty - 1)}
                        disabled={updating === item.id}
                        style={{ width: "32px", height: "32px", border: "1px solid #e2e8f0", borderRadius: "6px", background: "#f8fafc", cursor: "pointer", fontWeight: "700", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}
                      >−</button>
                      <span style={{ fontWeight: "700", minWidth: "24px", textAlign: "center" }}>{item.qty}</span>
                      <button
                        onClick={() => updateQty(item, item.qty + 1)}
                        disabled={updating === item.id}
                        style={{ width: "32px", height: "32px", border: "1px solid #e2e8f0", borderRadius: "6px", background: "#f8fafc", cursor: "pointer", fontWeight: "700", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}
                      >+</button>
                      <button
                        onClick={() => updateQty(item, 0)}
                        disabled={updating === item.id}
                        style={{ width: "32px", height: "32px", border: "1px solid #fee2e2", borderRadius: "6px", background: "#fff5f5", cursor: "pointer", color: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center" }}
                      >✕</button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "24px", position: "sticky", top: "100px" }}>
                <h2 style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a", marginBottom: "20px" }}>Order Summary</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#64748b", fontSize: "14px" }}>Subtotal</span>
                    <span style={{ fontWeight: "600" }}>{formatPrice(total)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#64748b", fontSize: "14px" }}>Shipping</span>
                    <span style={{ fontWeight: "600", color: shippingCharge === 0 ? "#16a34a" : "#0f172a" }}>
                      {shippingCharge === 0 ? "FREE" : formatPrice(shippingCharge)}
                    </span>
                  </div>
                  {shippingCharge > 0 && (
                    <div style={{ fontSize: "12px", color: "#64748b", background: "#f0fdf4", padding: "8px 10px", borderRadius: "6px" }}>
                      Add {formatPrice(49900 - total)} more for free shipping
                    </div>
                  )}
                  <div style={{ borderTop: "2px solid #e2e8f0", paddingTop: "12px", display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontWeight: "700", color: "#0f172a" }}>Total</span>
                    <span style={{ fontWeight: "900", fontSize: "20px", color: "#0284c7" }}>{formatPrice(grandTotal)}</span>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  style={{ display: "block", textAlign: "center", background: "linear-gradient(135deg,#0284c7,#2563eb)", color: "#fff", padding: "14px", borderRadius: "8px", textDecoration: "none", fontWeight: "700", fontSize: "15px", marginBottom: "12px" }}
                >
                  Proceed to Checkout →
                </Link>
                <Link href="/products" style={{ display: "block", textAlign: "center", color: "#64748b", fontSize: "13px", textDecoration: "none" }}>
                  ← Continue Shopping
                </Link>
                <div style={{ marginTop: "20px", padding: "12px", background: "#f0fdf4", borderRadius: "8px", display: "flex", gap: "8px", alignItems: "flex-start" }}>
                  <span>🛡️</span>
                  <div style={{ fontSize: "12px", color: "#166534" }}>
                    <strong>Warranty Included</strong> — all products come with manufacturer warranty. Register easily after purchase.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <style>{`
        @media (max-width: 768px) {
          main > div > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
