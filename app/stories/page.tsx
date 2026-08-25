"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import StoryCard from "@/components/StoryCard";
import StatsPill from "@/components/StatsPill";
import { useAppState } from "@/lib/store/AppStateContext";

export default function StoriesPage() {
  const { user, stories } = useAppState();
  const completed = stories.filter((s) => s.status === "completed");
  const locked = stories.filter((s) => s.status === "locked");

  return (
    <main className="px-4 pt-6">
      <div className="flex items-center justify-between">
        <StatsPill xp={user.xp} streak={user.streakDays} />
        <Link
          href="/"
          className="flex items-center gap-1 text-sm font-semibold text-ink/60"
        >
          بازگشت
          <ChevronRight size={16} />
        </Link>
      </div>

      <h1 className="mt-5 text-right text-xl font-extrabold">داستان‌ها</h1>
      <p className="mt-1 text-right text-sm text-ink/45">
        {completed.length} از {stories.length} داستان را خوانده‌ای
      </p>

      <section className="mt-5">
        <h2 className="text-right text-base font-bold text-ink/70">
          خوانده‌شده
        </h2>
        <div className="mt-3 grid grid-cols-2 gap-4">
          {completed.map((s) => (
            <StoryCard key={s.id} story={s} className="w-full" />
          ))}
        </div>
      </section>

      {locked.length > 0 && (
        <section className="mt-7">
          <h2 className="text-right text-base font-bold text-ink/70">
            قفل‌شده
          </h2>
          <div className="mt-3 grid grid-cols-2 gap-4">
            {locked.map((s) => (
              <StoryCard key={s.id} story={s} className="w-full" />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
