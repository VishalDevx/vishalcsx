import { NextResponse } from "next/server";
import { readDataFile, writeDataFile, slugify, generateId } from "@/lib/data";

export async function GET() {
  const projects = readDataFile<unknown[]>("projects.json");
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const projects = readDataFile<unknown[]>("projects.json") as any[];
    const slug = body.slug || slugify(body.title);

    const newProject = {
      index: String(projects.length + 1).padStart(2, "0"),
      slug,
      ...body,
      featured: body.featured ?? true,
    };

    projects.push(newProject);
    writeDataFile("projects.json", projects);
    return NextResponse.json(newProject, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const projects = readDataFile<unknown[]>("projects.json") as any[];
    const index = projects.findIndex((p) => p.slug === body.slug);

    if (index === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    projects[index] = { ...projects[index], ...body };
    writeDataFile("projects.json", projects);
    return NextResponse.json(projects[index]);
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

  const projects = readDataFile<unknown[]>("projects.json") as any[];
  const filtered = projects.filter((p) => p.slug !== slug);

  if (filtered.length === projects.length) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  writeDataFile("projects.json", filtered);
  return NextResponse.json({ success: true });
}
