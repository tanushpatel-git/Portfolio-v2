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
        <div className="flex min-h-[56dvh] items-center justify-center p-3 sm:p-5 lg:min-h-[calc(100dvh-7rem)] lg:p-7">
          <motion.div
            layoutId={`project-image-${project.slug}`}
            className="relative h-[54dvh] max-h-[780px] w-full overflow-hidden rounded-[1.5rem] bg-[#f1efec] sm:rounded-[2rem] lg:h-[calc(100dvh-11rem)]"
          >
            <Image
              src={project.image}
              alt={project.title}
              width={project.width}
              height={project.height}
              sizes="(max-width: 1023px) 100vw, 50vw"
              priority
              className="h-full w-full object-contain"
            />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
