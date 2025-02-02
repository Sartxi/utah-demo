"use server"

import { Pages } from "../../../../lib/schema";

export default function PageForm({ page, }: { page: Pages }) {
  const isNew = page.id === 0;
  return (
    <div className={`${styles.formblock} pod`}>
      <h4>{isNew ? 'Add' : 'Edit'} Page</h4>
      <Form action={editPage}>
        <input type="text" name="name" />
        <button className="cta" type="submit">Send</button>
      </Form>
  )
}