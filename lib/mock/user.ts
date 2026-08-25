import type { Badge, User } from "@/types";

export const mockUser: User = {
  id: "user_1",
  name: "آرین",
  avatarSeed: "arian-01",
  xp: 1250,
  streakDays: 7,
  goalWords: 3000,
  wordsLearned: 97,
  // Every 100 words is a level, per the project description's "0 → 100 →
  // 200 → ... Level Up" milestones (see lib/store/AppStateContext.tsx).
  level: 1,
  levelWordsRequired: 100,
  stats: {
    storiesRead: 8,
    factsLearned: 3,
    wordsKnown: 97,
  },
  weekCalendar: [
    { day: "ش", completed: true },
    { day: "ی", completed: true },
    { day: "د", completed: true },
    { day: "س", completed: true },
    { day: "چ", completed: true },
    { day: "پ", completed: true },
    { day: "ج", completed: false },
  ],
};

export const mockBadges: Badge[] = [
  {
    id: "badge_first_word",
    title: "اولین کلمه",
    description: "اولین کلمه را یاد گرفتی",
    icon: "sprout",
    theme: "brand",
    achieved: true,
  },
  {
    id: "badge_100_words",
    title: "۱۰۰ کلمه",
    description: "۱۰۰ کلمه یاد گرفتی",
    icon: "star",
    theme: "sky",
    achieved: true,
  },
  {
    id: "badge_first_story",
    title: "اولین داستان",
    description: "یک داستان خواندی",
    icon: "book",
    theme: "gold",
    achieved: true,
  },
  {
    id: "badge_7_day_streak",
    title: "۷ روز پشت سر هم",
    description: "یک هفته متوالی یاد گرفتی",
    icon: "calendar-check",
    theme: "purple",
    achieved: true,
  },
  {
    id: "badge_50_stories",
    title: "۵۰ داستان",
    description: "۵۰ داستان بخوان",
    icon: "locked",
    theme: "locked",
    achieved: false,
    progressCurrent: 8,
    progressTarget: 50,
  },
];
