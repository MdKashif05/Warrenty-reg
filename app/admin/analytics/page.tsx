"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

interface Analytics {
  overview: {
    totalOrders: number;
    ordersThisMonth: number;
    totalRevenue: number;
    revenueThisMonth: number;
    totalCustomers: number;
    customersThisMonth: number;
    totalWarranties: number;
    pendingWarranties: number;
    activeWarranties: number;
    totalClaims: number;
    openClaims: number;
  };
  charts: {
    ordersByMonth: { month: string; count: number; revenue: number }[];
    warrantyByPlatform: { purchasePlatform: string; _count: { id: number } }[];
    topProducts: { name: string; _sum: { price: number }; _count: { id: number } }[];
  };
}

const COLORS = ["#0284c7", "#2563eb", "#7c3aed", "#db2777", "#ea580c", "#16a34a"];

const PLATFORM_LABELS: Record<string, string> = {
  OWN_WEBSITE: "Thermal Lexum Website",
  AMAZON: "Amazon",
  FLIPKART: "Flipkart",
  OTHER: "Other",
};

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/analytics")
      .then((r) => {
        if (!r.ok) {
          throw new Error("Failed to fetch analytics");
        }
        return r.json();
      })
      .then((d) => {
        if (d && d.error) {
          setError(d.error);
        } else {
          setData(d);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unauthorized or server error. Please make sure you are logged in.");
        setLoading(false);
      });
  }, []);

  const formatRevenue = (paise: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", notation: "compact", maximumFractionDigits: 1 }).format((paise || 0) / 100);

  if (loading) return <div style={{ textAlign: "center", padding: "80px", color: "#64748b", fontFamily: "Outfit, sans-serif" }}>🔄 Loading business analytics...</div>;
  if (error || !data) return (
    <div style={{ padding: "40px", textAlign: "center", background: "#fff", border: "1px solid #fee2e2", borderRadius: "12px", maxWidth: "500px", margin: "40px auto" }}>
      <div style={{ fontSize: "40px", marginBottom: "16px" }}>⚠️</div>
      <h3 style={{ color: "#b91c1c", fontSize: "18px", fontWeight: "800", marginBottom: "8px" }}>Failed to Load Analytics</h3>
      <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "20px" }}>{error || "Unauthorized access or database error."}</p>
      <Link href="/admin/login" className="btn-primary" style={{ display: "inline-flex", padding: "10px 20px" }}>
        Re-Login to Control Panel 🔐
      </Link>
    </div>
  );

  const { overview, charts } = data;

  const metrics = [
    { label: "Total Revenue", value: formatRevenue(overview.totalRevenue), sub: `${formatRevenue(overview.revenueThisMonth)} this month`, color: "#0284c7" },
    { label: "Total Orders", value: overview.totalOrders.toLocaleString(), sub: `+${overview.ordersThisMonth} this month`, color: "#2563eb" },
    { label: "Total Customers", value: overview.totalCustomers.toLocaleString(), sub: `+${overview.customersThisMonth} this month`, color: "#7c3aed" },
    { label: "Active Warranties", value: overview.activeWarranties.toLocaleString(), sub: `${overview.pendingWarranties} pending verification`, color: "#16a34a" },
    { label: "Total Claims", value: overview.totalClaims.toLocaleString(), sub: `${overview.openClaims} open claims`, color: "#b45309" },
    { label: "Warranty Coverage", value: `${overview.totalWarranties}`, sub: "Registrations total", color: "#0369a1" },
  ];

  // Format months for chart
  const monthlyData = (charts.ordersByMonth as unknown as { month: string; count: string; revenue: string }[]).map((d) => ({
    month: new Date(d.month).toLocaleString("en-IN", { month: "short" }),
    Orders: parseInt(String(d.count)),
    Revenue: Math.round(parseInt(String(d.revenue)) / 100),
  }));

  const platformData = charts.warrantyByPlatform.map((d) => ({
    name: PLATFORM_LABELS[d.purchasePlatform] || d.purchasePlatform,
    value: d._count.id,
  }));

  const topProductsData = charts.topProducts.map((d) => ({
    name: d.name.length > 20 ? d.name.slice(0, 20) + "…" : d.name,
    revenue: Math.round((d._sum.price || 0) / 100),
    units: d._count.id,
  }));

  return (
    <div>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: "900", color: "#0f172a", letterSpacing: "-1px" }}>Analytics</h1>
        <p style={{ color: "#64748b", fontSize: "14px" }}>Business performance overview</p>
      </div>

      {/* Metric Cards */}
      <div className="responsive-form-grid-4" style={{ marginBottom: "32px" }}>
        {metrics.map((m) => (
          <div key={m.label} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px" }}>
            <div style={{ fontSize: "11px", color: "#94a3b8", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "6px" }}>{m.label}</div>
            <div style={{ fontSize: "28px", fontWeight: "900", color: m.color, marginBottom: "4px" }}>{m.value}</div>
            <div style={{ fontSize: "12px", color: "#64748b" }}>{m.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="responsive-grid-2" style={{ marginBottom: "20px" }}>
        {/* Monthly Revenue */}
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: "800", color: "#0f172a", marginBottom: "16px" }}>Monthly Revenue (₹)</h2>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0284c7" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#0284c7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v) => [`₹${Number(v).toLocaleString("en-IN")}`, "Revenue"]} />
              <Area type="monotone" dataKey="Revenue" stroke="#0284c7" strokeWidth={2} fill="url(#revGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Orders */}
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: "800", color: "#0f172a", marginBottom: "16px" }}>Monthly Orders</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="Orders" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="responsive-grid-2">
        {/* Platform Breakdown */}
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: "800", color: "#0f172a", marginBottom: "16px" }}>Warranty Registrations by Platform</h2>
          {platformData.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", color: "#94a3b8" }}>No data yet</div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={platformData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }: { name?: string; percent?: number }) => `${name ?? ""} ${((percent ?? 0) * 100).toFixed(0)}%`} labelLine={false}>
                  {platformData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Top Products */}
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: "800", color: "#0f172a", marginBottom: "16px" }}>Top Products by Revenue</h2>
          {topProductsData.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", color: "#94a3b8" }}>No data yet</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {topProductsData.map((p, i) => (
                <div key={p.name} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <div style={{ width: "24px", height: "24px", borderRadius: "6px", background: COLORS[i % COLORS.length], display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "11px", fontWeight: "700", flexShrink: 0 }}>{i + 1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "13px", fontWeight: "600", color: "#0f172a" }}>{p.name}</div>
                    <div style={{ fontSize: "11px", color: "#94a3b8" }}>{p.units} units</div>
                  </div>
                  <div style={{ fontWeight: "700", color: "#0284c7", fontSize: "14px" }}>₹{p.revenue.toLocaleString("en-IN")}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
