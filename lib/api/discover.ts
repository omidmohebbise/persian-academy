import type { LessonPath, WordSubmissionResult } from "@/types";
import { mockResponse } from "@/lib/api/config";
import { ENGLISH_TO_PERSIAN, lookupWord } from "@/lib/mock/dictionary";

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Backend contract: POST /api/v1/lessons/generate
 * Body: { word: string, sourceLocale: string }
 * Generates the "Teach Me" learning path for a word the user already knows
 * in another language — the letter/pronunciation/example/quiz steps the
 * project description asks for. Pure content generation: no XP or progress
 * side effects happen here (see submitForeignWord for that).
 */
export async function generateLessonPath(word: string): Promise<LessonPath> {
  const entry = lookupWord(word);
  const distractors = shuffle(
    Object.values(ENGLISH_TO_PERSIAN)
      .map((e) => e.fa)
      .filter((fa) => fa !== entry.fa)
  ).slice(0, 2);

  return mockResponse(
    {
      sourceWord: word.trim(),
      persianWord: entry.fa,
      transliteration: entry.transliteration,
      emoji: entry.emoji,
      exampleFa: entry.exampleFa,
      exampleEn: entry.exampleEn,
      quizOptions: shuffle([entry.fa, ...distractors]),
    },
    500
  );
}

/**
 * Backend contract: POST /api/v1/vocabulary/from-foreign-word
 * Body: { word: string, sourceLocale: string }
 * Called once the learner finishes the generated learning path (not on
 * form submit) — records that the Persian word was learned and awards XP.
 */
export async function submitForeignWord(
  word: string,
  sourceLocale = "en"
): Promise<WordSubmissionResult> {
  const trimmed = word.trim();
  if (!trimmed) {
    return mockResponse(
      { success: false, xpEarned: 0, message: "لطفاً یک کلمه وارد کن." },
      150
    );
  }
  const entry = lookupWord(trimmed);
  return mockResponse(
    {
      success: true,
      xpEarned: 50,
      translatedWord: entry.fa,
      message: `کلمه "${entry.fa}" را یاد گرفتی!`,
    },
    300
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
      message: `عالی بود! "${trimmed}" را می‌دانی.`,
    },
    600
  );
}
