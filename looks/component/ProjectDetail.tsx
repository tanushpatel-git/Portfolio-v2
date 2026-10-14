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

        <motion.div
          initial={{ x: 48 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative flex flex-col justify-center px-6 pb-12 pt-16 sm:px-10 lg:px-[clamp(2.5rem,6vw,7rem)] lg:py-14"
        >
          <Link
            href="/projects"
            aria-label="Close project and return to all projects"
            className="absolute right-5 top-5 grid size-11 place-items-center rounded-full bg-[#f1f0ee] text-2xl leading-none text-[#333] transition-colors hover:bg-[#e5e3e0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black sm:right-8 sm:top-8"
          >
            ×
          </Link>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[#858585]">
            Selected work · {String(projectNumber).padStart(2, "0")} / {String(projectImages.length).padStart(2, "0")}
          </p>
          <h1 className="m-0 max-w-[12ch] text-[clamp(2.5rem,5.6vw,5.5rem)] font-medium leading-[0.96] tracking-[-0.065em]">
            {project.title}
          </h1>
          <p className="mb-0 mt-5 text-base text-[#555] sm:text-lg">{project.category}</p>
          <div className="my-8 h-px w-full bg-black/10" />
          <p className="m-0 max-w-[36rem] text-[15px] leading-[1.8] text-[#4e4e4e] sm:text-base">
            {project.description}
          </p>
          <p className="mb-0 mt-8 text-xs uppercase tracking-[0.14em] text-[#999]">Design · Development · Exploration</p>
        </motion.div>
      </section>
    </main>
  );
}
