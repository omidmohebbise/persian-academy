import { Search, BookOpen, Lightbulb, Star } from "lucide-react";
import Avatar from "@/components/Avatar";
import StatsPill from "@/components/StatsPill";

export default function DiscoverPage() {
  return (
    <main className="px-4 pt-6">
      <div className="flex items-center justify-between">
        <StatsPill />
        <div className="flex items-center gap-3">
          <div className="text-right">
            <h1 className="text-lg font-extrabold">کشف و یادگیری</h1>
            <p className="text-sm text-ink/50">
              ✨ هرچی بیشتر کشف کنی، بیشتر یاد می‌گیری!
            </p>
          </div>
          <Avatar size={52} />
        </div>
      </div>

      <div className="mt-8 text-center">
        <h2 className="text-xl font-extrabold">
          دو راه برای کشف دانسته‌های جدید 🔍
        </h2>
        <p className="mt-1.5 text-sm text-ink/45">
          یکی را انتخاب کن و یادگیری را شروع کن.
        </p>
      </div>

      {/* Card 1: enter word in own language */}
      <section className="mt-6 rounded-3xl border border-brand-100 bg-gradient-to-b from-brand-50 to-[#F3FBF2] p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 text-right">
            <h3 className="text-base font-extrabold leading-7">
              کلمه‌ای که به زبان خودت می‌دانی را وارد کن
            </h3>
            <p className="mt-1 text-sm text-ink/50">
              ما به تو یاد می‌دهیم که چطور به فارسی گفته می‌شود.
            </p>
          </div>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500 text-sm font-extrabold text-white">
            1
          </span>
        </div>

        <div className="mt-3 flex justify-center">
          <span className="text-7xl">🧑‍🚀</span>
        </div>

        <div className="mt-2 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-card">
          <span className="text-lg">🇬🇧</span>
          <input
            dir="ltr"
            placeholder="tree , book , water"
            className="flex-1 bg-transparent text-sm text-ink/60 placeholder:text-ink/30 focus:outline-none"
          />
        </div>

        <div className="mt-3 flex items-center gap-2">
          <button className="flex-1 rounded-2xl bg-brand-500 py-3.5 text-base font-bold text-white shadow-soft transition active:scale-[0.98]">
            یاد بده
          </button>
          <span className="rounded-2xl bg-brand-700/90 px-3 py-3.5 text-xs font-bold text-white">
            +50 XP
          </span>
        </div>

        <p className="mt-3 flex items-start gap-1.5 text-right text-xs leading-6 text-ink/50">
          <span>💡</span>
          <span>
            مثال: اگر بنویسی <b className="text-ink/70">tree</b>، ما به تو یاد
            می‌دهیم چطور &quot;<b className="text-brand-600">درخت</b>&quot; به
            فارسی نوشته و گفته می‌شود.
          </span>
        </p>
      </section>

      {/* Card 2: enter known Persian word */}
      <section className="mt-6 rounded-3xl border border-purple-400/20 bg-gradient-to-b from-purple-50 to-[#F7F5FF] p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 text-right">
            <h3 className="text-base font-extrabold leading-7">
              کلمه فارسی که می‌دانی را وارد کن
            </h3>
            <p className="mt-1 text-sm text-ink/50">
              ما بررسی می‌کنیم و به تو درس‌های جدیدتر یا داستان‌های جدید باز
              می‌کنیم.
            </p>
          </div>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-purple-500 text-sm font-extrabold text-white">
            2
          </span>
        </div>

        <div className="mt-3 flex flex-col items-center gap-2">
          <span className="rounded-2xl bg-white px-4 py-2 text-lg font-extrabold text-purple-500 shadow-card">
            درخت
          </span>
          <span className="text-7xl">📖</span>
        </div>

        <div className="mt-2 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-card">
          <span className="rounded-md bg-purple-50 px-2 py-0.5 text-xs font-bold text-purple-500">
            فا
          </span>
          <input
            placeholder="مثلا: درخت ، مادر ، خانه ..."
            className="flex-1 bg-transparent text-right text-sm text-ink/60 placeholder:text-ink/30 focus:outline-none"
          />
        </div>

        <div className="mt-3 flex items-center gap-2">
          <button className="flex-1 rounded-2xl bg-purple-500 py-3.5 text-base font-bold text-white shadow-soft transition active:scale-[0.98]">
            بررسی کن
          </button>
          <span className="rounded-2xl bg-purple-600/90 px-3 py-3.5 text-xs font-bold text-white">
            +50 XP
          </span>
        </div>

        <p className="mt-3 flex items-start gap-1.5 text-right text-xs leading-6 text-ink/50">
          <Star size={13} className="mt-0.5 shrink-0 fill-gold-500 text-gold-500" />
          <span>
            مثال: اگر بنویسی &quot;<b className="text-purple-500">درخت</b>
            &quot;، به سطح بالاتری می‌روی یا داستان جدیدی باز می‌کنی!
          </span>
        </p>
      </section>

      {/* XP explainer */}
      <section className="mt-6 flex items-center justify-between gap-3 rounded-3xl bg-gold-50 p-5">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-card">
          <Star size={22} className="fill-gold-500 text-gold-500" />
        </span>
        <div className="flex-1 text-right">
          <p className="text-sm font-extrabold">چطور امتیاز بگیرم؟</p>
          <p className="mt-1 text-xs leading-6 text-ink/50">
            با هر کشف جدید و یادگیری کلمه، 50 امتیاز XP دریافت می‌کنی.
          </p>
        </div>
        <span className="text-4xl">🧰</span>
      </section>
    </main>
  );
}
