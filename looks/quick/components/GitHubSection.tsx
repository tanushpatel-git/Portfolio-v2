"use client";

import { memo, useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  GITHUB_USERNAME as USERNAME,
  type GitHubApiResponse,
  type GitHubData,
  type GitHubRepo,
  type GitHubUser,
} from "@quick/lib/github";

// Cache the GitHub payload in the browser for a day as a second layer on top of
// the server-side 24h cache, so repeat visits render instantly.
const CACHE_KEY = "about:github:v2";
const CACHE_TTL = 24 * 60 * 60 * 1000;

type GitHubCache = GitHubData & { timestamp: number };

function InlineMarkdown({ text }: { text: string }) {
  const pattern = /(!\[([^\]]*)\]\((https?:\/\/[^\s)]+)(?:\s+"[^"]*")?\)|\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`)/g;
  const nodes: ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text))) {
    if (match.index > cursor) nodes.push(text.slice(cursor, match.index));
    if (match[1] && match[2] !== undefined && match[3]) {
      nodes.push(<Image key={match.index} src={match[3]} alt={match[2]} width={320} height={80} unoptimized className="my-3 inline-block h-auto max-h-20 w-auto max-w-full object-contain align-middle" />);
    } else if (match[4] && match[5]) {
      nodes.push(<a key={match.index} href={match[5]} target="_blank" rel="noreferrer" className="font-medium text-zinc-700 underline decoration-zinc-400/40 underline-offset-2 hover:decoration-zinc-600 dark:text-zinc-200">{match[4]}</a>);
    } else if (match[6]) {
      nodes.push(<strong key={match.index} className="font-semibold">{match[6]}</strong>);
    } else if (match[7]) {
      nodes.push(<code key={match.index} className="rounded bg-black/5 px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-white/10">{match[7]}</code>);
    }
    cursor = pattern.lastIndex;
  }
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return <>{nodes}</>;
}

