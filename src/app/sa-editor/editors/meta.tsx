import styles from "@/app/styles/editor.module.css";
import Form from "next/form";
import { updataMeta } from "../actions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SaEditProps } from "../data";
import Image from "next/image";

export default function MetaEdit({ page, open }: SaEditProps) {
  const router = useRouter();
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!edit && page?.metadata) {
      setTitle(page.metadata.title);
      setDescription(page.metadata.description);
    }
  }, [page, title, description, edit]);

  if (!open) return '';

  const onSubmit = async (data: FormData) => {
    const updated = await updataMeta(data);
    if (updated) {
      router.refresh();
      setEdit(false);
    }
  };

  return (
    <div id="MetaEdit" className={`${styles.meta} pod`}>
      <h3 className="has-icon">
        <Image className={styles.edit} src={edit ? "/close.svg" : "/edit.svg"} alt="Edit Meta" width={25} height={25} onClick={() => setEdit(!edit)} />
        Page Metadata
      </h3>
      {edit ? (
        <Form action={onSubmit} className={styles.metaform}>
          <input type="hidden" name="id" value={page?.metadata?.id} />
          <input type="hidden" name="metapage" value={page?.metadata?.page ?? ''} />
          <input type="hidden" name="pageid" value={page?.page?.id} />
          <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea name="description" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} ></textarea>
          <button type="submit" className="cta small">Save</button>
        </Form>
      ) : (
        <div className={styles.metadata}>
          <div>
            <label>Title:</label> {title}
          </div>
          <div>
            <label>Description:</label><br />{description}
          </div>
        </div>
      )}
    </div>
  )
}
