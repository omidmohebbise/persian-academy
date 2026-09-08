"use client";

import { Lock, Check, Gift } from "lucide-react";
import { toPersianDigits } from "@/lib/format";
import { WRITING_BATCH_SIZE } from "@/lib/mock/practiceWords";
import type { PracticeWord } from "@/types";

/**
 * The horizontal "what's next" shelf shared by every practice screen: the
 * current batch of items (done / current / locked) plus a reward chest.
 * Used for both the letters curriculum and the words curriculum — anything
 * shaped like a PracticeWord works.
 */
export default function PracticeShelf({
  title,
  items,
  currentIndex,
  checked,
  unitLabel,
}: {
  title: string;
  items: PracticeWord[];
  currentIndex: number;
  checked: boolean;
  /** "حرف" or "کلمه" — used in the reward-chest caption. */
  unitLabel: string;
}) {
  const batchStart =
    Math.floor(currentIndex / WRITING_BATCH_SIZE) * WRITING_BATCH_SIZE;
  const batchItems = items.slice(batchStart, batchStart + WRITING_BATCH_SIZE);
  const batchComplete =
    currentIndex >= batchStart + WRITING_BATCH_SIZE - 1 && checked;

  return (
    <section className="mt-6">
      <h3 className="text-right text-base font-extrabold text-ink">{title}</h3>
      <div dir="ltr" className="no-scrollbar mt-3 flex gap-3 overflow-x-auto pb-1">
        {batchItems.map((item, i) => {
          const arrayIndex = batchStart + i;
          const status =
            arrayIndex < currentIndex
              ? "done"
              : arrayIndex === currentIndex
              ? "current"
              : "locked";
          return (
            <div
              key={item.id}
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
                  item.emoji
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
                {item.word}
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
            <Gift
              size={18}
              className={batchComplete ? "text-purple-500" : "text-white"}
            />
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
            {toPersianDigits(WRITING_BATCH_SIZE)} {unitLabel} بنویس و جایزه
            بگیر!
          </p>
        </div>
      </div>
    </section>
  );
}
