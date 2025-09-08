import styles from "../styles/footer.module.css";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.content} content`}>
        <div>
          <div className={styles.methods}>
            <a href="tel:+3853351499">
              <Image src="/phone.svg" width={30} height={30} alt="Call Utah Demo" />
            </a>
            <a href="mailto:utahdustfreedemolition@gmail.com">
              <Image src="/email.svg" width={30} height={33} alt="Email Utah Demo" />
            </a>
            {/* <a href="mailto:motiondemolition385@gmail.com">
              <Image src="/linkedin.svg" width={28} height={28} alt="Email Utah Demo" />
            </a>
            <a href="mailto:motiondemolition385@gmail.com">
              <Image src="/instagram.svg" width={30} height={30} alt="Email Utah Demo" />
            </a> */}
          </div>
        </div>
      </div>
    </footer>
  )
}
