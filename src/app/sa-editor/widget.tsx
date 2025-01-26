import styles from "@/app/styles/editor.module.css";
import { getSession } from "../../../lib/session";
import SaEditor from "./editor";

export default async function SaWidget() {
  const session = await getSession();
  return (
    <div className={styles.widget}>
      <SaEditor session={session} />
    </div>
  )
}
