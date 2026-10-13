"use client";

import { memo, useEffect, useState, type ReactNode } from "react";
import {
  GITHUB_USERNAME as USERNAME,
  type Contribution,
  type GitHubApiResponse,
  type GitHubData,
  type GitHubRepo,
  type GitHubUser,
} from "@/lib/github";

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
      nodes.push(<img key={match.index} src={match[3]} alt={match[2]} className="my-3 inline-block max-h-20 max-w-full object-contain align-middle" loading="lazy" />);
    } else if (match[4] && match[5]) {
      nodes.push(<a key={match.index} href={match[5]} target="_blank" rel="noreferrer" className="font-medium text-[#8ab4ff] underline decoration-[#8ab4ff]/30 underline-offset-2 hover:decoration-current">{match[4]}</a>);
    } else if (match[6]) {
      nodes.push(<strong key={match.index} className="font-semibold">{match[6]}</strong>);
    } else if (match[7]) {
      nodes.push(<code key={match.index} className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.9em] text-[#d7e4ff]">{match[7]}</code>);
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
        className="github-readme break-words text-[#d5deef] [&_a]:text-[#8ab4ff] [&_a]:underline [&_a]:decoration-[#8ab4ff]/30 [&_a]:underline-offset-2 [&_blockquote]:my-5 [&_blockquote]:border-l-2 [&_blockquote]:border-[#8ab4ff]/50 [&_blockquote]:pl-4 [&_blockquote]:text-[#aebbd3] [&_code]:rounded [&_code]:bg-white/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.9em] [&_h1]:mb-4 [&_h1]:mt-8 [&_h1]:border-b [&_h1]:border-white/10 [&_h1]:pb-2 [&_h1]:text-3xl [&_h1]:font-semibold [&_h1]:tracking-tight [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:border-b [&_h2]:border-white/10 [&_h2]:pb-2 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_img]:my-3 [&_img]:inline-block [&_img]:max-h-24 [&_img]:max-w-full [&_img]:object-contain [&_li]:relative [&_li]:my-0 [&_li]:rounded-xl [&_li]:border [&_li]:border-white/10 [&_li]:bg-[#111c31]/70 [&_li]:px-4 [&_li]:py-3 [&_li]:shadow-[0_8px_24px_rgba(0,0,0,0.12)] [&_li]:marker:text-[#8ab4ff] [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_p]:my-4 [&_pre]:my-4 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-white/10 [&_pre]:bg-[#080e1c]/80 [&_pre]:p-4 [&_pre]:text-sm [&_table]:my-5 [&_table]:block [&_table]:max-w-full [&_table]:overflow-x-auto [&_table]:border-collapse [&_td]:border [&_td]:border-white/10 [&_td]:px-3 [&_td]:py-2 [&_th]:border [&_th]:border-white/10 [&_th]:bg-white/5 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_ul]:my-4 [&_ul]:list-none [&_ul]:space-y-2 [&_ul]:pl-0 [&_ul>li]:pl-8 [&_ul>li]:before:absolute [&_ul>li]:before:left-4 [&_ul>li]:before:top-[1.2em] [&_ul>li]:before:size-1.5 [&_ul>li]:before:rounded-full [&_ul>li]:before:bg-[#8ab4ff] [&_ul>li]:before:shadow-[0_0_10px_rgba(138,180,255,0.8)]"
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
    blocks.push(<p key={`p-${blocks.length}`} className="my-4 leading-7 text-[#d5deef]">{paragraph.map((line, i) => <span key={i}>{i > 0 && " "}<InlineMarkdown text={line} /></span>)}</p>);
    paragraph = [];
  };
  const flushList = () => {
    if (!list.length) return;
    blocks.push(<ul key={`ul-${blocks.length}`} className="my-4 list-none space-y-2 pl-0 text-[#d5deef]">{list.map((item, i) => <li key={i} className="rounded-xl border border-white/10 bg-[#111c31]/70 px-4 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.12)]"><span className="mr-2 text-[#8ab4ff]" aria-hidden="true">✦</span><InlineMarkdown text={item} /></li>)}</ul>);
    list = [];
  };

  lines.forEach((line, index) => {
    const heading = line.match(/^#{1,3}\s+(.+)$/);
    const item = line.match(/^\s*[-*+]\s+(.+)$/);
    if (heading) {
      flushParagraph(); flushList();
      const level = line.match(/^#+/)?.[0].length ?? 2;
      const Heading = level === 1 ? "h2" : level === 2 ? "h3" : "h4";
      blocks.push(<Heading key={`h-${index}`} className="mb-2 mt-7 border-b border-white/10 pb-2 text-lg font-semibold tracking-tight text-[#f1f5ff] first:mt-0"><InlineMarkdown text={heading[1]} /></Heading>);
    } else if (item) {
      flushParagraph(); list.push(item[1]);
    } else if (!line.trim()) {
      flushParagraph(); flushList();
    } else if (line.startsWith("> ")) {
      flushParagraph(); flushList();
      blocks.push(<blockquote key={`q-${index}`} className="my-4 border-l-2 border-[#8ab4ff]/50 pl-4 text-[#aebbd3]"><InlineMarkdown text={line.slice(2)} /></blockquote>);
    } else if (/^https?:\/\//.test(line.trim())) {
      flushParagraph(); flushList();
      blocks.push(<p key={`url-${index}`} className="my-3 break-all"><a href={line.trim()} target="_blank" rel="noreferrer" className="text-[#8ab4ff] underline underline-offset-2">{line.trim()}</a></p>);
    } else {
      paragraph.push(line.trim());
    }
  });
  flushParagraph(); flushList();
  return <div>{blocks.length ? blocks : <p className="text-[#9aa9c4]">The GitHub profile does not have a README yet.</p>}</div>;
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
          const url = new URL(attribute.value, `https://github.com/${USERNAME}/${USERNAME}/blob/HEAD/`);
          if (url.protocol !== "https:" && url.protocol !== "http:") node.removeAttribute(attribute.name);
          else node.setAttribute("href", url.href);
        } catch { node.removeAttribute(attribute.name); }
      } else if (node.tagName === "IMG" && ["src", "alt", "title", "width", "height"].includes(name)) {
        if (name === "src") {
          try {
            const url = new URL(attribute.value, `https://github.com/${USERNAME}/${USERNAME}/raw/HEAD/`);
            if (url.protocol !== "https:") node.removeAttribute(attribute.name);
            else node.setAttribute("src", url.href);
          } catch { node.removeAttribute(attribute.name); }
        }
      } else {
        node.removeAttribute(attribute.name);
      }
    }
    if (node.tagName === "A") {
      node.setAttribute("target", "_blank");
      node.setAttribute("rel", "noopener noreferrer");
    }
  };
  for (const child of Array.from(document.body.children)) walk(child);
  return document.body.innerHTML;
}

