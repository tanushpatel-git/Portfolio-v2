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
