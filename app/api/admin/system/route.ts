import { NextResponse } from "next/server";
import { readDataFile, writeDataFile } from "@/lib/data";

export async function GET() {
  const data = readDataFile("system.json");
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    writeDataFile("system.json", body);
    return NextResponse.json(body);
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
