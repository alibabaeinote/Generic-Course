import type { Metadata } from "next";
import { vazirmatn, bricolage, spaceGrotesk, spaceMono } from "./fonts";
import { SkipLink } from "@/components/ui/SkipLink";
import "./globals.css";

export const metadata: Metadata = {
  title: "دیزاین‌آگاهی",
  description: "اردوی آنلاین مهارت‌آموزی دیزاین‌آگاهی",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable} ${bricolage.variable} ${spaceGrotesk.variable} ${spaceMono.variable}`}
    >
      <body>
        <SkipLink />
        {children}
      </body>
    </html>
  );
}
