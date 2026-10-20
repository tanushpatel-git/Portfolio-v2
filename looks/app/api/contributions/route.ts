import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";
import { GITHUB_USERNAME } from "@/lib/github";

// Token-free GitHub contribution calendar via the public jogruber API. Served at
// request time so builds never hit the network, then cached for 24h so every
// visitor shares a single upstream request per day.
export const dynamic = "force-dynamic";

const REVALIDATE_SECONDS = 60 * 60 * 24;

type JogruberDay = { date: string; count: number; level?: number };
type GraphDay = { date: string; contributionCount: number };

async function fetchContributions() {
  const response = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
  );
  if (!response.ok) throw new Error("Could not load contribution activity.");

  const data = (await response.json()) as { contributions?: JogruberDay[] };
  const contributions: GraphDay[] = (data.contributions ?? []).map((day) => ({
    date: day.date,
    contributionCount: day.count,
  }));

  return { contributions };
}

const getContributions = unstable_cache(fetchContributions, ["github-contributions"], {
  revalidate: REVALIDATE_SECONDS,
  tags: ["github-contributions"],
});

export async function GET() {
  try {
    const data = await getContributions();
    return NextResponse.json(data);
  } catch (cause) {
    const message = cause instanceof Error ? cause.message : "Could not load contribution activity.";
    return NextResponse.json({ error: message, contributions: [] }, { status: 502 });
  }
}
