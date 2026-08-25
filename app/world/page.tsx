import { Search, Volume2, ChevronLeft } from "lucide-react";
import Avatar from "@/components/Avatar";
import Link from "next/link";
import StatsPillMini from "@/components/StatsPillMini";
import WorldExplorer from "@/components/WorldExplorer";
import { getFactCategories, getFacts, getTodayFact } from "@/lib/api/world";
import { getCurrentUser } from "@/lib/api/profile";
import { COVER_GRADIENTS } from "@/lib/theme";

export default async function WorldPage() {
  const [user, categories, facts, todayFact] = await Promise.all([
    getCurrentUser(),
    getFactCategories(),
    getFacts(),
    getTodayFact(),
  ]);

  return (
    <main className="px-4 pt-6">
      <div className="flex items-center justify-between">
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-card">
          <Search size={17} className="text-ink/60" />
        </button>
        <div className="flex-1 text-center">
          <h1 className="text-xl font-extrabold">دانستنی‌ها 🌍</h1>
          <p className="mt-0.5 text-xs text-ink/45">
            درباره فرهنگ، تاریخ و طبیعت ایران
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StatsPillMini xp={user.xp} />
          <Avatar size={40} />
        </div>
      </div>

      <WorldExplorer categories={categories} initialFacts={facts}>
        {/* Today's fact */}
        <section className="mt-6">
          <div className="flex items-center justify-end gap-1.5 text-sm font-bold">
            <span>☀️</span>
            <span>دانستنی امروز</span>
          </div>

          <div className="mt-3 overflow-hidden rounded-3xl border border-black/5 bg-white shadow-card">
            <div
              className={`relative flex h-44 items-center justify-center ${
                COVER_GRADIENTS[todayFact.coverTheme]
              }`}
            >
              <span className="text-8xl">{todayFact.emoji}</span>
              {todayFact.photoIndex && todayFact.photoTotal && (
                <span className="absolute bottom-2 right-2 rounded-full bg-black/40 px-2 py-0.5 text-[11px] text-white">
                  {todayFact.photoIndex} / {todayFact.photoTotal}
                </span>
              )}
            </div>
            <div className="p-5">
              <h3 className="text-right text-lg font-extrabold">
                {todayFact.emoji} {todayFact.title}
              </h3>
              <p className="mt-2 text-right text-sm leading-7 text-ink/70">
                {todayFact.descriptionFa}
              </p>
              <div className="mt-3 border-t border-black/5 pt-3">
                <p className="mt-1 text-right text-xs leading-6 text-ink/45">
                  {todayFact.descriptionEn}
                </p>
              </div>
              <button className="mt-4 flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-bold text-white">
                <Volume2 size={16} />
                بشنو
              </button>
            </div>
          </div>
        </section>
      </WorldExplorer>

      {/* Banner */}
      <Link
        href="/facts"
        className="mt-7 flex items-center gap-4 rounded-3xl bg-gradient-to-l from-brand-50 to-[#EAF6E2] p-5"
      >
        <div className="flex-1 text-right">
          <h3 className="text-base font-extrabold text-brand-600">
            ایران شگفت‌انگیز
          </h3>
          <p className="mt-1 text-xs text-ink/50">
            با دانستنی‌های بیشتر، ایران را بهتر بشناس!
          </p>
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-brand-500 px-4 py-2 text-xs font-bold text-white">
            برو به مجموعه
            <ChevronLeft size={14} />
          </span>
        </div>
        <span className="text-6xl">👧🏻</span>
      </Link>
    </main>
  );
}
