/**
 * Single entry point bundled (via esbuild, see scripts/build-atlas-bundle.mjs) into one inline
 * <script> for the Atlas UI prototype artifact. This is NOT reimplemented logic — it is the exact
 * same content/atlas and lib/atlas source the real app will import, compiled once. Updating the
 * real .ts files and re-running the build is the only way to change this bundle.
 */
import { designAwareCourse } from "../content/atlas/course.js";
import { STANDARD_TOPICS } from "../content/atlas/schema.js";
import { canAccessSession, accessibleSessions } from "../lib/atlas/access.js";
import { buildSearchIndex, search, normalizeFa } from "../lib/atlas/search.js";

(globalThis as any).AtlasCore = {
  course: designAwareCourse,
  STANDARD_TOPICS,
  canAccessSession,
  accessibleSessions,
  buildSearchIndex,
  search,
  normalizeFa,
};
