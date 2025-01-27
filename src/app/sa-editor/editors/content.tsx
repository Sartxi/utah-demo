import styles from "@/app/styles/editor.module.css";
import { SaEditProps } from "../data";

export default function ContentEdit({ open }: SaEditProps) {
  if (!open) return <span />;
  return (
    <div className={styles.page}>
      <h4>Content</h4>
    </div>
  )
};
