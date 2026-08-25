"use client";

import {
  Settings,
  Sparkles,
  Lightbulb,
  MessageCircle,
  BookOpen,
  Sprout,
  Star,
  CalendarCheck,
  Lock,
  Flame,
  Pencil,
  RotateCcw,
  Trophy,
  User,
  Check,
} from "lucide-react";
import Avatar from "@/components/Avatar";
import StatsPill from "@/components/StatsPill";
import { useAppState } from "@/lib/store/AppStateContext";
import { mockBadges } from "@/lib/mock/user";
import { toPersianDigits } from "@/lib/format";
import type { BadgeIconKey, BadgeTheme } from "@/types";

const BADGE_ICONS: Record<BadgeIconKey, typeof Sprout> = {
  sprout: Sprout,
  star: Star,
  book: BookOpen,
  "calendar-check": CalendarCheck,
  locked: Lock,
};

const BADGE_THEMES: Record<BadgeTheme, { bg: string; iconBg: string }> = {
  brand: { bg: "bg-brand-50", iconBg: "bg-brand-500" },
  sky: { bg: "bg-sky-50", iconBg: "bg-sky-500" },
  gold: { bg: "bg-gold-50", iconBg: "bg-gold-500" },
  purple: { bg: "bg-purple-50", iconBg: "bg-purple-500" },
  locked: { bg: "bg-black/5", iconBg: "bg-ink/20" },
};

