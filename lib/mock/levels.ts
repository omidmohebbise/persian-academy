import type { Badge, BadgeIconKey, BadgeTheme } from "@/types";

export interface Level {
  id: string;
  title: string;
  emoji: string;
  /** Where "شروع" for this level goes. Empty for locked/not-yet-built levels. */
  practiceRoute: string;
  /** A "coming soon" placeholder on the roadmap — no content behind it yet. */
  locked: boolean;
  badge: {
    title: string;
    description: string;
    icon: BadgeIconKey;
    theme: BadgeTheme;
  };
}

/**
 * The curriculum roadmap: drives both the progress diagram
 * (components/LevelPath.tsx) on the level-complete screen and the
 * permanent badges a finished level grants (see getLevelBadges below),
 * shown in app/profile/page.tsx's "نشان‌های من" section.
 */
export const LEVELS: Level[] = [
  {
    id: "letters",
    title: "حروف",
    emoji: "✏️",
    practiceRoute: "/practice",
    locked: false,
    badge: {
      title: "بلد الفبا",
      description: "حروف فارسی رو یاد گرفتی",
      icon: "pencil",
      theme: "brand",
    },
  },
  {
    id: "words",
    title: "کلمه‌ها",
    emoji: "📝",
    practiceRoute: "/practice/words",
    locked: false,
    badge: {
      title: "کلمه‌ساز",
      description: "همه‌ی کلمه‌های تمرینی رو نوشتی",
      icon: "message-circle",
      theme: "gold",
    },
  },
  {
    id: "sentences",
    title: "جمله‌ها",
    emoji: "💬",
    practiceRoute: "",
    locked: true,
    badge: {
      title: "جمله‌ساز",
      description: "به‌زودی...",
      icon: "locked",
      theme: "locked",
    },
  },
  {
    id: "stories",
    title: "داستان‌ها",
    emoji: "📖",
    practiceRoute: "",
    locked: true,
    badge: {
      title: "قصه‌گو",
      description: "به‌زودی...",
      icon: "locked",
      theme: "locked",
    },
  },
];

/** The next level a learner can play — first unlocked level not yet completed. */
export function getNextLevel(completedLevelIds: string[]): Level | undefined {
  return LEVELS.find((l) => !l.locked && !completedLevelIds.includes(l.id));
}

/** Turns each level's badge metadata into a real Badge, achieved once completed. */
export function getLevelBadges(completedLevelIds: string[]): Badge[] {
  return LEVELS.map((level) => ({
    id: `badge_level_${level.id}`,
    title: level.badge.title,
    description: level.badge.description,
    icon: level.locked ? "locked" : level.badge.icon,
    theme: level.locked ? "locked" : level.badge.theme,
    achieved: completedLevelIds.includes(level.id),
  }));
}
