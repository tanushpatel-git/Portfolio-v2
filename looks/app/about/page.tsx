import type { Metadata } from "next";
import AboutReader from "@/component/AboutReader";

export const metadata: Metadata = {
  title: "About — Tanush Patel",
  description: "A little about Tanush Patel, designer and developer.",
};

export default function About() {
  return <AboutReader />;
}