export default function ProfilePage() {
  const { user, resetProgress } = useAppState();
  const badges = mockBadges;

  const goalPercent = Math.min(
    100,
    (user.wordsLearned / user.goalWords) * 100
  );

  const aboutCards = [
    {
      icon: BookOpen,
      value: user.stats.storiesRead,
      label: "داستان خوانده‌ام",
      caption: "ادامه بده! قصه‌های بیشتری منتظر توست.",
      bg: "bg-brand-50",
      iconBg: "bg-brand-500",
    },
    {
      icon: Lightbulb,
      value: user.stats.factsLearned,
      label: "دانستنی یاد گرفتم",
      caption: "چه چیزهای جالبی درباره ایران یاد گرفتی!",
      bg: "bg-purple-50",
      iconBg: "bg-purple-500",
    },
    {
      icon: MessageCircle,
      value: user.stats.wordsKnown,
      label: "کلمه بلدم",
      caption: "هر روز بهتر از دیروز!",
      bg: "bg-gold-50",
      iconBg: "bg-gold-500",
    },
  ];

  return (
    <main className="px-4 pt-6">
      <div className="flex items-start justify-between">
        <StatsPill xp={user.xp} streak={user.streakDays} />
        <div className="flex-1 text-center">
          <h1 className="text-3xl font-extrabold text-brand-500">
            مَن <Sparkles className="mb-1 inline text-gold-500" size={20} />
          </h1>
          <p className="mt-1 text-sm text-ink/45">
            سفر یادگیری من در زبان فارسی
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (window.confirm("پیشرفت یادگیری بازنشانی شود؟")) {
                resetProgress();
              }
            }}
            title="بازنشانی پیشرفت (دمو)"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-card"
          >
            <RotateCcw size={16} className="text-ink/60" />
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-card">
            <Settings size={18} className="text-ink/60" />
          </button>
        </div>
      </div>

      {/* Avatar + name */}
      <div className="mt-6 flex flex-col items-center">
        <div className="relative">
          <Avatar size={140} />
          <button className="absolute bottom-1 left-1 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-card">
            <Pencil size={14} className="text-ink/60" />
          </button>
        </div>
        <h2 className="mt-3 text-xl font-extrabold">{user.name}</h2>
        <button className="mt-2 flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-ink/60 shadow-card">
          <User size={13} />
          ویرایش پروفایل
        </button>
      </div>

      {/* Goal card */}
      <section className="mt-6 rounded-3xl border border-black/5 bg-white p-5 shadow-card">
        <div className="flex items-center justify-between">
          <div className="flex h-16 w-20 items-end justify-center">
            <span className="text-5xl">⛰️</span>
          </div>
          <div className="text-right">
            <p className="text-sm text-ink/45">هدف من:</p>
            <p className="text-xl font-extrabold">
              {toPersianDigits(user.goalWords)} کلمه فارسی
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-stretch gap-3">
          <div className="flex w-24 shrink-0 flex-col items-center justify-center rounded-2xl bg-gold-50 py-3">
            <p className="text-xs font-semibold text-ink/50">سطح من</p>
            <div className="mt-2 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500 text-xs font-extrabold text-white">
              Lv.{user.level}
            </div>
            <p className="mt-2 text-[11px] text-ink/45">
              {toPersianDigits(user.levelWordsRequired)} کلمه
            </p>
          </div>

          <div className="flex-1 rounded-2xl bg-cream p-4">
            <p className="text-sm font-semibold text-ink/50">پیشرفت من</p>
            <p className="mt-1 text-2xl font-extrabold text-brand-600">
              {toPersianDigits(user.wordsLearned)}{" "}
              <span className="text-base font-medium text-ink/40">
                / {user.goalWords}
              </span>
            </p>
            <div className="mt-2 h-2.5 w-full rounded-full bg-black/10">
              <div
                className="h-2.5 rounded-full bg-brand-500"
                style={{ width: `${goalPercent}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-ink/45">
              شما {toPersianDigits(user.wordsLearned)} کلمه از{" "}
              {toPersianDigits(user.goalWords)} کلمه را یاد گرفته‌اید!
            </p>
          </div>
        </div>
      </section>

      {/* About me */}
      <section className="mt-7 rounded-3xl border border-black/5 bg-white p-5 shadow-card">
        <div className="relative flex items-center justify-center">
          <h3 className="text-lg font-extrabold">درباره من</h3>
          <span className="absolute right-0 flex h-8 w-8 items-center justify-center rounded-full bg-black/5">
            <User size={15} className="text-ink/50" />
          </span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {aboutCards.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.label}
                className={`rounded-2xl ${c.bg} p-3 text-center`}
              >
                <span
                  className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full ${c.iconBg} text-white`}
                >
                  <Icon size={16} />
                </span>
                <p className="mt-2 text-xl font-extrabold">
                  {toPersianDigits(c.value)}
                </p>
                <p className="mt-0.5 text-xs font-semibold text-ink/70">
                  {c.label}
                </p>
                <p className="mt-1 text-[10px] leading-snug text-ink/40">
                  {c.caption}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Badges */}
      <section className="mt-7">
        <div className="flex items-center justify-center gap-2">
          <Trophy size={18} className="text-gold-500" />
          <h3 className="text-lg font-extrabold">نشان‌های من</h3>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-3">
          {badges.map((b) => {
            const Icon = BADGE_ICONS[b.icon];
            const theme = BADGE_THEMES[b.theme];
            return (
              <div
                key={b.id}
                className={`relative rounded-2xl ${theme.bg} p-3 text-center`}
              >
                {b.achieved && (
                  <span className="absolute -left-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-white">
                    <Check size={10} strokeWidth={3} />
                  </span>
                )}
                <span
                  className={`mx-auto flex h-11 w-11 items-center justify-center rounded-xl ${theme.iconBg} text-white`}
                >
                  <Icon size={18} />
                </span>
                <p className="mt-2 text-xs font-bold leading-snug">
                  {b.title}
                </p>
                <p className="mt-0.5 text-[10px] leading-snug text-ink/40">
                  {b.description}
                </p>
                {!b.achieved &&
                  b.progressCurrent !== undefined &&
                  b.progressTarget !== undefined && (
                    <>
                      <div className="mt-1.5 h-1.5 w-full rounded-full bg-black/10">
                        <div
                          className="h-1.5 rounded-full bg-brand-400"
                          style={{
                            width: `${
                              (b.progressCurrent / b.progressTarget) * 100
                            }%`,
                          }}
                        />
                      </div>
                      <p className="mt-1 text-[10px] font-semibold text-ink/40">
                        {toPersianDigits(b.progressCurrent)} /{" "}
                        {toPersianDigits(b.progressTarget)}
                      </p>
                    </>
                  )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Streak */}
      <section className="mt-7 rounded-3xl border border-brand-100 bg-gradient-to-b from-brand-50 to-[#F3FBF2] p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-right text-sm font-bold text-ink">
              تقویم یادگیری این هفته
            </p>
            <div className="mt-3 flex items-center justify-between">
              {user.weekCalendar.map((w) => (
                <div
                  key={w.day}
                  className="flex flex-col items-center gap-1.5"
                >
                  <span className="text-[11px] text-ink/40">{w.day}.</span>
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full ${
                      w.completed
                        ? "bg-brand-500 text-white"
                        : "border-2 border-black/10 bg-transparent"
                    }`}
                  >
                    {w.completed && <Check size={12} strokeWidth={3} />}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-center gap-1 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
              <Flame size={24} className="fill-orange-500 text-orange-500" />
            </span>
            <p className="text-2xl font-extrabold">
              {toPersianDigits(user.streakDays)}
            </p>
            <p className="text-xs font-semibold text-ink/50">روز متوالی</p>
            <p className="text-[11px] text-brand-600">آفرین! ادامه بده 🎉</p>
          </div>
        </div>
      </section>
    </main>
  );
}
