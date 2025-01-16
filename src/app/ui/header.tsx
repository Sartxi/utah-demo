'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useMedia } from "../util";

function Nav() {
  return (
    <>
      <Link href="/">Residential</Link>
      <Link href="/">Commercial</Link>
      <Link href="/">Our Work</Link>
      <Link href="/">Contact</Link>
      <Link href="/" className="cta">Get Estimate</Link>
    </>
  )
}

function Menu() {
  const [drawer, setDrawer] = useState(false);
  return (
    <div className="mobile-menu">
      <div className={`hamburg ${drawer ? 'change' : ''}`} onClick={() => setDrawer(!drawer)}>
        <div className="ham1"></div>
        <div className="ham2"></div>
        <div className="ham3"></div>
      </div>
      {drawer ? (
        <div className="drawer">
          <Nav />
        </div>
      ) : ''}
    </div>
  )
}

export default function Header() {
  const { mobile } = useMedia();
  return (
    <header>
      <div className="header content">
        <div className="logo">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Utah Dust Free Demolition Logo"
              fill={true}
            />
          </Link>
        </div>
        <div className="nav">
          {mobile ? <Menu /> : <Nav />}
        </div>
      </div>
    </header>
  )
}
