import type { Lesson } from "@/types";
import { mockTodayLesson } from "@/lib/mock/lesson";
import { mockResponse } from "@/lib/api/config";

/**
 * Backend contract: GET /api/v1/lessons/today
 * Returns the letter/lesson the home screen's "درس امروز" card should show.
 */
export async function getTodayLesson(): Promise<Lesson> {
  return mockResponse(mockTodayLesson);
}
