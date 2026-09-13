import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

// GET: Fetch all courses
export async function GET() {
  try {
    const db = await getDatabase();
    const collection = db.collection("courses");
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
  } catch (error: unknown) {
    console.error("Error fetching courses from MongoDB:", error);
    return NextResponse.json({ success: true, courses: [], fallback: true });
  }
}

// POST: Add a new course
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, badge, price, lessons, students, desc } = body;

    if (!name || !price) {
      return NextResponse.json(
        { success: false, error: "Item name and price are required." },
        { status: 400 }
      );
    }

    const rawSlug = body.slug?.trim() || name;
    const slug = rawSlug
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || `item-${Date.now()}`;

    const db = await getDatabase();
    const collection = db.collection("courses");

    const existing = await collection.findOne({ slug });
    if (existing) {
      return NextResponse.json(
        { success: false, error: `Item with slug '${slug}' already exists. Please choose a different title or slug.` },
        { status: 400 }
      );
    }

    const newCourse = {
      slug,
      name: name.trim(),
      badge: (badge || "POPULAR").trim(),
      price: price.trim(),
      lessons: Number(lessons) || 0,
      students: Number(students) || 0,
      desc: (desc || "").trim(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await collection.insertOne(newCourse);

    return NextResponse.json({
      success: true,
      message: "Item created successfully in MongoDB Atlas! 🎉",
      course: newCourse,
    });
  } catch (error: unknown) {
    console.error("Error creating course in MongoDB:", error);
    const msg = error instanceof Error ? error.message : "Failed to create item in MongoDB.";
    return NextResponse.json(
      { success: false, error: `Database Error: ${msg}` },
      { status: 500 }
    );
  }
}

// PUT: Update an existing course
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { slug, name, badge, price, lessons, students, desc, newSlug } = body;

    if (!slug) {
      return NextResponse.json(
        { success: false, error: "Slug is required to update item." },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const collection = db.collection("courses");

    const rawFinalSlug = newSlug || slug;
    const finalSlug = rawFinalSlug
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || slug;

    const updateDoc: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (name) updateDoc.name = name.trim();
    if (badge !== undefined) updateDoc.badge = badge.trim();
    if (price) updateDoc.price = price.trim();
    if (lessons !== undefined) updateDoc.lessons = Number(lessons);
    if (students !== undefined) updateDoc.students = Number(students);
    if (desc !== undefined) updateDoc.desc = desc.trim();
    updateDoc.slug = finalSlug;

    const result = await collection.updateOne({ slug }, { $set: updateDoc });

    if (result.matchedCount === 0) {
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
      message: "Item updated successfully in MongoDB Atlas! 💾",
      course: { slug: finalSlug, ...updateDoc },
    });
  } catch (error: unknown) {
    console.error("Error updating course:", error);
    const msg = error instanceof Error ? error.message : "Failed to update item in MongoDB.";
    return NextResponse.json(
      { success: false, error: `Database Error: ${msg}` },
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

    const db = await getDatabase();
    const collection = db.collection("courses");
    await collection.deleteOne({ slug });

    return NextResponse.json({
      success: true,
      message: "Item deleted successfully from MongoDB! 🗑️",
    });
  } catch (error: unknown) {
    console.error("Error deleting course:", error);
    const msg = error instanceof Error ? error.message : "Failed to delete item from MongoDB.";
    return NextResponse.json(
      { success: false, error: `Database Error: ${msg}` },
      { status: 500 }
    );
  }
}
