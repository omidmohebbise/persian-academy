import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Globe2,
  User,
} from "lucide-react";
import Avatar from "@/components/Avatar";
import StatsPill from "@/components/StatsPill";
import StoryCard from "@/components/StoryCard";
import Link from "next/link";
import { getCurrentUser } from "@/lib/api/profile";
import { getStoryPreviews } from "@/lib/api/stories";
import { getTodayLesson } from "@/lib/api/home";

const tiles = [
  {
    href: "/discover",
    title: "کشف و یادگیری",
    subtitle: "کلمه‌ای را وارد کن",
    icon: Sparkles,
    bg: "bg-purple-50",
    iconBg: "bg-purple-500",
  },
  {
    href: "/world",
    title: "دانستنی‌ها",
    subtitle: "حقایق جالب",
    icon: Globe2,
    bg: "bg-sky-50",
    iconBg: "bg-sky-500",
  },
  {
    href: "/stories",
    title: "داستان‌ها",
    subtitle: "داستان‌های من",
    icon: BookOpen,
    bg: "bg-gold-50",
    iconBg: "bg-gold-500",
  },
  {
    href: "/profile",
    title: "من",
    subtitle: "پروفایل و پیشرفت",
    icon: User,
    bg: "bg-pink-50",
    iconBg: "bg-pink-500",
  },
];

export default async function HomePage() {
  const [user, lesson, stories] = await Promise.all([
    getCurrentUser(),
    getTodayLesson(),
    getStoryPreviews(4),
  ]);

  return (
    <main className="px-4 pt-6">
      <div className="flex items-center justify-between">
        <StatsPill xp={user.xp} streak={user.streakDays} />
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-lg font-extrabold">سلام {user.name}! 👋</h1>
            <p className="text-sm text-ink/50">
              امروز چه چیز جدیدی یاد می‌گیریم؟
            </p>
          </div>
          <Avatar size={52} />
        </div>
      </div>

      {/* Today's lesson */}
      <section className="mt-5 rounded-3xl border border-brand-100 bg-gradient-to-b from-brand-50 to-[#F3FBF2] p-5">
        <div className="flex items-center justify-end gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-white">
            <BookOpen size={16} />
          </span>
          <span className="text-base font-bold text-ink">درس امروز</span>
        </div>

        <div className="mt-3 flex items-center gap-4">
          <div className="flex-1">
            <div className="text-6xl font-extrabold text-brand-500">
              {lesson.letter}
            </div>
            <p className="mt-2 text-xl font-extrabold text-brand-600">
              {lesson.title}
            </p>
            <p className="mt-1 text-sm text-ink/50">{lesson.description}</p>
          </div>
          <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#F3D7B5] to-[#E7B98C]">
            <span className="text-6xl">🤱</span>
          </div>
        </div>

        <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-500 py-3.5 text-base font-bold text-white shadow-soft transition active:scale-[0.98]">
          <ChevronRight size={20} />
          <span>شروع درس</span>
        </button>
      </section>

      {/* Stories */}
      <section className="mt-7">
        <div className="flex items-center justify-between">
          <Link
            href="/stories"
            className="flex items-center gap-1 text-sm font-semibold text-brand-500"
          >
            <ChevronRight size={16} />
            همه داستان‌ها
          </Link>
          <h2 className="text-lg font-extrabold">داستان‌ها</h2>
        </div>

        <div
          dir="ltr"
          className="no-scrollbar mt-3 flex gap-3 overflow-x-auto pb-1"
        >
          {stories.map((s) => (
            <StoryCard key={s.id} story={s} />
          ))}
        </div>
      </section>

      {/* Quick tiles */}
      <section className="mt-7 grid grid-cols-2 gap-3">
        {tiles.map((t) => {
          const Icon = t.icon;
          return (
            <Link
              key={t.title}
              href={t.href}
              className={`rounded-2xl ${t.bg} p-4 transition active:scale-[0.98]`}
            >
              <span
                className={`me-auto flex h-11 w-11 items-center justify-center rounded-full ${t.iconBg} text-white`}
              >
                <Icon size={20} />
              </span>
              <p className="mt-3 text-base font-extrabold text-ink">
                {t.title}
              </p>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-xs text-ink/45">{t.subtitle}</span>
                <ChevronLeft size={16} className="text-ink/30" />
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
