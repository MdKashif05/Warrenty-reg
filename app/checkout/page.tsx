"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface CartItem {
  productId: string;
  variantId?: string;
  qty: number;
  product: { name: string };
  variant?: { name: string; price: number } | null;
}

const STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana",
  "Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur",
  "Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
  "Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
  "Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli","Daman and Diu","Delhi",
  "Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry"
];

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [customer, setCustomer] = useState<{ firstName: string; lastName: string; email: string; phone?: string } | null>(null);

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", state: "", pincode: "",
    paymentGateway: "RAZORPAY",
    notes: "",
  });

  useEffect(() => {
    async function load() {
      const [cartRes, meRes] = await Promise.all([
        fetch("/api/cart"),
        fetch("/api/account/me"),
      ]);
      const cartData = await cartRes.json();
      const meData = await meRes.json();
      setCartItems(cartData.items || []);
      setTotal(cartData.total || 0);
      if (meData.customer) {
        setCustomer(meData.customer);
        setForm((f) => ({
          ...f,
          firstName: meData.customer.firstName || "",
          lastName: meData.customer.lastName || "",
          email: meData.customer.email || "",
          phone: meData.customer.phone || "",
        }));
      }
      setLoading(false);
    }
    load();
  }, []);

  const formatPrice = (paise: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(paise / 100);

  const shippingCharge = total >= 49900 ? 0 : 5900;
  const grandTotal = total + shippingCharge;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const items = cartItems.map((item) => ({
        productId: item.productId,
        variantId: item.variantId,
        qty: item.qty,
        price: item.variant?.price ?? 0,
        name: item.product.name,
        variant: item.variant?.name,
      }));

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          shippingName: `${form.firstName} ${form.lastName}`,
          shippingPhone: form.phone,
          shippingAddress: form.address,
          shippingCity: form.city,
          shippingState: form.state,
          shippingPincode: form.pincode,
          guestName: !customer ? `${form.firstName} ${form.lastName}` : undefined,
          guestEmail: !customer ? form.email : undefined,
          guestPhone: !customer ? form.phone : undefined,
          paymentGateway: form.paymentGateway,
          notes: form.notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create order");

      if (form.paymentGateway === "RAZORPAY") {
        // Load Razorpay script
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
        script.onload = () => {
          const rzp = new (window as unknown as { Razorpay: new (opts: unknown) => { open: () => void } }).Razorpay({
            key: data.razorpayKeyId,
            amount: data.totalAmount,
            currency: "INR",
            name: "Thermal Lexum",
            description: `Order ${data.orderId}`,
            order_id: data.razorpayOrderId,
            prefill: { name: `${form.firstName} ${form.lastName}`, email: form.email, contact: form.phone },
            theme: { color: "#0284c7" },
            handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
              const verifyRes = await fetch("/api/payment/razorpay/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  orderId: data.orderId,
                }),
              });
              const verifyData = await verifyRes.json();
              if (verifyData.success) {
                router.push(`/order-confirmation/${data.orderId}`);
              } else {
                alert("Payment verification failed. Please contact support.");
              }
            },
            modal: { ondismiss: () => setSubmitting(false) },
          });
          rzp.open();
        };
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  if (loading) return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", paddingTop: "120px", textAlign: "center", color: "#64748b" }}>Loading…</main>
      <Footer />
    </>
  );

  if (cartItems.length === 0) {
    router.push("/cart");
    return null;
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "12px 14px", border: "1px solid #e2e8f0",
    borderRadius: "8px", fontSize: "14px", fontFamily: "inherit",
    outline: "none", background: "#fff", color: "#0f172a",
  };
  const labelStyle: React.CSSProperties = { fontSize: "12px", fontWeight: "700", color: "#475569", letterSpacing: "0.5px", marginBottom: "6px", display: "block" };

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#f8fafc", paddingTop: "80px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 16px" }}>
          <div style={{ marginBottom: "32px" }}>
            <div style={{ fontSize: "11px", color: "#0284c7", letterSpacing: "3px", fontWeight: "700", textTransform: "uppercase", marginBottom: "8px" }}>CHECKOUT</div>
            <h1 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: "900", letterSpacing: "-1.5px", color: "#0f172a" }}>Complete Your Order</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr min(380px,42%)", gap: "24px", alignItems: "start" }}>
              {/* Left: Form */}
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {/* Contact */}
                <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "24px" }}>
                  <h2 style={{ fontSize: "15px", fontWeight: "800", color: "#0f172a", marginBottom: "20px" }}>Contact Information</h2>
                  <div className="responsive-form-grid-2">
                    <div>
                      <label style={labelStyle}>First Name *</label>
                      <input name="firstName" value={form.firstName} onChange={handleChange} required style={inputStyle} placeholder="Rahul" />
                    </div>
                    <div>
                      <label style={labelStyle}>Last Name *</label>
                      <input name="lastName" value={form.lastName} onChange={handleChange} required style={inputStyle} placeholder="Sharma" />
                    </div>
                    <div>
                      <label style={labelStyle}>Email *</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} required style={inputStyle} placeholder="rahul@email.com" />
                    </div>
                    <div>
                      <label style={labelStyle}>Mobile *</label>
                      <input name="phone" type="tel" value={form.phone} onChange={handleChange} required style={inputStyle} placeholder="9876543210" />
                    </div>
                  </div>
                </div>

                {/* Shipping */}
                <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "24px" }}>
                  <h2 style={{ fontSize: "15px", fontWeight: "800", color: "#0f172a", marginBottom: "20px" }}>Shipping Address</h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div>
                      <label style={labelStyle}>Full Address *</label>
                      <input name="address" value={form.address} onChange={handleChange} required style={inputStyle} placeholder="House/Flat no, Street, Area" />
                    </div>
                    <div className="responsive-form-grid-2">
                      <div>
                        <label style={labelStyle}>City *</label>
                        <input name="city" value={form.city} onChange={handleChange} required style={inputStyle} placeholder="Bengaluru" />
                      </div>
                      <div>
                        <label style={labelStyle}>State *</label>
                        <select name="state" value={form.state} onChange={handleChange} required style={inputStyle}>
                          <option value="">Select State</option>
                          {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      <div>
                        <label style={labelStyle}>PIN Code *</label>
                        <input name="pincode" value={form.pincode} onChange={handleChange} required style={inputStyle} placeholder="560042" maxLength={6} />
                      </div>
                    </div>
                    <div>
                      <label style={labelStyle}>Order Notes (Optional)</label>
                      <textarea name="notes" value={form.notes} onChange={handleChange} style={{ ...inputStyle, height: "80px", resize: "vertical" }} placeholder="Any special instructions?" />
                    </div>
                  </div>
                </div>

                {/* Payment */}
                <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "24px" }}>
                  <h2 style={{ fontSize: "15px", fontWeight: "800", color: "#0f172a", marginBottom: "20px" }}>Payment Method</h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {[
                      { value: "RAZORPAY", label: "Razorpay", desc: "Credit/Debit Card, UPI, NetBanking, Wallets", icon: "💳" },
                      { value: "PAYU", label: "PayU", desc: "Alternative payment gateway", icon: "💰" },
                    ].map((pg) => (
                      <label key={pg.value} style={{ display: "flex", gap: "12px", padding: "14px 16px", border: `2px solid ${form.paymentGateway === pg.value ? "#0284c7" : "#e2e8f0"}`, borderRadius: "10px", cursor: "pointer", background: form.paymentGateway === pg.value ? "#eff6ff" : "#fff" }}>
                        <input type="radio" name="paymentGateway" value={pg.value} checked={form.paymentGateway === pg.value} onChange={handleChange} style={{ accentColor: "#0284c7" }} />
                        <span style={{ fontSize: "20px" }}>{pg.icon}</span>
                        <div>
                          <div style={{ fontWeight: "700", color: "#0f172a", fontSize: "14px" }}>{pg.label}</div>
                          <div style={{ fontSize: "12px", color: "#64748b" }}>{pg.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Order Summary */}
              <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "24px", position: "sticky", top: "100px" }}>
                <h2 style={{ fontSize: "15px", fontWeight: "800", color: "#0f172a", marginBottom: "16px" }}>Order Summary</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
                  {cartItems.map((item) => (
                    <div key={item.productId + item.variantId} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                      <span style={{ color: "#0f172a" }}>{item.product.name}{item.variant ? ` · ${item.variant.name}` : ""} × {item.qty}</span>
                      <span style={{ fontWeight: "600" }}>
                        {item.variant ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format((item.variant.price * item.qty) / 100) : "—"}
                      </span>
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "12px", display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                    <span style={{ color: "#64748b" }}>Subtotal</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                    <span style={{ color: "#64748b" }}>Shipping</span>
                    <span style={{ color: shippingCharge === 0 ? "#16a34a" : "#0f172a", fontWeight: "600" }}>{shippingCharge === 0 ? "FREE" : formatPrice(shippingCharge)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", borderTop: "2px solid #e2e8f0", paddingTop: "8px" }}>
                    <span style={{ fontWeight: "700" }}>Total</span>
                    <span style={{ fontWeight: "900", color: "#0284c7", fontSize: "18px" }}>{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  style={{ width: "100%", padding: "14px", background: submitting ? "#94a3b8" : "linear-gradient(135deg,#0284c7,#2563eb)", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "700", fontSize: "15px", cursor: submitting ? "not-allowed" : "pointer", fontFamily: "inherit" }}
                >
                  {submitting ? "Processing…" : `Pay ${formatPrice(grandTotal)}`}
                </button>

                <div style={{ marginTop: "16px", display: "flex", gap: "8px", justifyContent: "center", color: "#94a3b8", fontSize: "12px" }}>
                  <span>🔒 Secure Payment</span>
                  <span>·</span>
                  <span>🛡️ Warranty Included</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
      <style>{`
        @media (max-width: 768px) {
          form > div { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
