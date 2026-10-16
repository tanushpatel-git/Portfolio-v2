import { notFound } from "next/navigation";
import ProjectDetail from "@/component/ProjectDetail";
import { projectImages } from "@/component/projectData";

export default async function ProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const project = projectImages.find((item) => item.slug === slug);

  if (!project) notFound();

  const imageQuery = Array.isArray(query.image) ? query.image[0] : query.image;
  const requestedImageIndex = Number.parseInt(imageQuery ?? "0", 10);
  const initialImageIndex = Number.isInteger(requestedImageIndex)
    && requestedImageIndex >= 0
    && requestedImageIndex <= project.relatedImages.length
    ? requestedImageIndex
    : 0;

  return <ProjectDetail project={project} initialImageIndex={initialImageIndex} />;
}
