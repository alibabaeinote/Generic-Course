"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Accordion } from "@/components/ui/Accordion";
import { Dialog } from "@/components/ui/Dialog";
import { track } from "@/lib/analytics/track";
import styles from "./page.module.css";

const faqItems = [
  {
    id: "recording",
    question: "اگه یک جلسه رو از دست بدم چی؟",
    answer:
      "هر جلسهٔ زنده ضبط می‌شه و تو پنل دوره برای بازبینی می‌مونه. ضبط برای مرور اضافه‌ست، نه جایگزین حضور.",
  },
  {
    id: "level",
    question: "برای کی مناسب نیست؟",
    answer:
      "اگه هنوز هیچ تجربهٔ عملی طراحی نداشتی و دنبال آموزش خیلی مقدماتی ابزارها هستی، این دوره نقطهٔ شروع مناسبی نیست.",
  },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("این یک ایمیل معتبر نیست.");
      return;
    }
    setError("");
    setDialogOpen(true);
  }

  return (
    <main id="main" className={styles.wrap}>
      <header className={styles.hero}>
        <span className={styles.eyebrow}>Design,Aware · M1 — پی‌ریزی فنی</span>
        <h1>یه پایهٔ فنی که از روز اول درست ایستاده</h1>
        <p className={styles.lede}>
          این صفحه کامپوننت‌های پایهٔ دیزاین‌سیستم رو نشون می‌ده — دکمه، فرم، آکاردئون و یک دیالوگ —
          دقیقاً با توکن‌های همون سندی که پروتوتایپ‌های لندینگ رو ساخته.
        </p>
        <div className={styles.actions}>
          <Button
            variant="primary"
            onClick={() => track("click_primary_cta", { location: "hero", course_status: "upcoming", destination: "external_enroll" })}
          >
            دکمهٔ اصلی
          </Button>
          <Button variant="ghost">دکمهٔ ثانویه</Button>
        </div>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>فرم نمونه</h2>
        <form className={styles.formCard} onSubmit={handleSubmit} noValidate>
          <Field
            id="sample-email"
            label="ایمیل"
            type="email"
            placeholder="mina@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
          />
          <Button type="submit">ارسال</Button>
        </form>
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} title="ثبت شد">
          <p style={{ color: "var(--fg-2)" }}>ایمیلت ({email}) با موفقیت ثبت شد.</p>
        </Dialog>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle} style={{ marginBlockEnd: "1rem" }}>
          سوالات متداول
        </h2>
        <Accordion items={faqItems} />
      </section>

      <footer className={styles.footer}>
        این صفحه زیرساخت M1 رو تأیید می‌کنه؛ محتوای واقعی صفحهٔ اصلی در M2 ساخته می‌شه (نگاه کن به
        docs/ROADMAP.md).
      </footer>
    </main>
  );
}
