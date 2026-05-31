import { NextResponse } from "next/server";
import { writeDataFile } from "@/lib/data";

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    writeDataFile("site.json", body);
    return NextResponse.json(body);
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
