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
| دیتابیس | **Postgres** + **Drizzle ORM** — از M4 به بعد برای فاز ۲/۳. **برای ماژول اطلس، از M3.5 جلو کشیده شده (D19)** | ظرفیت و پرداخت به تراکنش و قید یکتا نیاز دارند؛ Drizzle سبک و type-safe است. عضویت گروه و نشانه‌های شخصی اطلس هم per-user/per-session‌اند و فایل استاتیک پوششش نمی‌دهد. |
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

---

## ۷. معماری محتوای ماژولار (اطلس)

**الزام:** جزوه‌ها امروز بیشتر متن و تصویرند، اما قرار نیست سیستم فرض کند همیشه همین دو فرمت باقی می‌مانند.
افزودن فرمت تازه (ویدئو، فایل صوتی، PDF جاسازی‌شده، embed) یا تغییر سبک نگارش نباید نیازمند migration یا
بازنویسی UI باشد. راه‌حل: **مدل محتوای بلوک‌محور**، نه HTML یکپارچه و نه جدول سفت‌وسخت به‌ازای هر فرمت.

### ۷.۱ واحد پایه: Block

هر Section آرایه‌ای مرتب از `Block` است. `Block` یک discriminated union با فیلد `type` است:

```ts
type Block =
  | { id: string; type: "paragraph"; text: string }
  | { id: string; type: "heading"; text: string; level: 2 | 3 }
  | { id: string; type: "image"; src: string; alt: string; caption?: string }
  | { id: string; type: "quote"; text: string; cite?: string }
  | { id: string; type: "list"; style: "bullet" | "number"; items: string[] }
  | { id: string; type: "link"; href: string; title: string; note?: string }
  | { id: string; type: "file"; href: string; title: string; mime: string; sizeKB?: number }
  | { id: string; type: "code"; lang: string; code: string }
```

افزودن فرمت جدید (مثلاً `video`) یعنی یک عضو تازه به این union + یک تابع رندر برای همان نوع — بدون لمس
بلوک‌های قبلی و بدون migration، چون بلوک‌های موجود همچنان معتبرند.

- **`id` پایدار و یک‌بار اختصاص‌یافته است و هرگز دوباره استفاده نمی‌شود.** نشانه‌های کاربر (ذخیره/هایلایت/
  مهم‌برای‌پروژه‌ام) به همین `id` وصل می‌شوند، نه به آفست متن — پس ویرایش محتوا (حتی تغییر کامل متن یک
  پاراگراف) نشانه را از بین نمی‌برد، مگر خود بلوک حذف شود.
- بلوک حجیم (تصویر، فایل) فقط **رفرنس** نگه می‌دارد (URL در Object Storage + متادیتا)، نه دادهٔ باینری —
  حجم سند مستقل از حجم رسانه می‌ماند.
- هر Section عدد `schemaVersion` دارد؛ تغییرات افزایشی (بلوک جدید) نیازی به افزایش نسخه ندارند، فقط تغییر
  شکل یک بلوک موجود (به‌ندرت پیش‌بینی می‌شود) به نسخهٔ جدید نیاز دارد.

### ۷.۲ سلسله‌مراتب محتوا

```
Course → Session → Topic (محتوا / منابع و لینک‌ها / راهنمای تمرین / …) → Section → Block[]
```

`Topic` هم دیتاست، نه کامپوننت هاردکدشده: `{ key: string; label: string; sections: Section[] }[]`. سه تب
فعلی («محتوا»، «منابع و لینک‌ها»، «راهنمای تمرین») سه آیتم همین آرایه‌اند — افزودن تب چهارم (مثلاً «ویدئوهای
تکمیلی») یعنی یک آیتم دیگر در دادهٔ جلسه، نه تغییر در کد UI تب‌ها. TOC داخل صفحهٔ خواندن هم به همین ترتیب
از روی بلوک‌های `heading` همان Section به‌صورت خودکار ساخته می‌شود، نه فهرست دستی.

