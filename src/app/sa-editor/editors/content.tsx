import styles from "@/app/styles/editor.module.css";
import { SaEditProps } from "../data";
import type { Content } from "../../../../lib/schema";
import { useState } from "react";
import Form from "next/form";

interface ContentEdit {
  content: Content;
  open: boolean;
  toggle: (type: Content["type"] | undefined) => void;
}

function ContentEditor(props: ContentEdit) {
  const { open, toggle } = props;
  const [content, setContent] = useState(props.content);

  const setAttrs = (attr: string, value: unknown) => {
    setContent({ ...content, [attr]: value })
  };

  const submit = (data: FormData) => {
    console.log(data);
  };

  return (
    <>
      <span
        className={`content-label ${content.type.replaceAll(' ', '-')}-label`}
        onClick={() => toggle(open ? undefined : content.type)}>{content.type}</span>
      {open ? (
        <div className={styles.contenteditarea}>
          <Form className={styles.editform} action={submit}>
            <div>
              <label>Title</label>
              <input type="text" name="name" value={content.title} onChange={(e) => setAttrs("title", e.target.value)} />
            </div>
            <div>
              <label>Description</label>
              <textarea rows={4} name="description" value={content.description ?? ""} onChange={(e) => setAttrs("description", e.target.value)} />
            </div>
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
        {page?.content?.map(c => <ContentEditor key={c.id} content={c} open={edit === c.type} toggle={setEdit} />)}
      </div>
    </div>
  )
};
