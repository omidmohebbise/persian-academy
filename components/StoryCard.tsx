import Link from "next/link";
import { Lock, BookOpen, Star } from "lucide-react";
import type { Story } from "@/types";
import { COVER_GRADIENTS } from "@/lib/theme";

export default function StoryCard({
  story,
  className = "w-[150px] shrink-0",
}: {
  story: Story;
  className?: string;
}) {
  const isLocked = story.status === "locked";
  const isFinished = !isLocked && story.progressPercent === 100;

  return (
    <Link href={`/stories/${story.slug}`} dir="rtl" className={className}>
      <div
        className={`relative flex h-[150px] w-full items-center justify-center rounded-2xl ${
          COVER_GRADIENTS[story.coverTheme]
        }`}
      >
        {isLocked ? (
          <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-purple-500/90 text-white">
            <Lock size={14} />
          </span>
        ) : isFinished ? (
          <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-brand-500 px-2 py-1 text-[10px] font-bold text-white">
            <BookOpen size={11} />
            خوانده‌ام
          </span>
        ) : null}
        <span className="text-6xl drop-shadow-sm">{story.emoji}</span>
      </div>
      <p className="mt-2 text-sm font-bold leading-snug text-ink">
        {story.title}
      </p>
      {isLocked ? (
        <div className="mt-1 flex items-center gap-1 text-[11px] text-gold-500">
          <Star size={12} className="fill-gold-500" />
          <span className="text-ink/50">
            {story.wordsToUnlock} کلمه دیگر تا باز شدن
          </span>
        </div>
      ) : (
        <div className="mt-1.5 flex items-center gap-2">
          <div className="h-1.5 flex-1 rounded-full bg-black/10">
            <div
              className="h-1.5 rounded-full bg-brand-500"
              style={{ width: `${story.progressPercent}%` }}
            />
          </div>
          <span className="text-[11px] font-medium text-ink/40">
            {story.progressPercent}%
          </span>
        </div>
      )}
    </Link>
  );
}
