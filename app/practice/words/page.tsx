"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import StatsPill from "@/components/StatsPill";
import LetterWritingPractice from "@/components/LetterWritingPractice";
import WritingProgressCard from "@/components/WritingProgressCard";
import PracticeShelf from "@/components/PracticeShelf";
import { useAppState } from "@/lib/store/AppStateContext";
import { toPersianDigits } from "@/lib/format";
import { mockPracticeWords } from "@/lib/mock/practiceWords";

export default function WordsPracticePage() {
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
          حالا با کلمه‌ها تمرین کن و نوشتنت را قشنگ‌تر کن!
        </p>
      </div>

      <WritingProgressCard />

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
              همه‌ی کلمه‌ها را تمرین کردی!
            </p>
            <p className="mt-1 text-sm text-ink/45">
              آفرین! تمام {toPersianDigits(mockPracticeWords.length)} کلمه را
              نوشتی.
            </p>
          </div>
        )}
      </div>

      <PracticeShelf
        title="کلمات تمرین شده"
        items={mockPracticeWords}
        currentIndex={index}
        checked={checked}
        unitLabel="کلمه"
      />
    </main>
  );
}
