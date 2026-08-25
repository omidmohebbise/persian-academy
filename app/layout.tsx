import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

const vazir = Vazirmatn({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-vazir",
});

export const metadata: Metadata = {
  title: "آکادمی پارسی",
  description: "یادگیری زبان فارسی برای کودکان",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazir.variable} font-vazir bg-cream text-ink`}>
        <div className="mx-auto min-h-screen max-w-[520px] bg-cream pb-24">
          {children}
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
