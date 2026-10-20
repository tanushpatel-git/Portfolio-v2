import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";
import { GITHUB_USERNAME } from "@/lib/github";

// Token-free list of the organizations this account belongs to, via the public
// REST API. Cached for 24h so all visitors share one upstream request per day.
export const dynamic = "force-dynamic";

const REVALIDATE_SECONDS = 60 * 60 * 24;

type GitHubOrg = {
  login: string;
  description: string | null;
  avatar_url: string;
  html_url: string;
};

async function fetchOrganizations() {
  const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/orgs?per_page=100`,
    { headers },
  );
  if (!response.ok) throw new Error("Could not load organizations.");

  const orgs = (await response.json()) as GitHubOrg[];
  return {
    organizations: orgs.map((org) => ({
      login: org.login,
      description: org.description,
      avatarUrl: org.avatar_url,
      url: org.html_url,
    })),
  };
}

const getOrganizations = unstable_cache(fetchOrganizations, ["github-orgs"], {
  revalidate: REVALIDATE_SECONDS,
  tags: ["github-orgs"],
});

export async function GET() {
  try {
    const data = await getOrganizations();
    return NextResponse.json(data);
  } catch (cause) {
    const message = cause instanceof Error ? cause.message : "Could not load organizations.";
    return NextResponse.json({ error: message, organizations: [] }, { status: 502 });
  }
}
