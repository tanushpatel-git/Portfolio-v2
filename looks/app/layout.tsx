import type { Metadata } from "next";
import localFont from "next/font/local";
import { LayoutGroup } from "framer-motion";
import SiteHeader from "@/component/SiteHeader";
import { SitePreferencesProvider } from "@/component/SitePreferences";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/site";
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
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    type: "website",
    images: ["/portfoliov1.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/portfoliov1.webp"],
  },
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
