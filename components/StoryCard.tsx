import { Lock, BookOpen, Star } from "lucide-react";

type Story = {
  title: string;
  emoji: string;
  bg: string;
  locked?: boolean;
  progress?: number;
  wordsToUnlock?: number;
};

export default function StoryCard({ story }: { story: Story }) {
  return (
    <div dir="rtl" className="w-[150px] shrink-0">
      <div
        className={`relative flex h-[150px] w-full items-center justify-center rounded-2xl ${story.bg}`}
      >
        {story.locked ? (
          <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-purple-500/90 text-white">
            <Lock size={14} />
          </span>
        ) : (
          <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-brand-500 px-2 py-1 text-[10px] font-bold text-white">
            <BookOpen size={11} />
            خوانده‌ام
          </span>
        )}
        <span className="text-6xl drop-shadow-sm">{story.emoji}</span>
      </div>
      <p className="mt-2 text-sm font-bold leading-snug text-ink">
        {story.title}
      </p>
      {story.locked ? (
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
              style={{ width: `${story.progress}%` }}
            />
          </div>
          <span className="text-[11px] font-medium text-ink/40">
            {story.progress}%
          </span>
        </div>
      )}
    </div>
  );
}
