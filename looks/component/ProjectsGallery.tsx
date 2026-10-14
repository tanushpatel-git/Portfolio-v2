"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { projectImages } from "@/component/projectData";

const cardShapes = [
  "rounded-[1.1rem] sm:rounded-[1.4rem]",
  "rounded-[1.7rem] sm:rounded-[2rem]",
  "rounded-[1.3rem_1.8rem_1.1rem_1.8rem]",
  "rounded-[1.8rem_1.2rem_1.8rem_1.2rem]",
  "rounded-[1.5rem] sm:rounded-[1.9rem]",
];

const cardTints = ["#f2efeb", "#eeeef2", "#f4eee9", "#ebf0ef", "#f1edf2"];
const cardWidths = [100, 96, 100, 91, 98, 94, 100, 93, 97, 90];
const pinMotion = {
  hidden: (index: number) => {
    const angle = (index + 1) * 2.399963229728653;
    const distance = 280 + ((index * 137) % 240);
    return {
      x: Math.round(Math.cos(angle) * distance),
      y: Math.round(Math.sin(angle) * distance),
    };
  },
  visible: () => ({
    x: 0,
    y: 0,
    transition: {
      duration: 0.68,
      delay: 0,
      ease: "easeOut",
    },
  }),
};

export default function ProjectsGallery({ excludeSlug, animateEntrance = true }: { excludeSlug?: string; animateEntrance?: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  const visibleProjects = projectImages.filter((project) => project.slug !== excludeSlug);

  return (
    <>
      <section aria-label="Project pins" className="columns-2 gap-3 sm:columns-3 sm:gap-4 xl:columns-4 2xl:columns-5">
        {visibleProjects.map((project, index) => (
          <motion.article
            key={project.slug}
            className="group mb-4 break-inside-avoid sm:mb-5"
            style={{ width: `${cardWidths[index % cardWidths.length]}%`, marginInline: "auto" }}
            custom={index}
            variants={pinMotion}
            layout
            layoutId={`project-card-${project.slug}`}
            initial={prefersReducedMotion || !animateEntrance ? false : "hidden"}
            animate="visible"
          >
            <Link href={`/project/${project.slug}`} aria-label={`Open ${project.title} project`} className="block cursor-pointer">
              <motion.div
                layoutId={`project-image-${project.slug}`}
                className={`relative overflow-hidden ${cardShapes[index % cardShapes.length]}`}
                style={{ backgroundColor: cardTints[index % cardTints.length] }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={project.width}
                  height={project.height}
                  sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, (max-width: 1535px) 25vw, 20vw"
                  className="h-auto w-full transition duration-500 ease-out group-hover:scale-[1.025]"
                />
                <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/[0.04]" />
              </motion.div>
            </Link>
          </motion.article>
        ))}
      </section>
    </>
  );
}