### ۷.۳ پیاده‌سازی در دیتابیس

Section (با آرایهٔ Block به‌صورت ستون JSONB) واحد خواندن/نوشتن است — نه هر بلوک یک ردیف جدا؛ چون بلوک‌های
یک Section همیشه با هم خوانده و ویرایش می‌شوند و نرمال‌سازی تا سطح بلوک سربار بی‌فایده اضافه می‌کند.
انعطاف‌پذیری در همین سطح (TypeScript union + JSONB) تأمین می‌شود، نه در تعداد جدول.

جدول‌های اصلی: `Course`, `Session` (با `status: draft|published` و `releasedToGroupIds[]`), `Topic`,
`Section` (شامل `blocks: Block[]` به‌صورت JSONB و `schemaVersion`), `Group`, `Membership` (کاربر↔گروه،
مدیریت دستی توسط مدرس — D17)، `UserMark` (کاربر + `sectionId` + `blockId` + `kind: save|highlight|flag` +
یادداشت اختیاری).

### ۷.۴ توابع دسترسی و جست‌وجو — فرمت‌آگنوستیک

- **`canAccessSession(userGroups, session)`**: تابع خالص که فقط به وضعیت انتشار/آزادسازی و عضویت گروه نگاه
  می‌کند؛ کاری به نوع بلوک‌های داخل Session ندارد. همان تابع برای هر Session با هر ترکیب بلوکی کار می‌کند.
- **`buildSearchIndex(sessions, userAccess)`**: ایندکس جست‌وجو را فقط از Sessionهایی می‌سازد که
  `canAccessSession` برایشان true است — یعنی محتوای قفل از اساس وارد ایندکس نمی‌شود (نه فیلتر در نتیجه،
  حذف در ورودی). هر نوع بلوک یک تابع استخراج متن کوچک دارد (`paragraph`→متنش، `image`→`alt`+`caption`،
  `file`→`title`)؛ افزودن نوع بلوک تازه فقط یک استخراج‌گر کوچک اضافه می‌کند، نه تغییر در موتور جست‌وجو.
  نرمال‌سازی فارسی (ی/ي، ک/ك، نیم‌فاصله) یک‌بار در لایهٔ مشترک پیاده می‌شود، نه به‌ازای هر نوع محتوا.
- **رندر UI**: نقشهٔ `BlockRenderers: Record<BlockType, Component>`؛ بلوکی با نوع ناشناس (محتوای ساخته‌شده
  با نسخهٔ جدیدتر از کلاینتی قدیمی‌تر) به‌جای کرش، یک placeholder خنثی («این نوع محتوا به‌زودی پشتیبانی
  می‌شود») نشان می‌دهد — سازگاری روبه‌جلو، نه فقط رو‌به‌عقب.

نمونهٔ اول این مدل (schema + دادهٔ seed واقعی از چالش «پژوهش اکتشافی» + توابع access/search) در
`content/atlas/` و `lib/atlas/` پیاده و با `npx tsc --noEmit` و اسکریپت `scripts/check-atlas.ts` تأیید شده
است؛ هنوز به اپ Next.js یا دیتابیس واقعی وصل نیست — آن اتصال در M3.5 انجام می‌شود.

**نمونهٔ تعاملی UI (ورود → نقشهٔ راه → خواندن)** با esbuild از همین فایل‌ها باندل می‌شود
(`scripts/atlas-browser-entry.ts` + `scripts/build-atlas-bundle.mjs`) و به‌صورت یک `<script>` درون artifact
جاسازی می‌شود — یعنی UI با همان کد واقعی دسترسی/جست‌وجو اجرا می‌شود، نه یک پیاده‌سازی موازی دست‌نویس در
جاوااسکریپت صفحه. وقتی `content/atlas` یا `lib/atlas` عوض شود، باندل باید دوباره ساخته و در artifact
جایگزین شود.
