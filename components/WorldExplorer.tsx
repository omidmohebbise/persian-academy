"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";
import { getFacts } from "@/lib/api/world";
import type { Fact, FactCategory } from "@/types";
import FactCard from "@/components/FactCard";

export default function WorldExplorer({
  categories,
  initialFacts,
  children,
}: {
  categories: FactCategory[];
  initialFacts: Fact[];
  children: React.ReactNode;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [facts, setFacts] = useState<Fact[]>(initialFacts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getFacts(selected ?? undefined).then((data) => {
      if (!cancelled) {
        setFacts(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [selected]);

  return (
    <>
      <div dir="ltr" className="no-scrollbar mt-5 flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setSelected(null)}
          className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition ${
            selected === null
              ? "bg-brand-500 text-white"
              : "bg-white text-ink/60 shadow-card"
          }`}
        >
          همه
          <span>✨</span>
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelected(c.id)}
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition ${
              selected === c.id
                ? "bg-brand-500 text-white"
                : "bg-white text-ink/60 shadow-card"
            }`}
          >
            {c.label}
            <span>{c.icon}</span>
          </button>
        ))}
      </div>

      {children}

      <section className="mt-7">
        <div className="flex items-center justify-between gap-2">
          <Link
            href="/facts"
            className="flex items-center gap-1 text-sm font-semibold text-brand-500"
          >
            <ChevronRight size={16} />
            مشاهده همه
          </Link>
          <div className="flex items-center justify-end gap-1.5 text-lg font-extrabold">
            <Sparkles size={18} className="text-gold-500" />
            <span>بیشتر بدانیم</span>
          </div>
        </div>

        <div
          dir="ltr"
          className="no-scrollbar mt-3 flex gap-3 overflow-x-auto pb-1 transition-opacity"
          style={{ opacity: loading ? 0.4 : 1 }}
        >
          {facts.length === 0 && !loading ? (
            <p dir="rtl" className="w-full py-6 text-center text-sm text-ink/40">
              دانستنی‌ای در این دسته پیدا نشد.
            </p>
          ) : (
            facts.map((f) => <FactCard key={f.id} fact={f} />)
          )}
        </div>
      </section>
    </>
  );
}
