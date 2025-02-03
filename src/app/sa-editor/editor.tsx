"use client";

import styles from "@/app/styles/editor.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { logout } from "../../../lib/session";
import { SaEditorProps } from "./data";
import { useRouteRefresh } from "../hooks";
import NavEdit from "./editors/nav";
import MetaEdit from "./editors/meta";
import ContentEdit from "./editors/content";
import EditorMenu from "./menu";
import PageEditor from "./editors/pages";

function useSticky(setHeight) {
  const [sticky, setSticky] = useState<string>();

  useEffect(() => {
    const store = localStorage.getItem('sa-drawer');
    if (store) {
      setSticky(store);
      setHeight(parseInt(store, 10));
    }
  }, [setHeight]);

  useEffect(() => {
    if (sticky) localStorage.setItem('sa-drawer', sticky);
  }, [sticky]);

  return { setSticky };
}

function useDragToSize() {
  const [height, setHeight] = useState(400);
  const { setSticky } = useSticky(setHeight);
  const [down, setDown] = useState(false);

  const mouseDown = (event) => {
    setDown(true);
    event.preventDefault();
  };

  useEffect(() => {
    const mousemove = (event) => {
      if (down) {
        const val = (window.innerHeight - event.pageY) + 12;
        if (val > 400) {
          setSticky(val.toString());
          setHeight(val);
        }
      }
    };

    window.addEventListener('mousemove', mousemove);
    window.addEventListener('mouseup', () => setDown(false));

    return () => {
      window.removeEventListener('mousemove', mousemove);
      window.removeEventListener('mouseup', () => setDown(false));
    }
  }, [down, setSticky]);

  return { height, mouseDown }
}

export default function SaEditor({ session, nav, page, pages }: SaEditorProps) {
  const [open, setOpen] = useState(false);
  const [animated, setAnimated] = useState(true);
  const [editor, setEditor] = useState<string>('nav');
  const { height, mouseDown } = useDragToSize();

  useRouteRefresh(page?.page?.name, open);

  const openDrawer = (isOpen: boolean) => {
    setAnimated(true);
    setOpen(isOpen);
    setTimeout(() => setAnimated(false), 500);
  };

  if (!session) return <span />;

  return (
    <>
      <div className={styles.button} onClick={() => openDrawer(true)}>
        <Image src="/sa_icon.svg" width={25} height={25} alt="SA logo" />
      </div>
      <div className={`${styles.editor} pod ${animated ? styles.animate : ''}`} style={{ height: open ? height : 0 }}>
        <div className={styles.handle} onMouseDown={mouseDown}><span /></div>
        <EditorMenu editor={editor} setEditor={setEditor} />
        <div className={styles.editarea}>
          <div className={styles.header}>
            <div className={styles.session}>
              <div>
                <small><i>Logged in as:</i></small>
                <h3>{session.user.name}</h3>
                <h4>{session.user.email}</h4>
              </div>
            </div>
            <div className={styles.actions}>
              <a className="cta small" onClick={() => logout()}>log out</a>
              <a className="cta small" onClick={() => openDrawer(false)}>close</a>
            </div>
          </div>
          <div className={`${styles.details} ${editor === 'nav' ? styles.full : ''}`}>
            <NavEdit nav={nav} open={editor === 'nav'} pages={pages} />
            <PageEditor open={editor === 'nav'} pages={pages} />
          </div>
          <div className={`${styles.details} ${editor === 'details' ? styles.full : ''}`}>
            <div className={`${styles.title} pod`}>
              <h3>{page?.page?.name}</h3>
              {page?.page?.display_name && <span>Display Name: <strong>{page.page.display_name}</strong></span>}
            </div>
            <MetaEdit page={page} open={editor === 'details'} />
            <ContentEdit page={page} open={editor === 'details'} />
          </div>
        </div>
      </div>
    </>
  )
}
