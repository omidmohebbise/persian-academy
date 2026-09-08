import type { PersianLetterInfo } from "@/types";

/**
 * Stylized dashed-guide templates shared by letters that draw from the same
 * base shape (accurate to real Naskh/Persian script: ب‌/پ‌/ت‌/ث‌/ن‌ are
 * literally the same seat shape with different dots, ج‌/چ‌/ح‌/خ‌ share one
 * bowl, د‌/ذ‌ share one hook, etc.). Each template is one dashed stroke in a
 * 0–100 square viewBox; the numbered start marker is drawn at its first point.
 */
const T = {
  vLine: { d: "M50 15 L50 85", startX: 50, startY: 15 },
  bowlSeat: {
    d: "M78 45 Q78 80 50 80 Q22 80 22 45",
    startX: 78,
    startY: 45,
  },
  openBowl: {
    d: "M75 35 Q80 65 55 78 Q35 88 20 70",
    startX: 75,
    startY: 35,
  },
  diagonalHook: {
    d: "M75 25 Q78 55 55 68 Q40 76 32 70",
    startX: 75,
    startY: 25,
  },
  diagonalSwoop: {
    d: "M70 40 Q72 62 50 66 Q30 70 18 82",
    startX: 70,
    startY: 40,
  },
  loop: {
    d: "M65 40 Q72 55 60 68 Q50 78 38 68 Q28 58 35 45 Q42 32 55 33 Q62 34 65 40",
    startX: 65,
    startY: 40,
  },
  hookDescender: {
    d: "M58 15 L58 62 Q58 82 35 82",
    startX: 58,
    startY: 15,
  },
} as const;

const ABOVE_1 = [{ x: 50, y: 18 }];
const ABOVE_2 = [
  { x: 42, y: 18 },
  { x: 58, y: 18 },
];
const ABOVE_3 = [
  { x: 35, y: 16 },
  { x: 50, y: 13 },
  { x: 65, y: 16 },
];
const BELOW_1 = [{ x: 50, y: 90 }];
const BELOW_2 = [
  { x: 42, y: 90 },
  { x: 58, y: 90 },
];
const BELOW_3 = [
  { x: 35, y: 91 },
  { x: 50, y: 94 },
  { x: 65, y: 91 },
];
const INSIDE_1 = [{ x: 45, y: 62 }];
const NONE: { x: number; y: number }[] = [];

/**
 * All 32 Persian alphabet letters, isolated form, with a simplified writing
 * guide. Backs the letter-writing practice screen (components/LetterWritingPractice.tsx)
 * and its PracticeWord curriculum (lib/mock/practiceWords.ts).
 */
export const PERSIAN_LETTERS: PersianLetterInfo[] = [
  { glyph: "ا", name: "الف", strokes: [T.vLine], dots: NONE },
  { glyph: "ب", name: "به", strokes: [T.bowlSeat], dots: BELOW_1 },
  { glyph: "پ", name: "په", strokes: [T.bowlSeat], dots: BELOW_3 },
  { glyph: "ت", name: "ته", strokes: [T.bowlSeat], dots: ABOVE_2 },
  { glyph: "ث", name: "ثه", strokes: [T.bowlSeat], dots: ABOVE_3 },
  { glyph: "ج", name: "جیم", strokes: [T.openBowl], dots: INSIDE_1 },
  { glyph: "چ", name: "چه", strokes: [T.openBowl], dots: BELOW_3 },
  { glyph: "ح", name: "حه", strokes: [T.openBowl], dots: NONE },
  { glyph: "خ", name: "خه", strokes: [T.openBowl], dots: ABOVE_1 },
  { glyph: "د", name: "دال", strokes: [T.diagonalHook], dots: NONE },
  { glyph: "ذ", name: "ذال", strokes: [T.diagonalHook], dots: ABOVE_1 },
  { glyph: "ر", name: "ره", strokes: [T.diagonalSwoop], dots: NONE },
  { glyph: "ز", name: "زه", strokes: [T.diagonalSwoop], dots: ABOVE_1 },
  { glyph: "ژ", name: "ژه", strokes: [T.diagonalSwoop], dots: ABOVE_1 },
  { glyph: "س", name: "سین", strokes: [T.bowlSeat], dots: NONE },
  { glyph: "ش", name: "شین", strokes: [T.bowlSeat], dots: ABOVE_3 },
  { glyph: "ص", name: "صاد", strokes: [T.openBowl], dots: NONE },
  { glyph: "ض", name: "ضاد", strokes: [T.openBowl], dots: ABOVE_1 },
  { glyph: "ط", name: "طا", strokes: [T.loop], dots: NONE },
  { glyph: "ظ", name: "ظا", strokes: [T.loop], dots: ABOVE_1 },
  { glyph: "ع", name: "عین", strokes: [T.loop], dots: NONE },
  { glyph: "غ", name: "غین", strokes: [T.loop], dots: ABOVE_1 },
  { glyph: "ف", name: "فه", strokes: [T.loop], dots: ABOVE_1 },
  { glyph: "ق", name: "قاف", strokes: [T.loop], dots: ABOVE_2 },
  { glyph: "ک", name: "کاف", strokes: [T.hookDescender], dots: NONE },
  { glyph: "گ", name: "گاف", strokes: [T.hookDescender], dots: ABOVE_1 },
  { glyph: "ل", name: "لام", strokes: [T.hookDescender], dots: NONE },
  { glyph: "م", name: "میم", strokes: [T.loop], dots: NONE },
  { glyph: "ن", name: "نون", strokes: [T.bowlSeat], dots: ABOVE_1 },
  { glyph: "و", name: "واو", strokes: [T.loop], dots: NONE },
  { glyph: "ه", name: "هه", strokes: [T.loop], dots: NONE },
  { glyph: "ی", name: "یه", strokes: [T.bowlSeat], dots: BELOW_2 },
];

/**
 * The order letters are introduced in, for the Level 1 "learn to draw"
 * curriculum (components/LetterDrawingPractice.tsx via app/practice/page.tsx).
 * Starts with the same five letters — م‌ا‌د‌ر‌س — the "بخوانیم" first-grade
 * primer opens with, since they're enough to build simple words like مادر
 * and در right away; the rest follow in alphabet order.
 */
export const LETTER_LEARNING_ORDER: string[] = [
  "م",
  "ا",
  "د",
  "ر",
  "س",
  ...PERSIAN_LETTERS.map((l) => l.glyph).filter(
    (g) => !["م", "ا", "د", "ر", "س"].includes(g)
  ),
];

const LETTERS_BY_GLYPH: Record<string, PersianLetterInfo> = Object.fromEntries(
  PERSIAN_LETTERS.map((l) => [l.glyph, l])
);

/** Looks up a letter's writing guide by its glyph, e.g. getLetterInfo("ن"). */
export function getLetterInfo(glyph: string): PersianLetterInfo {
  return LETTERS_BY_GLYPH[glyph] ?? { glyph, name: glyph, strokes: [], dots: [] };
}
