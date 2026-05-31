import { NextResponse } from "next/server";
import { readDataFile } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get("file");

  if (!file) {
    return NextResponse.json({ error: "Missing file parameter" }, { status: 400 });
  }

  try {
    const data: any = readDataFile(`${file}.json`);
    if (file === "site" && process.env.WHATSAPP_NUMBER) {
      data.whatsappNumber = process.env.WHATSAPP_NUMBER;
    }
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
