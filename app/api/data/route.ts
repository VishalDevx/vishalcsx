import { NextResponse } from "next/server";
import { readDataFile } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get("file");

  if (!file) {
    return NextResponse.json({ error: "Missing file parameter" }, { status: 400 });
  }

  try {
    const data = readDataFile(`${file}.json`);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
