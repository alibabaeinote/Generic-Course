# استک فنی و معماری

هدف این سند: انتخاب کمترین تعداد ابزار ممکن که هر سه فاز PRD را بدون بازنویسی بپوشاند.
اصل راهنما از PRD: «ابتدا یک معماری قابل نگهداری با کمترین abstraction لازم.»

---

## ۱. تصمیم بنیادی: مخاطب کجاست؟ — ✅ بسته شد

**تصمیم:** مخاطب فارسی‌زبان است؛ عمدتاً داخل ایران، اما بدون محدودیت جغرافیایی. یعنی سایت باید **از هر دو
جغرافیا در دسترس باشد** — این شرط، نه سلیقه، انتخاب هاست را تعیین می‌کند و **مسیر A** را قطعی می‌کند.
Vercel و PaaSهای مشابه حذف شدند، چون از داخل ایران باز نمی‌شوند.

نکتهٔ اجرایی: چون بخشی از مخاطب خارج از ایران است، هر منبع بیرونی (فونت، اسکریپت، تصویر) باید از دامنه‌ای
بیاید که در **هیچ‌کدام** از دو جغرافیا مسدود نیست. ساده‌ترین راه: همه‌چیز self-hosted روی همان دامنه.

جدول زیر برای ثبت تاریخچهٔ تصمیم نگه داشته شده است.

| | مسیر A — مخاطب داخل ایران (پیش‌فرض پیشنهادی) | مسیر B — مخاطب خارج از ایران |
|---|---|---|
| هاست | لیارا / ابرآروان (پشتیبانی مستقیم Next.js) | Vercel |
| دیتابیس | Postgres لیارا / ابرآروان | Neon یا Supabase |
| فایل | Object Storage ابرآروان (S3-compatible) | Cloudflare R2 |
| پرداخت | زرین‌پال یا زیبال | Stripe |
| احراز هویت | OTP پیامکی (کاوه‌نگار) + ایمیل | Magic link ایمیلی |
| ایمیل تراکنشی | SMTP لیارا / نجوا | Resend |
| CDN و DNS | ابرآروان | Cloudflare |

**چرا این مهم است:** Vercel و اکثر PaaSهای آمریکایی IPهای ایران را مسدود می‌کنند. اگر مخاطب اصلی داخل ایران است،
انتشار روی Vercel یعنی سایتی که مخاطب هدف بدون فیلترشکن نمی‌بیند — و نرخ تبدیل فاز ۱ عملاً صفر می‌شود.
همچنین Stripe برای کسب‌وکار ایرانی قابل استفاده نیست و زرین‌پال برای مخاطب خارجی کارت بین‌المللی نمی‌پذیرد.

> **پیش‌فرض این مستند مسیر A است.** اگر مالک محصول مسیر B را انتخاب کند، فقط جدول بالا و بخش ۶ عوض می‌شود؛
> کد اپلیکیشن با یک لایهٔ آداپتور (`lib/payment/*`, `lib/storage/*`, `lib/mailer/*`) در هر دو حالت یکسان می‌ماند.

---

## ۲. استک اپلیکیشن (مستقل از مسیر A/B)

