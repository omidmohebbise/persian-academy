"use client";

import { useEffect, useState } from "react";
import { Star, Loader2, CheckCircle2 } from "lucide-react";
import Avatar from "@/components/Avatar";
import StatsPill from "@/components/StatsPill";
import { getCurrentUser } from "@/lib/api/profile";
import { submitForeignWord, submitPersianWord } from "@/lib/api/discover";
import type { User } from "@/types";

type SubmitStatus = "idle" | "loading" | "done";

export default function DiscoverPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  const [foreignWord, setForeignWord] = useState("");
  const [foreignStatus, setForeignStatus] = useState<SubmitStatus>("idle");
  const [foreignMessage, setForeignMessage] = useState("");

  const [persianWord, setPersianWord] = useState("");
  const [persianStatus, setPersianStatus] = useState<SubmitStatus>("idle");
  const [persianMessage, setPersianMessage] = useState("");

  async function handleForeignSubmit() {
    if (!foreignWord.trim() || foreignStatus === "loading") return;
    setForeignStatus("loading");
    const result = await submitForeignWord(foreignWord, "en");
    setForeignMessage(result.message);
    setForeignStatus("done");
    if (result.success) {
      setUser((u) => (u ? { ...u, xp: u.xp + result.xpEarned } : u));
      setForeignWord("");
    }
  }

  async function handlePersianSubmit() {
    if (!persianWord.trim() || persianStatus === "loading") return;
    setPersianStatus("loading");
    const result = await submitPersianWord(persianWord);
    setPersianMessage(result.message);
    setPersianStatus("done");
    if (result.success) {
      setUser((u) => (u ? { ...u, xp: u.xp + result.xpEarned } : u));
      setPersianWord("");
    }
  }

  return (
    <main className="px-4 pt-6">
      <div className="flex items-center justify-between">
        <StatsPill xp={user?.xp} streak={user?.streakDays} />
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
            value={foreignWord}
            onChange={(e) => setForeignWord(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleForeignSubmit()}
            placeholder="tree , book , water"
            className="flex-1 bg-transparent text-sm text-ink/60 placeholder:text-ink/30 focus:outline-none"
          />
        </div>

        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={handleForeignSubmit}
            disabled={!foreignWord.trim() || foreignStatus === "loading"}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-brand-500 py-3.5 text-base font-bold text-white shadow-soft transition active:scale-[0.98] disabled:opacity-50"
          >
            {foreignStatus === "loading" && (
              <Loader2 size={18} className="animate-spin" />
            )}
            یاد بده
          </button>
          <span className="rounded-2xl bg-brand-700/90 px-3 py-3.5 text-xs font-bold text-white">
            +50 XP
          </span>
        </div>

        {foreignStatus === "done" ? (
          <p className="mt-3 flex items-center gap-1.5 text-right text-xs font-semibold leading-6 text-brand-600">
            <CheckCircle2 size={14} />
            {foreignMessage}
          </p>
        ) : (
          <p className="mt-3 flex items-start gap-1.5 text-right text-xs leading-6 text-ink/50">
            <span>💡</span>
            <span>
              مثال: اگر بنویسی <b className="text-ink/70">tree</b>، ما به تو
              یاد می‌دهیم چطور &quot;
              <b className="text-brand-600">درخت</b>&quot; به فارسی نوشته و
              گفته می‌شود.
            </span>
          </p>
        )}
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
            value={persianWord}
            onChange={(e) => setPersianWord(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handlePersianSubmit()}
            placeholder="مثلا: درخت ، مادر ، خانه ..."
            className="flex-1 bg-transparent text-right text-sm text-ink/60 placeholder:text-ink/30 focus:outline-none"
          />
        </div>

        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={handlePersianSubmit}
            disabled={!persianWord.trim() || persianStatus === "loading"}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-purple-500 py-3.5 text-base font-bold text-white shadow-soft transition active:scale-[0.98] disabled:opacity-50"
          >
            {persianStatus === "loading" && (
              <Loader2 size={18} className="animate-spin" />
            )}
            بررسی کن
          </button>
          <span className="rounded-2xl bg-purple-600/90 px-3 py-3.5 text-xs font-bold text-white">
            +50 XP
          </span>
        </div>

        {persianStatus === "done" ? (
          <p className="mt-3 flex items-center gap-1.5 text-right text-xs font-semibold leading-6 text-purple-600">
            <CheckCircle2 size={14} />
            {persianMessage}
          </p>
        ) : (
          <p className="mt-3 flex items-start gap-1.5 text-right text-xs leading-6 text-ink/50">
            <Star
              size={13}
              className="mt-0.5 shrink-0 fill-gold-500 text-gold-500"
            />
            <span>
              مثال: اگر بنویسی &quot;<b className="text-purple-500">درخت</b>
              &quot;، به سطح بالاتری می‌روی یا داستان جدیدی باز می‌کنی!
            </span>
          </p>
        )}
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
