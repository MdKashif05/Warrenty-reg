"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function TestimonialsPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#ffffff", paddingTop: "100px", minHeight: "100vh" }}>
        <div style={{ background: "linear-gradient(135deg, #0E4D92 0%, #1a5ca4 100%)", color: "#ffffff", padding: "60px 20px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <span style={{ fontSize: "12px", letterSpacing: "2px", fontWeight: "800", color: "#ffd166", textTransform: "uppercase" }}>STUDENT FEEDBACK</span>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 54px)", fontWeight: "900", color: "#ffffff", marginTop: "8px", marginBottom: "16px" }}>
              Our Remarkable Achievements & Testimonials
            </h1>
            <p style={{ fontSize: "17px", color: "#e2e8f0", maxWidth: "700px", lineHeight: "1.6" }}>
              Experience excellence in English language education at NESA. Read stories of transformation from our students.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "80px 20px" }}>
          <div className="responsive-grid-3">
            {[
              { quote: "NESA has been a game-changer for me. Their immersive English programs and experienced instructors helped me gain confidence in speaking English fluently. I highly recommend NESA to anyone looking to enhance their language skills!", name: "David Warner", role: "QA Developer" },
              { quote: "I'm grateful to NESA for their personalized approach to language learning. Their tailored programs and supportive faculty created a conducive environment for me to improve my English proficiency.", name: "Sarah Taylor", role: "PHP Developer" },
              { quote: "NESA's English speaking center transformed my language skills. The interactive classes, real-life scenarios, and constant practice made learning enjoyable. The faculty's dedication truly made a difference.", name: "Rohit Patel", role: "Business Person" },
              { quote: "Choosing NESA was the best decision I made for my English fluency. The dynamic learning environment, interactive sessions, and engaging activities made the entire experience enriching.", name: "Olivar Lucy", role: "UI/UX Designer" },
              { quote: "NESA's English speaking center provided me with a nurturing platform to improve my language skills. The supportive instructors and well-designed curriculum accelerated my progress.", name: "Anita Sharma", role: "Corporate Executive" },
              { quote: "The IELTS training at NESA helped me achieve Band 8.5 on my first attempt! The mock interviews and writing feedback were outstanding.", name: "Vikram Malhotra", role: "IELTS Candidate" },
            ].map((t) => (
              <div key={t.name} className="card-nesa" style={{ padding: "30px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <p style={{ fontSize: "15px", color: "#334155", lineHeight: "1.7", fontStyle: "italic", marginBottom: "24px" }}>
                  "{t.quote}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "14px", borderTop: "1px solid #f1f5f9", paddingTop: "16px" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#0E4D92", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "900", fontSize: "18px" }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <div style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a" }}>{t.name}</div>
                    <div style={{ fontSize: "13px", color: "#0E4D92", fontWeight: "700" }}>{t.role}</div>
                  </div>
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