| لایه | انتخاب | دلیل |
|---|---|---|
| فریم‌ورک | **Next.js (App Router) + TypeScript** | FR7 فاز ۱ (محتوای متنی در اولین پاسخ HTML)، SEO، و در فاز ۲/۳ همان اپ Route Handler و session سمت سرور می‌دهد. |
| استایل | **Tailwind CSS v4** با logical properties | `padding-inline-start` به‌جای `padding-left` → RTL واقعی، نه `text-align: right`. |
| فونت | **Kalameh** self-hosted (woff2, subset فارسی) + fallback `Vazirmatn`, system | PRD تایپوگرافی؛ self-host برای عملکرد و عدم وابستگی به CDN خارجی. |
| کامپوننت | کامپوننت‌های اختصاصی، بدون UI-kit سنگین | Visual Direction دوره خاص است؛ کتابخانهٔ آماده باید override شود. برای primitiveهای accessible (accordion، dialog) از **Radix UI** استفاده می‌شود. |
| محتوا | فایل‌های TypeScript/MDX داخل ریپو (`content/`) | فاز ۱ نیازی به CMS ندارد. مالک محصول = تنها ویرایشگر. مهاجرت به CMS در فاز ۴. |
| دیتابیس | **Postgres** + **Drizzle ORM** — از M4 به بعد. **v1 بدون دیتابیس منتشر می‌شود** | ظرفیت و پرداخت به تراکنش و قید یکتا نیاز دارند؛ Drizzle سبک و type-safe است. |
| اعتبارسنجی | **Zod** روی مرز سرور | الزام PRD: اعتبارسنجی سمت سرور. |
| احراز هویت | فاز ۲: session cookie امن + OTP | ساده‌تر از NextAuth برای این دامنه؛ بدون ذخیرهٔ رمز. |
| آنالیتیکس | **Umami** یا **Plausible** (self-host) + رویدادهای سفارشی | PRD: «اطلاعات حساس یا غیرضروری جمع‌آوری نشود». |
| تست | **Vitest** (واحد) + **Playwright** (Acceptance Criteria) | هر AC در PRD یک تست Playwright می‌شود. |
| کیفیت | ESLint، Prettier، TypeScript strict، `axe` در CI، Lighthouse CI | تعریف Done مشترک. |

---

## ۳. ساختار پوشه‌ها (هدف)

```
app/
  (marketing)/            # فاز ۱ — عمومی، static/ISR
    page.tsx              # /
    course/page.tsx
    about/page.tsx
    faq/page.tsx
    waitlist/page.tsx
    privacy|terms/page.tsx
  (commerce)/             # فاز ۲
    courses/, enroll/, checkout/, payment/, account/
  (learn)/                # فاز ۳
    learn/, mentor/
  admin/                  # فاز ۲ به بعد، role-gated
  api/
    waitlist/route.ts
    payment/webhook/route.ts
components/
  ui/                     # primitives: Button, Accordion, Field, Dialog
  sections/               # سکشن‌های لندینگ: Hero, Problem, Path, Honesty, ...
content/
  course.ts               # منبع واحد وضعیت و اطلاعات دوره (FR2)
  faq.ts
  landing/*.mdx
lib/
  db/, analytics/, payment/, storage/, mailer/, validation/
docs/                     # همین مستندات
tests/e2e/                # Playwright، به تفکیک Acceptance Criteria
```

---

## ۴. قرارداد دادهٔ بین فازها (پیاده‌سازی FR2 و «اصل داده»)

- `content/course.ts` تنها منبع وضعیت دوره است. هیچ متن وضعیتی در JSX هاردکد نمی‌شود.
  ```ts
  export type CourseStatus = 'upcoming' | 'open' | 'waitlist' | 'full' | 'closed'
  // هر status دقیقاً یک ctaLabel، یک ctaHref و یک statusLabel دارد.
  ```
- در فاز ۲ همین ماژول از `CourseRun` دیتابیس تغذیه می‌شود؛ **امضای تابع تغییر نمی‌کند** تا لندینگ بازنویسی نشود.
- `WaitlistEntry.email` از روز اول با ایندکس یکتا (case-insensitive) ذخیره می‌شود تا مهاجرت به `User` در فاز ۲
  idempotent بماند.

---

## ۵. محیط‌ها

| محیط | شاخه | دامنه | دیتابیس |
|---|---|---|---|
| Local | هر شاخه | `localhost:3000` | Postgres داکر |
| Staging | `main` | `staging.<domain>` (noindex) | نمونهٔ جدا |
| Production | تگ نسخه یا `main` با تأیید | دامنهٔ اصلی | نمونهٔ اصلی + بکاپ روزانه |

Staging باید `X-Robots-Tag: noindex` بدهد و رویدادهای آنالیتیکس آن جدا باشد (الزام AC فاز ۱).

---

## ۶. تصمیم‌های فنی مؤجل (عمداً به تعویق افتاده)

اینها را **نمی‌سازیم** تا نیاز واقعی ثابت شود: CMS سفارشی، microservice، صف پیام، چندزبانه‌سازی،
اپلیکیشن موبایل، سیستم اعلان real-time، طراحی مجدد بر پایهٔ design-token generator.
