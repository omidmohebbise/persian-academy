import type { PracticeWord } from "@/types";
import { LETTER_LEARNING_ORDER, getLetterInfo } from "@/lib/mock/letters";

/** Practiced words are grouped into batches of this size, each capped by a reward chest. */
export const WRITING_BATCH_SIZE = 5;

/** Total letters the writing-progress bar on the practice screen counts up to. */
export const WRITING_GOAL_LETTERS = 100;

/** Letter-count thresholds that award a "little writer" badge, in order. */
export const WRITING_BADGE_MILESTONES = [30, 60, 100];

/**
 * The writing-practice curriculum: one simple, kid-friendly word per Persian
 * letter (all 32), each broken into its isolated-form letters so
 * components/LetterWritingPractice.tsx can render a trace box per letter.
 * This is what "vasts" the practice component across the whole alphabet —
 * add a letter's featured word here and the practice screen picks it up.
 */
export const mockPracticeWords: PracticeWord[] = [
  { id: "w_abr", word: "ابر", letters: ["ا", "ب", "ر"], emoji: "☁️" },
  { id: "w_babr", word: "ببر", letters: ["ب", "ب", "ر"], emoji: "🐯" },
  { id: "w_parande", word: "پرنده", letters: ["پ", "ر", "ن", "د", "ه"], emoji: "🐦" },
  { id: "w_top", word: "توپ", letters: ["ت", "و", "پ"], emoji: "⚽" },
  { id: "w_sanie", word: "ثانیه", letters: ["ث", "ا", "ن", "ی", "ه"], emoji: "⏱️" },
  { id: "w_juje", word: "جوجه", letters: ["ج", "و", "ج", "ه"], emoji: "🐥" },
  { id: "w_chatr", word: "چتر", letters: ["چ", "ت", "ر"], emoji: "☂️" },
  { id: "w_heyvan", word: "حیوان", letters: ["ح", "ی", "و", "ا", "ن"], emoji: "🐾" },
  { id: "w_khargoosh", word: "خرگوش", letters: ["خ", "ر", "گ", "و", "ش"], emoji: "🐰" },
  { id: "w_darb", word: "درب", letters: ["د", "ر", "ب"], emoji: "🚪" },
  { id: "w_zorat", word: "ذرت", letters: ["ذ", "ر", "ت"], emoji: "🌽" },
  { id: "w_roobah", word: "روباه", letters: ["ر", "و", "ب", "ا", "ه"], emoji: "🦊" },
  { id: "w_zarafe", word: "زرافه", letters: ["ز", "ر", "ا", "ف", "ه"], emoji: "🦒" },
  { id: "w_zhele", word: "ژله", letters: ["ژ", "ل", "ه"], emoji: "🍮" },
  { id: "w_sib", word: "سیب", letters: ["س", "ی", "ب"], emoji: "🍎" },
  { id: "w_shir", word: "شیر", letters: ["ش", "ی", "ر"], emoji: "🦁" },
  { id: "w_sandali", word: "صندلی", letters: ["ص", "ن", "د", "ل", "ی"], emoji: "🪑" },
  { id: "w_zarban", word: "ضربان", letters: ["ض", "ر", "ب", "ا", "ن"], emoji: "💓" },
  { id: "w_tooti", word: "طوطی", letters: ["ط", "و", "ط", "ی"], emoji: "🦜" },
  { id: "w_zarf", word: "ظرف", letters: ["ظ", "ر", "ف"], emoji: "🍽️" },
  { id: "w_eynak", word: "عینک", letters: ["ع", "ی", "ن", "ک"], emoji: "👓" },
  { id: "w_ghaz", word: "غاز", letters: ["غ", "ا", "ز"], emoji: "🦢" },
  { id: "w_fil", word: "فیل", letters: ["ف", "ی", "ل"], emoji: "🐘" },
  { id: "w_ghayegh", word: "قایق", letters: ["ق", "ا", "ی", "ق"], emoji: "⛵" },
  { id: "w_ketab", word: "کتاب", letters: ["ک", "ت", "ا", "ب"], emoji: "📚" },
  { id: "w_gorbe", word: "گربه", letters: ["گ", "ر", "ب", "ه"], emoji: "🐱" },
  { id: "w_lakposht", word: "لاکپشت", letters: ["ل", "ا", "ک", "پ", "ش", "ت"], emoji: "🐢" },
  { id: "w_madar", word: "مادر", letters: ["م", "ا", "د", "ر"], emoji: "👩" },
  { id: "w_nan", word: "نان", letters: ["ن", "ا", "ن"], emoji: "🍞" },
  { id: "w_varzesh", word: "ورزش", letters: ["و", "ر", "ز", "ش"], emoji: "🏃" },
  { id: "w_havapeyma", word: "هواپیما", letters: ["ه", "و", "ا", "پ", "ی", "م", "ا"], emoji: "✈️" },
  { id: "w_yakh", word: "یخ", letters: ["ی", "خ"], emoji: "🧊" },
];

/** The word that best demonstrates a given letter — its first letter. */
export function getExampleWordForLetter(glyph: string): PracticeWord | undefined {
  return mockPracticeWords.find((w) => w.letters[0] === glyph);
}

/**
 * The Level 1 "learn to draw" curriculum: the first batch of
 * LETTER_LEARNING_ORDER, modeled as single-letter PracticeWords so the same
 * progress/XP plumbing (AppStateContext#practiceWordWritten) and shelf UI
 * (components/PracticeShelf.tsx) work unchanged for both letters and words.
 */
export const mockPracticeLetters: PracticeWord[] = LETTER_LEARNING_ORDER.slice(
  0,
  WRITING_BATCH_SIZE
).map((glyph) => ({
  id: `letter_${getLetterInfo(glyph).name}`,
  word: glyph,
  letters: [glyph],
  emoji: getExampleWordForLetter(glyph)?.emoji ?? "✏️",
}));
