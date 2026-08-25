import { Search, Volume2, Star, Sparkles, ChevronLeft } from "lucide-react";
import Avatar from "@/components/Avatar";
import Link from "next/link";

const categories = [
  { label: "همه", icon: "✨", active: true },
  { label: "فرهنگ", icon: "🏺" },
  { label: "تاریخ", icon: "🏛️" },
  { label: "طبیعت", icon: "🌿" },
  { label: "غذا", icon: "🍲" },
  { label: "هنر", icon: "🎨" },
];

const facts = [
  {
    title: "سی و سه پل اصفهان",
    fa: "یکی از زیباترین پل‌های ایران مربوط به دوره صفوی است.",
    en: "Si-o-se Pol is one of the most beautiful bridges in Iran.",
    emoji: "🌉",
    bg: "bg-gradient-to-b from-[#E7C9A0] to-[#B98A55]",
  },
  {
    title: "پلنگ برفی",
    fa: "پلنگ برفی در کوه‌های زاگرس زندگی می‌کند و در خطر انقراض است.",
    en: "The snow leopard lives in the Zagros mountains and is endangered.",
    emoji: "🐆",
    bg: "bg-gradient-to-b from-[#DCE9E6] to-[#AEC7C2]",
  },
  {
    title: "خط فارسی",
    fa: "خط فارسی یکی از زیباترین خط‌های جهان است.",
    en: "Persian calligraphy is one of the most beautiful scripts in the world.",
    emoji: "✒️",
    bg: "bg-gradient-to-b from-[#E7DFFB] to-[#C7B4F2]",
  },
  {
    title: "خورشت فسنجان",
    fa: "فسنجان یکی از غذاهای سنتی و محبوب ایرانی با طعم خاص است.",
    en: "Fesenjan is a traditional and popular Persian dish with a unique taste.",
    emoji: "🍲",
    bg: "bg-gradient-to-b from-[#FBE0D6] to-[#F0AF95]",
  },
  {
    title: "کاشی‌کاری ایرانی",
    fa: "کاشی‌کاری یکی از هنرهای زیبای معماری ایرانی است.",
    en: "Tilework is one of the beautiful arts of Persian architecture.",
    emoji: "🔷",
    bg: "bg-gradient-to-b from-[#D6E8FB] to-[#9FC4EE]",
  },
];

export default function WorldPage() {
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
          <div className="flex items-center gap-1 rounded-full bg-white px-2.5 py-1.5 shadow-card">
            <Star size={14} className="fill-gold-500 text-gold-500" />
            <span className="text-xs font-bold">1,250</span>
          </div>
          <Avatar size={40} />
        </div>
      </div>

      {/* Category pills */}
      <div
        dir="ltr"
        className="no-scrollbar mt-5 flex gap-2 overflow-x-auto pb-1"
      >
        {categories.map((c) => (
          <button
            key={c.label}
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold ${
              c.active
                ? "bg-brand-500 text-white"
                : "bg-white text-ink/60 shadow-card"
            }`}
          >
            {c.label}
            <span>{c.icon}</span>
          </button>
        ))}
      </div>

      {/* Today's fact */}
      <section className="mt-6">
        <div className="flex items-center justify-end gap-1.5 text-sm font-bold">
          <span>☀️</span>
          <span>دانستنی امروز</span>
        </div>

        <div className="mt-3 overflow-hidden rounded-3xl border border-black/5 bg-white shadow-card">
          <div className="relative flex h-44 items-center justify-center bg-gradient-to-b from-[#F6D3D3] to-[#D8524B]">
            <span className="text-8xl">🍎</span>
            <span className="absolute bottom-2 right-2 rounded-full bg-black/40 px-2 py-0.5 text-[11px] text-white">
              1 / 6
            </span>
          </div>
          <div className="p-5">
            <h3 className="text-right text-lg font-extrabold">
              🍎 انار نماد زندگی و برکت
            </h3>
            <p className="mt-2 text-right text-sm leading-7 text-ink/70">
              در فرهنگ ایرانی، انار نماد زندگی، عشق و برکت است. نقش انار را
              می‌توان در بسیاری از نقاشی‌ها، کاشی‌کاری‌ها و شعرهای قدیمی دید.
            </p>
            <div className="mt-3 border-t border-black/5 pt-3">
              <p className="text-right text-sm font-bold text-brand-600">
                Pomegranate: A Symbol of Life
              </p>
              <p className="mt-1 text-right text-xs leading-6 text-ink/45">
                In Persian culture, pomegranate is a symbol of life, love and
                abundance. You can see pomegranate patterns in many
                paintings, tiles and poems.
              </p>
            </div>
            <button className="mt-4 flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-bold text-white">
              <Volume2 size={16} />
              بشنو
            </button>
          </div>
        </div>
      </section>

      {/* More facts */}
      <section className="mt-7">
        <div className="flex items-center justify-end gap-1.5 text-lg font-extrabold">
          <Sparkles size={18} className="text-gold-500" />
          <span>بیشتر بدانیم</span>
        </div>

        <div
          dir="ltr"
          className="no-scrollbar mt-3 flex gap-3 overflow-x-auto pb-1"
        >
          {facts.map((f) => (
            <div
              key={f.title}
              dir="rtl"
              className="w-[170px] shrink-0 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-card"
            >
              <div
                className={`relative flex h-28 items-center justify-center ${f.bg}`}
              >
                <span className="text-5xl">{f.emoji}</span>
                <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/80">
                  <Star size={12} className="text-ink/50" />
                </span>
              </div>
              <div className="p-3">
                <p className="text-right text-sm font-bold">{f.title}</p>
                <p className="mt-1 text-right text-[11px] leading-5 text-ink/55">
                  {f.fa}
                </p>
                <p className="mt-1 text-right text-[10px] leading-4 text-ink/35">
                  {f.en}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Banner */}
      <Link
        href="#"
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
