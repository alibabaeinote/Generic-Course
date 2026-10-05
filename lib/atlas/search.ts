import type { Block, Session } from "../../content/atlas/schema.js";
import { accessibleSessions } from "./access.js";

/**
 * Normalizes Persian text for matching: unifies Arabic ي/ك with Persian ی/ک, collapses
 * half-space/ZWNJ and whitespace variants, and lowercases (for any Latin terms mixed in).
 * One normalizer shared by every block type — content format never needs its own matching logic.
 */
export function normalizeFa(input: string): string {
  return input
    .replace(/ي/g, "ی") // ي -> ی
    .replace(/ك/g, "ک") // ك -> ک
    .replace(/[‌\s]+/g, " ")
    .trim()
    .toLowerCase();
}

/**
 * One small text-extractor per block type. Adding a new Block variant means adding one case
 * here — the index builder and the matching logic below never change.
 */
function extractText(block: Block): string {
  switch (block.type) {
    case "paragraph":
    case "quote":
    case "heading":
      return block.text;
    case "image":
      return [block.alt, block.caption].filter(Boolean).join(" ");
    case "list":
      return block.items.join(" ");
    case "link":
      return [block.title, block.note].filter(Boolean).join(" ");
    case "file":
      return block.title;
    case "code":
      return block.code;
  }
}

export interface SearchHit {
  sessionId: string;
  sessionTitle: string;
  topicKey: string;
  topicLabel: string;
  sectionId: string;
  blockId: string;
  text: string;
}

interface IndexEntry extends SearchHit {
  normalized: string;
}

/**
 * Builds the index from accessible sessions only — locked content is absent from the index
 * itself, not filtered out of results after the fact. This is what makes it structurally
 * impossible for a search hit to leak a paragraph from a session the user cannot open.
 */
export function buildSearchIndex(
  userGroupIds: readonly string[],
  sessions: readonly Session[],
): IndexEntry[] {
  const entries: IndexEntry[] = [];
  for (const session of accessibleSessions(userGroupIds, sessions)) {
    for (const topic of session.topics) {
      for (const section of topic.sections) {
        for (const block of section.blocks) {
          const text = extractText(block);
          if (!text) continue;
          entries.push({
            sessionId: session.id,
            sessionTitle: session.title,
            topicKey: topic.key,
            topicLabel: topic.label,
            sectionId: section.id,
            blockId: block.id,
            text,
            normalized: normalizeFa(text),
          });
        }
      }
    }
  }
  return entries;
}

export function search(index: readonly IndexEntry[], query: string): SearchHit[] {
  const q = normalizeFa(query);
  if (!q) return [];
  return index
    .filter((entry) => entry.normalized.includes(q))
    .map(({ normalized: _normalized, ...hit }) => hit);
}
