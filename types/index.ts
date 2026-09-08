/**
 * Domain types shared between the mock API layer (lib/api/*) and the UI.
 * These are the contracts the real backend should implement — every field
 * here is something a page actually renders today.
 */

export type WeekDayLabel = "ش" | "ی" | "د" | "س" | "چ" | "پ" | "ج";

export interface WeekDayStatus {
  day: WeekDayLabel;
  completed: boolean;
}

export interface UserStats {
  storiesRead: number;
  factsLearned: number;
  wordsKnown: number;
}

export interface User {
  id: string;
  name: string;
  /** Deterministic seed for the generated avatar illustration. */
  avatarSeed: string;
  xp: number;
  streakDays: number;
  goalWords: number;
  wordsLearned: number;
  level: number;
  levelWordsRequired: number;
  /** Total individual letters traced across all writing-practice words. */
  lettersWritten: number;
  /** Ids of curriculum levels (lib/mock/levels.ts) finished so far. */
  completedLevelIds: string[];
  stats: UserStats;
  weekCalendar: WeekDayStatus[];
}

export type BadgeIconKey =
  | "sprout"
  | "star"
  | "book"
  | "calendar-check"
  | "pencil"
  | "message-circle"
  | "locked";

export type BadgeTheme = "brand" | "sky" | "gold" | "purple" | "locked";

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: BadgeIconKey;
  theme: BadgeTheme;
  achieved: boolean;
  progressCurrent?: number;
  progressTarget?: number;
}

export interface Lesson {
  id: string;
  letter: string;
  title: string;
  description: string;
}

export type CoverTheme =
  | "forest"
  | "night"
  | "wood"
  | "moss"
  | "sand"
  | "clay"
  | "mist"
  | "lilac"
  | "peach"
  | "sky";

export type StoryStatus = "completed" | "locked";

export interface Story {
  id: string;
  slug: string;
  title: string;
  emoji: string;
  coverTheme: CoverTheme;
  status: StoryStatus;
  progressPercent?: number;
  wordsToUnlock?: number;
}

export interface FactCategory {
  id: string;
  slug: string;
  label: string;
  icon: string;
}

export interface Fact {
  id: string;
  categoryId: string;
  title: string;
  descriptionFa: string;
  descriptionEn: string;
  emoji: string;
  coverTheme: CoverTheme;
  featured?: boolean;
  photoIndex?: number;
  photoTotal?: number;
}

export interface WordSubmissionResult {
  success: boolean;
  xpEarned: number;
  /** For the "foreign word -> Persian" flow: the taught Persian word. */
  translatedWord?: string;
  message: string;
}

/**
 * A generated "Teach Me" learning path for one foreign word: the minimal
 * shape of the project description's "relevant letters, pronunciation,
 * images, examples, exercises, repetition, final word" lesson.
 */
export interface LessonPath {
  sourceWord: string;
  persianWord: string;
  transliteration: string;
  emoji: string;
  exampleFa: string;
  exampleEn: string;
  /** Multiple-choice quiz options (includes the correct answer), pre-shuffled. */
  quizOptions: string[];
}

/** Result of applying a learned word to the user's progress. */
export interface ProgressUpdate {
  xpEarned: number;
  leveledUp: boolean;
  newLevel: number;
  unlockedStoryTitle: string | null;
}

/**
 * One dashed guide stroke for the letter-writing practice screen: a path in
 * a 0–100 square viewBox, plus where its numbered start marker sits.
 */
export interface LetterStroke {
  d: string;
  startX: number;
  startY: number;
}

/** A single Persian alphabet letter's writing-practice guide (isolated form). */
export interface PersianLetterInfo {
  glyph: string;
  /** The letter's spoken name, e.g. "الف" for ا. */
  name: string;
  strokes: LetterStroke[];
  /** Diacritic dots, drawn after the strokes as small diamond markers. */
  dots: { x: number; y: number }[];
}

/** One word in the writing-practice curriculum — one per Persian letter. */
export interface PracticeWord {
  id: string;
  word: string;
  /** The word's letters in reading order, isolated-form glyphs. */
  letters: string[];
  emoji: string;
}

/** Result of applying a traced word to the user's writing progress. */
export interface WritingUpdate {
  xpEarned: number;
  lettersWritten: number;
}

/** Result of requesting an OTP code for a phone number. */
export interface OtpRequestResult {
  success: boolean;
  message: string;
}

/** Result of verifying an OTP code against a phone number. */
export interface OtpVerifyResult {
  success: boolean;
  message: string;
}
