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
  Trophy,
  User,
  Flag,
} from "lucide-react";
import Avatar from "@/components/Avatar";
import StatsPill from "@/components/StatsPill";

const aboutCards = [
  {
    icon: BookOpen,
    value: "۸",
    label: "داستان خوانده‌ام",
    caption: "ادامه بده! قصه‌های بیشتری منتظر توست.",
    bg: "bg-brand-50",
    iconBg: "bg-brand-500",
  },
  {
    icon: Lightbulb,
    value: "۳",
    label: "دانستنی یاد گرفتم",
    caption: "چه چیزهای جالبی درباره ایران یاد گرفتی!",
    bg: "bg-purple-50",
    iconBg: "bg-purple-500",
  },
  {
    icon: MessageCircle,
    value: "۹۷",
    label: "کلمه بلدم",
    caption: "هر روز بهتر از دیروز!",
    bg: "bg-gold-50",
    iconBg: "bg-gold-500",
  },
];

const badges = [
  {
    icon: Sprout,
    title: "اولین کلمه",
    desc: "اولین کلمه را یاد گرفتی",
    bg: "bg-brand-50",
    iconBg: "bg-brand-500",
    done: true,
  },
  {
    icon: Star,
    title: "۱۰۰ کلمه",
    desc: "۱۰۰ کلمه یاد گرفتی",
    bg: "bg-sky-50",
    iconBg: "bg-sky-500",
    done: true,
  },
  {
    icon: BookOpen,
    title: "اولین داستان",
    desc: "یک داستان خواندی",
    bg: "bg-gold-50",
    iconBg: "bg-gold-500",
    done: true,
  },
  {
    icon: CalendarCheck,
    title: "۷ روز پشت سر هم",
    desc: "یک هفته متوالی یاد گرفتی",
    bg: "bg-purple-50",
    iconBg: "bg-purple-500",
    done: true,
  },
  {
    icon: Lock,
    title: "۵۰ داستان",
    desc: "۵۰ داستان بخوان",
    bg: "bg-black/5",
    iconBg: "bg-ink/20",
    done: false,
    progress: "۸ / ۵۰",
  },
];

const week = [
  { d: "ش", done: true },
  { d: "ی", done: true },
  { d: "د", done: true },
  { d: "س", done: true },
  { d: "چ", done: true },
  { d: "پ", done: true },
  { d: "ج", done: false },
];

export default function ProfilePage() {
  return (
    <main className="px-4 pt-6">
      <div className="flex items-start justify-between">
        <StatsPill />
        <div className="flex-1 text-center">
          <h1 className="text-3xl font-extrabold text-brand-500">
            مَن <Sparkles className="mb-1 inline text-gold-500" size={20} />
          </h1>
          <p className="mt-1 text-sm text-ink/45">
            سفر یادگیری من در زبان فارسی
          </p>
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-card">
          <Settings size={18} className="text-ink/60" />
        </button>
      </div>

      {/* Avatar + name */}
      <div className="mt-6 flex flex-col items-center">
        <div className="relative">
          <Avatar size={140} />
          <button className="absolute bottom-1 left-1 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-card">
            <Pencil size={14} className="text-ink/60" />
          </button>
        </div>
        <h2 className="mt-3 text-xl font-extrabold">آرین</h2>
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
            <p className="text-xl font-extrabold">۳۰۰۰ کلمه فارسی</p>
          </div>
        </div>

        <div className="mt-5 flex items-stretch gap-3">
          <div className="flex w-24 shrink-0 flex-col items-center justify-center rounded-2xl bg-gold-50 py-3">
            <p className="text-xs font-semibold text-ink/50">سطح من</p>
            <div className="mt-2 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500 text-xs font-extrabold text-white">
              Lv.1
            </div>
            <p className="mt-2 text-[11px] text-ink/45">۱۰۰۰ کلمه</p>
          </div>

          <div className="flex-1 rounded-2xl bg-cream p-4">
            <p className="text-sm font-semibold text-ink/50">پیشرفت من</p>
            <p className="mt-1 text-2xl font-extrabold text-brand-600">
              ۹۷ <span className="text-base font-medium text-ink/40">/ 3000</span>
            </p>
            <div className="mt-2 h-2.5 w-full rounded-full bg-black/10">
              <div
                className="h-2.5 rounded-full bg-brand-500"
                style={{ width: "3%" }}
              />
            </div>
            <p className="mt-2 text-xs text-ink/45">
              شما ۹۷ کلمه از ۳۰۰۰ کلمه را یاد گرفته‌اید!
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
                <p className="mt-2 text-xl font-extrabold">{c.value}</p>
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
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className={`relative rounded-2xl ${b.bg} p-3 text-center`}
              >
                {b.done && (
                  <span className="absolute -left-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-white">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M20 6 9 17l-5-5"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                )}
                <span
                  className={`mx-auto flex h-11 w-11 items-center justify-center rounded-xl ${b.iconBg} text-white`}
                >
                  <Icon size={18} />
                </span>
                <p className="mt-2 text-xs font-bold leading-snug">
                  {b.title}
                </p>
                <p className="mt-0.5 text-[10px] leading-snug text-ink/40">
                  {b.desc}
                </p>
                {!b.done && b.progress && (
                  <>
                    <div className="mt-1.5 h-1.5 w-full rounded-full bg-black/10">
                      <div
                        className="h-1.5 rounded-full bg-brand-400"
                        style={{ width: "16%" }}
                      />
                    </div>
                    <p className="mt-1 text-[10px] font-semibold text-ink/40">
                      {b.progress}
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
              {week.map((w) => (
                <div key={w.d} className="flex flex-col items-center gap-1.5">
                  <span className="text-[11px] text-ink/40">{w.d}.</span>
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full ${
                      w.done
                        ? "bg-brand-500 text-white"
                        : "border-2 border-black/10 bg-transparent"
                    }`}
                  >
                    {w.done && (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M20 6 9 17l-5-5"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-center gap-1 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
              <Flame size={24} className="fill-orange-500 text-orange-500" />
            </span>
            <p className="text-2xl font-extrabold">۷</p>
            <p className="text-xs font-semibold text-ink/50">روز متوالی</p>
            <p className="text-[11px] text-brand-600">آفرین! ادامه بده 🎉</p>
          </div>
        </div>
      </section>
    </main>
  );
}
