"use client";
import { useState, useEffect } from "react";
import { CourseItem, nesaCoursesList } from "@/components/layout/Navbar";

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<CourseItem[]>(nesaCoursesList);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const [form, setForm] = useState<CourseItem>({
    name: "",
    slug: "",
    badge: "POPULAR",
    price: "₹499",
    lessons: 0,
    students: 100,
    desc: "",
  });

  // Fetch courses from MongoDB
  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/courses");
      const data = await res.json();
      if (data && data.courses && Array.isArray(data.courses)) {
        setCourses(data.courses);
      }
    } catch (err) {
      console.error("Failed to load courses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleOpenAdd = () => {
    setForm({ name: "", slug: "", badge: "POPULAR", price: "₹499", lessons: 0, students: 100, desc: "" });
    setEditingSlug(null);
    setShowModal(true);
  };

  const handleOpenEdit = (course: CourseItem) => {
    setForm({
      name: course.name,
      slug: course.slug,
      badge: course.badge || "POPULAR",
      price: course.price || "₹499",
      lessons: course.lessons || 0,
      students: course.students || 0,
      desc: course.desc || "",
    });
    setEditingSlug(course.slug);
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingSlug) {
        // Edit course
        const res = await fetch("/api/courses", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            slug: editingSlug,
            name: form.name,
            badge: form.badge,
            price: form.price,
            lessons: form.lessons,
            students: form.students,
            desc: form.desc,
            newSlug: form.slug,
          }),
        });
        const data = await res.json();
        if (data.success) {
          showToast("Course/Item updated successfully in MongoDB! 💾");
          await fetchCourses();
          setShowModal(false);
        } else {
          showToast(data.error || "Failed to update item.", "error");
        }
      } else {
        // Create new course
        const res = await fetch("/api/courses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (data.success) {
          showToast("New Course/Item added successfully to MongoDB! 🎉");
          await fetchCourses();
          setShowModal(false);
        } else {
          showToast(data.error || "Failed to create item.", "error");
        }
      }
    } catch (err) {
      console.error(err);
      showToast("Network error while saving item.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm(`Are you sure you want to delete '${slug}' from database?`)) return;

    try {
      const res = await fetch(`/api/courses?slug=${encodeURIComponent(slug)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        showToast("Item deleted from MongoDB. 🗑️");
        setCourses(courses.filter((c) => c.slug !== slug));
      } else {
        showToast(data.error || "Failed to delete item.", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Network error while deleting item.", "error");
    }
  };

  const filtered = courses.filter(
    (c: CourseItem) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.badge && c.badge.toLowerCase().includes(search.toLowerCase())) ||
      c.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Toast Notification */}
      {notification && (
        <div
          style={{
            position: "fixed",
            top: "24px",
            right: "24px",
            background: notification.type === "success" ? "#16a34a" : "#dc2626",
            color: "#ffffff",
            padding: "14px 24px",
            borderRadius: "10px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            zIndex: 99999,
            fontWeight: "700",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {notification.message}
        </div>
      )}

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "28px",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <h1 style={{ fontSize: "28px", fontWeight: "900", color: "#0f172a" }}>
              Product & Course Catalog Management
            </h1>
            <span
              style={{
                background: "#dcfce7",
                color: "#166534",
                padding: "3px 10px",
                borderRadius: "12px",
                fontSize: "11px",
                fontWeight: "800",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              🍃 MongoDB Atlas Live
            </span>
          </div>
          <p style={{ fontSize: "14px", color: "#64748b", marginTop: "4px" }}>
            Add, update, or remove thermal paste & cooling product catalog offerings ({courses.length} total items)
          </p>
        </div>

        <button onClick={handleOpenAdd} className="btn-primary" style={{ padding: "12px 24px" }}>
          + Add New Item 📦
        </button>
      </div>

      {/* Search Bar & Refresh */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "12px", alignItems: "center" }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search items by title, badge, or slug..."
          style={{
            width: "100%",
            maxWidth: "400px",
            padding: "12px",
            border: "1px solid #cbd5e1",
            borderRadius: "8px",
            fontSize: "14px",
            outline: "none",
            background: "#ffffff",
          }}
        />
        <button
          onClick={fetchCourses}
          disabled={loading}
          className="btn-secondary"
          style={{ padding: "12px 16px", fontSize: "13px" }}
          title="Refresh items from database"
        >
          {loading ? "Refreshing..." : "🔄 Refresh"}
        </button>
      </div>

      {/* Table */}
      <div className="card-nesa" style={{ overflow: "hidden", padding: 0 }}>
        <div className="data-table-container">
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", minWidth: "700px" }}>
            <thead>
              <tr
                style={{
                  background: "#f8fafc",
                  borderBottom: "1px solid #e2e8f0",
                  fontSize: "12px",
                  color: "#64748b",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                <th style={{ padding: "14px 18px" }}>ITEM / COURSE TITLE</th>
                <th style={{ padding: "14px 18px" }}>BADGE</th>
                <th style={{ padding: "14px 18px" }}>PRICE</th>
                <th style={{ padding: "14px 18px" }}>WARRANTY</th>
                <th style={{ padding: "14px 18px" }}>UNITS DELIVERED</th>
                <th style={{ padding: "14px 18px" }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                    🔄 Loading items from MongoDB Atlas...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                    No items found matching your search.
                  </td>
                </tr>
              ) : (
                filtered.map((course: CourseItem) => (
                  <tr key={course.slug} style={{ borderBottom: "1px solid #f1f5f9", fontSize: "14px" }}>
                    <td style={{ padding: "16px 18px" }}>
                      <div style={{ fontWeight: "800", color: "#0f172a" }}>{course.name}</div>
                      <div style={{ fontSize: "12px", color: "#64748b" }}>/courses/{course.slug}</div>
                    </td>
                    <td style={{ padding: "16px 18px" }}>
                      <span
                        style={{
                          background: "#f0fcff",
                          color: "#0E4D92",
                          padding: "4px 10px",
                          borderRadius: "12px",
                          fontSize: "11px",
                          fontWeight: "800",
                          border: "1px solid #cceeff",
                        }}
                      >
                        {course.badge}
                      </span>
                    </td>
                    <td style={{ padding: "16px 18px", fontWeight: "900", color: "#0E4D92" }}>{course.price}</td>
                    <td style={{ padding: "16px 18px", color: "#475569" }}>3 Years Warranty</td>
                    <td style={{ padding: "16px 18px", color: "#475569" }}>{course.students} Units</td>
                    <td style={{ padding: "16px 18px" }}>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          onClick={() => handleOpenEdit(course)}
                          style={{
                            padding: "6px 12px",
                            background: "#f1f5f9",
                            color: "#0E4D92",
                            border: "1px solid #cbd5e1",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: "700",
                            cursor: "pointer",
                          }}
                        >
                          Edit ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(course.slug)}
                          style={{
                            padding: "6px 12px",
                            background: "#fee2e2",
                            color: "#b91c1c",
                            border: "1px solid #fecaca",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: "700",
                            cursor: "pointer",
                          }}
                        >
                          Delete 🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal with Solid White High-Contrast Styling */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(15, 23, 42, 0.75)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              maxWidth: "580px",
              width: "100%",
              background: "#ffffff",
              borderRadius: "16px",
              padding: "32px",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.45)",
              border: "1px solid #e2e8f0",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", borderBottom: "1px solid #f1f5f9", paddingBottom: "16px" }}>
              <div>
                <h2 style={{ fontSize: "20px", fontWeight: "900", color: "#0f172a" }}>
                  {editingSlug ? "Edit Product / Course Item" : "Add New Product / Course Item"}
                </h2>
                <p style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>
                  Save changes directly to MongoDB Atlas database
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: "#f1f5f9",
                  border: "none",
                  borderRadius: "8px",
                  width: "32px",
                  height: "32px",
                  fontSize: "16px",
                  cursor: "pointer",
                  color: "#64748b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div>
                <label style={{ fontSize: "13px", fontWeight: "700", color: "#1e293b", display: "block", marginBottom: "6px" }}>
                  Item / Course Title *
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Thermal Lexum X-128 Xtreme Gaming Liquid Metal"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "8px",
                    border: "1.5px solid #cbd5e1",
                    fontSize: "14px",
                    background: "#ffffff",
                    color: "#0f172a",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: "13px", fontWeight: "700", color: "#1e293b", display: "block", marginBottom: "6px" }}>
                  URL Slug (unique identifier)
                </label>
                <input
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="e.g. lx-tim-pro-4g"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "8px",
                    border: "1.5px solid #cbd5e1",
                    fontSize: "14px",
                    background: "#ffffff",
                    color: "#0f172a",
                    outline: "none",
                  }}
                />
              </div>

              <div className="responsive-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: "700", color: "#1e293b", display: "block", marginBottom: "6px" }}>
                    Badge Tag
                  </label>
                  <input
                    value={form.badge}
                    onChange={(e) => setForm({ ...form, badge: e.target.value })}
                    placeholder="BEST SELLER"
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: "8px",
                      border: "1.5px solid #cbd5e1",
                      fontSize: "14px",
                      background: "#ffffff",
                      color: "#0f172a",
                      outline: "none",
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: "700", color: "#1e293b", display: "block", marginBottom: "6px" }}>
                    Price *
                  </label>
                  <input
                    required
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    placeholder="₹499"
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: "8px",
                      border: "1.5px solid #cbd5e1",
                      fontSize: "14px",
                      background: "#ffffff",
                      color: "#0f172a",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: "13px", fontWeight: "700", color: "#1e293b", display: "block", marginBottom: "6px" }}>
                  Units Sold / Shipped
                </label>
                <input
                  type="number"
                  value={form.students}
                  onChange={(e) => setForm({ ...form, students: Number(e.target.value) || 0 })}
                  placeholder="1000"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "8px",
                    border: "1.5px solid #cbd5e1",
                    fontSize: "14px",
                    background: "#ffffff",
                    color: "#0f172a",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: "13px", fontWeight: "700", color: "#1e293b", display: "block", marginBottom: "6px" }}>
                  Description *
                </label>
                <textarea
                  rows={4}
                  required
                  value={form.desc}
                  onChange={(e) => setForm({ ...form, desc: e.target.value })}
                  placeholder="Product specifications, conductivity details, or highlights..."
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "8px",
                    border: "1.5px solid #cbd5e1",
                    fontSize: "14px",
                    background: "#ffffff",
                    color: "#0f172a",
                    outline: "none",
                    resize: "vertical",
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "16px", borderTop: "1px solid #f1f5f9", paddingTop: "16px" }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-secondary"
                  style={{ padding: "12px 24px", fontSize: "14px" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={saving}
                  style={{ padding: "12px 28px", fontSize: "14px" }}
                >
                  {saving ? "Saving to MongoDB..." : "Save to Database 💾"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
