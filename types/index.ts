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
  stats: UserStats;
  weekCalendar: WeekDayStatus[];
}

export type BadgeIconKey =
  | "sprout"
  | "star"
  | "book"
  | "calendar-check"
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
