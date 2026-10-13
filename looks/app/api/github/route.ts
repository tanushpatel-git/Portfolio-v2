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

  const [profileResponse, reposResponse, readmeResponse, contributionData] = await Promise.all([
    fetch(GITHUB_PROFILE_URL, { headers }),
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`, { headers }),
    fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_USERNAME}/readme`, {
      headers: { ...headers, Accept: "application/vnd.github.html+json" },
    }),
    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`)
      .then((response) => (response.ok ? response.json() : null))
      .catch(() => null),
  ]);

  if (!profileResponse.ok) {
    throw new Error(
      profileResponse.status === 404
        ? "GitHub profile not found."
        : "Could not load the GitHub profile right now.",
    );
  }

  const [user, repos] = await Promise.all([
    profileResponse.json(),
    reposResponse.ok ? reposResponse.json() : [],
  ]);

  const repositories = (repos as GitHubRepo[]).filter((repo) => !repo.fork).slice(0, 6);

  let contributions: Contribution[] = [];
  let contributionTotal: number | null = null;
  if (contributionData?.contributions) {
    contributions = contributionData.contributions as Contribution[];
    const total = contributionData.total as Record<string, number> | undefined;
    contributionTotal = total ? Object.values(total).reduce((sum, value) => sum + value, 0) : null;
  }

  let readme = "";
  if (readmeResponse.ok) {
    const payload = await readmeResponse.text();
    if (payload.trimStart().startsWith("{")) {
      const data = JSON.parse(payload) as { content?: string; encoding?: string };
      if (data.content && data.encoding === "base64") readme = decodeReadmeContent(data.content);
      else if (data.content) readme = data.content;
    } else {
      readme = payload;
    }
  }

  return { profile: user, repositories, contributions, contributionTotal, readme };
}

const getGitHubData = unstable_cache(fetchGitHubData, ["github-about"], {
  revalidate: REVALIDATE_SECONDS,
  tags: ["github-about"],
});

export async function GET() {
  try {
    const data = await getGitHubData();
    return NextResponse.json(data);
  } catch (cause) {
    const message = cause instanceof Error ? cause.message : "Could not load GitHub data.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
