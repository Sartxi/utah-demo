'use client';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useMedia } from "../hooks";
import styles from "../styles/header.module.css";
import { Nav } from "../../../lib/schema";

function NavList({ nav }: { nav: Nav[] }) {
  return (
    <>
      {nav.map((item) => <Link key={item.name} href={item.href}>{item.name}</Link>)}
      <Link href="/contact" className="cta">Get Estimate</Link>
    </>
  )
}

function Menu({ nav }: { nav: Nav[] }) {
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
          <NavList nav={nav} />
        </div>
      ) : ''}
    </div>
  )
}

interface HeaderProps {
  nav: Nav[];
}

export default function Header({ nav }: HeaderProps) {
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
          {mobile ? <Menu nav={nav} /> : <NavList nav={nav} />}
        </div>
      </div>
    </header>
  )
}
