import styles from "@/app/styles/editor.module.css";
import { SaEditProps } from "../data";
import { Pages } from "../../../../lib/schema";
import Image from "next/image";
import { useEffect, useState } from "react";
import Form from "next/form";
import { editPage, removePage } from "../actions";
import Select from "../elements/select";
import { useRouter } from "next/navigation";

interface StructuredPages extends Pages {
  services?: Pages[];
}

function usePages(pages: Pages[] | undefined): StructuredPages[] {
  if (!pages) return [];
  const pagetypes: { [x: string]: Pages[] } = { required: [], custom: [], services: [], service: [] };
  const { required, custom, services, service } = pages.reduce((results, req) => {
    if (req.nest_id) results.service.push(req);
    else if (req.type === 'required') results.required.push(req);
    else if (req.type === 'services') results.services.push(req);
    else results.custom.push(req);
    return results;
  }, pagetypes);
  return [...required, ...custom, ...services.map(s => ({ ...s, services: service.filter(ss => ss.nest_id === s.id) }))];
}

function Branch({ page, editing, edit, nest }: { page: Pages, editing: boolean, edit: () => void, nest?: string }) {
  const [hover, setHover] = useState(false);
  const pagepath = page.name.replaceAll(' ', '-');
  return (
    <div
      onClick={() => edit()}
      className={`${styles.twig} ${page.type !== 'required' ? styles.editable : ''} ${editing ? styles.accent : ''}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      {nest && <span className={styles.line} />}
      <Image src={`/${page.type !== 'required' && (hover || editing) ? "edit" : "file"}.svg`} alt={`${page.name} page`} width={20} height={20} />
      <strong>{page.name}</strong><span>{`/${nest ? `${nest}/${pagepath}` : pagepath}`}</span>
    </div>
  )
}

const pageTypes = ["custom", "services", "service"];

function PageForm({ page, pages, close }: { page: Pages, pages: Pages[] | undefined, close: () => void }) {
  const router = useRouter();
  const [attrs, setAttrs] = useState(page);
  const isNew = page.id === 0;

  useEffect(() => {
    setAttrs(page);
  }, [page]);

  const setValue = (input) => {
    setAttrs({ ...attrs, [input.name]: input.value });
  };

  const onSubmit = async (data: FormData) => {
    const updated = await editPage(data);
    if (updated) {
      router.refresh();
      close();
    }
  };

  const onRemove = async (page) => {
    const removed = await removePage(page);
    if (removed) {
      router.refresh();
      close();
    }
  }

  const hasChildren = pages?.filter((p) => p.nest_id === attrs.id)?.length;
  const parents = pages?.length && pages
    .filter(i => i.type && ['custom', 'services'].includes(i.type) && i.id !== attrs.id)
    .reduce((res, item) => {
      res[item.id] = item.name;
      return res;
    }, {});

  return (
    <>
      <div className={`${styles.formblock} ${styles.modal} pod`}>
        <h3>{isNew ? 'Add' : 'Edit'} Page</h3>
        <br />
        <Form className={styles.pageform} action={onSubmit}>
          <div>
            <label>Name</label>
            <input type="text" name="name" value={attrs.name} onChange={(e) => setValue(e.target)} />
          </div>
          <div>
            <label>Display Name</label>
            <input type="text" name="display_name" value={attrs.display_name ?? ''} onChange={(e) => setValue(e.target)} />
          </div>
          <div className={styles.selectgroup}>
            <div>
              <label>Type</label>
              <Select value={attrs.type} readonly={!!hasChildren} values={pageTypes} changed={(value) => setAttrs({ ...attrs, type: value })} />
            </div>
            {attrs.type === 'service' && parents && (
              <div>
                <label>Parent Page</label>
                <Select
                  value={parents?.[attrs.nest_id ?? 1]}
                  values={Object.values(parents)}
                  changed={(value) => setAttrs({ ...attrs, nest_id: pages.find(p => p.name === value)?.id ?? null })} />
              </div>
            )}
          </div>
          <input type="hidden" name="id" value={attrs.id} />
          <input type="hidden" name="type" value={attrs.type} />
          <input type="hidden" name="nest_id" value={attrs.nest_id ?? ''} />
          <div className="multi-btn">
            <button className="cta" type="submit">Save</button>
            <button className="cta grey" type="button" onClick={() => close()}>Cancel</button>
            {page.id !== 0 && <button className="cta red right" type="button" onClick={() => onRemove(page)}>Delete</button>}
          </div>
        </Form>
      </div>
      <div className={styles.overlay} />
    </>
  )
}

const newPage: Pages = {
  id: 0,
  name: '',
  type: 'custom',
  nest_id: null,
  display_name: null
};

export default function PageEditor({ open, pages }: SaEditProps) {
  const sPages = usePages(pages);
  const [editor, setEditor] = useState<Pages | undefined>();

  if (!open) return '';
  const edit = (page: Pages) => {
    if (page.type !== 'required') setEditor(page);
  };

  return (
    <div id="PageEdit" className={`${styles.page} ${styles.pageseditor} pod`}>
      <div className={styles.tools}>
        <h3>Site Pages</h3>
      </div>
      <div className={styles.editsection}>
        <div className={styles.tree}>
          {sPages.map(sp => {
            return (
              <div key={sp.id} className={styles.branch}>
                <Branch editing={editor?.id === sp.id} page={sp} edit={() => edit(sp)} />
                {sp.services && (
                  <div className={styles.subs}>
                    {sp.services.map(ss => (<Branch key={ss.id} editing={editor?.id === ss.id} edit={() => edit(ss)} nest={sp.name} page={ss} />))}
                  </div>
                )}
              </div>
            )
          })}
          <Image className={styles.addPage} src="/add.svg" alt="Add Page" onClick={() => setEditor(newPage)} width={20} height={20} />
        </div>
        {editor && <PageForm page={editor} pages={pages} close={() => setEditor(undefined)} />}
      </div>
    </div>
  )
}
