import Link from "next/link";
import styles from "../styles/breadcrumb.module.css";

export interface Crumb {
  text: string;
  page?: string;
}

interface CrumbProps {
  crumbs: Crumb[];
}

function formatCurrent(val: string | undefined) {
  if (!val) return val;
  return val.replace('-', ' ');
}

export default function BreadCrumb({ crumbs }: CrumbProps) {
  const current = crumbs.pop();
  return (
    <div className={styles.breadcrumb}>
      <div className={`content ${styles.content}`}>
        <Link href="/">Home</Link>
        <span>≫</span>
        {crumbs.map((crumb: Crumb) => (
          <span key={crumb.text}>
            <Link href={`/${crumb.page}`}>{crumb.text}</Link>
            <span className={styles.bullet}>≫</span>
          </span>))}
        <strong>{formatCurrent(current?.text)}</strong>
      </div>
    </div>
  )
}
