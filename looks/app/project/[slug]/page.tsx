import { notFound } from "next/navigation";
import ProjectDetail from "@/component/ProjectDetail";
import { projectImages } from "@/component/projectData";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectImages.find((item) => item.slug === slug);

  if (!project) notFound();

  return <ProjectDetail project={project} />;
}
