import type { EventName, EventPropsMap } from "./events";

/**
 * track(name, props) — the only entry point for analytics. No provider is wired yet (D11 in
 * DECISIONS.md is still open), so this logs in development and is a deliberate no-op in
 * production until a provider lands; callers don't need to change when it does.
 *
 * The EventPropsMap type is the enforcement for docs/ANALYTICS.md's rule — no email, name, form
 * content or personally-identifying id can be passed, because the map simply has no such field.
 */
export function track<Name extends EventName>(name: Name, props: EventPropsMap[Name]): void {
  if (process.env.NODE_ENV !== "production") {
    console.info("[track]", name, props);
  }
  // Provider wiring (Umami or equivalent, per D11) is intentionally not implemented yet.
}
