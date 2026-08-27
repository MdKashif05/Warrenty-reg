"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar, { nesaCoursesList } from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  return (
    <>
      <Navbar />
      <main style={{ background: "#ffffff", paddingTop: "100px" }}>
        
        {/* ─── 1. HERO SECTION ─── */}
        <section
          style={{
            background: "linear-gradient(135deg, #f0fcff 0%, #ffffff 60%, #eef6ff 100%)",
            padding: "80px 20px 100px",
            position: "relative",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="section-subtitle" style={{ marginBottom: "20px" }}>
                  NESA – LET'S SPEAK IN ENGLISH
                </span>
                <h1
                  style={{
                    fontSize: "clamp(34px, 5.5vw, 62px)",
                    fontWeight: "900",
                    letterSpacing: "-1.5px",
                    color: "#0f172a",
                    lineHeight: "1.1",
                    marginBottom: "24px",
                  }}
                >
                  Unlock Your <span style={{ color: "#0E4D92" }}>English Fluency</span> at NESA
                </h1>
                <p
                  style={{
                    fontSize: "17px",
                    color: "#475569",
                    lineHeight: "1.7",
                    marginBottom: "36px",
                    maxWidth: "580px",
                  }}
                >
                  Unlock your English potential at NESA: The premier English speaking center where language mastery comes to life. Experience interactive sessions, expert guidance, and tailored programs that accelerate your journey towards confident and effective communication.
                </p>

                <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "40px" }}>
                  <Link href="/courses" className="btn-primary" style={{ fontSize: "15px", padding: "16px 32px" }}>
                    Explore All Courses 📚
                  </Link>
                  <Link href="/register" className="btn-secondary" style={{ fontSize: "15px", padding: "16px 28px" }}>
                    Register Free Now ✨
                  </Link>
                </div>

                {/* Stats row */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: "16px", background: "#ffffff", padding: "20px", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 8px 24px rgba(0,0,0,0.04)" }}>
                  {[
                    { value: "10,000+", label: "Students Taught" },
                    { value: "98%", label: "Success Rate" },
                    { value: "12+", label: "Specialized Courses" },
                    { value: "4.9 ★", label: "Student Rating" },
                  ].map((st) => (
                    <div key={st.label} style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "22px", fontWeight: "900", color: "#0E4D92", fontFamily: "Outfit, sans-serif" }}>{st.value}</div>
                      <div style={{ fontSize: "11px", color: "#64748b", fontWeight: "700", marginTop: "2px" }}>{st.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hero Graphic Card */}
              <div style={{ position: "relative" }}>
                <div
                  className="card-nesa"
                  style={{
                    background: "linear-gradient(135deg, #0E4D92 0%, #1a5ca4 100%)",
                    color: "#ffffff",
                    padding: "40px",
                    borderRadius: "24px",
                    boxShadow: "0 24px 60px rgba(14, 77, 146, 0.3)",
                  }}
                >
                  <div style={{ fontSize: "12px", letterSpacing: "2px", fontWeight: "800", color: "#ffd166", textTransform: "uppercase", marginBottom: "12px" }}>
                    ENROLLMENT PROGRAM 2026
                  </div>
                  <h3 style={{ fontSize: "28px", fontWeight: "900", color: "#ffffff", marginBottom: "16px" }}>
                    Speak English Confidently in 30 Days
                  </h3>
                  <p style={{ fontSize: "15px", color: "#e2e8f0", lineHeight: "1.7", marginBottom: "28px" }}>
                    Join live interactive classes, accent training, group discussions, and personal mentorship crafted by certified language experts.
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "32px" }}>
                    {[
                      "✅ 1-on-1 Speaking Practice & Grammar Drills",
                      "✅ Certified Instructors & Interactive Role-Plays",
                      "✅ IELTS Band 8+ Training & Mock Interviews",
                      "✅ Lifetime Access to NESA Study Material",
                    ].map((item) => (
                      <div key={item} style={{ fontSize: "14px", fontWeight: "600", color: "#ffffff" }}>
                        {item}
                      </div>
                    ))}
                  </div>

                  <Link href="/register" className="btn-primary" style={{ background: "#ffffff", color: "#0E4D92", width: "100%", textAlign: "center", justifyContent: "center", fontSize: "15px", fontWeight: "800" }}>
                    Join Next Batch Free →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. POPULAR COURSES SECTION ─── */}
        <section style={{ padding: "90px 20px", background: "#ffffff" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "50px" }}>
              <span className="section-subtitle" style={{ marginBottom: "14px" }}>
                EXPLORE PROGRAMMING
              </span>
              <h2 style={{ fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: "900", color: "#0f172a", marginBottom: "16px" }}>
                Popular Spoken English Courses
              </h2>
              <p style={{ fontSize: "16px", color: "#64748b", maxWidth: "620px", margin: "0 auto" }}>
                Enjoy top notch learning methods and achieve next level skills! Select from our curated learning tracks designed for beginners to corporate leaders.
              </p>
            </div>

            <div className="responsive-grid-3">
              {nesaCoursesList.map((course) => (
                <div key={course.slug} className="card-nesa" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "28px" }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                      <span style={{ background: "#f0fcff", color: "#0E4D92", padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: "800", border: "1px solid #cceeff" }}>
                        {course.badge}
                      </span>
                      <span style={{ fontSize: "20px", fontWeight: "900", color: "#0E4D92" }}>
                        {course.price}
                      </span>
                    </div>

                    <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", marginBottom: "12px", lineHeight: "1.3" }}>
                      <Link href={`/courses/${course.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                        {course.name}
                      </Link>
                    </h3>

                    <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.6", marginBottom: "24px" }}>
                      {course.desc}
                    </p>
                  </div>

                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9", marginBottom: "20px", fontSize: "12px", color: "#64748b", fontWeight: "600" }}>
                      <span>📖 {course.lessons} Lessons</span>
                      <span>👥 {course.students} Students</span>
                    </div>

                    <Link href={`/courses/${course.slug}`} className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                      View Course Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <Link href="/courses" className="btn-secondary" style={{ fontSize: "15px", padding: "14px 32px" }}>
                View All 12+ Courses →
              </Link>
            </div>
          </div>
        </section>

        {/* ─── 3. ABOUT US SECTION ─── */}
        <section style={{ padding: "90px 20px", background: "#f8fafc", borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
              <div>
                <span className="section-subtitle" style={{ marginBottom: "14px" }}>ABOUT US</span>
                <h2 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: "900", color: "#0f172a", marginBottom: "20px", lineHeight: "1.2" }}>
                  Welcome to Nesa: Your English Speaking Hub for Confidence
                </h2>
                <p style={{ fontSize: "15px", color: "#475569", lineHeight: "1.8", marginBottom: "28px" }}>
                  Welcome to Nesa, your ultimate destination for building English fluency and boosting your confidence! At Nesa, we create a friendly and immersive environment where you can enhance your speaking skills with ease. Our experienced instructors provide personalized guidance, engaging activities, and practical conversations to help you excel in English. Whether you're a beginner or advanced learner, Nesa is here to support you on your journey towards becoming a confident English speaker. Join us and unlock your linguistic potential today!
                </p>

                <div className="responsive-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "36px" }}>
                  {[
                    { icon: "🎓", title: "Expert Teachers", desc: "Certified spoken English instructors" },
                    { icon: "⚡", title: "Time Efficient", desc: "Fast-track 30 to 90 days modules" },
                    { icon: "📖", title: "Advance Learning", desc: "Comprehensive course materials" },
                    { icon: "💪", title: "Boost Confidence", desc: "Group debates & public speaking" },
                  ].map((feat) => (
                    <div key={feat.title} style={{ background: "#ffffff", padding: "16px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                      <div style={{ fontSize: "24px", marginBottom: "6px" }}>{feat.icon}</div>
                      <div style={{ fontSize: "15px", fontWeight: "800", color: "#0f172a", marginBottom: "2px" }}>{feat.title}</div>
                      <div style={{ fontSize: "12px", color: "#64748b" }}>{feat.desc}</div>
                    </div>
                  ))}
                </div>

                <Link href="/about" className="btn-primary">
                  Learn More About NESA →
                </Link>
              </div>

              {/* Graphic Banner */}
              <div>
                <div className="card-nesa" style={{ padding: "40px", background: "#0E4D92", color: "#ffffff" }}>
                  <div style={{ fontSize: "13px", fontWeight: "800", color: "#ffd166", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "14px" }}>
                    WHY LEARNERS CHOOSE NESA
                  </div>
                  <h3 style={{ fontSize: "26px", fontWeight: "900", color: "#ffffff", marginBottom: "20px" }}>
                    "The premier English speaking center where language mastery comes to life."
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {[
                      { num: "01", title: "Interactive Speaking Practice", text: "Daily live speaking drills to eliminate hesitation and stage fear." },
                      { num: "02", title: "Grammar & Vocabulary Mastery", text: "Structured sentence framing without tedious memorization." },
                      { num: "03", title: "Career & Interview Preparation", text: "Mock interviews, resume refinement and professional etiquette." },
                    ].map((step) => (
                      <div key={step.num} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                        <span style={{ fontSize: "18px", fontWeight: "900", color: "#ffd166", fontFamily: "Outfit, sans-serif" }}>{step.num}</span>
                        <div>
                          <div style={{ fontSize: "16px", fontWeight: "800", color: "#ffffff" }}>{step.title}</div>
                          <div style={{ fontSize: "13px", color: "#cbd5e1", marginTop: "2px" }}>{step.text}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 4. WHY NESA SECTION ─── */}
        <section style={{ padding: "90px 20px", background: "#ffffff" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "50px" }}>
              <span className="section-subtitle" style={{ marginBottom: "14px" }}>WHY NESA</span>
              <h2 style={{ fontSize: "clamp(28px, 4.5vw, 46px)", fontWeight: "900", color: "#0f172a", marginBottom: "14px" }}>
                Unlock Your English Potential with NESA
              </h2>
              <p style={{ fontSize: "16px", color: "#64748b", maxWidth: "600px", margin: "0 auto" }}>
                Discover your English potential at NESA. Transform your language skills with our expert guidance and immersive programs.
              </p>
            </div>

            <div className="responsive-grid-4">
              {[
                {
                  icon: "🌱",
                  title: "Immersive Environment",
                  desc: "We provide an immersive environment where learners are surrounded by English-speaking activities.",
                },
                {
                  icon: "👨‍🏫",
                  title: "Experienced Language Tutors",
                  desc: "We've a team of experienced and qualified language instructors who are skilled in teaching English.",
                },
                {
                  icon: "🛡️",
                  title: "Customized Programs",
                  desc: "We offer customized programs tailored to the specific needs and proficiency levels of learners.",
                },
                {
                  icon: "💡",
                  title: "Interactive Approach",
                  desc: "Group discussions, role plays, debates, and real-world scenarios to actively involve learners.",
                },
              ].map((box) => (
                <div key={box.title} className="card-nesa" style={{ padding: "32px 24px", textAlign: "center" }}>
                  <div style={{ fontSize: "40px", marginBottom: "16px" }}>{box.icon}</div>
                  <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", marginBottom: "10px" }}>{box.title}</h3>
                  <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.6", marginBottom: "20px" }}>{box.desc}</p>
                  <Link href="/courses" style={{ color: "#0E4D92", fontWeight: "700", textDecoration: "none", fontSize: "13px" }}>
                    Start Now →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 5. TESTIMONIALS SECTION ─── */}
        <section style={{ padding: "90px 20px", background: "#f0fcff", borderTop: "1px solid #cceeff" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "50px" }}>
              <span className="section-subtitle" style={{ marginBottom: "14px" }}>OUR ACHIEVEMENTS</span>
              <h2 style={{ fontSize: "clamp(28px, 4.5vw, 46px)", fontWeight: "900", color: "#0f172a", marginBottom: "14px" }}>
                What Our Students Say About NESA
              </h2>
              <p style={{ fontSize: "16px", color: "#64748b", maxWidth: "620px", margin: "0 auto" }}>
                Experience excellence in English language education at NESA. Our remarkable achievements stand as a witness to our dedication in empowering learners.
              </p>
            </div>

            <div className="responsive-grid-3">
              {[
                {
                  quote: "NESA has been a game-changer for me. Their immersive English programs and experienced instructors helped me gain confidence in speaking English fluently. I highly recommend NESA!",
                  name: "David Warner",
                  role: "QA Developer",
                },
                {
                  quote: "I'm grateful to NESA for their personalized approach to language learning. Their tailored programs and supportive faculty created a conducive environment for me. Thanks to NESA, I now communicate confidently!",
                  name: "Sarah Taylor",
                  role: "PHP Developer",
                },
                {
                  quote: "NESA's English speaking center transformed my language skills. The interactive classes, real-life scenarios, and constant practice made learning enjoyable. The faculty's dedication truly made a difference.",
                  name: "Rohit Patel",
                  role: "Business Person",
                },
                {
                  quote: "Choosing NESA was the best decision I made for my English fluency. The dynamic learning environment and engaging activities made the entire experience enriching. I feel ready for any challenge!",
                  name: "Olivar Lucy",
                  role: "UI/UX Designer",
                },
                {
                  quote: "NESA's English speaking center provided me with a nurturing platform to improve my language skills. The supportive instructors and well-designed curriculum accelerated my progress.",
                  name: "Anita Sharma",
                  role: "Corporate Executive",
                },
                {
                  quote: "The IELTS training at NESA helped me achieve Band 8.5 on my first attempt! The mock interviews and writing feedback were outstanding.",
                  name: "Vikram Malhotra",
                  role: "IELTS Candidate",
                },
              ].map((t) => (
                <div key={t.name} className="card-nesa" style={{ padding: "30px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <p style={{ fontSize: "14px", color: "#334155", lineHeight: "1.7", fontStyle: "italic", marginBottom: "20px" }}>
                    "{t.quote}"
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", borderTop: "1px solid #f1f5f9", paddingTop: "16px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "#0E4D92", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "16px" }}>
                      {t.name[0]}
                    </div>
                    <div>
                      <div style={{ fontSize: "15px", fontWeight: "800", color: "#0f172a" }}>{t.name}</div>
                      <div style={{ fontSize: "12px", color: "#0E4D92", fontWeight: "600" }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 6. ENROLLMENT BANNER ─── */}
        <section style={{ padding: "80px 20px", background: "#0E4D92", color: "#ffffff", textAlign: "center" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(28px, 4.5vw, 44px)", fontWeight: "900", color: "#ffffff", marginBottom: "16px" }}>
              Ready to Speak English Fluently & Confidently?
            </h2>
            <p style={{ fontSize: "17px", color: "#e2e8f0", lineHeight: "1.7", marginBottom: "32px" }}>
              Enjoy the top notch learning methods and achieve next level skills! You are the creator of your own career & we will guide you through that.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/register" className="btn-primary" style={{ background: "#ffffff", color: "#0E4D92", fontSize: "16px", padding: "16px 36px", fontWeight: "800" }}>
                Register Free Now! 🚀
              </Link>
              <Link href="/contact" className="btn-secondary" style={{ borderColor: "#ffffff", color: "#ffffff", background: "transparent", fontSize: "16px", padding: "16px 32px" }}>
                Talk to Admissions 📞
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
