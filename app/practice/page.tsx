"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import StatsPill from "@/components/StatsPill";
import LetterDrawingPractice from "@/components/LetterDrawingPractice";
import WritingProgressCard from "@/components/WritingProgressCard";
import PracticeShelf from "@/components/PracticeShelf";
import { useAppState } from "@/lib/store/AppStateContext";
import {
  mockPracticeLetters,
  getExampleWordForLetter,
} from "@/lib/mock/practiceWords";

export default function LettersPracticePage() {
  const router = useRouter();
  const { user, practiceWordWritten } = useAppState();

  const [index, setIndex] = useState(0);
  const [checked, setChecked] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [resetToken, setResetToken] = useState(0);

  const letterItem = mockPracticeLetters[index];
  const isLastLetter = index === mockPracticeLetters.length - 1;

  async function handleCheck() {
    const { result } = await practiceWordWritten(letterItem);
    setXpEarned(result.xpEarned);
    setChecked(true);
  }

  function handleClear() {
    setHasDrawn(false);
    setResetToken((t) => t + 1);
  }

  function handleNext() {
    if (isLastLetter) {
      router.push("/practice/complete?level=letters");
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
          با انگشتت بنویس، فارسی رو قشنگ‌تر یاد بگیر!
        </p>
      </div>

      <WritingProgressCard />

      <div className="mt-5">
        <LetterDrawingPractice
          letter={letterItem.word}
          letterNumber={index + 1}
          totalLetters={mockPracticeLetters.length}
          exampleWord={getExampleWordForLetter(letterItem.word)}
          checked={checked}
          hasDrawn={hasDrawn}
          resetToken={resetToken}
          xpEarned={xpEarned}
          onDraw={() => setHasDrawn(true)}
          onClear={handleClear}
          onCheck={handleCheck}
          onNext={handleNext}
        />
      </div>

      <PracticeShelf
        title="حروف بعدی"
        items={mockPracticeLetters}
        currentIndex={index}
        checked={checked}
        unitLabel="حرف"
      />

      <p className="mt-4 text-center text-xs text-ink/35">
        بعد از یادگیری این حرف‌ها، نوبت تمرین کلمه‌هاست 🎯
      </p>
    </main>
  );
}
