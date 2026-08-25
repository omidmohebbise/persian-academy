import { Star } from "lucide-react";
import type { Fact } from "@/types";
import { COVER_GRADIENTS } from "@/lib/theme";

export default function FactCard({
  fact,
  className = "w-[170px] shrink-0",
}: {
  fact: Fact;
  className?: string;
}) {
  return (
    <div
      dir="rtl"
      className={`overflow-hidden rounded-2xl border border-black/5 bg-white shadow-card ${className}`}
    >
      <div
        className={`relative flex h-28 items-center justify-center ${
          COVER_GRADIENTS[fact.coverTheme]
        }`}
      >
        <span className="text-5xl">{fact.emoji}</span>
        <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/80">
          <Star size={12} className="text-ink/50" />
        </span>
      </div>
      <div className="p-3">
        <p className="text-right text-sm font-bold">{fact.title}</p>
        <p className="mt-1 text-right text-[11px] leading-5 text-ink/55">
          {fact.descriptionFa}
        </p>
        <p className="mt-1 text-right text-[10px] leading-4 text-ink/35">
          {fact.descriptionEn}
        </p>
      </div>
    </div>
  );
}
