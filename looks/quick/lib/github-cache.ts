import fs from "node:fs";
import path from "node:path";

/**
 * Server-side TTL cache for GitHub GraphQL responses.
 *
 * GitHub's GraphQL API is POST-only, so Next.js' built-in fetch cache does not
 * apply. This module caches responses in memory (per server process) and in a
 * JSON file under .next/cache (survives dev-server restarts and is shared
 * across route-handler invocations on the same instance), so the GitHub API is
 * hit at most once per unique query per TTL window.
 */

const TTL_MS = 60 * 60 * 1000; // 1 hour
const MAX_ENTRIES = 100;
const CACHE_DIR = path.join(process.cwd(), ".next", "cache");
const CACHE_FILE = path.join(CACHE_DIR, "github-proxy-cache.json");

type Entry = { data: unknown; expires: number };

const globalForCache = globalThis as unknown as { __githubProxyCache?: Map<string, Entry> };
const memory = globalForCache.__githubProxyCache ?? new Map<string, Entry>();
globalForCache.__githubProxyCache = memory;

let fileLoaded = false;

function loadFileCache(): void {
  if (fileLoaded) return;
  fileLoaded = true;
  try {
    const raw = fs.readFileSync(CACHE_FILE, "utf8");
    const parsed = JSON.parse(raw) as Record<string, Entry>;
    const now = Date.now();
    for (const [key, entry] of Object.entries(parsed)) {
      if (entry && typeof entry.expires === "number" && entry.expires > now) {
        memory.set(key, entry);
      }
    }
  } catch {
    // No cache file yet or unreadable — start fresh.
  }
}

function persistFileCache(): void {
  try {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
    const now = Date.now();
    const obj: Record<string, Entry> = {};
    for (const [key, entry] of memory) {
      if (entry.expires > now) obj[key] = entry;
    }
    const tmp = `${CACHE_FILE}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(obj));
    fs.renameSync(tmp, CACHE_FILE);
  } catch {
    // File persistence is best-effort (e.g. read-only filesystem).
  }
}

function prune(): void {
  const now = Date.now();
  for (const [key, entry] of memory) {
    if (entry.expires <= now) memory.delete(key);
  }
  while (memory.size > MAX_ENTRIES) {
    const oldest = memory.keys().next().value;
    if (oldest === undefined) break;
    memory.delete(oldest);
  }
}

export async function githubGraphQL(
  query: string
): Promise<{ data: unknown; cache: "HIT" | "MISS" }> {
  loadFileCache();

  const key = query.trim();
  const now = Date.now();
  const hit = memory.get(key);
  if (hit && hit.expires > now) {
    return { data: hit.data, cache: "HIT" };
  }

  const token = process.env.GITHUB_TOKEN || "";
  if (!token) {
    throw new Error("Missing GITHUB_TOKEN credential");
  }

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();

  // Only cache successful payloads — never cache auth errors or API failures.
  const payload = data as { data?: unknown; errors?: unknown[]; message?: string };
  const ok =
    response.ok && payload.data !== undefined && !payload.errors && !payload.message;
  if (ok) {
    prune();
    memory.set(key, { data, expires: now + TTL_MS });
    persistFileCache();
  }

  return { data, cache: "MISS" };
}
