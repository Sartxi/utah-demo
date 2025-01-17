import Image from "next/image";
import styles from "../styles/footer.module.css";
import Link from "next/link";

function Nav() {
  return (
    <>
      <Link href="/residential">Residential</Link>
      <Link href="/">Commercial</Link>
      <Link href="/">Our Work</Link>
      <Link href="/">Contact Us</Link>
    </>
  )
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.content} content`}>
        <div className={styles.nav}>
          <h3>Navigation</h3>
          <Nav />
        </div>
        <div className={styles.company}>
          <div className={styles.contact}>
            <h3>Contact Us</h3>
            <p className="space">276 North 680 East <br /> Vineyard, UT 84059</p>
            <a href="tel:+3853351499">385-335-1499</a>
            <a href="mailto:motiondemolition385@gmail.com">motiondemolition385@gmail.com</a>
          </div>
        </div>
        <div>
          <Image src="/logo.png" className={styles.footlogo} width={280} height={70} alt="Utah Demo" />
          <div className={styles.methods}>
            <a href="tel:+3853351499">
              <Image src="/phone.svg" width={30} height={30} alt="Call Utah Demo" />
            </a>
            <a href="mailto:motiondemolition385@gmail.com">
              <Image src="/email.svg" width={30} height={33} alt="Email Utah Demo" />
            </a>
            <a href="mailto:motiondemolition385@gmail.com">
              <Image src="/linkedin.svg" width={28} height={28} alt="Email Utah Demo" />
            </a>
            <a href="mailto:motiondemolition385@gmail.com">
              <Image src="/instagram.svg" width={30} height={30} alt="Email Utah Demo" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
