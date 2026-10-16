"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { projectImages } from "@/component/projectData";

const projectPins = projectImages.flatMap((project) => [
  {
    project,
    imageIndex: 0,
    image: { src: project.image, width: project.width, height: project.height, alt: `${project.title} main image` },
  },
  ...project.relatedImages.map((image, index) => ({ project, imageIndex: index + 1, image })),
]);

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
      ease: "easeOut" as const,
    },
  }),
};

export default function ProjectsGallery() {
  const prefersReducedMotion = useReducedMotion();
  const motionEnabled = !prefersReducedMotion;

  return (
    <>
      <section aria-label="Project pins" className="columns-2 gap-3 sm:columns-3 sm:gap-4 xl:columns-4 2xl:columns-5">
        {projectPins.map((pin, index) => (
          <motion.article
            key={pin.image.src}
            className="group mb-4 break-inside-avoid sm:mb-5"
            style={{ width: `${cardWidths[index % cardWidths.length]}%`, marginInline: "auto" }}
            custom={index}
            variants={pinMotion}
            layout
            layoutId={`project-card-${pin.project.slug}-${pin.imageIndex}`}
            initial={motionEnabled ? "hidden" : false}
            animate="visible"
          >
            <Link
              href={`/project/${pin.project.slug}${pin.imageIndex ? `?image=${pin.imageIndex}` : ""}`}
              aria-label={`Open ${pin.project.title}, image ${pin.imageIndex + 1}`}
              className="block cursor-pointer"
            >
              <motion.div
                layoutId={`project-image-${pin.project.slug}-${pin.imageIndex}`}
                className={`relative overflow-hidden ${cardShapes[index % cardShapes.length]}`}
                style={{ backgroundColor: cardTints[index % cardTints.length] }}
              >
                <Image
                  src={pin.image.src}
                  alt={pin.image.alt}
                  width={pin.image.width}
                  height={pin.image.height}
                  sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, (max-width: 1535px) 25vw, 20vw"
                  className="h-auto w-full transition duration-500 ease-out group-hover:scale-[1.025]"
                />
                <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/[0.04]" />
              </motion.div>

              <div className="px-1 pt-2.5 sm:px-2 sm:pt-3">
                <h2 className="m-0 truncate text-[13px] font-semibold leading-5 tracking-[-0.015em] text-[#191919] sm:text-[15px]">
                  {pin.project.title}
                </h2>
                <p className="mb-0 mt-0.5 text-[11px] leading-4 text-[#777] sm:text-xs sm:leading-[1.15rem]">
                  {pin.imageIndex === 0 ? pin.project.category : `Image ${String(pin.imageIndex + 1).padStart(2, "0")} · ${pin.project.category}`}
                </p>
              </div>
            </Link>
          </motion.article>
        ))}
      </section>
    </>
  );
}
