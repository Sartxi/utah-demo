import styles from "@/app/styles/editor.module.css";
import { SaEditProps } from "../data";
import type { Content } from "../../../../lib/schema";
import { useEffect, useState } from "react";
import Form from "next/form";
import SaInput from "../elements/input";
import SaTextarea from "../elements/textarea";
import Image from "next/image";
import { editContent } from "../actions";
import { useRouter } from "next/navigation";

interface ContentEdit {
  content: Content;
  open: boolean;
  toggle: (type: Content["type"] | undefined) => void;
}

function ContentListEditor(props: { list: string | null }) {
  const [edited, setEdited] = useState<{ item: number, value: string } | undefined>();
  const [liststring, setListString] = useState(props.list);
  const [list, setList] = useState(props.list ? JSON.parse(props.list) : []);

  useEffect(() => setListString(JSON.stringify(list)), [list]);

  return (
    <div>
      <label>List</label>
      <div className={styles.listedit}>
        {list.length ? list.map((text, i) => {
          return (
            <div key={`${text}-${i}`} className={styles.listitemedit}>
              {edited?.item && (i + 1) === edited.item ? (
                <div className={styles.listeditform}>
                  <SaInput type="text" name="listitem" label="" initValue={text} change={(value: string) => setEdited({ item: edited.item, value })} />
                  <button type="button" className="cta small grey" onClick={() => {
                    if (edited.value !== "") {
                      const newList = [...list];
                      newList[i] = edited.value;
                      setList(newList);
                    }
                    setEdited(undefined);
                  }}>Save</button>
                  <button type="button" className="cta small red" onClick={() => {
                     const newList = list.filter((ld, id) => id !== i);
                    setList(newList);
                    setEdited(undefined);
                  }}>Remove</button>
                </div>
              ) : (
                <div className={styles.listeditor}>
                  <Image src="/edit.svg" alt="Edit List Item" onClick={() => setEdited({ item: i + 1, value: "" })} width={20} height={20} />
                  <span>{text}</span>
                </div>
              )}
            </div>
          )
        }) : ""}
        <Image src="/add.svg" alt="Add List Item" onClick={() => {
          setList([...list, ""]);
          setEdited({ item: list.length + 1, value: "" });
        }} width={20} height={20} />
      </div>
      <input type="hidden" name="list" value={liststring ?? ""} />
    </div>
  )
}

function ContentEditor(props: ContentEdit) {
  const router = useRouter();
  const { content, open, toggle } = props;
  const { id, type, title, image, description, cta, ctal, list } = content;

  const onSubmit = async (data: FormData) => {
    const updated = await editContent(data);
    if (updated) {
      router.refresh();
      close();
    }
  };

  return (
    <>
      <span
        className={`content-label ${type.replaceAll(' ', '-')}-label`}
        onClick={() => toggle(open ? undefined : type)}>{type}</span>
      {open ? (
        <div className={styles.contenteditarea}>
          <Form className={styles.editform} action={onSubmit}>
            <div className="multi-btn">
              <SaInput type="text" name="title" initValue={title ?? ""} label="Title" />
              <SaInput type="text" name="image" initValue={image ?? ""} label="Image" />
            </div>
            <SaTextarea rows={4} name="description" initValue={description} label="Description" />
            <div className="multi-btn">
              <SaInput type="text" name="cta" initValue={cta ?? ""} label="Button Text" />
              <SaInput type="text" name="ctal" initValue={ctal ?? ""} label="Button Href" />
            </div>
            <ContentListEditor list={list} />
            <div className="multi-btn">
              <button type="submit" className="cta">Save</button>
            </div>
            <input type="hidden" name="id" value={id} />
          </Form>
        </div>
      ) : ""}
    </>
  )
}

export default function ContentEdit({ open, page }: SaEditProps) {
  const [edit, setEdit] = useState<Content["type"] | undefined>();
  if (!open) return '';
  return (
    <div className={`${styles.page} pod`}>
      <h3>Page Content</h3>
      <div className={styles.contentlist}>
        {page?.content?.sort((a, b) => a.order - b.order).map(c => <ContentEditor key={c.id} content={c} open={edit === c.type} toggle={setEdit} />)}
      </div>
    </div>
  )
};
