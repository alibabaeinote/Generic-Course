import type { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

/** §4.1 — .cta (primary, variant="primary") / .ghost (secondary, variant="ghost"). */
export function Button({ variant = "primary", className, ...rest }: ButtonProps) {
  const base = variant === "primary" ? styles.cta : styles.ghost;
  return <button className={[base, className].filter(Boolean).join(" ")} {...rest} />;
}
