import styles from "@/app/styles/form.module.css";
import { useState } from "react";

interface SaInputProps {
  initValue: string;
  type: string;
  name: string;
  label: string;
  change?: (val: string) => void;
}

export default function SaInput({ type, name, initValue, label, change }: SaInputProps) {
  const [value, setValue] = useState(initValue);
  return (
    <div className={styles.sainput}>
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          change?.(e.target.value);
        }} />
    </div>
  )
}
