"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Trophy, Lock, Check, Gift } from "lucide-react";
import Avatar from "@/components/Avatar";
import StatsPill from "@/components/StatsPill";
import LetterWritingPractice from "@/components/LetterWritingPractice";
import { useAppState } from "@/lib/store/AppStateContext";
import { toPersianDigits } from "@/lib/format";
import {
  mockPracticeWords,
  WRITING_BATCH_SIZE,
  WRITING_GOAL_LETTERS,
  WRITING_BADGE_MILESTONES,
} from "@/lib/mock/practiceWords";

export default function PracticePage() {
  const router = useRouter();
  const { user, practiceWordWritten } = useAppState();

  const [index, setIndex] = useState(0);
  const [checked, setChecked] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [finished, setFinished] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [resetToken, setResetToken] = useState(0);

  const word = mockPracticeWords[index];
  const isLastWord = index === mockPracticeWords.length - 1;

  async function handleCheck() {
    const { result } = await practiceWordWritten(word);
    setXpEarned(result.xpEarned);
    setChecked(true);
  }

  function handleClear() {
    setHasDrawn(false);
    setResetToken((t) => t + 1);
  }

  function handleNext() {
    if (isLastWord) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setChecked(false);
    handleClear();
  }

  const writingPercent = Math.min(
    100,
    (user.lettersWritten / WRITING_GOAL_LETTERS) * 100
  );
  const nextBadgeLetters =
    WRITING_BADGE_MILESTONES.find((m) => m > user.lettersWritten) ??
    WRITING_BADGE_MILESTONES[WRITING_BADGE_MILESTONES.length - 1];

  const batchStart = Math.floor(index / WRITING_BATCH_SIZE) * WRITING_BATCH_SIZE;
  const batchWords = mockPracticeWords.slice(
    batchStart,
    batchStart + WRITING_BATCH_SIZE
  );
  const batchComplete = index >= batchStart + WRITING_BATCH_SIZE - 1 && checked;

  return (
    <main className="px-4 pt-6">
      <div className="flex items-center justify-between">
        <StatsPill xp={user.xp} streak={user.streakDays} />
        <button
          onClick={() => router.back()}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-card"
        >
          <ArrowRight size={18} className="text-ink/70" />
        </button>
      </div>

      <div className="mt-4">
        <h1 className="text-2xl font-extrabold text-ink">
          تمرین نوشتن <span className="align-middle">✏️</span>
        </h1>
        <p className="mt-1 text-sm text-ink/45">
          با انگشتت بنویس و فارسی را زیباتر یاد بگیر!
        </p>
      </div>

      {/* Profile + writing progress card */}
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

      {/* Practice card or completion state */}
      <div className="mt-5">
        {!finished ? (
          <LetterWritingPractice
            word={word}
            wordNumber={index + 1}
            totalWords={mockPracticeWords.length}
            checked={checked}
            hasDrawn={hasDrawn}
            resetToken={resetToken}
            xpEarned={xpEarned}
            onDraw={() => setHasDrawn(true)}
            onClear={handleClear}
            onCheck={handleCheck}
            onNext={handleNext}
          />
        ) : (
          <div className="rounded-3xl bg-white p-6 text-center shadow-card">
            <span className="text-5xl">🎉</span>
            <p className="mt-3 text-lg font-extrabold text-ink">
              همه‌ی حروف را تمرین کردی!
            </p>
            <p className="mt-1 text-sm text-ink/45">
              آفرین! تمام {toPersianDigits(mockPracticeWords.length)} کلمه را
              نوشتی.
            </p>
          </div>
        )}
      </div>

      {/* Practiced words shelf */}
      <section className="mt-6">
        <h3 className="text-right text-base font-extrabold text-ink">
          کلمات تمرین شده
        </h3>
        <div dir="ltr" className="no-scrollbar mt-3 flex gap-3 overflow-x-auto pb-1">
          {batchWords.map((w, i) => {
            const arrayIndex = batchStart + i;
            const status =
              arrayIndex < index ? "done" : arrayIndex === index ? "current" : "locked";
            return (
              <div
                key={w.id}
                className={`flex w-20 shrink-0 flex-col items-center gap-1.5 rounded-2xl p-2.5 text-center ${
                  status === "current"
                    ? "border-2 border-brand-500 bg-brand-50"
                    : "border border-black/5 bg-white"
                }`}
              >
                <span className="relative flex h-10 w-10 items-center justify-center text-2xl">
                  {status === "locked" ? (
                    <Lock size={16} className="text-ink/25" />
                  ) : (
                    w.emoji
                  )}
                  {status === "done" && (
                    <span className="absolute -left-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-500 text-white">
                      <Check size={10} strokeWidth={3} />
                    </span>
                  )}
                </span>
                <p
                  className={`text-xs font-bold ${
                    status === "locked" ? "text-ink/30" : "text-ink"
                  }`}
                >
                  {w.word}
                </p>
              </div>
            );
          })}

          <div
            className={`flex w-24 shrink-0 flex-col items-center justify-center gap-1.5 rounded-2xl p-2.5 text-center ${
              batchComplete ? "bg-purple-50" : "bg-purple-500/90"
            }`}
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
              <Gift size={18} className={batchComplete ? "text-purple-500" : "text-white"} />
              {!batchComplete && (
                <span className="absolute -left-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white">
                  <Lock size={9} className="text-purple-500" />
                </span>
              )}
            </span>
            <p
              className={`text-[10px] font-bold leading-tight ${
                batchComplete ? "text-purple-600" : "text-white"
              }`}
            >
              {toPersianDigits(WRITING_BATCH_SIZE)} کلمه بنویس و جایزه بگیر!
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
