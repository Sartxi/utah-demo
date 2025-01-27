"use client";

import styles from "@/app/styles/editor.module.css";
import Image from "next/image";
import { useState } from "react";
import { logout } from "../../../lib/session";
import { SaEditorProps } from "./data";
import { useRouteRefresh } from "../hooks";
import NavEdit from "./editors/nav";
import MetaEdit from "./editors/meta";
import ContentEdit from "./editors/content";

export default function SaEditor({ session, nav, page, pages }: SaEditorProps) {
  const [open, setOpen] = useState(false);
  const [editors, setEditors] = useState<string[]>(['details', 'nav']);
  useRouteRefresh(page?.page?.name, open);

  if (!session) return <span />;
  if (!open) return (
    <div className={styles.button} onClick={() => setOpen(true)}>
      <Image src="/sa_icon.svg" width={25} height={25} alt="SA logo" />
    </div>
  );

  const toggleEditor = (editor: string) => {
    if (editors.includes(editor)) setEditors(editors.filter(e => e !== editor));
    else setEditors([...editors, editor]);
  };

  return (
    <div className={`pod ${styles.editor}`}>
      <div className={styles.header}>
        <div className={styles.session}>
          <Image src="/sa_icon.svg" width={70} height={70} alt="SA logo" />
          <div>
            <small><i>Logged in as:</i></small>
            <h3>{session.user.name}</h3>
            <h4>{session.user.email}</h4>
          </div>
        </div>
        <div className={styles.actions}>
          <a className="cta small" onClick={() => logout()}>log out</a>
          <a className="cta small" onClick={() => setOpen(false)}>close</a>
        </div>
      </div>
      <div className={styles.site}>
        <h3 className={`has-icon ${styles.accordian}`} onClick={() => toggleEditor('nav')}>
          <Image data-open={editors.includes('nav')} className="icon-accent" src="/arrow.svg" alt="Edit Meta" width={22} height={22} />
          Site Navigation
        </h3>
        <div data-open={editors.includes('nav')} className={styles.acccontent}>
          <NavEdit nav={nav} open={editors.includes('nav')} pages={pages} />
        </div>
      </div>
      <div className={styles.pagedetails}>
        <h3 className={`has-icon ${styles.accordian}`} onClick={() => toggleEditor('details')}>
          <Image data-open={editors.includes('details')} className="icon-accent" src="/arrow.svg" alt="Edit Meta" width={22} height={22} />
          {page?.page?.name} - Page Details
        </h3>
        <div data-open={editors.includes('details')} className={styles.acccontent}>
          <MetaEdit page={page} open={editors.includes('details')} />
          <ContentEdit open={editors.includes('details')} />
        </div>
      </div>
    </div>
  )
}
