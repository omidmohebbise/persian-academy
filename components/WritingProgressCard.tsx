"use client";

import { Trophy } from "lucide-react";
import Avatar from "@/components/Avatar";
import { useAppState } from "@/lib/store/AppStateContext";
import { toPersianDigits } from "@/lib/format";
import {
  WRITING_GOAL_LETTERS,
  WRITING_BADGE_MILESTONES,
} from "@/lib/mock/practiceWords";

/** The learner's writing-progress summary — shared by every practice screen. */
export default function WritingProgressCard() {
  const { user } = useAppState();

  const writingPercent = Math.min(
    100,
    (user.lettersWritten / WRITING_GOAL_LETTERS) * 100
  );
  const nextBadgeLetters =
    WRITING_BADGE_MILESTONES.find((m) => m > user.lettersWritten) ??
    WRITING_BADGE_MILESTONES[WRITING_BADGE_MILESTONES.length - 1];

  return (
    <section className="mt-5 flex items-center gap-3 rounded-3xl border border-black/5 bg-white p-4 shadow-card">
      <Avatar size={52} />
      <div className="text-right">
        <p className="text-sm font-extrabold text-ink">{user.name}</p>
        <span className="mt-1 inline-block rounded-md bg-brand-50 px-2 py-0.5 text-[11px] font-bold text-brand-600">
          Lv.{toPersianDigits(user.level)}
        </span>
      </div>
      <div className="flex-1">
        <p className="text-xs font-semibold text-ink/50">پیشرفت نوشتن</p>
        <div className="mt-1.5 flex items-center gap-2">
          <div className="h-2 flex-1 rounded-full bg-black/10">
            <div
              className="h-2 rounded-full bg-brand-500"
              style={{ width: `${writingPercent}%` }}
            />
          </div>
          <span className="shrink-0 text-sm font-extrabold text-ink">
            {toPersianDigits(user.lettersWritten)} /{" "}
            {toPersianDigits(WRITING_GOAL_LETTERS)}
          </span>
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-center gap-1 text-center">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-50 text-gold-500">
          <Trophy size={18} />
        </span>
        <p className="text-[10px] leading-tight text-ink/45">
          مدال بعدی
          <br />
          {toPersianDigits(nextBadgeLetters)} حرف بنویس
        </p>
      </div>
    </section>
  );
}
