"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import confetti from "canvas-confetti";
import { Gift, ChevronLeft, Sparkles } from "lucide-react";
import LevelPath from "@/components/LevelPath";
import { useAppState } from "@/lib/store/AppStateContext";
import { toPersianDigits } from "@/lib/format";
import { LEVELS, getNextLevel } from "@/lib/mock/levels";
import {
  mockPracticeLetters,
  mockPracticeWords,
  XP_PER_PRACTICE_ITEM,
} from "@/lib/mock/practiceWords";

const ITEM_COUNTS: Record<string, number> = {
  letters: mockPracticeLetters.length,
  words: mockPracticeWords.length,
};

/** Next.js requires useSearchParams() to sit under a Suspense boundary for static export. */
export default function LevelCompletePage() {
  return (
    <Suspense fallback={null}>
      <LevelCompleteContent />
    </Suspense>
  );
}

function LevelCompleteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const levelId = searchParams.get("level");
  const { user, completeLevel } = useAppState();
  const [opened, setOpened] = useState(false);

  const level = LEVELS.find((l) => l.id === levelId);

  useEffect(() => {
    if (!level) {
      router.replace("/");
      return;
    }
    completeLevel(level.id);
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.4 } });
  }, [level?.id]);

  if (!level) return null;

  // Reflects this level as done immediately, without waiting on the
  // completeLevel() state update above to commit and re-render.
  const completedIds = user.completedLevelIds.includes(level.id)
    ? user.completedLevelIds
    : [...user.completedLevelIds, level.id];

  const itemCount = ITEM_COUNTS[level.id] ?? 0;
  const xpEarned = itemCount * XP_PER_PRACTICE_ITEM;
  const nextLevel = getNextLevel(completedIds);

  return (
    <main dir="rtl" className="flex flex-col items-center px-6 pt-16 text-center">
      <div className="flex items-center justify-center gap-2">
        <span className="animate-float-up text-3xl">⭐️</span>
        <span className="animate-gentle-bounce text-6xl">🏆</span>
        <span
          className="animate-float-up text-3xl"
          style={{ animationDelay: "0.4s" }}
        >
          ✨
        </span>
      </div>

      <h1 className="mt-4 text-2xl font-extrabold text-brand-600">آفرین! 🎉</h1>
      <p className="mt-2 text-lg font-extrabold text-ink">
        سطح «{level.title}» رو تموم کردی!
      </p>
      <p className="mt-1 text-sm text-ink/50">حالا یه‌کم فارسی بلدی! 🥳</p>

      <div className="mt-6 flex w-full items-center justify-center gap-3 rounded-3xl bg-white p-4 shadow-card">
        <div className="flex-1 text-center">
          <p className="text-2xl font-extrabold text-brand-600">
            {toPersianDigits(itemCount)}
          </p>
          <p className="text-xs text-ink/45">
            {level.id === "letters" ? "حرف" : "کلمه"} یاد گرفتی
          </p>
        </div>
        <div className="h-10 w-px bg-black/10" />
        <div className="flex-1 text-center">
          <p className="text-2xl font-extrabold text-gold-500">
            +{toPersianDigits(xpEarned)}
          </p>
          <p className="text-xs text-ink/45">XP گرفتی</p>
        </div>
      </div>

      <button
        onClick={() => setOpened(true)}
        disabled={opened}
        className="mt-6 w-full rounded-3xl border-2 border-dashed border-purple-400/40 bg-purple-50 p-5 transition active:scale-[0.98]"
      >
        {!opened ? (
          <div className="flex flex-col items-center gap-2">
            <Gift size={36} className="animate-gentle-bounce text-purple-500" />
            <p className="text-sm font-bold text-purple-600">
              جایزه‌ت رو باز کن! 🎁
            </p>
          </div>
        ) : (
          <div className="animate-pop-in flex flex-col items-center gap-2">
            <Sparkles size={36} className="text-gold-500" />
            <p className="text-base font-extrabold text-ink">
              {level.badge.title}
            </p>
            <p className="text-xs text-ink/45">{level.badge.description}</p>
          </div>
        )}
      </button>

      <div className="mt-8 w-full">
        <p className="text-xs font-bold text-ink/40">مسیر یادگیری تو</p>
        <div className="mt-3">
          <LevelPath completedLevelIds={completedIds} />
        </div>
      </div>

      {nextLevel ? (
        <Link
          href={nextLevel.practiceRoute}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-500 py-3.5 text-base font-bold text-white shadow-soft transition active:scale-[0.98]"
        >
          برو به سطح بعدی: {nextLevel.title}
          <ChevronLeft size={18} />
        </Link>
      ) : (
        <div className="mt-8 w-full">
          <p className="text-sm text-ink/45">به‌زودی سطح جدید میاد! 🚧</p>
          <Link
            href="/"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-500 py-3.5 text-base font-bold text-white shadow-soft transition active:scale-[0.98]"
          >
            برگرد به خانه
          </Link>
        </div>
      )}
    </main>
  );
}
