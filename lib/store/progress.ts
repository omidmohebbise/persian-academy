/**
 * Pure, framework-free progress logic — no React, no localStorage — so it's
 * trivial to unit test and to eventually move onto a real backend unchanged.
 * lib/store/AppStateContext.tsx is the only caller today.
 */
import type { ProgressUpdate, Story, User } from "@/types";

/**
 * Every 100 words is a level, per the project description's milestones
 * ("Level 3 — You know 300 Persian words!"). Levels start at 1 (not 0) so a
 * brand-new learner isn't shown "Level 0"; a level-up fires the moment
 * wordsLearned crosses each new hundred (100, 200, 300, ...).
 */
export function computeLevel(wordsLearned: number): number {
  return Math.floor(wordsLearned / 100) + 1;
}

export interface AppSnapshot {
  user: User;
  stories: Story[];
}

/**
 * Applies "the learner just learned one new word worth `xpEarned` XP" to a
 * snapshot: bumps XP/word count, recomputes level, and — if any story is
 * still waiting on words to unlock — advances the nearest one, unlocking it
 * once its countdown hits zero.
 */
export function applyWordLearned(
  snapshot: AppSnapshot,
  xpEarned: number
): { next: AppSnapshot; update: ProgressUpdate } {
  const wordsLearned = snapshot.user.wordsLearned + 1;
  const newLevel = computeLevel(wordsLearned);
  const leveledUp = newLevel > snapshot.user.level;

  const stories = [...snapshot.stories];
  const nextLockedIndex = stories.findIndex(
    (s) => s.status === "locked" && (s.wordsToUnlock ?? 0) > 0
  );

  let unlockedStoryTitle: string | null = null;
  if (nextLockedIndex !== -1) {
    const target = stories[nextLockedIndex];
    const remaining = (target.wordsToUnlock ?? 1) - 1;
    if (remaining <= 0) {
      unlockedStoryTitle = target.title;
      stories[nextLockedIndex] = {
        ...target,
        status: "completed",
        progressPercent: 0,
        wordsToUnlock: undefined,
      };
    } else {
      stories[nextLockedIndex] = { ...target, wordsToUnlock: remaining };
    }
  }

  const next: AppSnapshot = {
    user: {
      ...snapshot.user,
      xp: snapshot.user.xp + xpEarned,
      wordsLearned,
      level: newLevel,
      levelWordsRequired: newLevel * 100,
      stats: { ...snapshot.user.stats, wordsKnown: wordsLearned },
    },
    stories,
  };

  return {
    next,
    update: { xpEarned, leveledUp, newLevel, unlockedStoryTitle },
  };
}
