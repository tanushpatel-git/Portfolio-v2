"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { QuickLayout } from "@quick/QuickLayout";
import { DesktopShell } from "@/component/DesktopShell";

const MOBILE_BREAKPOINT = 640;

const HomePage = dynamic(() => import("@quick/pages/HomePage"), { ssr: false });
const ProjectsPage = dynamic(() => import("@quick/pages/ProjectsPage"), { ssr: false });
const ProjectDetailPage = dynamic(() => import("@quick/pages/ProjectDetailPage"), { ssr: false });
const ExperiencePage = dynamic(() => import("@quick/pages/ExperiencePage"), { ssr: false });
const ContactPage = dynamic(() => import("@quick/pages/ContactPage"), { ssr: false });
const PullRequestsPage = dynamic(() => import("@quick/pages/PullRequestsPage"), { ssr: false });

function renderQuickPage(pathname: string) {
  if (pathname === "/") return <HomePage />;
  if (pathname === "/projects") return <ProjectsPage />;
  if (pathname.startsWith("/project/")) return <ProjectDetailPage />;
  if (pathname === "/projects/") return <ProjectsPage />;
  if (pathname === "/about") return <ExperiencePage />;
  if (pathname === "/contact") return <ContactPage />;
  if (pathname === "/pull-requests") return <PullRequestsPage />;
  return null;
}

export function ViewportSwitch({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const sync = () => setIsMobile(query.matches);
    // Defer the first read so the initial render (which matches the server)
    // isn't changed synchronously inside the effect body.
    const raf = requestAnimationFrame(() => {
      setMounted(true);
      sync();
    });
    query.addEventListener("change", sync);
    return () => {
      cancelAnimationFrame(raf);
      query.removeEventListener("change", sync);
    };
  }, []);

  // Server + first client render always show the desktop design so hydration
  // is stable; after mount we swap to the mobile design on narrow viewports.
  if (mounted && isMobile) {
    const quickPage = renderQuickPage(pathname);
    if (quickPage) return <QuickLayout>{quickPage}</QuickLayout>;
  }

  return <DesktopShell>{children}</DesktopShell>;
}
