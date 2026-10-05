"use client";

import { useId, useState } from "react";
import styles from "./Accordion.module.css";

export interface AccordionItemData {
  id: string;
  question: string;
  answer: string;
}

/** Default-closed FAQ accordion, aria-expanded driven, grid-trick height (no JS measuring). */
export function Accordion({ items }: { items: AccordionItemData[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const baseId = useId();

  return (
    <div className={styles.acc}>
      {items.map((item) => {
        const open = openId === item.id;
        const panelId = `${baseId}-${item.id}-panel`;
        const btnId = `${baseId}-${item.id}-btn`;
        return (
          <div className={styles.item} key={item.id}>
            <button
              id={btnId}
              type="button"
              className={styles.btn}
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenId(open ? null : item.id)}
            >
              <span>{item.question}</span>
              <svg
                className={styles.chev}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={[styles.panel, open ? styles.open : ""].join(" ")}
            >
              <div className={styles.panelInner}>
                <p className={styles.panelContent}>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
