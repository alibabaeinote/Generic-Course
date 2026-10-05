import type { Course, Session } from "./schema.js";
import { pazhouheshEkteshafi } from "./sessions/pazhouhesh-ekteshafi.js";

/**
 * Lightweight session stub — real metadata (title/subtitle/state), topics present but not yet
 * filled with blocks. Once the instructor writes the real jozveh, only `topics[].sections` needs
 * filling in — the shape, access rules and rendering are already correct.
 */
function stub(
  id: string,
  index: number,
  emoji: string,
  title: string,
  subtitle: string,
  state: Session["state"],
  releasedToGroupIds: string[] = [],
): Session {
  return {
    id,
    index,
    emoji,
    title,
    subtitle,
    state,
    releasedToGroupIds,
    topics: [
      { key: "content", label: "محتوا", sections: [] },
      { key: "resources", label: "منابع و لینک‌ها", sections: [] },
      { key: "exerciseGuide", label: "راهنمای تمرین", sections: [] },
    ],
  };
}

export const designAwareCourse: Course = {
  id: "product-design-cohort1",
  title: "دورهٔ طراحی محصول",
  sessions: [
    stub("s0", 0, "🔥", "آماده‌ای؟", "یادگیری پروژه‌محور", "released", ["g-cohort1"]),
    stub("s1", 1, "🤔", "دیزاین‌شناسی", "نقشهٔ کار دیزاین", "released", ["g-cohort1"]),
    stub("s2", 2, "✍️", "بریف و وظایف دیزاین", "بعد از جلسهٔ زنده", "released", ["g-cohort1"]),
    pazhouheshEkteshafi,
    stub("s4", 4, "📦", "سنتز و بخش‌بندی", "الان در حال برگزاری", "live"),
    stub("s5", 5, "🏃‍♂️", "حس محصول", "آزمایش کم‌هزینه", "locked"),
    stub("s6", 6, "🚀", "فلو — UI", "نقشهٔ مسیر کاربر", "locked"),
    stub("s7", 7, "🧩", "تعامل و پروتوتایپ", "معماری تجربه", "locked"),
    stub("s8", 8, "🎨", "ظاهر — UI", "رابط آمادهٔ تولید", "locked"),
    stub("s9", 9, "🛠️", "فیگما", "ابزارهای UI", "locked"),
  ],
};
