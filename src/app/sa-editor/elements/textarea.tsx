import styles from "@/app/styles/form.module.css";
import { useState } from "react";

interface SaTextareaProps {
  rows: number;
  name: string;
  initValue: string | undefined | null;
  label: string;
}

export default function SaTextarea({ rows, name, initValue, label }: SaTextareaProps) {
  const [value, setValue] = useState(initValue);
  return (
    <div className={styles.sainput}>
      <label>{label}</label>
      <textarea
        rows={rows}
        name={name}
        value={value ?? ""}
        onChange={(e) => setValue(e.target.value)} />
    </div>
  )
}
