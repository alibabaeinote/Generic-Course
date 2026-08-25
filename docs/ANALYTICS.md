# رویدادها و اندازه‌گیری

اصل PRD: «eventهای اصلی از ابتدا نام‌گذاری و مستند شوند؛ اطلاعات حساس یا غیرضروری جمع‌آوری نشود.»
هیچ رویدادی نباید ایمیل، نام، محتوای فرم یا شناسهٔ قابل ردیابی به فرد را در payload بگذارد.

## قرارداد

```ts
track(name: EventName, props?: Record<string, string | number | boolean>)
```

- نام رویدادها `snake_case` و ثابت‌اند؛ در `lib/analytics/events.ts` به‌صورت union type تعریف می‌شوند.
- رویداد محیط staging و production جدا نگهداری می‌شود.
- هر رویداد جدید فقط با به‌روزرسانی همین فایل اضافه می‌شود.

## فاز ۱

| رویداد | زمان ارسال | props مجاز |
|---|---|---|
| `view_landing` | بارگذاری صفحهٔ اصلی | `course_status` |
| `click_primary_cta` | کلیک روی CTA اصلی | `location` (hero/sticky/footer)، `course_status` |
| `submit_waitlist` | نتیجهٔ ارسال فرم | `result` (success/duplicate/invalid/error)، `source` |
| `faq_open` | باز شدن آیتم FAQ | `question_id` |
| `scroll_depth` | عبور از ۲۵/۵۰/۷۵/۱۰۰ درصد | `depth` |

## فاز ۲

| رویداد | props مجاز |
|---|---|
| `view_course` | `course_slug`، `run_status` |
| `start_checkout` | `course_run_id` |
| `payment_success` | `course_run_id`، `provider` |
| `payment_failed` | `course_run_id`، `reason_code` |
| `join_waitlist` | `course_run_id` |

## فاز ۳

| رویداد | props مجاز |
|---|---|
| `lesson_open` | `lesson_id` |
| `lesson_complete` | `lesson_id` |
| `submission_created` | `assignment_id`، `version` |
| `feedback_viewed` | `submission_id` |
| `course_progress` | `course_run_id`، `percent` |

## قیف اصلی که هفتگی بررسی می‌شود

```
view_landing → click_primary_cta → submit_waitlist(success)
             → view_course → start_checkout → payment_success
```

## اهداف عملکرد و دسترسی‌پذیری

| شاخص | هدف |
|---|---|
| LCP (موبایل، 4G) | زیر ۲.۵ ثانیه |
| CLS | زیر ۰.۱ |
| INP | زیر ۲۰۰ میلی‌ثانیه |
| خطاهای جدی axe در صفحات public | صفر |
| کنتراست متن اصلی | حداقل ۴.۵:۱ |
