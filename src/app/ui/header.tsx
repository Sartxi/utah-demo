'use client';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useMedia } from "../hooks";
import styles from "../styles/header.module.css";
import { Nav } from "../../../lib/schema";
import { getMenu } from "../util";

function NavList({ nav }: { nav: Nav[] }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const { menu, cta } = getMenu(nav);

  return (
    <>
      {menu.map((item, i) => {
        return (
          <div key={item.name} className={styles.menuitem} onMouseOver={() => setHovered(item.name)} onMouseLeave={() => setHovered(null)}>
            <Link href={item.href}>{item.name}</Link>
            {hovered === item.name && item.isParent && item.children?.length ? (
              <div className={`${styles.dropdown} ${i === (menu.length - 1) ? styles.openRight : ''}`}>
                  {item.children.map((c) => {
                    const href = `/services/${item.name}/${c.name.replaceAll(' ', '-')}`;
                    return <Link key={c.name} href={href}>{c.display_name ?? c.name}</Link>;
                  })}
              </div>
            ) : ''}
          </div>
        )
      })}
      {cta && <Link href={cta.href ?? "/contact"} className={`cta ${styles.menucta}`}>{cta.name}</Link>}
    </>
  )
}

function Menu({ nav }: { nav: Nav[] }) {
  const [drawer, setDrawer] = useState(false);
  const { menu, cta } = getMenu(nav);
  return (
    <div>
      <div className={`${drawer ? styles.change : ''}`} onClick={() => setDrawer(!drawer)}>
        <div className={styles.burger}></div>
        <div className={styles.burger}></div>
        <div className={styles.burger}></div>
      </div>
      {drawer ? (
        <div className={`${styles.drawer} shadow`}>
          {menu.map((item) => <Link key={item.name} href={item.href}>{item.name}</Link>)}
          {cta && <Link href={cta.href ?? "/contact"} className="cta">{cta.name}</Link>}
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
