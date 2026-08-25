import type { WordSubmissionResult } from "@/types";
import { mockResponse } from "@/lib/api/config";

/**
 * Backend contract: POST /api/v1/vocabulary/from-foreign-word
 * Body: { word: string, sourceLocale: string }
 * The learner enters a word they already know in another language; the
 * backend teaches them the Persian equivalent and awards XP.
 */
export async function submitForeignWord(
  word: string,
  sourceLocale = "en"
): Promise<WordSubmissionResult> {
  const trimmed = word.trim();
  if (!trimmed) {
    return mockResponse(
      {
        success: false,
        xpEarned: 0,
        message: "لطفاً یک کلمه وارد کن.",
      },
      150
    );
  }
  return mockResponse(
    {
      success: true,
      xpEarned: 50,
      translatedWord: trimmed,
      message: `کلمه جدید یاد گرفتی! +۵۰ XP`,
    },
    600
  );
}

/**
 * Backend contract: POST /api/v1/vocabulary/from-persian-word
 * Body: { word: string }
 * The learner enters a Persian word they already know; the backend checks
 * their level against it and may unlock new lessons/stories.
 */
export async function submitPersianWord(
  word: string
): Promise<WordSubmissionResult> {
  const trimmed = word.trim();
  if (!trimmed) {
    return mockResponse(
      {
        success: false,
        xpEarned: 0,
        message: "لطفاً یک کلمه فارسی وارد کن.",
      },
      150
    );
  }
  return mockResponse(
    {
      success: true,
      xpEarned: 50,
      message: `عالی بود! "${trimmed}" را می‌دانی. +۵۰ XP`,
    },
    600
  );
}
