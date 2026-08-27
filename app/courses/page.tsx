"use client";
import Link from "next/link";
import Navbar, { nesaCoursesList } from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function CoursesPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#ffffff", paddingTop: "100px", minHeight: "100vh" }}>
        <div style={{ background: "linear-gradient(135deg, #0E4D92 0%, #1a5ca4 100%)", color: "#ffffff", padding: "60px 20px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <span style={{ fontSize: "12px", letterSpacing: "2px", fontWeight: "800", color: "#ffd166", textTransform: "uppercase" }}>NESA CURRICULUM</span>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 54px)", fontWeight: "900", color: "#ffffff", marginTop: "8px", marginBottom: "16px" }}>
              Spoken English & IELTS Courses
            </h1>
            <p style={{ fontSize: "17px", color: "#e2e8f0", maxWidth: "680px", lineHeight: "1.6" }}>
              Explore our comprehensive programs tailored for beginners, professionals, executives, kids, and exam aspirants.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "60px 20px" }}>
          <div className="responsive-grid-3">
            {nesaCoursesList.map((course) => (
              <div key={course.slug} className="card-nesa" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "30px" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                    <span style={{ background: "#f0fcff", color: "#0E4D92", padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: "800", border: "1px solid #cceeff" }}>
                      {course.badge}
                    </span>
                    <span style={{ fontSize: "22px", fontWeight: "900", color: "#0E4D92" }}>
                      {course.price}
                    </span>
                  </div>

                  <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", marginBottom: "12px", lineHeight: "1.3" }}>
                    <Link href={`/courses/${course.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                      {course.name}
                    </Link>
                  </h2>

                  <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.6", marginBottom: "24px" }}>
                    {course.desc}
                  </p>
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9", marginBottom: "20px", fontSize: "13px", color: "#64748b", fontWeight: "600" }}>
                    <span>📖 {course.lessons} Lessons</span>
                    <span>👥 {course.students} Enrolled</span>
                  </div>

                  <Link href={`/courses/${course.slug}`} className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                    Enroll in Course →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
