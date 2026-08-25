import type { Fact, FactCategory } from "@/types";
import { mockFactCategories, mockFacts } from "@/lib/mock/facts";
import { mockResponse } from "@/lib/api/config";

/**
 * Backend contract: GET /api/v1/facts/categories
 */
export async function getFactCategories(): Promise<FactCategory[]> {
  return mockResponse(mockFactCategories);
}

/**
 * Backend contract: GET /api/v1/facts?category=:categoryId
 * Omitting categoryId returns every fact ("همه"). Filtering is expressed as
 * a query param here so the real backend can paginate/filter server-side
 * instead of the client fetching everything and filtering in memory.
 */
export async function getFacts(categoryId?: string): Promise<Fact[]> {
  const all = await mockResponse(mockFacts);
  if (!categoryId) return all;
  return all.filter((f) => f.categoryId === categoryId);
}

/**
 * Backend contract: GET /api/v1/facts/today
 * The single featured fact shown at the top of "دانستنی‌ها".
 */
export async function getTodayFact(): Promise<Fact> {
  const all = await mockResponse(mockFacts);
  return all.find((f) => f.featured) ?? all[0];
}
