import { NextResponse } from "next/server";
import { readDataFile, writeDataFile, slugify } from "@/lib/data";

export async function GET() {
  const skills = readDataFile<unknown[]>("skills.json");
  return NextResponse.json(skills);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const skills = readDataFile<unknown[]>("skills.json") as any[];
    const slug = body.slug || slugify(body.title);

    const newSkill = {
      index: String(skills.length + 1).padStart(2, "0"),
      slug,
      ...body,
      stack: body.stack || [],
      tools: body.tools || [],
      points: body.points || [],
    };

    skills.push(newSkill);
    writeDataFile("skills.json", skills);
    return NextResponse.json(newSkill, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const skills = readDataFile<unknown[]>("skills.json") as any[];
    const index = skills.findIndex((s) => s.slug === body.slug);

    if (index === -1) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    skills[index] = { ...skills[index], ...body };
    writeDataFile("skills.json", skills);
    return NextResponse.json(skills[index]);
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

  const skills = readDataFile<unknown[]>("skills.json") as any[];
  const filtered = skills.filter((s) => s.slug !== slug);

  if (filtered.length === skills.length) {
    return NextResponse.json({ error: "Skill not found" }, { status: 404 });
  }

  writeDataFile("skills.json", filtered);
  return NextResponse.json({ success: true });
}
