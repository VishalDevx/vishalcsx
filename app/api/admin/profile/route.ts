import { NextResponse } from "next/server";
import { readDataFile, writeDataFile } from "@/lib/data";

export async function GET() {
  const profile = readDataFile("profile.json");
  return NextResponse.json(profile);
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const profile = readDataFile<Record<string, unknown>>("profile.json");
    const updated = { ...profile, ...body };
    writeDataFile("profile.json", updated);
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
