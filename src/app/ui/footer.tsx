import Image from "next/image";
import styles from "../styles/footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.content} content`}>
        <div></div>
        <div></div>
        <Image src="/logo.png" width={280} height={70} alt="Utah Demo" />
      </div>
    </footer>
  )
}
