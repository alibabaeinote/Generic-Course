import styles from "./SkipLink.module.css";

/** Hidden until keyboard-focused; jumps past the nav straight to #main. §3.17 accessibility floor. */
export function SkipLink() {
  return (
    <a href="#main" className={styles.skip}>
      برو به محتوای اصلی
    </a>
  );
}
