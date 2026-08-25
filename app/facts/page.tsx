import Link from "next/link";
import { ChevronRight } from "lucide-react";
import FactCard from "@/components/FactCard";
import StatsPillMini from "@/components/StatsPillMini";
import { getFactCategories, getFacts } from "@/lib/api/world";
import { getCurrentUser } from "@/lib/api/profile";

export default async function FactsPage() {
  const [user, categories, facts] = await Promise.all([
    getCurrentUser(),
    getFactCategories(),
    getFacts(),
  ]);

  return (
    <main className="px-4 pt-6">
      <div className="flex items-center justify-between">
        <StatsPillMini xp={user.xp} />
        <Link
          href="/world"
          className="flex items-center gap-1 text-sm font-semibold text-ink/60"
        >
          بازگشت
          <ChevronRight size={16} />
        </Link>
      </div>

      <h1 className="mt-5 text-right text-xl font-extrabold">
        همه دانستنی‌ها
      </h1>
      <p className="mt-1 text-right text-sm text-ink/45">
        {facts.length} دانستنی درباره فرهنگ، تاریخ و طبیعت ایران
      </p>

      {categories.map((cat) => {
        const items = facts.filter((f) => f.categoryId === cat.id);
        if (items.length === 0) return null;
        return (
          <section key={cat.id} className="mt-7">
            <div className="flex items-center justify-end gap-1.5 text-base font-bold text-ink/70">
              <span>{cat.label}</span>
              <span>{cat.icon}</span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {items.map((f) => (
                <FactCard key={f.id} fact={f} className="w-full" />
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
