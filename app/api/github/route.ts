import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  const match = url.match(/github\.com\/([^/]+)\/([^/]+?)(?:\/|$)/);
  if (!match) {
    return NextResponse.json({ error: "Invalid GitHub URL" }, { status: 400 });
  }

  const [, owner, repo] = match;

  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: { "User-Agent": "portfolio-app" },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Repo not found" }, { status: 404 });
    }

    const data = await res.json();

    return NextResponse.json({
      title: data.name,
      description: data.description || "",
      githubUrl: data.html_url,
      liveUrl: data.homepage || "",
      stack: [data.language].filter(Boolean),
      stars: data.stargazers_count,
      forks: data.forks_count,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch repo" }, { status: 500 });
  }
}
