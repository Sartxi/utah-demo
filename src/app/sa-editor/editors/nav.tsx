import styles from "@/app/styles/editor.module.css";
import { Nav, Pages } from "../../../../lib/schema";
import { SaEditProps } from "../data";
import { useEffect, useState } from "react";
import { getMenu } from "@/app/util";
import { addNav, editNav } from "../actions";
import Image from "next/image";
import Form from "next/form";

interface NavFormProps {
  type: string;
  nav: Nav | undefined;
  pages: Pages[] | undefined;
}

function NavForm({ type, nav, pages }: NavFormProps) {
  const [name, setName] = useState(nav?.name);
  const [href, setHref] = useState(nav?.href);

  if (!nav) return '';

  console.log(pages);

  const onSubmit = async (formdata: FormData) => {
    if (type === 'edit') await editNav(formdata);
    if (type === 'add') await addNav(formdata);
  };

  return (
    <Form action={onSubmit}>
      <input type="hidden" name="id" value={nav.id} />
      <input type="hidden" name="place" value={nav.place} />
      <input type="hidden" name="cta" value={nav.cta.toString()} />
      <label>Name</label>
      <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
      <label>Page</label>
      <input type="text" name="href" value={href} onChange={(e) => setHref(e.target.value)} />
      <button className="cta" type="submit">Submit</button>
    </Form>
  )
}

const newNavItem = (place: number, cta: boolean = false): Nav => {
  return { id: 0, name: '', place, href: '', cta };
};

export default function NavEdit({ nav, open, pages }: SaEditProps) {
  const [showModal, setShowModal] = useState(false);
  const [add, setAdd] = useState<Nav>();
  const [edit, setEdit] = useState<Nav>();

  useEffect(() => {
    if (add || edit) setShowModal(true);
  }, [add, edit]);

  if (!nav || !open) return '';
  const { menu, cta } = getMenu(nav);
  const showAddBtn = menu.length < 4 && !add;

  return (
    <>
      {showModal && (
        <div className={styles.modal}>
          <NavForm nav={add || edit} type={add ? 'add' : 'edit'} pages={pages} />
        </div>
      )}

      <div id="NavEdit" className={styles.naveditor}>
        <div>
          <h4>Menu</h4>
          <div className={styles.actions}>
            {menu.map((slot: Nav) => {
              return (
                <div key={`slot${slot.name}`} className={styles.navslot} onClick={() => setEdit(slot)}>
                  {slot.name}
                </div>
              )
            })}
            {showAddBtn && (
              <Image
                className={styles.addbtn}
                src="/add.svg"
                alt="Add Menu Item"
                width={70}
                height={70}
                onClick={() => setAdd(newNavItem(menu.length))} />
            )}
          </div>
        </div>
        <div>
          <h4>Call to Action</h4>
          {cta ? (
            <div className={styles.navslot}>
              {cta.name}
            </div>
          ) : (
            <div className={styles.navslot}>
              <Image
                className={styles.addbtn}
                src="/add.svg"
                alt="Add Menu Item"
                width={70}
                height={70}
                onClick={() => setAdd(newNavItem(0, true))} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
