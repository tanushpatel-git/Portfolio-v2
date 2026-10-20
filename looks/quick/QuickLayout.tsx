"use client";

import { useEffect, type ReactNode } from "react";
import { useTheme } from "next-themes";
import { ThemeProvider } from "@quick/components/theme-provider";
import "@quick/quick.css";

// Keeps the document background in sync with the active theme so the area
// around `.quick-root` (html/body) doesn't stay white in dark mode.
function ThemeSurfaceSync() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const isDark = resolvedTheme === "dark";
    const color = isDark ? "#000000" : "#ffffff";
    document.documentElement.style.backgroundColor = color;
    document.body.style.backgroundColor = color;
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
  }, [resolvedTheme]);

  return null;
}

export function QuickLayout({ children }: { children: ReactNode }) {
  // next-themes writes the `.dark` class onto <html>. That class and the themed
  // document background must not leak into the desktop (looks) shell, which is
  // always light, so restore everything when the mobile tree unmounts.
  useEffect(() => {
    return () => {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.backgroundColor = "";
      document.body.style.backgroundColor = "";
      document.documentElement.style.colorScheme = "";
    };
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ThemeSurfaceSync />
      <div className="quick-root min-h-screen w-full bg-white text-black dark:bg-black dark:text-zinc-50">
        {children}
      </div>
    </ThemeProvider>
  );
}
