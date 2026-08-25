import { notFound } from "next/navigation";
import { getAllStories, getStoryBySlug } from "@/lib/api/stories";
import StoryDetailView from "@/components/StoryDetailView";

export async function generateStaticParams() {
  const stories = await getAllStories();
  return stories.map((s) => ({ slug: s.slug }));
}

export default async function StoryDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const story = await getStoryBySlug(params.slug);
  if (!story) notFound();

  return <StoryDetailView initialStory={story} />;
}
