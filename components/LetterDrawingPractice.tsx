"use client";

import { Volume2, ChevronLeft, Star, Eraser } from "lucide-react";
import DrawCanvas from "@/components/DrawCanvas";
import LetterStrokeGuide from "@/components/LetterStrokeGuide";
import { toPersianDigits } from "@/lib/format";
import type { PracticeWord } from "@/types";

/**
 * Level 1: draw one big letter at a time, with the guide it's built from
 * (components/LetterStrokeGuide.tsx) and an example word for context. The
 * follow-on step is components/LetterWritingPractice.tsx, which reuses the
 * same guide/canvas at word scale.
 */
export default function LetterDrawingPractice({
  letter,
  letterNumber,
  totalLetters,
  exampleWord,
  checked,
  hasDrawn,
  resetToken,
  xpEarned,
  onDraw,
  onClear,
  onCheck,
  onNext,
}: {
  letter: string;
  letterNumber: number;
  totalLetters: number;
  exampleWord?: PracticeWord;
  checked: boolean;
  /** Whether the learner has drawn anything yet on this letter — gates the check button. */
  hasDrawn: boolean;
  /** Bumped by the parent to remount (and so clear) the trace canvas. */
  resetToken: number;
  xpEarned: number;
  onDraw: () => void;
  onClear: () => void;
  onCheck: () => void;
  onNext: () => void;
}) {
  function speakLetter() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const utterance = new SpeechSynthesisUtterance(letter);
    utterance.lang = "fa-IR";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  return (
    <div className="rounded-3xl bg-white p-5 shadow-card">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-black/5 px-3 py-1.5 text-xs font-bold text-ink/60">
          حرف {toPersianDigits(letterNumber)} / {toPersianDigits(totalLetters)}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={onClear}
            className="flex items-center gap-1.5 rounded-full bg-black/5 px-3 py-1.5 text-xs font-bold text-ink/60 transition active:scale-95"
          >
            <Eraser size={14} />
            پاک کن
          </button>
          <button
            onClick={speakLetter}
            className="flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-600 transition active:scale-95"
          >
            <Volume2 size={14} />
            صدای حرف
          </button>
        </div>
      </div>

      <div className="mt-4 text-center">
        <h2 className="text-lg font-extrabold text-ink">
          حرف «{letter}» را بنویس
        </h2>
        <p className="mt-1 text-xs text-ink/45">
          با موس یا انگشتت مسیر حرکت را دنبال کن.
        </p>
      </div>

      <div className="mt-5 flex items-stretch gap-3">
        {/* Example card: the letter + a familiar word that starts with it */}
        <div className="flex w-[34%] shrink-0 flex-col items-center justify-center gap-1 rounded-2xl bg-cream/60 p-3 text-center">
          <span className="text-5xl font-extrabold text-brand-500">
            {letter}
          </span>
          {exampleWord && (
            <>
              <p className="mt-1 text-xs text-ink/45">مثل</p>
              <p className="text-base font-extrabold text-ink">
                {exampleWord.word}
              </p>
              <span className="mt-2 text-4xl">{exampleWord.emoji}</span>
            </>
          )}
        </div>

        {/* Big trace box: ruled guide lines + the letter's stroke guide + the drawing canvas */}
        <div className="relative h-48 flex-1 overflow-hidden rounded-2xl border-2 border-dashed border-black/10 bg-cream/40">
          <div className="pointer-events-none absolute inset-x-0 top-1/3 border-t border-dashed border-black/10" />
          <div className="pointer-events-none absolute inset-x-0 top-2/3 border-t border-dashed border-black/10" />
          <LetterStrokeGuide glyph={letter} className="absolute inset-0 h-full w-full" />
          <DrawCanvas
            key={resetToken}
            className="absolute inset-0 h-full w-full cursor-crosshair"
            strokeWidth={8}
            onDraw={onDraw}
          />
        </div>
      </div>

      {!checked ? (
        <>
          <button
            onClick={onCheck}
            disabled={!hasDrawn}
            className="mt-5 w-full rounded-2xl bg-brand-500 py-3.5 text-base font-bold text-white shadow-soft transition active:scale-[0.98] disabled:opacity-40"
          >
            نوشتم! بررسی کن
          </button>
          {!hasDrawn && (
            <p className="mt-2 text-center text-xs text-ink/40">
              اول با موس یا انگشتت حرف را بکش ✏️
            </p>
          )}
        </>
      ) : (
        <>
          <div className="mt-5 flex items-center gap-3 rounded-2xl bg-brand-50 px-4 py-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white">
              <Star size={18} className="fill-gold-500 text-gold-500" />
            </span>
            <div className="flex-1 text-right">
              <p className="text-sm font-extrabold text-brand-700">
                آفرین! خیلی خوب بودی!
              </p>
              <p className="text-xs text-ink/45">
                حرف «{letter}» را نوشتی.
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-gold-500 px-3 py-1 text-xs font-extrabold text-white">
              +{toPersianDigits(xpEarned)} XP
            </span>
          </div>
          <button
            onClick={onNext}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-500 py-3.5 text-base font-bold text-white shadow-soft transition active:scale-[0.98]"
          >
            حرف بعدی
            <ChevronLeft size={18} />
          </button>
        </>
      )}
    </div>
  );
}
