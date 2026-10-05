import type { InputHTMLAttributes } from "react";
import styles from "./Field.module.css";

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

/** Labeled text input with an accessible error slot (role="alert", wired via aria-describedby). */
export function Field({ label, error, id, ...rest }: FieldProps) {
  const errId = `${id}-err`;
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className={styles.input}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={errId}
        {...rest}
      />
      <div className={styles.err} id={errId} role="alert">
        {error}
      </div>
    </div>
  );
}
