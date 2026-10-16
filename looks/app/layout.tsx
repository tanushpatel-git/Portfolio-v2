import type { Metadata } from "next";
import localFont from "next/font/local";
import { LayoutGroup } from "framer-motion";
import SiteHeader from "@/component/SiteHeader";
import { SitePreferencesProvider } from "@/component/SitePreferences";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/geist-latin.woff2",
  variable: "--font-geist-sans",
  display: "swap",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/geist-mono-latin.woff2",
  variable: "--font-geist-mono",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Tanush Patel — Designer & Developer",
  description: "The portfolio of Tanush Patel, designer and developer.",
  icons: {
    icon: "/logo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex h-dvh flex-col bg-white font-sans text-[#111]">
        <SitePreferencesProvider>
          <LayoutGroup id="portfolio-project-transition">
            <div className="relative z-20 shrink-0 px-4 sm:px-6 lg:px-[2.35vw]">
              <SiteHeader />
            </div>
            <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
              {children}
            </div>
          </LayoutGroup>
        </SitePreferencesProvider>
      </body>
    </html>
  );
}
