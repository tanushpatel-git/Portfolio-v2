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
