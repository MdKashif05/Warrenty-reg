"use client";
import { useState } from "react";
import { nesaCoursesList } from "@/components/layout/Navbar";

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState(nesaCoursesList);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    badge: "POPULAR",
    price: "₹4,999",
    lessons: 12,
    students: 100,
    desc: "",
  });

  const handleOpenAdd = () => {
    setForm({ name: "", slug: "", badge: "POPULAR", price: "₹4,999", lessons: 12, students: 100, desc: "" });
    setEditingSlug(null);
    setShowModal(true);
  };

  const handleOpenEdit = (course: typeof nesaCoursesList[0]) => {
    setForm({
      name: course.name,
      slug: course.slug,
      badge: course.badge,
      price: course.price,
      lessons: course.lessons,
      students: course.students,
      desc: course.desc,
    });
    setEditingSlug(course.slug);
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newSlug = form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    if (editingSlug) {
      setCourses(courses.map((c) => (c.slug === editingSlug ? { ...form, slug: newSlug } : c)));
    } else {
      setCourses([{ ...form, slug: newSlug }, ...courses]);
    }
    setShowModal(false);
  };

  const handleDelete = (slug: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter((c) => c.slug !== slug));
    }
  };

  const filtered = courses.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.badge.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "28px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: "900", color: "#0f172a" }}>
            NESA Course Management
          </h1>
          <p style={{ fontSize: "14px", color: "#64748b" }}>
            Add, update, or remove spoken English and IELTS course offerings ({courses.length} total courses)
          </p>
        </div>

        <button onClick={handleOpenAdd} className="btn-primary" style={{ padding: "12px 24px" }}>
          + Add New Course 📚
        </button>
      </div>

      {/* Search */}
      <div style={{ marginBottom: "20px" }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search course by title or badge..."
          style={{ width: "100%", maxWidth: "400px", padding: "12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", outline: "none" }}
        />
      </div>

      {/* Courses Table */}
      <div className="card-nesa" style={{ overflow: "hidden", padding: 0 }}>
        <div className="data-table-container">
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", minWidth: "700px" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", fontSize: "12px", color: "#64748b", textTransform: "uppercase", letterSpacing: "1px" }}>
                <th style={{ padding: "14px 18px" }}>COURSE TITLE</th>
                <th style={{ padding: "14px 18px" }}>BADGE</th>
                <th style={{ padding: "14px 18px" }}>FEE</th>
                <th style={{ padding: "14px 18px" }}>LESSONS</th>
                <th style={{ padding: "14px 18px" }}>STUDENTS</th>
                <th style={{ padding: "14px 18px" }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((course) => (
                <tr key={course.slug} style={{ borderBottom: "1px solid #f1f5f9", fontSize: "14px" }}>
                  <td style={{ padding: "16px 18px" }}>
                    <div style={{ fontWeight: "800", color: "#0f172a" }}>{course.name}</div>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>/courses/{course.slug}</div>
                  </td>
                  <td style={{ padding: "16px 18px" }}>
                    <span style={{ background: "#f0fcff", color: "#0E4D92", padding: "4px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: "800", border: "1px solid #cceeff" }}>
                      {course.badge}
                    </span>
                  </td>
                  <td style={{ padding: "16px 18px", fontWeight: "900", color: "#0E4D92" }}>{course.price}</td>
                  <td style={{ padding: "16px 18px", color: "#475569" }}>{course.lessons} Lessons</td>
                  <td style={{ padding: "16px 18px", color: "#475569" }}>{course.students} Learners</td>
                  <td style={{ padding: "16px 18px" }}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button onClick={() => handleOpenEdit(course)} style={{ padding: "6px 12px", background: "#f1f5f9", color: "#0E4D92", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px", fontWeight: "700", cursor: "pointer" }}>
                        Edit ✏️
                      </button>
                      <button onClick={() => handleDelete(course.slug)} style={{ padding: "6px 12px", background: "#fee2e2", color: "#b91c1c", border: "1px solid #fecaca", borderRadius: "6px", fontSize: "12px", fontWeight: "700", cursor: "pointer" }}>
                        Delete 🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <div className="card-nesa" style={{ maxWidth: "560px", width: "100%", padding: "32px", maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: "900", color: "#0f172a" }}>
                {editingSlug ? "Edit Course" : "Add New Course"}
              </h2>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#64748b" }}>✕</button>
            </div>

            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: "700", color: "#475569", display: "block", marginBottom: "4px" }}>Course Title *</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. NESA Fluent English Level 1" style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }} />
              </div>

              <div className="responsive-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: "700", color: "#475569", display: "block", marginBottom: "4px" }}>Badge Tag</label>
                  <input value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} placeholder="POPULAR / PRO" style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }} />
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: "700", color: "#475569", display: "block", marginBottom: "4px" }}>Course Fee *</label>
                  <input required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="₹4,999" style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }} />
                </div>
              </div>

              <div className="responsive-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: "700", color: "#475569", display: "block", marginBottom: "4px" }}>Lessons Count</label>
                  <input type="number" value={form.lessons} onChange={(e) => setForm({ ...form, lessons: Number(e.target.value) })} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }} />
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: "700", color: "#475569", display: "block", marginBottom: "4px" }}>Enrolled Students</label>
                  <input type="number" value={form.students} onChange={(e) => setForm({ ...form, students: Number(e.target.value) })} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: "700", color: "#475569", display: "block", marginBottom: "4px" }}>Description *</label>
                <textarea rows={3} required value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} placeholder="Short overview of course learning outcomes..." style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }} />
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "12px" }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary" style={{ padding: "10px 20px" }}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ padding: "10px 24px" }}>Save Course 💾</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