function Readme({ markdown }: { markdown: string }) {
  const containsRenderedHtml = /<(?:h[1-6]|p|div|ul|ol|table|blockquote|pre|details)\b/i.test(markdown);
  if (containsRenderedHtml && typeof window !== "undefined") {
    const safeHtml = sanitizeGitHubHtml(markdown);
    return (
      <div
        className="github-readme break-words text-[14px] leading-7 text-zinc-600 dark:text-zinc-300 [&_a]:text-zinc-800 [&_a]:underline [&_a]:underline-offset-2 dark:[&_a]:text-zinc-100 [&_blockquote]:my-4 [&_blockquote]:border-l-2 [&_blockquote]:border-zinc-300 [&_blockquote]:pl-4 dark:[&_blockquote]:border-zinc-700 [&_code]:rounded [&_code]:bg-black/5 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.9em] dark:[&_code]:bg-white/10 [&_h1]:mb-3 [&_h1]:mt-6 [&_h1]:border-b [&_h1]:border-black/10 [&_h1]:pb-2 [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:mb-2 [&_h2]:mt-6 [&_h2]:border-b [&_h2]:border-black/10 [&_h2]:pb-2 [&_h2]:text-xl [&_h2]:font-bold [&_h3]:mb-2 [&_h3]:mt-5 [&_h3]:text-lg [&_h3]:font-semibold [&_img]:my-3 [&_img]:inline-block [&_img]:max-h-24 [&_img]:max-w-full [&_img]:object-contain [&_li]:my-1 [&_li]:marker:text-zinc-400 [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-6 [&_p]:my-3 [&_pre]:my-3 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-zinc-100 [&_pre]:p-4 [&_pre]:text-sm dark:[&_pre]:bg-zinc-900 [&_table]:my-4 [&_table]:block [&_table]:max-w-full [&_table]:overflow-x-auto [&_table]:border-collapse [&_td]:border [&_td]:border-black/10 [&_td]:px-3 [&_td]:py-2 dark:[&_td]:border-white/10 [&_th]:border [&_th]:border-black/10 [&_th]:px-3 [&_th]:py-2 dark:[&_th]:border-white/10 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6"
        dangerouslySetInnerHTML={{ __html: safeHtml }}
      />
    );
  }

  const lines = markdown.split(/\r?\n/);
  const blocks: ReactNode[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    blocks.push(<p key={`p-${blocks.length}`} className="my-3 leading-7 text-zinc-600 dark:text-zinc-300">{paragraph.map((line, i) => <span key={i}>{i > 0 && " "}<InlineMarkdown text={line} /></span>)}</p>);
    paragraph = [];
  };
  const flushList = () => {
    if (!list.length) return;
    blocks.push(<ul key={`ul-${blocks.length}`} className="my-3 list-disc space-y-1 pl-6 text-zinc-600 dark:text-zinc-300">{list.map((item, i) => <li key={i}><InlineMarkdown text={item} /></li>)}</ul>);
    list = [];
  };

  lines.forEach((line, index) => {
    const heading = line.match(/^#{1,3}\s+(.+)$/);
    const item = line.match(/^\s*[-*+]\s+(.+)$/);
    if (heading) {
      flushParagraph(); flushList();
      const level = line.match(/^#+/)?.[0].length ?? 2;
      const Heading = level === 1 ? "h2" : level === 2 ? "h3" : "h4";
      blocks.push(<Heading key={`h-${index}`} className="mb-2 mt-6 border-b border-black/10 pb-2 text-lg font-bold tracking-tight text-zinc-800 first:mt-0 dark:border-white/10 dark:text-zinc-100"><InlineMarkdown text={heading[1]} /></Heading>);
    } else if (item) {
      flushParagraph(); list.push(item[1]);
    } else if (!line.trim()) {
      flushParagraph(); flushList();
    } else if (line.startsWith("> ")) {
      flushParagraph(); flushList();
      blocks.push(<blockquote key={`q-${index}`} className="my-3 border-l-2 border-zinc-300 pl-4 text-zinc-500 dark:border-zinc-700 dark:text-zinc-400"><InlineMarkdown text={line.slice(2)} /></blockquote>);
    } else if (/^https?:\/\//.test(line.trim())) {
      flushParagraph(); flushList();
      blocks.push(<p key={`url-${index}`} className="my-2 break-all"><a href={line.trim()} target="_blank" rel="noreferrer" className="text-zinc-700 underline underline-offset-2 dark:text-zinc-200">{line.trim()}</a></p>);
    } else {
      paragraph.push(line.trim());
    }
  });
  flushParagraph(); flushList();
  return <div>{blocks.length ? blocks : <p className="text-zinc-500 dark:text-zinc-400">The GitHub profile does not have a README yet.</p>}</div>;
}

function sanitizeGitHubHtml(html: string) {
  const document = new DOMParser().parseFromString(html, "text/html");
  const allowedTags = new Set([
    "A", "B", "BLOCKQUOTE", "BR", "CODE", "DEL", "DETAILS", "DIV", "EM", "H1", "H2", "H3", "H4", "H5", "H6", "HR", "IMG", "KBD", "LI", "OL", "P", "PRE", "S", "SAMP", "SECTION", "STRONG", "SUMMARY", "TABLE", "TBODY", "TD", "TH", "THEAD", "TR", "U", "UL",
  ]);
  const blockedTags = new Set(["SCRIPT", "STYLE", "IFRAME", "OBJECT", "EMBED", "FORM", "INPUT", "BUTTON", "SVG", "MATH"]);
  const walk = (node: Element) => {
    for (const child of Array.from(node.children)) walk(child);
    if (blockedTags.has(node.tagName)) {
      node.remove();
      return;
    }
    if (!allowedTags.has(node.tagName)) {
      const parent = node.parentNode;
      if (!parent) return;
      while (node.firstChild) parent.insertBefore(node.firstChild, node);
      node.remove();
      return;
    }

    for (const attribute of Array.from(node.attributes)) {
      const name = attribute.name.toLowerCase();
      if (node.tagName === "A" && name === "href") {
        try {
          const url = new URL(attribute.value, "https://github.com");
          if (!["http:", "https:"].includes(url.protocol)) node.removeAttribute(attribute.name);
        } catch {
          node.removeAttribute(attribute.name);
        }
        node.setAttribute("target", "_blank");
        node.setAttribute("rel", "noreferrer");
        continue;
      }
      if (node.tagName === "IMG" && name === "src") {
        try {
          const url = new URL(attribute.value, "https://github.com");
          if (!["http:", "https:"].includes(url.protocol)) node.removeAttribute(attribute.name);
        } catch {
          node.removeAttribute(attribute.name);
        }
        continue;
      }
      if (name !== "alt" && name !== "title") node.removeAttribute(attribute.name);
    }
  };
  Array.from(document.body.children).forEach(walk);
  return document.body.innerHTML;
}

function readFreshCache(): GitHubCache | null {
  try {
    const cached = window.localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    const parsed = JSON.parse(cached) as GitHubCache;
    return Date.now() - parsed.timestamp < CACHE_TTL ? parsed : null;
  } catch {
    return null;
  }
}

export function GitHubSection() {
  const [profile, setProfile] = useState<GitHubUser | null>(null);
  const [repositories, setRepositories] = useState<GitHubRepo[]>([]);
  const [readme, setReadme] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const applyData = (data: GitHubCache) => {
      setProfile(data.profile);
      setRepositories(data.repositories);
      setReadme(data.readme);
      setLoading(false);
    };

    // Ask our server route, which caches the GitHub data for 24h so the
    // upstream API is hit at most once per day across all visitors.
    const load = async () => {
      // Hydrate from the localStorage cache only after mount so the initial
      // client render matches the server render (avoids hydration mismatches).
      const cached = readFreshCache();
      if (cached) {
        applyData(cached);
        return;
      }

      try {
        const response = await fetch("/api/github", { signal: controller.signal });
        const payload = (await response.json()) as GitHubApiResponse;
        if (!response.ok || payload.error) {
          throw new Error(payload.error ?? "Could not load GitHub data.");
        }

        const fresh: GitHubCache = {
          timestamp: Date.now(),
          profile: payload.profile ?? null,
          repositories: payload.repositories ?? [],
          contributions: payload.contributions ?? [],
          contributionTotal: payload.contributionTotal ?? null,
          readme: payload.readme ?? "",
        };
        applyData(fresh);

        try {
          window.localStorage.setItem(CACHE_KEY, JSON.stringify(fresh));
        } catch {
          /* storage may be blocked or full */
        }
      } catch (cause) {
        if (!controller.signal.aborted) setError(cause instanceof Error ? cause.message : "Could not load GitHub data.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    void load();
    return () => controller.abort();
  }, []);

  const date = (value: string) => new Intl.DateTimeFormat(undefined, { month: "short", year: "numeric" }).format(new Date(value));

  return (
    <div className="flex flex-col w-full">
      <div className="pt-6 pb-2 flex flex-col gap-6">
        {/* Profile card */}
        <div className="rounded-xl border border-black/10 dark:border-white/[0.15] bg-zinc-50 dark:bg-[#0b0b0d] p-5">
          <div className="flex flex-wrap items-center gap-4">
            {profile?.avatar_url && (
              <Image src={profile.avatar_url} alt="" width={64} height={64} unoptimized className="size-14 sm:size-16 rounded-full border border-black/10 dark:border-white/10 bg-white p-0.5" />
            )}
            <div className="min-w-0 flex-1">
              <h3 className="m-0 text-[18px] font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{profile?.name || "Tanush Patel"}</h3>
              <a href={`https://github.com/${USERNAME}`} target="_blank" rel="noreferrer" className="mt-0.5 inline-block text-[13px] text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200">@{profile?.login || USERNAME}</a>
            </div>
          </div>
          <p className="mb-0 mt-4 max-w-2xl text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-300">{profile?.bio || "CSE student, developer, and curious maker—learning in public and building along the way."}</p>
          {profile?.location && <p className="mt-2 text-[12px] text-zinc-500 dark:text-zinc-400">{profile.location}</p>}
          <div className="mt-4 flex flex-wrap gap-5 border-t border-black/10 dark:border-white/[0.12] pt-4 text-[12px] text-zinc-500 dark:text-zinc-400">
            <span><strong className="text-zinc-900 dark:text-zinc-100">{profile?.public_repos ?? "—"}</strong> repositories</span>
            <span><strong className="text-zinc-900 dark:text-zinc-100">{profile?.followers ?? "—"}</strong> followers</span>
            <span><strong className="text-zinc-900 dark:text-zinc-100">{profile?.following ?? "—"}</strong> following</span>
          </div>
        </div>

        {/* README */}
        <div className="rounded-xl border border-black/10 dark:border-white/[0.15] bg-zinc-50 dark:bg-[#0b0b0d] p-5">
          <p className="m-0 mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400 dark:text-zinc-500">README.md</p>
          {loading ? <p className="text-[13px] text-zinc-500 dark:text-zinc-400">Connecting to GitHub…</p> : error ? <p role="status" className="text-[13px] text-red-500 dark:text-red-400">{error} The profile card still links to GitHub.</p> : <Readme markdown={readme} />}
        </div>

        {/* Public repositories */}
        <div>
          <div className="mb-3 flex items-end justify-between gap-3">
            <h3 className="m-0 text-[15px] font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Public repositories</h3>
            <a href={`https://github.com/${USERNAME}?tab=repositories`} target="_blank" rel="noreferrer" className="text-[12px] text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200">All repositories ↗</a>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {repositories.map((repo) => (
              <a key={repo.name} href={repo.html_url} target="_blank" rel="noreferrer" className="rounded-xl border border-black/10 dark:border-white/[0.15] bg-zinc-50 dark:bg-[#0b0b0d] p-4 transition duration-200 hover:-translate-y-0.5 hover:border-black/20 dark:hover:border-white/25">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="m-0 break-all text-[14px] font-bold text-zinc-800 dark:text-zinc-100">{repo.name}</h4>
                  <span className="shrink-0 rounded-full border border-black/10 dark:border-white/15 px-2 py-0.5 text-[10px] text-zinc-500 dark:text-zinc-400">Public</span>
                </div>
                <p className="mb-3 mt-2 line-clamp-2 min-h-9 text-[12px] leading-5 text-zinc-500 dark:text-zinc-400">{repo.description || "No description provided yet."}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                  {repo.language && <span>{repo.language}</span>}
                  <span>☆ {repo.stargazers_count}</span>
                  <span>⑂ {repo.forks_count}</span>
                  <span>Updated {date(repo.updated_at)}</span>
                </div>
              </a>
            ))}
            {!loading && !error && repositories.length === 0 && <p className="rounded-xl border border-dashed border-black/15 dark:border-white/15 p-5 text-[13px] text-zinc-500 dark:text-zinc-400">No public repositories found.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(GitHubSection);
