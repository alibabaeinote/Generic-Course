import type { Session } from "../schema.js";

/**
 * Real jozveh content (not placeholder) — the "exploratory research planning" exercise about
 * azki.com, taken from the instructor's actual course notes. Used as the first real block-tree
 * example and as fixture data for scripts/check-atlas.ts.
 */
export const pazhouheshEkteshafi: Session = {
  id: "s3",
  index: 3,
  emoji: "🔍",
  title: "پژوهش اکتشافی",
  subtitle: "چالش برنامه‌ریزی پژوهش کاربر",
  state: "released",
  releasedToGroupIds: ["g-cohort1"],
  topics: [
    {
      key: "content",
      label: "محتوا",
      sections: [
        {
          id: "sec-brief",
          schemaVersion: 1,
          blocks: [
            {
              id: "p-brief",
              type: "paragraph",
              text: "بریف: عادات، تمایلات و مشکلات کاربران سرویس خرید بیمهٔ آنلاین ازکی را در فرایند جست‌وجو، مقایسه و خرید بیمه بررسی کنید تا بتوانیم راه‌حل‌هایی برای بهبودش پیدا کنیم. یک سند «برنامه‌ریزی» برای این پروژهٔ پژوهشی آماده کنید و روش (پرسشنامه) را در پُرس‌لاین طراحی کنید.",
            },
            {
              id: "p-groups",
              type: "paragraph",
              text: "نکته: سه گروه کاربر می‌توانند هدف مطالعهٔ ما باشند — کسانی که بالقوه خرید بیمه از ازکی دارند، کاربرانی که یک خرید داشته‌اند، و کاربران وفادار (Pro Users) که از ازکی تمدید و بیمهٔ خود را انجام می‌دهند.",
            },
            {
              id: "p-target",
              type: "paragraph",
              text: "اما مخاطب این تسک به‌طور خاص (Target Audience): کاربرانی که اولین تجربهٔ استفاده از ازکی را داشته‌اند — حتی اگر تا خرید بیمه ادامه نداده و رها کرده باشند.",
            },
            {
              id: "p-rule",
              type: "paragraph",
              text: "این چالش فقط طراحی سوالات پرسشنامه است؛ نیازی به انتشار واقعی‌اش نیست. پاسخ‌ها را همین‌جا زیر همین تاپیک تلگرامی بگذار — اگر تیمی هستید، گروهی هم می‌شود انجامش داد.",
            },
          ],
        },
      ],
    },
    {
      key: "resources",
      label: "منابع و لینک‌ها",
      sections: [
        {
          id: "sec-links",
          schemaVersion: 1,
          blocks: [
            {
              id: "l-azki",
              type: "link",
              href: "https://azki.com",
              title: "azki.com — خرید آنلاین بیمه، مشاوره و استعلام",
              note: "سرویسی که این چالش دربارهٔ تجربهٔ کاربریشه؛ قبل از طراحی سوال، یک بار مسیر خریدش رو خودت طی کن.",
            },
            {
              id: "l-survey1",
              type: "link",
              href: "https://survey.porsline.ir/s/V6DXdFfh",
              title: "نمونهٔ پرسشنامهٔ ۱ — پُرس‌لاین",
              note: "الگوی ساختار سوال و گزینه‌ها؛ برای کپی‌کردن لحن، نه محتوا.",
            },
            {
              id: "l-survey2",
              type: "link",
              href: "https://survey.porsline.ir/s/PtRS0duA/",
              title: "نمونهٔ پرسشنامهٔ ۲ — پُرس‌لاین",
              note: "یک شکل دیگر از همان تمرین، برای مقایسه.",
            },
          ],
        },
      ],
    },
    {
      key: "exerciseGuide",
      label: "راهنمای تمرین",
      sections: [
        {
          id: "sec-guide",
          schemaVersion: 1,
          blocks: [
            { id: "h-goal", type: "heading", text: "هدف", level: 3 },
            {
              id: "p-goal",
              type: "paragraph",
              text: "فهمیدن اینکه کاربران تازه‌وارد چطور سفر خرید بیمه را تجربه می‌کنند و دقیقاً کجا رهایش می‌کنند.",
            },
            { id: "h-steps", type: "heading", text: "گام‌ها", level: 3 },
            {
              id: "l-steps",
              type: "list",
              style: "number",
              items: [
                "سند برنامه‌ریزی پژوهش را بنویس: هدف، مخاطب، روش.",
                "سوالات پرسشنامه را طراحی و در پُرس‌لاین پیاده کن.",
                "لینک را همین‌جا زیر همین تاپیک برای بازخورد بفرست.",
              ],
            },
            { id: "h-output", type: "heading", text: "خروجی مورد انتظار", level: 3 },
            {
              id: "p-output",
              type: "paragraph",
              text: "یک سند برنامه‌ریزی کامل + لینک پرسشنامهٔ طراحی‌شده. نیازی به انتشار واقعی نیست.",
            },
            { id: "h-selfcheck", type: "heading", text: "معیار خودارزیابی", level: 3 },
            {
              id: "l-selfcheck",
              type: "list",
              style: "bullet",
              items: [
                "سوالات فقط «اولین‌تجربه‌ای‌ها» را نشانه گرفته، نه همهٔ کاربران ازکی؟",
                "هر سوال به یکی از سه گروه مخاطب وصل است یا فقط حدسی است؟",
              ],
            },
            { id: "h-mistake", type: "heading", text: "اشتباه رایج", level: 3 },
            {
              id: "p-mistake",
              type: "paragraph",
              text: "فراموش‌کردن محدودسازی به یک گروه مخاطب خاص، و پرسیدن سوالات عمومی از همهٔ کاربران ازکی.",
            },
          ],
        },
      ],
    },
  ],
};
