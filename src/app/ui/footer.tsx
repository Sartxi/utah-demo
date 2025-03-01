import styles from "../styles/footer.module.css";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "../../../lib/schema";

interface FooterProps {
  nav: Nav[];
}

function NavList({ nav }: FooterProps) {
  return (
    <>
      {nav.filter((i) => !i.cta).map((item) => <Link key={item.name} href={item.href}>{item.name}</Link>)}
    </>
  )
}

export default function Footer({ nav }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.content} content`}>
        <div className={styles.nav}>
          <h3>Navigation</h3>
          <NavList nav={nav} />
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
