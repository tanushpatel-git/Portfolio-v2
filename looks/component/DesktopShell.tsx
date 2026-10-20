"use client";

import type { ReactNode } from "react";
import { LayoutGroup } from "framer-motion";
import SiteHeader from "@/component/SiteHeader";
import { SitePreferencesProvider } from "@/component/SitePreferences";

export function DesktopShell({ children }: { children: ReactNode }) {
  return (
    <SitePreferencesProvider>
      <LayoutGroup id="portfolio-project-transition">
        <div className="flex h-dvh flex-col">
          <div className="relative z-20 shrink-0 px-4 sm:px-6 lg:px-[2.35vw]">
            <SiteHeader />
          </div>
          <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
            {children}
          </div>
        </div>
      </LayoutGroup>
    </SitePreferencesProvider>
  );
}
