import styles from "@/app/styles/editor.module.css";
import { Nav, Pages } from "../../../../lib/schema";
import { SaEditProps } from "../data";
import { useEffect, useState } from "react";
import { getMenu } from "@/app/util";
import { editNav, removeNav } from "../actions";
import Image from "next/image";
import Select from "../elements/select";
import { useRouter } from "next/navigation";

interface NavFormProps {
  nav: Nav | undefined;
  pages: Pages[] | undefined;
  place: number;
  close: () => void;
}

function getPageHref({ type, name }: Pages) {
  return `/${type === 'services' ? `services/${name}` : name}`
}

function NavForm({ nav, place, pages, close }: NavFormProps) {
  const router = useRouter();
  const [ctaname, setCtaName] = useState<string | undefined>(nav?.name);
  const [page, setPage] = useState<string | undefined>(pages?.find(p => getPageHref(p) === nav?.href)?.name);
  if (!nav) return '';

  const onSubmit = async () => {
    if (page && pages) {
      const { name, type } = pages.find(p => p.name === page) ?? { name: "", type: "" };
      const data = { ...nav, name, place, href: getPageHref({ name, type } as Pages) };
      if (nav.cta && ctaname) data.name = ctaname;
      const updated = await editNav(data);
      if (updated) {
        router.refresh();
        close();
      }
    }
  };

  const onRemove = async () => {
    const removed = await removeNav(nav.id);
    if (removed) {
      router.refresh();
      close();
    }
  }

  return (
    <div className={styles.pageform}>
      <h3>Menu Item</h3>
      {nav.cta ? (
        <>
          <label>Name</label>
          <input type="text" name="name" placeholder="Button Text" value={ctaname} onChange={(e) => setCtaName(e.target.value)} />
        </>
      ) : ''}
      <Select value={page ?? nav.name} values={pages?.map(page => page.name) ?? []} changed={(value) => setPage(value)} />
      <div className="multi-btn">
        <button className="cta" type="button" onClick={() => onSubmit()}>Save</button>
        <button className="cta grey" type="button" onClick={() => close()}>Cancel</button>
        {nav.id !== 0 && <button className="cta red right" type="button" onClick={() => onRemove()}>Remove</button>}
      </div>
    </div>
  )
}

const newNavItem = (place: number, cta: boolean = false): Nav => {
  return { id: 0, name: '', place, href: '', cta };
};

export default function NavEdit({ nav, open, pages }: SaEditProps) {
  const [showModal, setShowModal] = useState(false);
  const [add, setAdd] = useState<Nav>();
  const [edit, setEdit] = useState<Nav>();
  const [place, setPlace] = useState<number>(0);

  useEffect(() => {
    if (add || edit) setShowModal(true);
  }, [add, edit]);

  if (!nav || !open) return '';
  const { menu, cta } = getMenu(nav);
  const available = pages?.filter(p => !p.nest_id && p.name !== 'home' && !nav.find(n => p.name === n.name)) ?? [];
  const showAddBtn = menu.length < 4 && !add && available.length;

  return (
    <>
      {showModal && (
        <>
          <div className={`${styles.formblock} ${styles.modal} pod`}>
            <NavForm
              nav={add || edit}
              place={place}
              pages={add?.cta || edit?.cta ? pages : available}
              close={() => {
                setEdit(undefined);
                setAdd(undefined);
                setShowModal(false);
              }} />
          </div>
          <div className={styles.overlay} />
        </>
      )}
      <div id="NavEdit" className={`${styles.naveditor} pod`}>
        <div className={styles.menuEdit}>
          <h3>Site Menu</h3>
          <div className={styles.actions}>
            {menu.sort((a, b) => a.place - b.place).map((slot, i) => {
              return (
                <div key={`slot${slot.name}`} className={styles.navslot} onClick={() => {
                  setEdit(slot);
                  setPlace(i + 1);
                }}>
                  {slot.name}
                  <span>{slot.href}</span>
                </div>
              )
            })}
            {showAddBtn ? (
              <Image
                className={styles.addbtn}
                src="/add.svg"
                alt="Add Menu Item"
                width={50}
                height={50}
                onClick={() => {
                  setAdd(newNavItem(menu.length + 1));
                  setPlace(menu.length + 1);
                }} />
            ) : ''}
          </div>
        </div>
        <div className={styles.cta}>
          <h4>Menu Button</h4>
          {cta ? (
            <div className={styles.navslot} onClick={() => setEdit(cta)}>
              {cta.name}
              <span>{cta.href}</span>
            </div>
          ) : (
            <Image
              className={styles.addbtn}
              src="/add.svg"
              alt="Add Menu Item"
              width={50}
              height={50}
              onClick={() => setAdd(newNavItem(0, true))}
            />
          )}
        </div>
      </div>
    </>
  )
}
