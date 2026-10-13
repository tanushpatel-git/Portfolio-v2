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
