import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";
import {
  GITHUB_PROFILE_URL,
  GITHUB_USERNAME,
  decodeReadmeContent,
  type Contribution,
  type GitHubData,
  type GitHubRepo,
} from "@/lib/github";

// Render at request time so builds never call GitHub, then cache the data for
// 24h below. One cache entry serves every visitor, regardless of how many there
// are (the GitHub API is rate-limited per IP, so this keeps us far under it).
export const dynamic = "force-dynamic";

const REVALIDATE_SECONDS = 60 * 60 * 24;

async function fetchGitHubData(): Promise<GitHubData> {
  const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
