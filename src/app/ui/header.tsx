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
    <div className="mobile-menu">
      <div className={`${drawer ? styles.change : ''}`} onClick={() => setDrawer(!drawer)}>
        <div className={styles.ham1}></div>
        <div className={styles.ham2}></div>
        <div className={styles.ham3}></div>
      </div>
      {drawer ? (
        <div className={styles.drawer}>
          <Nav />
        </div>
      ) : ''}
    </div>
  )
}

export default function Header() {
  const { mobile } = useMedia();
  return (
    <header className={styles.header}>
      <div className={`${styles.content} content`}>
        <div className={styles.logo}>
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Utah Dust Free Demolition Logo"
              fill={true}
            />
          </Link>
        </div>
        <div className={styles.nav}>
          {mobile ? <Menu /> : <Nav />}
        </div>
      </div>
    </header>
  )
}
