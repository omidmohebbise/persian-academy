"use client";

import { useState } from "react";
import { Volume2, ChevronLeft, Check, X } from "lucide-react";
import type { LessonPath } from "@/types";

type Step = "intro" | "pronunciation" | "example" | "quiz" | "recap";
const STEPS: Step[] = ["intro", "pronunciation", "example", "quiz", "recap"];

export default function LessonWizard({
  lesson,
  onComplete,
}: {
  lesson: LessonPath;
  onComplete: () => void;
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const step = STEPS[stepIndex];

  function goNext() {
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  }

  const quizCorrect = quizAnswer === lesson.persianWord;

  return (
    <div dir="rtl" className="mt-3 rounded-2xl bg-white p-5 shadow-card">
      {/* step progress dots */}
      <div dir="ltr" className="flex items-center justify-center gap-1.5">
        {STEPS.map((s, i) => (
          <span
            key={s}
            className={`h-1.5 rounded-full transition-all ${
              i === stepIndex
                ? "w-6 bg-brand-500"
                : i < stepIndex
                ? "w-1.5 bg-brand-400"
                : "w-1.5 bg-black/10"
            }`}
          />
        ))}
      </div>

      {step === "intro" && (
        <div className="mt-5 text-center">
          <span className="text-6xl">{lesson.emoji}</span>
          <p className="mt-3 text-sm text-ink/50">{lesson.sourceWord}</p>
          <p className="mt-1 text-3xl font-extrabold text-brand-600">
            {lesson.persianWord}
          </p>
          <button
            onClick={goNext}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-500 py-3 text-sm font-bold text-white transition active:scale-[0.98]"
          >
            بعدی
            <ChevronLeft size={16} />
          </button>
        </div>
      )}

      {step === "pronunciation" && (
        <div className="mt-5 text-center">
          <p className="text-sm text-ink/50">تلفظ کلمه</p>
          <p className="mt-2 text-2xl font-extrabold text-ink" dir="ltr">
            {lesson.transliteration}
          </p>
          <button className="mx-auto mt-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition active:scale-90">
            <Volume2 size={22} />
          </button>
          <button
            onClick={goNext}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-500 py-3 text-sm font-bold text-white transition active:scale-[0.98]"
          >
            بعدی
            <ChevronLeft size={16} />
          </button>
        </div>
      )}

      {step === "example" && (
        <div className="mt-5 text-center">
          <p className="text-sm text-ink/50">در یک جمله</p>
          <p className="mt-2 text-lg font-bold leading-8">
            {lesson.exampleFa}
          </p>
          <p className="mt-1 text-sm text-ink/40" dir="ltr">
            {lesson.exampleEn}
          </p>
          <button
            onClick={goNext}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-500 py-3 text-sm font-bold text-white transition active:scale-[0.98]"
          >
            بعدی
            <ChevronLeft size={16} />
          </button>
        </div>
      )}

      {step === "quiz" && (
        <div className="mt-5">
          <p className="text-center text-sm font-semibold text-ink/70">
            کدام کلمه به معنی «{lesson.sourceWord}» است؟
          </p>
          <div className="mt-4 flex flex-col gap-2">
            {lesson.quizOptions.map((opt) => {
              const picked = quizAnswer === opt;
              const showCorrectness = quizAnswer !== null;
              const isRight = opt === lesson.persianWord;
              return (
                <button
                  key={opt}
                  onClick={() => setQuizAnswer(opt)}
                  disabled={quizCorrect}
                  className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-base font-bold transition ${
                    showCorrectness && picked && isRight
                      ? "border-brand-500 bg-brand-50 text-brand-600"
                      : showCorrectness && picked && !isRight
                      ? "border-red-300 bg-red-50 text-red-500"
                      : "border-black/10 bg-white text-ink"
                  }`}
                >
                  {opt}
                  {showCorrectness && picked && isRight && <Check size={18} />}
                  {showCorrectness && picked && !isRight && <X size={18} />}
                </button>
              );
            })}
          </div>
          {quizAnswer !== null && !quizCorrect && (
            <p className="mt-3 text-center text-xs text-red-500">
              دوباره امتحان کن!
            </p>
          )}
          <button
            onClick={goNext}
            disabled={!quizCorrect}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-500 py-3 text-sm font-bold text-white transition active:scale-[0.98] disabled:opacity-40"
          >
            بعدی
            <ChevronLeft size={16} />
          </button>
        </div>
      )}

      {step === "recap" && (
        <div className="mt-5 text-center">
          <span className="text-5xl">🎉</span>
          <p className="mt-3 text-base font-extrabold">
            آفرین! یاد گرفتی:
          </p>
          <p className="mt-1 text-3xl font-extrabold text-brand-600">
            {lesson.persianWord}
          </p>
          <button
            onClick={onComplete}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-500 py-3.5 text-base font-bold text-white shadow-soft transition active:scale-[0.98]"
          >
            پایان درس · +۵۰ XP
          </button>
        </div>
      )}
    </div>
  );
}
