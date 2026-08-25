import type { Story } from "@/types";
import { mockStories } from "@/lib/mock/stories";
import { mockResponse } from "@/lib/api/config";

/**
 * Backend contract: GET /api/v1/stories
 * Returns every story available to the learner (completed, in-progress and
 * still-locked). The home screen shows a preview slice of this list; the
 * "همه داستان‌ها" link goes to /stories which renders all of them.
 */
export async function getAllStories(): Promise<Story[]> {
  return mockResponse(mockStories);
}

/**
 * Backend contract: GET /api/v1/stories?limit=n
 * Home-screen preview slice. Kept as a separate call (rather than slicing
 * client-side) so the backend can decide what "featured" ordering means.
 */
export async function getStoryPreviews(limit = 4): Promise<Story[]> {
  const all = await mockResponse(mockStories);
  return all.slice(0, limit);
}

/**
 * Backend contract: GET /api/v1/stories/:slug
 */
export async function getStoryBySlug(slug: string): Promise<Story | null> {
  const all = await mockResponse(mockStories);
  return all.find((s) => s.slug === slug) ?? null;
}
