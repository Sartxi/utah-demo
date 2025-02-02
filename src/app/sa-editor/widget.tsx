import styles from "@/app/styles/editor.module.css";
import { getSession } from "../../../lib/session";
import { getNav, getPage, getPageData, getPages, getPageUrl, PageDetails } from "../../../lib/db";
import { Pages } from "../../../lib/schema";
import SaEditor from "./editor";

async function getCurrentPage(pages: Pages[]) {
  const url = await getPageUrl();
  const page = getPageData(pages, url);
  return page.name;
}

export default async function SaWidget() {
  const session = await getSession();
  const nav = await getNav();
  const pages = await getPages();  
  const path = await getCurrentPage(pages);
  const page: PageDetails | null = await getPage(path);

  return (
    <div className={styles.widget}>
      <SaEditor session={session} nav={nav} page={page} pages={pages} />
    </div>
  )
}
