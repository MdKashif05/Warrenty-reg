"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", course: "NESA Fluent English Level 1" });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <>
      <Navbar />
      <main style={{ background: "#f8fafc", paddingTop: "100px", minHeight: "100vh" }}>
        <div style={{ maxWidth: "600px", margin: "40px auto", padding: "0 20px" }}>
          <div className="card-nesa" style={{ padding: "40px" }}>
            {success ? (
              <div style={{ textAlign: "center", padding: "30px 0" }}>
                <div style={{ fontSize: "64px", marginBottom: "16px" }}>🎉</div>
                <h1 style={{ fontSize: "28px", fontWeight: "900", color: "#0E4D92", marginBottom: "12px" }}>
                  Registration Successful!
                </h1>
                <p style={{ fontSize: "16px", color: "#475569", lineHeight: "1.7", marginBottom: "28px" }}>
                  Welcome to NESA, <strong>{form.name}</strong>! You are registered for <strong>{form.course}</strong>. Our academic team will email you the batch schedule and demo session link shortly.
                </p>
                <Link href="/courses" className="btn-primary">
                  Browse More Courses →
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ textAlign: "center", marginBottom: "10px" }}>
                  <span className="section-subtitle" style={{ marginBottom: "8px" }}>FREE ENROLLMENT</span>
                  <h1 style={{ fontSize: "28px", fontWeight: "900", color: "#0f172a" }}>
                    Register for NESA Course
                  </h1>
                  <p style={{ fontSize: "14px", color: "#64748b", marginTop: "4px" }}>
                    Join 10,000+ confident English speakers across the globe!
                  </p>
                </div>

                <div>
                  <label style={{ fontSize: "13px", fontWeight: "700", color: "#475569", display: "block", marginBottom: "6px" }}>Full Name *</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Rahul Sharma" style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", outline: "none" }} />
                </div>

                <div>
                  <label style={{ fontSize: "13px", fontWeight: "700", color: "#475569", display: "block", marginBottom: "6px" }}>Email Address *</label>
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="rahul@example.com" style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", outline: "none" }} />
                </div>

                <div>
                  <label style={{ fontSize: "13px", fontWeight: "700", color: "#475569", display: "block", marginBottom: "6px" }}>Mobile Number *</label>
                  <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 9876543210" style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", outline: "none" }} />
                </div>

                <div>
                  <label style={{ fontSize: "13px", fontWeight: "700", color: "#475569", display: "block", marginBottom: "6px" }}>Select Course *</label>
                  <select value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", outline: "none", background: "#fff" }}>
                    <option value="NESA Fluent English Level 1">NESA Fluent English Level 1 (₹4,999)</option>
                    <option value="NESA Fluent English Level 2">NESA Fluent English Level 2 (₹5,999)</option>
                    <option value="NESA English Foundation">NESA English Foundation (₹3,999)</option>
                    <option value="NESA Professional English Course">NESA Professional English Course (₹6,999)</option>
                    <option value="NESA Spoken English Advance">NESA Spoken English Advance (₹7,999)</option>
                    <option value="NESA Corporate English Course">NESA Corporate English Course (₹8,999)</option>
                    <option value="NESA IELTS Preparation">NESA IELTS Preparation (₹9,999)</option>
                  </select>
                </div>

                <button type="submit" className="btn-primary" style={{ padding: "14px", fontSize: "16px", marginTop: "10px" }}>
                  Complete Free Enrollment 🎓
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
