'use client';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useMedia } from "../util";
import styles from "../styles/header.module.css";

function Nav() {
  return (
    <>
      <Link href="/residential">Residential</Link>
      <Link href="/">Commercial</Link>
      <Link href="/">Our Work</Link>
      <Link href="/">Contact Us</Link>
      <Link href="/" className="cta">Get Estimate</Link>
    </>
  )
}

function Menu() {
  const [drawer, setDrawer] = useState(false);
  return (
    <div>
      <div className={`${drawer ? styles.change : ''}`} onClick={() => setDrawer(!drawer)}>
        <div className={styles.burger}></div>
        <div className={styles.burger}></div>
        <div className={styles.burger}></div>
      </div>
      {drawer ? (
        <div className={`${styles.drawer} shadow`}>
          <Nav />
        </div>
      ) : ''}
    </div>
  )
}

export default function Header() {
  const { mobile } = useMedia();
  return (
    <header className={`${styles.header} shadow`}>
      <div className={`${styles.content} content`}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/logo.png"
            alt="Utah Dust Free Demolition Logo"
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
        <div className={styles.nav}>
          {mobile ? <Menu /> : <Nav />}
        </div>
      </div>
    </header>
  )
}
