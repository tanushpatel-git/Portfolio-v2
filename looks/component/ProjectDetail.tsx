"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { PortfolioProject } from "@/component/projectData";
import { projectImages } from "@/component/projectData";

export default function ProjectDetail({ project }: { project: PortfolioProject }) {
  const projectNumber = projectImages.findIndex((item) => item.slug === project.slug) + 1;

  return (
    <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden bg-white text-[#171717]">
      <section className="grid min-h-[calc(100dvh-7rem)] grid-cols-1 lg:grid-cols-2">
      </section>
    </main>
  );
}
