import { NextResponse } from "next/server";
import { readDataFile, writeDataFile, slugify, generateId } from "@/lib/data";

export async function GET() {
  const blogs = readDataFile<unknown[]>("blogs.json");
  return NextResponse.json(blogs);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const blogs = readDataFile<unknown[]>("blogs.json") as any[];
    const slug = body.slug || slugify(body.title);
    const id = generateId();

    const newBlog = {
      id,
      slug,
      ...body,
      published: body.published ?? false,
      date: body.date || new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
    };

    blogs.unshift(newBlog);
    writeDataFile("blogs.json", blogs);
    return NextResponse.json(newBlog, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const blogs = readDataFile<unknown[]>("blogs.json") as any[];
    const index = blogs.findIndex((b) => b.slug === body.slug || b.id === body.id);

    if (index === -1) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    blogs[index] = { ...blogs[index], ...body };
    writeDataFile("blogs.json", blogs);
    return NextResponse.json(blogs[index]);
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  const blogs = readDataFile<unknown[]>("blogs.json") as any[];
  const filtered = blogs.filter((b) => b.slug !== slug);

  if (filtered.length === blogs.length) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }

  writeDataFile("blogs.json", filtered);
  return NextResponse.json({ success: true });
}
