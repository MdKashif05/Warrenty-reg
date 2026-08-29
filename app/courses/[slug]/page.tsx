"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar, { nesaCoursesList, CourseItem } from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function CourseDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const course = nesaCoursesList.find((c: CourseItem) => c.slug === slug) || nesaCoursesList[0];

  return (
    <>
      <Navbar />
      <main style={{ background: "#ffffff", paddingTop: "100px", minHeight: "100vh" }}>
        {/* Header */}
        <div style={{ background: "linear-gradient(135deg, #0E4D92 0%, #1a5ca4 100%)", color: "#ffffff", padding: "60px 20px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "12px" }}>
              <span style={{ background: "#ffd166", color: "#0E4D92", padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: "900" }}>
                {course.badge}
              </span>
              <span style={{ fontSize: "13px", color: "#e2e8f0" }}>Thermal Lexum Genuine Item</span>
            </div>

            <h1 style={{ fontSize: "clamp(30px, 5vw, 50px)", fontWeight: "900", color: "#ffffff", marginBottom: "16px" }}>
              {course.name}
            </h1>
            <p style={{ fontSize: "17px", color: "#cbd5e1", maxWidth: "700px", lineHeight: "1.6" }}>
              {course.desc}
            </p>
          </div>
        </div>

        {/* Product Details */}
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "60px 20px" }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-start">
            {/* Main Info */}
            <div>
              <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#0f172a", marginBottom: "16px" }}>
                Technical Overview & Specifications
              </h2>
              <p style={{ fontSize: "16px", color: "#475569", lineHeight: "1.8", marginBottom: "32px" }}>
                {course.name} is manufactured with ultra-fine synthetic diamond particles for maximum heat transfer between CPU/GPU silicon die and heatpipe heatsink.
              </p>

              <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", marginBottom: "16px" }}>
                Key Highlights
              </h3>
              <div className="responsive-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "40px" }}>
                {[
                  "✅ 17.6 W/mK Extreme Thermal Conductivity",
                  "✅ Zero Electrical Conductivity (Safe for All Components)",
                  "✅ Long-Term Durability (No Dry-Out up to 8 Years)",
                  "✅ Syringe Applicator + Spatula Spreader Included",
                  "✅ 3 Years Official Replacement Warranty",
                  "✅ Compatible with Intel LGA 1700/1851 & AMD AM5/AM4",
                ].map((item) => (
                  <div key={item} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", padding: "16px", borderRadius: "10px", fontSize: "14px", fontWeight: "600", color: "#334155" }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Buy Box */}
            <div className="card-nesa" style={{ padding: "32px", position: "sticky", top: "100px" }}>
              <div style={{ fontSize: "32px", fontWeight: "900", color: "#0E4D92", marginBottom: "8px", fontFamily: "Outfit, sans-serif" }}>
                {course.price}
              </div>
              <div style={{ fontSize: "13px", color: "#16a34a", fontWeight: "700", marginBottom: "24px" }}>
                ⚡ In Stock – Dispatch within 24 Hours!
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "28px", fontSize: "14px", color: "#475569" }}>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: "8px" }}>
                  <span>Warranty Coverage</span>
                  <strong style={{ color: "#0f172a" }}>3 Years Official</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: "8px" }}>
                  <span>Units Shipped</span>
                  <strong style={{ color: "#0f172a" }}>{course.students}+ Units</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: "8px" }}>
                  <span>Shipping</span>
                  <strong style={{ color: "#16a34a" }}>Free Express Delivery</strong>
                </div>
              </div>

              <Link href="/checkout" className="btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: "15px", padding: "14px" }}>
                Buy Now 🛒
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
