import type { Session } from "../content/atlas/schema.js";
import { pazhouheshEkteshafi } from "../content/atlas/sessions/pazhouhesh-ekteshafi.js";
import { canAccessSession, accessibleSessions } from "../lib/atlas/access.js";
import { buildSearchIndex, search } from "../lib/atlas/search.js";

/**
 * Smoke test for the Atlas content model — no framework, no DB, just the pure functions against
 * real seed content. Run with `npm run check:atlas`. Exits non-zero on the first failed check.
 */

let failed = 0;
function check(label: string, pass: boolean): void {
  console.log((pass ? "✅" : "❌") + " " + label);
  if (!pass) failed++;
}

// a minimal locked fixture session, to prove locked content never surfaces anywhere
const lockedSession: Session = {
  id: "s4",
  index: 4,
  emoji: "📦",
  title: "سنتز و بخش‌بندی",
  subtitle: "الان در حال برگزاری",
  state: "live",
  releasedToGroupIds: [],
  topics: [
    {
      key: "content",
      label: "محتوا",
      sections: [
        {
          id: "sec-locked",
          schemaVersion: 1,
          blocks: [{ id: "p-locked", type: "paragraph", text: "این متن هنوز نباید به کسی نشان داده شود." }],
        },
      ],
    },
  ],
};

const sessions = [pazhouheshEkteshafi, lockedSession];

// --- access control ---
check(
  "دانشجوی گروه g-cohort1 به جلسهٔ آزادشده دسترسی دارد",
  canAccessSession(["g-cohort1"], pazhouheshEkteshafi) === true,
);
check(
  "دانشجوی گروه دیگر (g-cohort2) به همان جلسه دسترسی ندارد",
  canAccessSession(["g-cohort2"], pazhouheshEkteshafi) === false,
);
check("جلسهٔ زنده/قفل برای هیچ گروهی باز نیست", canAccessSession(["g-cohort1"], lockedSession) === false);
check(
  "accessibleSessions فقط جلسهٔ آزادشده را برمی‌گرداند",
  (() => {
    const list = accessibleSessions(["g-cohort1"], sessions);
    return list.length === 1 && list[0]?.id === "s3";
  })(),
);

// --- search: Persian normalization (Arabic ي/ك forms must match Persian ی/ک content) ---
const index = buildSearchIndex(["g-cohort1"], sessions);
check("ایندکس جست‌وجو خالی نیست", index.length > 0);
check(
  "عبارت «ازكي» (فرم عربی) متن «ازکی» (فارسی) را پیدا می‌کند",
  search(index, "ازكي").some((hit) => hit.text.includes("ازکی")),
);
check(
  "جست‌وجوی «Pro Users» (لاتین وسط متن فارسی) هم کار می‌کند",
  search(index, "Pro Users").length > 0,
);

// --- search: locked content must be structurally unreachable, not just filtered ---
check(
  "متن جلسهٔ قفل اصلاً وارد ایندکس نشده (نه فقط فیلتر شده)",
  !index.some((entry) => entry.sessionId === "s4"),
);
check(
  "جست‌وجوی عبارت منحصر‌به‌فرد جلسهٔ قفل هیچ نتیجه‌ای نمی‌دهد",
  search(index, "هنوز نباید به کسی").length === 0,
);

// --- content-model extensibility sanity check ---
check(
  "هر بلوک در محتوای نمونه یک id پایدار و غیرتکراری دارد",
  (() => {
    const ids = index.map((e) => e.blockId);
    return new Set(ids).size === ids.length;
  })(),
);

console.log("\n" + (failed === 0 ? `همهٔ ${index.length ? "" : ""}چک‌ها سبزند.` : `${failed} چک رد شد.`));
process.exit(failed === 0 ? 0 : 1);
