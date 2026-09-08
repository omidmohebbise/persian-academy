"use client";

import { Check, Lock } from "lucide-react";
import { LEVELS, getNextLevel } from "@/lib/mock/levels";

/**
 * The curriculum roadmap: a small row of level nodes (done ✓ / next / locked
 * 🔒), so a learner can see the whole journey, not just the level they just
 * finished. Same visual language (checkmark badge, lock icon) as
 * components/PracticeShelf.tsx, just for whole levels instead of items.
 */
export default function LevelPath({
  completedLevelIds,
}: {
  completedLevelIds: string[];
}) {
  const nextLevel = getNextLevel(completedLevelIds);

  return (
    <div dir="ltr" className="flex items-center justify-center">
      {LEVELS.map((level, i) => {
        const done = completedLevelIds.includes(level.id);
        const isNext = level.id === nextLevel?.id;
        const status = done ? "done" : isNext ? "next" : "locked";

        return (
          <div key={level.id} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <span
                className={`relative flex h-12 w-12 items-center justify-center rounded-2xl text-xl ${
                  status === "done"
                    ? "bg-brand-500 text-white"
                    : status === "next"
                    ? "border-2 border-brand-500 bg-brand-50"
                    : "bg-black/5 text-ink/25"
                }`}
              >
                {status === "locked" ? <Lock size={16} /> : level.emoji}
                {status === "done" && (
                  <span className="absolute -left-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold-500 text-white">
                    <Check size={10} strokeWidth={3} />
                  </span>
                )}
              </span>
              <p
                className={`text-[11px] font-bold ${
                  status === "locked" ? "text-ink/30" : "text-ink"
                }`}
              >
                {level.title}
              </p>
            </div>
            {i < LEVELS.length - 1 && (
              <div
                className={`mb-4 h-0.5 w-6 ${
                  done ? "bg-brand-500" : "bg-black/10"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
