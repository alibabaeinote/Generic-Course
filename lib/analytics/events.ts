/**
 * Event names and their allowed props — the contract in docs/ANALYTICS.md is the source of truth.
 * A new event is added here only alongside a matching row in that doc, never silently.
 */

export type Phase1EventName =
  | "view_landing"
  | "click_primary_cta"
  | "faq_open"
  | "scroll_depth";

export type EventName = Phase1EventName;

export interface EventPropsMap {
  view_landing: { course_status: string };
  click_primary_cta: {
    location: "hero" | "sticky" | "footer";
    course_status: string;
    destination: "external_enroll";
  };
  faq_open: { question_id: string };
  scroll_depth: { depth: 25 | 50 | 75 | 100 };
}
