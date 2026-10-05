import type { Session } from "../../content/atlas/schema.js";

/**
 * Pure access check. Deliberately knows nothing about block types or topic shape — adding a new
 * Block variant or Topic never touches this function. See docs/TECH-STACK.md §7.4.
 *
 * Rule from the product brief: a session not yet released is unreachable for a student in that
 * group — not just hidden in the UI, but absent from search and export too (callers must check
 * this *before* building a search index or serving an export, not filter the result after).
 */
export function canAccessSession(userGroupIds: readonly string[], session: Session): boolean {
  if (session.state !== "released") return false;
  return session.releasedToGroupIds.some((groupId) => userGroupIds.includes(groupId));
}

export function accessibleSessions(
  userGroupIds: readonly string[],
  sessions: readonly Session[],
): Session[] {
  return sessions.filter((session) => canAccessSession(userGroupIds, session));
}
