import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import AuthGate from "@/components/AuthGate";
import { AuthProvider } from "@/lib/store/AuthContext";
import { AppStateProvider } from "@/lib/store/AppStateContext";

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
        <AuthProvider>
          <AppStateProvider>
            <AuthGate>{children}</AuthGate>
          </AppStateProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
