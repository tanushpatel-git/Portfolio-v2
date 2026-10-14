import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LayoutGroup } from "framer-motion";
import SiteHeader from "@/component/SiteHeader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tanush Patel — Designer & Developer",
  description: "The portfolio of Tanush Patel, designer and developer.",
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
        <LayoutGroup id="portfolio-project-transition">
          <div className="relative z-20 shrink-0 px-4 sm:px-6 lg:px-[2.35vw]">
            <SiteHeader />
          </div>
          <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
            {children}
          </div>
        </LayoutGroup>
      </body>
    </html>
  );
}
