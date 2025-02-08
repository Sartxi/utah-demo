import styles from "@/app/styles/editor.module.css";
import { SaEditorProps, SaEditProps } from "../data";
import type { Content } from "../../../../lib/schema";
import { useEffect, useState } from "react";
import Form from "next/form";
import SaInput from "../elements/input";
import SaTextarea from "../elements/textarea";
import Image from "next/image";
import { editContent, removeContent } from "../actions";
import { useRouter } from "next/navigation";

interface ContentAddProps {
  content: Content;
  toggle: (open: boolean) => void;
}

interface ContentEditProps {
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
        <Image className={styles.addbtn} src="/add.svg" alt="Add List Item" onClick={() => {
          setList([...list, ""]);
          setEdited({ item: list.length + 1, value: "" });
        }} width={20} height={20} />
      </div>
      <input type="hidden" name="list" value={liststring ?? ""} />
    </div>
  )
}

function ContentEditor(props: ContentEditProps) {
  const router = useRouter();
  const { content, open, toggle } = props;
  const { id, type, title, image, description, cta, href, list } = content;
  const isService = type === 'service';

  const onSubmit = async (data: FormData) => {
    const updated = await editContent(data);
    if (updated) router.refresh();
    toggle(undefined);
  };

  return (
    <>
      <span
        className={`content-label ${type.replaceAll(' ', '-')}-label`}
        onClick={() => toggle(open ? undefined : `${type}-${id}`)}>{isService ? title : type}</span>
      {open ? (
        <div className={styles.contenteditarea}>
          <Form className={styles.editform} action={onSubmit}>
            <div className="multi-btn">
              <SaInput type="text" name="title" initValue={title ?? ""} label="Title" />
              <SaInput type="text" name="image" initValue={image ?? ""} label="Image" />
            </div>
            <SaTextarea rows={4} name="description" initValue={description} label="Description" />
            <div className="multi-btn">
              {isService ? "" : <SaInput type="text" name="cta" initValue={cta ?? ""} label="Button Text" />}
              <SaInput type="text" name="href" initValue={href ?? ""} label="Link" />
            </div>
            {isService ? "" : <ContentListEditor list={list} />}
            <div className="multi-btn">
              <button type="submit" className="cta">Save</button>
              {isService ? <button type="button" className="cta red" onClick={async () => {
                const remove = await removeContent(id);
                if (remove) router.refresh();
                toggle(undefined);
              }}>Remove</button> : ""}
              <button type="button" className="cta grey" onClick={() => toggle(undefined)}>Cancel</button>
            </div>
            <input type="hidden" name="id" value={id} />
          </Form>
        </div>
      ) : ""}
    </>
  )
}

function AddService(props: ContentAddProps) {
  const router = useRouter();
  const { content, toggle } = props;
  const { title, image, description, href, page, type, order } = content;

  const onSubmit = async (data: FormData) => {
    const updated = await editContent(data);
    if (updated) router.refresh();
    toggle(false);
  };

  return (
    <>
      <h4>Add Content</h4>
      <div className={styles.contenteditarea}>
        <Form className={styles.editform} action={onSubmit}>
          <div className="multi-btn">
            <SaInput type="text" name="title" initValue={title ?? ""} label="Title" />
            <SaInput type="text" name="image" initValue={image ?? ""} label="Image" />
          </div>
          <SaTextarea rows={4} name="description" initValue={description} label="Description" />
          <SaInput type="text" name="href" initValue={href ?? ""} label="Link" />
          <div className="multi-btn">
            <button type="submit" className="cta">Save</button>
            <button type="button" className="cta grey" onClick={() => toggle(false)}>Cancel</button>
          </div>
          <input type="hidden" name="page" value={page} />
          <input type="hidden" name="type" value={type} />
          <input type="hidden" name="order" value={order} />
        </Form>
      </div>
    </>
  )
}

interface AddContentProps extends SaEditorProps {
  closeEdit: () => void;
}

function AddContent({ page, closeEdit }: AddContentProps) {
  const [add, setAdd] = useState(false);
  if (!page?.page) return <span />;
  const canAdd = ["custom", "services", "service"].includes(page.page.type);
  if (!canAdd) return <span />;

  const content = {
    id: 0,
    type: 'service',
    page: page.page.id,
    order: page.content ? (page.content.length + 1) : 1,
  } as Content;

  const toggleForm = (open: boolean) => {
    closeEdit();
    setAdd(open);
  };

  return (
    <div className={styles.addForm}>
      {add ? (
        <AddService content={content} toggle={() => toggleForm(false)} />
      ) : (
        <Image className={styles.addbtn} src="/add.svg" alt="Add Content" width={50} height={50} onClick={() => toggleForm(true)} />
      )}
    </div>
  )
}

export default function ContentEdit({ open, page }: SaEditProps) {
  const [edit, setEdit] = useState<Content["type"] | undefined>();
  if (!open) return '';
  return (
    <div className={`${styles.page} pod`}>
      <h3>Page Content</h3>
      <div className={styles.contentlist}>
        {page?.content?.sort((a, b) => a.order - b.order).map(c => <ContentEditor key={c.id} content={c} open={edit === `${c.type}-${c.id}`} toggle={setEdit} />)}
        <AddContent page={page} closeEdit={() => setEdit(undefined)} />
      </div>
    </div>
  )
};
