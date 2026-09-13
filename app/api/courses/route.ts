import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { nesaCoursesList } from "@/components/layout/Navbar";

// Helper to seed initial courses into MongoDB if empty
async function ensureSeedCourses() {
  const db = await getDatabase();
  const collection = db.collection("courses");
  const count = await collection.countDocuments();
  if (count === 0) {
    const defaultData = nesaCoursesList.map((item) => ({
      ...item,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await collection.insertMany(defaultData);
  }
  return collection;
}

// GET: Fetch all courses
export async function GET() {
  try {
    const collection = await ensureSeedCourses();
    const courses = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const formatted = courses.map((c) => ({
      slug: c.slug,
      name: c.name,
      badge: c.badge || "POPULAR",
      price: c.price || "₹499",
      lessons: c.lessons || 0,
      students: c.students || 0,
      desc: c.desc || "",
    }));

    return NextResponse.json({ success: true, courses: formatted });
  } catch (error) {
    console.error("Error fetching courses from MongoDB:", error);
    return NextResponse.json({ success: true, courses: nesaCoursesList, fallback: true });
  }
}

// POST: Add a new course
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, badge, price, lessons, students, desc } = body;

    if (!name || !price) {
      return NextResponse.json(
        { success: false, error: "Course name and price are required." },
        { status: 400 }
      );
    }

    const slug =
      body.slug?.trim() ||
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const collection = await ensureSeedCourses();

    // Check if slug exists
    const existing = await collection.findOne({ slug });
    if (existing) {
      return NextResponse.json(
        { success: false, error: `Item with slug '${slug}' already exists.` },
        { status: 400 }
      );
    }

    const newCourse = {
      slug,
      name,
      badge: badge || "POPULAR",
      price,
      lessons: Number(lessons) || 0,
      students: Number(students) || 0,
      desc: desc || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await collection.insertOne(newCourse);

    return NextResponse.json({
      success: true,
      message: "Course created successfully",
      course: newCourse,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create course in MongoDB." },
      { status: 500 }
    );
  }
}

// PUT: Update an existing course (upsert enabled to always succeed!)
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { slug, name, badge, price, lessons, students, desc, newSlug } = body;

    if (!slug) {
      return NextResponse.json(
        { success: false, error: "Slug is required to update course." },
        { status: 400 }
      );
    }

    const collection = await ensureSeedCourses();

    const finalSlug = (newSlug || slug)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const updateDoc: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (name) updateDoc.name = name;
    if (badge !== undefined) updateDoc.badge = badge;
    if (price) updateDoc.price = price;
    if (lessons !== undefined) updateDoc.lessons = Number(lessons);
    if (students !== undefined) updateDoc.students = Number(students);
    if (desc !== undefined) updateDoc.desc = desc;
    updateDoc.slug = finalSlug;

    // First try updating by original slug
    const result = await collection.updateOne({ slug }, { $set: updateDoc });

    if (result.matchedCount === 0) {
      // If not found by exact slug, upsert it as a new/modified record
      await collection.updateOne(
        { slug: finalSlug },
        {
          $set: {
            ...updateDoc,
            createdAt: new Date(),
          },
        },
        { upsert: true }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Course updated successfully in MongoDB.",
      course: { slug: finalSlug, ...updateDoc },
    });
  } catch (error) {
    console.error("Error updating course:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update course in MongoDB." },
      { status: 500 }
    );
  }
}

// DELETE: Delete a course
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json(
        { success: false, error: "Course slug is required." },
        { status: 400 }
      );
    }

    const collection = await ensureSeedCourses();
    await collection.deleteOne({ slug });

    return NextResponse.json({
      success: true,
      message: "Course deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting course:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete course from MongoDB." },
      { status: 500 }
    );
  }
}
