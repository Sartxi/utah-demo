"use client";

import styles from "@/app/styles/editor.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { logout } from "../../../lib/session";

interface SaSession {
  user: {
    name: string;
    email: string;
  }
}

interface SaEditor {
  session: SaSession | null;
}

export default function SaEditor({ session }: SaEditor) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log(session?.user);
  }, [session]);

  if (!session) return <span />;
  if (!open) return (
    <div className={styles.button} onClick={() => setOpen(true)}>
      <Image src="/sa_icon.svg" width={25} height={25} alt="SA logo" />
    </div>
  );

  return (
    <div className={`pod ${styles.editor}`}>
      <div className={styles.header}>
        <div className={styles.session}>
          <Image src="/sa_icon.svg" width={70} height={70} alt="SA logo" />
          <div>
            <h3>{session.user.name}</h3>
            <h4>{session.user.email}</h4>
          </div>
        </div>
        <div className={styles.actions}>
          <a className="cta" onClick={() => logout()}>log out</a>
          <a className="cta" onClick={() => setOpen(false)}>close</a>
        </div>
      </div>
      <div className="nav">Nav Details</div>
      <div className={styles.page}>Page Details</div>
    </div>
  )
}
