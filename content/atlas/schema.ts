/**
 * Content model for Atlas (the jozveh portal). See docs/TECH-STACK.md §7 for the design
 * rationale — the short version: content is a block-based tree so a new format (video, audio,
 * embedded PDF) is a new union member, not a migration, and a user mark (save/highlight/flag)
 * attaches to a block's stable id, not to a text offset, so it survives content edits.
 */

export type BlockId = string;

/**
 * One piece of content inside a Section. Adding a new format means adding one more member here
 * plus one renderer (UI) and one text-extractor (search) for it — existing blocks are untouched.
 */
export type Block =
  | { id: BlockId; type: "paragraph"; text: string }
  | { id: BlockId; type: "heading"; text: string; level: 2 | 3 }
  | { id: BlockId; type: "image"; src: string; alt: string; caption?: string }
  | { id: BlockId; type: "quote"; text: string; cite?: string }
  | { id: BlockId; type: "list"; style: "bullet" | "number"; items: string[] }
  | { id: BlockId; type: "link"; href: string; title: string; note?: string }
  | {
      id: BlockId;
      type: "file";
      href: string;
      title: string;
      mime: string;
      sizeKB?: number;
    }
  | { id: BlockId; type: "code"; lang: string; code: string };

export type BlockType = Block["type"];

export interface Section {
  id: string;
  /** Bumped only when an existing block's *shape* changes, not when a new block type is added. */
  schemaVersion: 1;
  blocks: Block[];
}

export interface Topic {
  key: string;
  label: string;
  sections: Section[];
}

export type SessionState = "locked" | "live" | "released";

export interface Session {
  id: string;
  index: number;
  emoji: string;
  title: string;
  subtitle: string;
  state: SessionState;
  /** Groups this session has been released to. Empty while locked/live. */
  releasedToGroupIds: string[];
  topics: Topic[];
}

export interface Course {
  id: string;
  title: string;
  sessions: Session[];
}

export interface Group {
  id: string;
  label: string;
}

export interface Membership {
  userId: string;
  groupId: string;
}

export type MarkKind = "save" | "highlight" | "flag";

export interface UserMark {
  userId: string;
  sectionId: string;
  blockId: BlockId;
  kind: MarkKind;
  note?: string;
  createdAt: string;
}

/** Standard topic keys for v1. Topic is still data, not a hardcoded UI — a course can add more. */
export const STANDARD_TOPICS = {
  content: "محتوا",
  resources: "منابع و لینک‌ها",
  exerciseGuide: "راهنمای تمرین",
} as const;
