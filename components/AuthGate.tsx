"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import Avatar from "@/components/Avatar";
import BottomNav from "@/components/BottomNav";
import { useAuth } from "@/lib/store/AuthContext";

const WELCOME_PATH = "/welcome";

/**
 * Gates the whole app behind the /welcome onboarding+login flow: bounces a
 * logged-out visitor to /welcome, and bounces a logged-in one away from it.
 * Owns rendering the app chrome (the centered container + BottomNav) so
 * there's a single place deciding when the tab bar is visible, instead of
 * every page/BottomNav guessing independently.
 */
export default function AuthGate({ children }: { children: ReactNode }) {
  const { isAuthenticated, hydrated } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const onWelcome = pathname?.startsWith(WELCOME_PATH) ?? false;

  useEffect(() => {
    if (!hydrated) return;
    if (!isAuthenticated && !onWelcome) {
      router.replace(WELCOME_PATH);
    } else if (isAuthenticated && onWelcome) {
      router.replace("/");
    }
  }, [hydrated, isAuthenticated, onWelcome, router]);

  const settled =
    hydrated && (isAuthenticated ? !onWelcome : onWelcome);

  if (!settled) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <Avatar size={72} />
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto min-h-screen max-w-[520px] bg-cream pb-24">
        {children}
      </div>
      {!onWelcome && <BottomNav />}
    </>
  );
}
