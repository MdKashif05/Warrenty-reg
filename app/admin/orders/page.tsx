"use client";
import { useState, useEffect, useCallback } from "react";

interface Order {
  id: string;
  orderId: string;
  status: string;
  paymentStatus: string;
  totalAmount: number;
  shippingName: string;
  shippingPhone: string;
  shippingCity: string;
  shippingState: string;
  guestEmail?: string;
  createdAt: string;
  customer?: { firstName: string; lastName: string; email: string } | null;
  items: { name: string; qty: number; product: { name: string } }[];
}

const STATUS_OPTIONS = ["PENDING","CONFIRMED","PROCESSING","SHIPPED","DELIVERED","CANCELLED","REFUNDED"];
const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  CONFIRMED: { bg: "#dcfce7", color: "#15803d" },
  DELIVERED: { bg: "#dbeafe", color: "#1d4ed8" },
  SHIPPED: { bg: "#e0f2fe", color: "#0369a1" },
  PROCESSING: { bg: "#fef9c3", color: "#92400e" },
  PENDING: { bg: "#f1f5f9", color: "#475569" },
  CANCELLED: { bg: "#fee2e2", color: "#b91c1c" },
  REFUNDED: { bg: "#f1f5f9", color: "#64748b" },
  PAID: { bg: "#dcfce7", color: "#15803d" },
  FAILED: { bg: "#fee2e2", color: "#b91c1c" },
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: "20" });
    if (search) params.set("search", search);
    if (statusFilter) params.set("status", statusFilter);
    const res = await fetch(`/api/admin/orders?${params}`);
    const data = await res.json();
    setOrders(data.orders || []);
    setTotal(data.total || 0);
    setLoading(false);
  }, [page, search, statusFilter]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const updateStatus = async (orderId: string, status: string) => {
    setUpdating(orderId);
    await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, status }),
    });
    await fetchOrders();
    setUpdating(null);
  };

  const formatPrice = (paise: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(paise / 100);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "26px", fontWeight: "900", color: "#0f172a", letterSpacing: "-1px" }}>Orders</h1>
          <p style={{ color: "#64748b", fontSize: "14px" }}>{total} total orders</p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
        <input
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search order ID, name, phone…"
          style={{ flex: 1, minWidth: "200px", padding: "10px 14px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "14px", fontFamily: "inherit" }}
        />
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          style={{ padding: "10px 14px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "14px", fontFamily: "inherit" }}
        >
          <option value="">All Statuses</option>
          {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="brand-card" style={{ background: "#fff", border: "1px solid #e2e8f0", padding: "0", overflow: "hidden" }}>
        <div className="data-table-container">
          <table className="data-table" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>CUSTOMER</th>
              <th>ITEMS</th>
              <th>AMOUNT</th>
              <th>PAYMENT</th>
              <th>STATUS</th>
              <th>DATE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={8} style={{ textAlign: "center", color: "#94a3b8", padding: "40px" }}>Loading…</td></tr>
            ) : orders.length === 0 ? (
              <tr><td colSpan={8} style={{ textAlign: "center", color: "#94a3b8", padding: "40px" }}>No orders found</td></tr>
            ) : orders.map((order) => {
              const statusStyle = STATUS_COLORS[order.status] || { bg: "#f1f5f9", color: "#475569" };
              const payStyle = STATUS_COLORS[order.paymentStatus] || { bg: "#f1f5f9", color: "#475569" };
              return (
                <tr key={order.id}>
                  <td style={{ fontFamily: "monospace", fontWeight: "700", color: "#0284c7" }}>{order.orderId}</td>
                  <td>
                    <div style={{ fontWeight: "600", color: "#0f172a", fontSize: "13px" }}>
                      {order.customer ? `${order.customer.firstName} ${order.customer.lastName}` : order.shippingName}
                    </div>
                    <div style={{ fontSize: "11px", color: "#94a3b8" }}>
                      {order.customer?.email || order.guestEmail || order.shippingPhone}
                    </div>
                  </td>
                  <td style={{ fontSize: "12px", color: "#475569" }}>
                    {order.items.slice(0, 2).map((i) => `${i.product?.name || i.name} ×${i.qty}`).join(", ")}
                    {order.items.length > 2 && ` +${order.items.length - 2}`}
                  </td>
                  <td style={{ fontWeight: "700", color: "#0f172a" }}>{formatPrice(order.totalAmount)}</td>
                  <td>
                    <span style={{ background: payStyle.bg, color: payStyle.color, padding: "2px 8px", borderRadius: "12px", fontSize: "11px", fontWeight: "700" }}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.orderId, e.target.value)}
                      disabled={updating === order.orderId}
                      style={{ background: statusStyle.bg, color: statusStyle.color, border: "none", borderRadius: "12px", padding: "3px 8px", fontSize: "11px", fontWeight: "700", cursor: "pointer", fontFamily: "inherit" }}
                    >
                      {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td style={{ fontSize: "12px", color: "#64748b" }}>
                    {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </td>
                  <td>
                    <a href={`/order-confirmation/${order.orderId}`} target="_blank" style={{ fontSize: "12px", color: "#0284c7", textDecoration: "none", fontWeight: "600" }}>View</a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      </div>

      {/* Pagination */}
      {total > 20 && (
        <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "20px" }}>
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} style={{ padding: "8px 16px", border: "1px solid #e2e8f0", borderRadius: "6px", cursor: "pointer", fontFamily: "inherit" }}>← Prev</button>
          <span style={{ padding: "8px 16px", color: "#64748b", fontSize: "13px" }}>Page {page} of {Math.ceil(total / 20)}</span>
          <button onClick={() => setPage((p) => p + 1)} disabled={page >= Math.ceil(total / 20)} style={{ padding: "8px 16px", border: "1px solid #e2e8f0", borderRadius: "6px", cursor: "pointer", fontFamily: "inherit" }}>Next →</button>
        </div>
      )}
    </div>
  );
}
