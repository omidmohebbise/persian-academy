import type { PracticeWord, WordSubmissionResult } from "@/types";
import { mockResponse } from "@/lib/api/config";
import { mockPracticeWords, XP_PER_PRACTICE_ITEM } from "@/lib/mock/practiceWords";

/**
 * Backend contract: GET /api/v1/practice/words
 * Returns the writing-practice curriculum: one representative word per
 * Persian letter, each broken into its isolated-form letters.
 */
export async function getPracticeWords(): Promise<PracticeWord[]> {
  return mockResponse(mockPracticeWords);
}

/**
 * Backend contract: POST /api/v1/practice/words/:id/submit
 * Records that the learner traced this word's letters and awards XP. A real
 * backend would also score the actual stroke input; the mock always succeeds.
 */
export async function submitWordWriting(
  word: PracticeWord
): Promise<WordSubmissionResult> {
  return mockResponse(
    {
      success: true,
      xpEarned: XP_PER_PRACTICE_ITEM,
      message: `کلمه «${word.word}» را نوشتی!`,
    },
    400
  );
}
