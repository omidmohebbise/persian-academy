import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Lock, Star } from "lucide-react";
import { getAllStories, getStoryBySlug } from "@/lib/api/stories";
import { COVER_GRADIENTS } from "@/lib/theme";

export async function generateStaticParams() {
  const stories = await getAllStories();
  return stories.map((s) => ({ slug: s.slug }));
}

export default async function StoryDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const story = await getStoryBySlug(params.slug);
  if (!story) notFound();

  const isLocked = story.status === "locked";

  return (
    <main className="px-4 pt-6">
      <Link
        href="/stories"
        className="flex items-center gap-1 text-sm font-semibold text-ink/60"
      >
        <ChevronRight size={16} />
        همه داستان‌ها
      </Link>

      <div
        className={`relative mt-4 flex h-64 items-center justify-center rounded-3xl ${
          COVER_GRADIENTS[story.coverTheme]
        }`}
      >
        {isLocked && (
          <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-purple-500/90 text-white">
            <Lock size={16} />
          </span>
        )}
        <span className="text-8xl drop-shadow-sm">{story.emoji}</span>
      </div>

      <h1 className="mt-5 text-right text-2xl font-extrabold">
        {story.title}
      </h1>

      {isLocked ? (
        <>
          <div className="mt-2 flex items-center justify-end gap-1.5 text-sm text-gold-500">
            <span className="text-ink/50">
              {story.wordsToUnlock} کلمه دیگر تا باز شدن این داستان
            </span>
            <Star size={14} className="fill-gold-500" />
          </div>
          <button
            disabled
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-black/10 py-3.5 text-base font-bold text-ink/40"
          >
            <Lock size={18} />
            قفل است
          </button>
        </>
      ) : (
        <>
          <div className="mt-2 flex items-center justify-end gap-2">
            <div className="h-2 w-40 rounded-full bg-black/10">
              <div
                className="h-2 rounded-full bg-brand-500"
                style={{ width: `${story.progressPercent}%` }}
              />
            </div>
            <span className="text-xs font-medium text-ink/40">
              {story.progressPercent}%
            </span>
          </div>
          <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-500 py-3.5 text-base font-bold text-white shadow-soft transition active:scale-[0.98]">
            {story.progressPercent === 100 ? "بخوان دوباره" : "ادامه بده"}
          </button>
        </>
      )}
    </main>
  );
}