function GitHubAboutArticle() {
  const [profile, setProfile] = useState<GitHubUser | null>(null);
  const [repositories, setRepositories] = useState<GitHubRepo[]>([]);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [contributionTotal, setContributionTotal] = useState<number | null>(null);
  const [readme, setReadme] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const applyData = (data: GitHubCache) => {
      setProfile(data.profile);
      setRepositories(data.repositories);
      setContributions(data.contributions);
      setContributionTotal(data.contributionTotal);
      setReadme(data.readme);
    };

    // 1) Serve from cache while it is still fresh (< 24h old).
    try {
      const cached = window.localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached) as GitHubCache;
        if (Date.now() - parsed.timestamp < CACHE_TTL) {
          applyData(parsed);
          setLoading(false);
          return () => controller.abort();
        }
      }
    } catch {
      /* ignore missing/corrupt cache */
    }

    // 2) Otherwise ask our server route, which caches the GitHub data for 24h
    //    so the upstream API is hit at most once per day across all visitors.
    const load = async () => {
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
  const activeDays = contributions.filter((day) => day.count > 0).length;
  const busiestDay = contributions.reduce((best, day) => day.count > best.count ? day : best, { date: "", count: 0, level: 0 as Contribution["level"] });
  const calendarCells: Array<Contribution | null> = contributions.length
    ? [
        ...Array.from({ length: new Date(`${contributions[0].date}T00:00:00`).getDay() }, () => null),
        ...contributions,
      ]
    : [];
  while (calendarCells.length && calendarCells.length % 7 !== 0) calendarCells.push(null);

  return (
    <article className="-mx-6 -mt-7 min-h-full bg-transparent text-[#edf2ff] sm:-mx-8 sm:-mt-8 lg:-mx-[3vw] lg:-mt-9">
      <section className="px-6 pb-7 pt-8 sm:px-10 sm:pb-9 sm:pt-10">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#266be4] sm:text-sm">Github / 02</p>
        <h1 style={{ color: "var(--github-heading-color, #000000)" }} className="mb-3 mt-0 text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[0.98] tracking-[-0.065em] transition-colors duration-150">Building in public.</h1>
        <p style={{ color: "var(--github-subheading-color, #000000)" }} className="m-0 max-w-[800px] text-base leading-relaxed transition-colors duration-150 sm:text-lg">My GitHub is where I share what I’m learning, the projects I’m shaping, and the progress behind them.</p>
      </section>
      <header className="mx-5 mt-2 rounded-2xl border border-white/10 bg-[#101729]/75 px-5 pb-6 pt-6 shadow-[0_20px_70px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:mx-8 sm:px-8 sm:pb-8 sm:pt-8 lg:mx-10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#93a4c5]">GITHUB PROFILE</p>
        <div className="flex flex-wrap items-center gap-4">
          {profile?.avatar_url && <img src={profile.avatar_url} alt="" className="size-16 rounded-full border border-[#8da5d9]/40 bg-[#151e34] p-0.5 shadow-[0_0_30px_rgba(104,140,255,0.22)] sm:size-20" />}
          <div className="min-w-0 flex-1">
            <h2 className="m-0 text-3xl font-semibold tracking-tight sm:text-4xl">{profile?.name || "Tanush Patel"}</h2>
            <a href={`https://github.com/${USERNAME}`} target="_blank" rel="noreferrer" className="mt-1 inline-block text-base text-[#a8b6d0] hover:text-[#8ab4ff]">@{profile?.login || USERNAME}</a>
          </div>
          <a href={`https://github.com/${USERNAME}`} target="_blank" rel="noreferrer" className="rounded-full border border-[#8da5d9]/30 bg-[#8da5d9]/10 px-4 py-2 text-sm font-medium text-[#eaf0ff] shadow-[0_0_24px_rgba(104,140,255,0.12)] transition hover:border-[#8ab4ff]/60 hover:bg-[#8da5d9]/20">View GitHub ↗</a>
        </div>
        <p className="mb-0 mt-5 max-w-3xl text-base leading-7 text-[#d7dfef]">{profile?.bio || "CSE student, developer, and curious maker—learning in public and building along the way."}</p>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#9aa9c4]">
          {profile?.location && <span>{profile.location}</span>}
          {profile?.company && <span>{profile.company}</span>}
          {profile?.blog && <a href={profile.blog.startsWith("http") ? profile.blog : `https://${profile.blog}`} target="_blank" rel="noreferrer" className="text-[#8ab4ff] hover:underline">{profile.blog}</a>}
        </div>
        <div className="mt-5 flex flex-wrap gap-5 border-t border-white/10 pt-4 text-sm text-[#cbd5e8]">
          <span><strong>{profile?.public_repos ?? "—"}</strong> public repositories</span>
          <span><strong>{profile?.followers ?? "—"}</strong> followers</span>
          <span><strong>{profile?.following ?? "—"}</strong> following</span>
        </div>
      </header>

      <section className="mx-5 mt-5 overflow-hidden rounded-2xl border border-white/10 bg-[#101729]/70 shadow-[0_20px_70px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:mx-8 lg:mx-10">
        <div className="border-b border-white/10 px-5 py-4 sm:px-7">
          <p className="m-0 text-xs font-semibold uppercase tracking-[0.14em] text-[#91a4ca]">README.md</p>
        </div>
        <div className="px-5 py-5 text-[#e1e8f5] sm:px-7">
          {loading ? <p className="text-sm text-[#9aa9c4]">Connecting to GitHub…</p> : error ? <p role="status" className="text-sm text-[#ff9b9b]">{error} The profile card still links to GitHub.</p> : <Readme markdown={readme} />}
          {!loading && <p className="mb-0 mt-6 border-t border-white/10 pt-4 text-xs text-[#9aa9c4]">Live public profile data from GitHub</p>}
        </div>
      </section>

      <section className="relative mx-5 mt-5 overflow-hidden rounded-[1.5rem] border border-[#8ab4ff]/20 bg-[linear-gradient(145deg,rgba(18,31,57,0.92),rgba(8,14,28,0.76))] p-4 shadow-[0_24px_90px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:mx-8 sm:rounded-[1.75rem] sm:p-6 lg:mx-10 lg:p-7">
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-24 size-64 rounded-full bg-[#4285ff]/10 blur-3xl" />
        <div className="relative mb-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8ab4ff] sm:text-xs">
              <span className="size-1.5 rounded-full bg-[#62e18c] shadow-[0_0_12px_rgba(98,225,140,0.9)]" />
              GitHub activity
            </div>
            <h2 className="m-0 text-2xl font-semibold tracking-tight text-[#f1f5ff] sm:text-3xl">A year of showing up.</h2>
          </div>
          <a href={`https://github.com/${USERNAME}`} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-[#cbd9f2] transition hover:border-[#8ab4ff]/40 hover:bg-[#8ab4ff]/10 hover:text-white">Open GitHub ↗</a>
        </div>

        <div className="relative mb-5 grid grid-cols-3 gap-2 sm:gap-3">
          {[
            { label: "Contributions", value: contributionTotal?.toLocaleString() ?? "—", accent: "text-[#b5ceff]" },
            { label: "Active days", value: activeDays ? activeDays.toLocaleString() : loading ? "…" : "0", accent: "text-[#8ce6ac]" },
            { label: "Best day", value: busiestDay.count ? busiestDay.count.toLocaleString() : loading ? "…" : "0", accent: "text-[#ffd38a]" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-white/[0.08] bg-[#07101f]/45 px-3 py-3 sm:rounded-2xl sm:px-4 sm:py-4">
              <p className="mb-1 text-[9px] font-medium uppercase tracking-[0.12em] text-[#8292ad] sm:text-[10px]">{stat.label}</p>
              <p className={`m-0 text-lg font-semibold tabular-nums sm:text-2xl ${stat.accent}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {calendarCells.length ? (
          <div className="relative rounded-xl border border-white/[0.07] bg-[#050b16]/55 p-3 sm:rounded-2xl sm:p-5">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="grid shrink-0 grid-rows-7 gap-1 pt-0.5 text-[8px] leading-3 text-[#73839e] sm:gap-1.5 sm:text-[9px]">
                <span>Sun</span><span>Mon</span><span className="invisible">Tue</span><span>Wed</span><span className="invisible">Thu</span><span>Fri</span><span className="invisible">Sat</span>
              </div>
              <div className="overflow-x-auto pb-1" aria-label="GitHub contributions over the last year">
                <div className="grid w-max grid-flow-col grid-rows-7 gap-1 sm:gap-1.5" role="img" aria-label={`${contributionTotal ?? "GitHub"} contributions during the last year`}>
                  {calendarCells.map((day, index) => day ? (
