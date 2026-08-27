"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar, { nesaCoursesList } from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function CourseDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const course = nesaCoursesList.find((c) => c.slug === slug) || nesaCoursesList[0];

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
              <span style={{ fontSize: "13px", color: "#e2e8f0" }}>NESA Official Program</span>
            </div>

            <h1 style={{ fontSize: "clamp(30px, 5vw, 50px)", fontWeight: "900", color: "#ffffff", marginBottom: "16px" }}>
              {course.name}
            </h1>
            <p style={{ fontSize: "17px", color: "#cbd5e1", maxWidth: "700px", lineHeight: "1.6" }}>
              {course.desc}
            </p>
          </div>
        </div>

        {/* Course Body */}
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "60px 20px" }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-start">
            {/* Main Information */}
            <div>
              <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#0f172a", marginBottom: "16px" }}>
                About This Course
              </h2>
              <p style={{ fontSize: "16px", color: "#475569", lineHeight: "1.8", marginBottom: "32px" }}>
                Welcome to {course.name} at NESA Institute! This course offers an immersive learning experience specifically designed to build communication confidence, sentence structure, public speaking poise, and practical conversational fluency.
              </p>

              <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", marginBottom: "16px" }}>
                What You Will Learn
              </h3>
              <div className="responsive-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "40px" }}>
                {[
                  "✅ Interactive Live Speaking Drills & Debates",
                  "✅ Vocabulary Expansion & Accent Modulation",
                  "✅ Professional Email Writing & Business Etiquette",
                  "✅ Group Discussion (GD) & Mock Interview Training",
                  "✅ 1-on-1 Feedback from Senior Certified Instructors",
                  "✅ Official NESA Certificate of Completion",
                ].map((item) => (
                  <div key={item} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", padding: "16px", borderRadius: "10px", fontSize: "14px", fontWeight: "600", color: "#334155" }}>
                    {item}
                  </div>
                ))}
              </div>

              <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", marginBottom: "16px" }}>
                Course Syllabus Overview ({course.lessons} Lessons)
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "40px" }}>
                {Array.from({ length: Math.min(course.lessons, 6) }).map((_, idx) => (
                  <div key={idx} style={{ background: "#ffffff", border: "1px solid #e2e8f0", padding: "16px 20px", borderRadius: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontWeight: "700", color: "#0f172a", fontSize: "15px" }}>
                      Lesson {idx + 1}: {idx === 0 ? "Building Confidence & Vocal Warmups" : idx === 1 ? "Grammar Essentials & Sentence Framing" : idx === 2 ? "Pronunciation & Accent Neutralization" : idx === 3 ? "Group Discussion & Real-World Scenarios" : idx === 4 ? "Professional Interview & GD Drills" : "Final Speech Presentation & Evaluation"}
                    </div>
                    <span style={{ fontSize: "12px", color: "#0E4D92", fontWeight: "700" }}>Live Session</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Enrollment Box */}
            <div className="card-nesa" style={{ padding: "32px", position: "sticky", top: "100px" }}>
              <div style={{ fontSize: "32px", fontWeight: "900", color: "#0E4D92", marginBottom: "8px", fontFamily: "Outfit, sans-serif" }}>
                {course.price}
              </div>
              <div style={{ fontSize: "13px", color: "#16a34a", fontWeight: "700", marginBottom: "24px" }}>
                ⚡ Limited Seats Available for Next Batch!
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "28px", fontSize: "14px", color: "#475569" }}>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: "8px" }}>
                  <span>Lessons Count</span>
                  <strong style={{ color: "#0f172a" }}>{course.lessons} Live Lessons</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: "8px" }}>
                  <span>Enrolled Students</span>
                  <strong style={{ color: "#0f172a" }}>{course.students} Learners</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: "8px" }}>
                  <span>Certificate</span>
                  <strong style={{ color: "#0E4D92" }}>Official NESA Certificate</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: "8px" }}>
                  <span>Course Access</span>
                  <strong style={{ color: "#0f172a" }}>Lifetime Access</strong>
                </div>
              </div>

              <Link href="/register" className="btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: "15px", padding: "14px" }}>
                Enroll Now 🚀
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
