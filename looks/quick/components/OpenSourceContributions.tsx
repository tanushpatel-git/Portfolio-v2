"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Organization {
  login: string;
  description: string | null;
  avatarUrl: string;
  url: string;
}

type OrganizationsResponse = {
  organizations?: Organization[];
  error?: string;
};

const USERNAME = "tanushpatel-git";
const CACHE_KEY = "github_orgs_v1";
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour — mirrors the server-side route cache

const FALLBACK_ORGS: Organization[] = [
  "Py-Contributors",
  "AlgoManiacZ",
  "Design-and-Code",
  "LearnWithCommunity",
  "Devs-Dungeon",
  "yfosp",
  "dugsiiyeinc",
  "OpenRootdev",
].map((login) => ({
  login,
  description: null,
  avatarUrl: `https://github.com/${login}.png?size=160`,
  url: `https://github.com/${login}`,
}));

export function OpenSourceContributions({ isFullPage = false }: { isFullPage?: boolean }) {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const apply = (orgs: Organization[]) => {
      if (!active) return;
      setOrganizations(orgs);
      setLoading(false);
    };

    // Serve from cache when it is still fresh.
    try {
      const cached = window.localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached) as { organizations: Organization[]; savedAt: number };
        if (Array.isArray(parsed.organizations) && parsed.organizations.length) {
          apply(parsed.organizations);
          if (parsed.savedAt && Date.now() - parsed.savedAt < CACHE_TTL_MS) {
            return () => {
              active = false;
            };
          }
        }
      }
    } catch {
      /* ignore missing/corrupt cache */
    }

    const load = async () => {
      try {
        const response = await fetch("/api/organizations");
        const data = (await response.json()) as OrganizationsResponse;
        const orgs = data.organizations?.length ? data.organizations : FALLBACK_ORGS;
        apply(orgs);
        try {
          window.localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ organizations: orgs, savedAt: Date.now() }),
          );
        } catch {
          /* storage may be blocked or full */
        }
      } catch {
        apply(FALLBACK_ORGS);
      }
    };
    void load();

    return () => {
      active = false;
    };
  }, []);

  const visible = isFullPage ? organizations : organizations.slice(0, 6);

  return (
    <div className="w-full flex flex-col">
      <div className="py-2 relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-[18px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
          Open Source Contributions
        </h2>

        <a
          href={`https://github.com/${USERNAME}?tab=contributions`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center gap-1.5 px-3 py-1.5 bg-zinc-50 hover:bg-zinc-100 dark:bg-[#09090b] dark:hover:bg-[#121214] text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 rounded-[6px] text-[12px] font-medium transition-all duration-300 border border-black/5 dark:border-white/5 w-fit"
        >
          My contributions
          <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </a>

        {/* Horizontal line below heading */}
        <div className="absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
        {/* Intersections */}
        <div className="absolute bottom-0 -left-4 w-[2px] h-[2px] bg-black/40 dark:bg-white/[0.25] -translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
        <div className="absolute bottom-0 -right-4 w-[2px] h-[2px] bg-black/40 dark:bg-white/[0.25] translate-x-1/2 translate-y-1/2 pointer-events-none z-20" />
      </div>

      <div className="relative pt-4 pb-2">
        {loading && organizations.length === 0 ? (
          <div className="grid auto-rows-fr gap-2 sm:grid-cols-2">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="flex h-full items-center gap-3 px-3 py-3 rounded-[6px] border border-black/10 dark:border-white/[0.12]">
                <div className="size-9 shrink-0 rounded-md bg-zinc-100 dark:bg-zinc-800/60 animate-pulse" />
                <div className="min-w-0 flex-1 flex flex-col gap-2">
                  <div className="h-3.5 w-2/5 rounded-md bg-zinc-100 dark:bg-zinc-800/60 animate-pulse" />
                  <div className="h-3 w-4/5 rounded-md bg-zinc-100 dark:bg-zinc-800/40 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid auto-rows-fr gap-2 sm:grid-cols-2">
            {visible.map((org) => (
              <a
                key={org.login}
                href={org.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full items-center gap-3 px-3 py-3 rounded-[6px] border border-black/10 dark:border-white/[0.12] bg-zinc-50 hover:bg-zinc-100 dark:bg-[#0a0a0a] dark:hover:bg-[#121214] transition-colors duration-200"
              >
                <Image
                  src={org.avatarUrl}
                  alt=""
                  width={36}
                  height={36}
                  unoptimized
                  className="size-9 shrink-0 rounded-md border border-black/10 dark:border-white/10 bg-white object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-200 truncate group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                      {org.login}
                    </h3>
                    <svg viewBox="0 0 24 24" className="w-3 h-3 shrink-0 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </div>
                  <p className="text-[12px] text-zinc-500 dark:text-zinc-400 truncate">
                    {org.description || "Open source organization"}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}

        {!isFullPage && organizations.length > 6 && (
          <div className="flex justify-center mt-4 relative z-20">
            <a
              href={`https://github.com/${USERNAME}?tab=organizations`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group block"
            >
              <div className="absolute -inset-[5px] border border-black/5 dark:border-white/5 rounded-[11px] pointer-events-none transition-colors duration-300 group-hover:border-black/10 dark:group-hover:border-white/10" />
              <div className="relative flex items-center gap-1.5 px-4 py-2 bg-zinc-50 hover:bg-zinc-100 dark:bg-[#09090b] dark:hover:bg-[#121214] text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 rounded-[6px] text-[13px] font-medium transition-all duration-300 border border-black/5 dark:border-white/5 shadow-sm shadow-black/20 dark:shadow-lg dark:shadow-black/80">
                View All ({organizations.length - 6} more)
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-300 transition-transform duration-300 -rotate-90" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <polyline points="19 12 12 19 5 12" />
                </svg>
              </div>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
