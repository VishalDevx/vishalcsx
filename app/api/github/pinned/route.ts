import { NextResponse } from "next/server";

export const runtime = "nodejs";

type PinnedRepo = {
  name: string;
  nameWithOwner: string;
  url: string;
  description: string | null;
  homepageUrl: string | null;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: { name: string; color: string | null } | null;
  updatedAt: string;
};

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME ?? "VishalDevx";

  if (!token) {
    return NextResponse.json(
      {
        error:
          "Missing GITHUB_TOKEN. Add it to your environment to fetch pinned repos via GitHub GraphQL.",
      },
      { status: 501 }
    );
  }

  const query = `
    query Pinned($login: String!) {
      user(login: $login) {
        pinnedItems(first: 6, types: [REPOSITORY]) {
          nodes {
            ... on Repository {
              name
              nameWithOwner
              url
              description
              homepageUrl
              stargazerCount
              forkCount
              updatedAt
              primaryLanguage { name color }
            }
          }
        }
      }
    }
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query, variables: { login: username } }),
    cache: "no-store",
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: `GitHub GraphQL error (${res.status})` },
      { status: 502 }
    );
  }

  const json = (await res.json()) as {
    data?: { user?: { pinnedItems?: { nodes?: Array<PinnedRepo | null> } } };
    errors?: Array<{ message: string }>;
  };

  if (json.errors?.length) {
    return NextResponse.json(
      { error: json.errors.map((e) => e.message).join("; ") },
      { status: 502 }
    );
  }

  const nodes = json.data?.user?.pinnedItems?.nodes ?? [];
  const repos = nodes.filter(Boolean) as PinnedRepo[];

  return NextResponse.json({ username, repos });
}

