import styles from "@/app/styles/form.module.css";
import { useClickOutside } from "@/app/hooks";
import { useEffect, useState } from "react";

interface SelectProps {
  value: string | undefined;
  values: string[];
  readonly?: boolean;
  changed: (value: string) => void;
}

export default function Select({ value, values, readonly, changed }: SelectProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(value);

  useClickOutside('SaSelect', open, () => setOpen(false));
  useEffect(() => {
    if (active !== value) setActive(value);
  }, [value, active]);

  return (
    <div id="SaSelect" className={`${styles.select} ${open ? styles.open : ''}`} onClick={() => !readonly && setOpen(!open)}>
      {open ? (
        <div className={styles.dropdown}>
          <div className={styles.label}><i>Select</i></div>
          {values.map(v => (<div key={v} className={`${styles.item} ${active === v ? styles.active : ''}`} onClick={() => {
            changed(v)
            setActive(v)
          }}>{v}</div>))}
        </div>
      ) : (
        <div className={`${styles.label}`}>
          {active ? active : <i>Select</i>}
          {!readonly && <div className={styles.arrow} />}
        </div>
      )}
    </div>
  )
}
