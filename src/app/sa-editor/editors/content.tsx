import styles from "@/app/styles/editor.module.css";
import { SaEditProps } from "../data";

export default function ContentEdit({ open }: SaEditProps) {
  if (!open) return '';
  return (
    <div className={`${styles.page} pod`}>
      <h3>Page Content</h3>
    </div>
  )
};
