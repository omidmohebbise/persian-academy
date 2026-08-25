"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlusCircle, Globe2, User } from "lucide-react";

const items = [
  { href: "/", label: "خانه", icon: Home },
  { href: "/discover", label: "کشف", icon: PlusCircle },
  { href: "/world", label: "دانستنی‌ها", icon: Globe2 },
  { href: "/profile", label: "من", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-black/5 bg-white/95 backdrop-blur">
      <div
        dir="ltr"
        className="mx-auto flex max-w-[520px] items-center justify-between px-6 py-2.5"
      >
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-1 flex-col items-center gap-1 py-1"
            >
              <Icon
                size={24}
                strokeWidth={2.3}
                className={active ? "text-brand-500" : "text-ink/35"}
              />
              <span
                className={`text-[11px] font-medium ${
                  active ? "text-brand-500" : "text-ink/40"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
