"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { PortfolioProject } from "@/component/projectData";
import { projectImages } from "@/component/projectData";

export default function ProjectDetail({ project, initialImageIndex = 0 }: { project: PortfolioProject; initialImageIndex?: number }) {
  const motionEnabled = !useReducedMotion();
  const projectNumber = projectImages.findIndex((item) => item.slug === project.slug) + 1;
  const [selectedImageIndex, setSelectedImageIndex] = useState(initialImageIndex);
  const projectAssets = [
    { src: project.image, width: project.width, height: project.height, alt: `${project.title} main image` },
    ...project.relatedImages,
  ];
  const selectedImage = projectAssets[selectedImageIndex];

  return (
    <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden bg-white text-[#171717]">
      <section className="grid min-h-[calc(100dvh-7rem)] grid-cols-1 lg:grid-cols-2">
        <div className="flex min-h-[56dvh] flex-col justify-center gap-3 p-3 sm:gap-4 sm:p-5 lg:min-h-[calc(100dvh-7rem)] lg:p-7">
          <motion.div
            layoutId={`project-image-${project.slug}-${selectedImageIndex}`}
            className="relative h-[48dvh] max-h-[700px] w-full overflow-hidden rounded-[1.5rem] bg-[#f1efec] sm:rounded-[2rem] lg:h-[calc(100dvh-14rem)]"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={selectedImage.src}
                initial={motionEnabled ? { x: 20, opacity: 0 } : false}
                animate={motionEnabled ? { x: 0, opacity: 1 } : undefined}
                exit={motionEnabled ? { x: -20, opacity: 0 } : { opacity: 1 }}
                transition={motionEnabled ? { duration: 0.24, ease: "easeOut" } : { duration: 0 }}
                className="absolute inset-0"
              >
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  width={selectedImage.width}
                  height={selectedImage.height}
                  sizes="(max-width: 1023px) 100vw, 50vw"
                  priority={selectedImageIndex === 0}
                  className="h-full w-full object-contain"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {projectAssets.length > 1 && (
            <div className="overflow-x-auto py-1" role="group" aria-label={`${project.title} image thumbnails`}>
              <div className="mx-auto flex w-max gap-2 sm:gap-3">
                {projectAssets.map((image, index) => (
                  <button
                    key={image.src}
                    type="button"
                    onClick={() => setSelectedImageIndex(index)}
                    aria-label={`Show ${image.alt}`}
                    aria-pressed={selectedImageIndex === index}
                    className={`relative size-[4.25rem] shrink-0 overflow-hidden rounded-xl bg-[#f1efec] transition sm:size-[5.25rem] sm:rounded-2xl ${selectedImageIndex === index ? "ring-2 ring-[#171717] ring-offset-2" : "opacity-70 hover:opacity-100"}`}
                  >
                    <Image
                      src={image.src}
                      alt=""
                      fill
                      sizes="84px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <motion.div
          initial={motionEnabled ? { x: 48 } : false}
          animate={motionEnabled ? { x: 0 } : undefined}
          transition={motionEnabled ? { duration: 0.55, ease: "easeOut" } : { duration: 0 }}
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
          <div className="max-w-[36rem]">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#858585]">Project overview</h2>
            <p className="m-0 text-[15px] leading-[1.8] text-[#4e4e4e] sm:text-base">
              {project.overview}
            </p>
          </div>
          <div className="mt-7 max-w-[36rem]">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#858585]">What it includes</h2>
            <ul className="m-0 list-none space-y-2 p-0 text-[15px] leading-[1.65] text-[#4e4e4e] sm:text-base">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[0.65em] size-1.5 shrink-0 rounded-full bg-[#171717]" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex w-fit items-center gap-3 rounded-full border border-black/15 px-5 py-3 text-sm font-medium text-[#171717] transition-colors hover:border-black hover:bg-[#171717] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[18px] fill-current">
                <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.08c-3.1.68-3.76-1.32-3.76-1.32-.5-1.29-1.24-1.63-1.24-1.63-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .1.7 2.06 3.84 1.46.1-.73.4-1.23.71-1.51-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.42.11-2.96 0 0 .95-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.1-1.45 3.05-1.15 3.05-1.15.61.54.23.72.23.9v.18c.72.78 1.16 1.78 1.16 3 0 4.29-2.62 5.24-5.11 5.52.4.35.76 1.03.76 2.08V22c0 .29.2.63.77.52A11.1 11.1 0 0 0 12 .9Z" />
              </svg>
              View source on GitHub
              <span aria-hidden="true" className="text-base">↗</span>
            </a>
          )}
          <p className="mb-0 mt-8 text-xs uppercase tracking-[0.14em] text-[#999]">Design · Development · Exploration</p>
        </motion.div>
      </section>

    </main>
  );
}
