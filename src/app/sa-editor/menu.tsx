import styles from "@/app/styles/editor.module.css";
import Image from "next/image";

export default function EditorMenu({ editor, setEditor }: { editor: string; setEditor: (editor: string) => void }) {
  return (
    <div className={styles.menu}>
      <Image className={styles.menulogo} src="/sa_icon.svg" width={40} height={40} alt="SA logo" />
      <div className={`${styles.tab} ${editor === 'nav' ? styles.open : ''}`} onClick={() => setEditor('nav')}>
        <Image src="/globe.svg" alt="navigation" width={20} height={20} />
      </div>
      <div className={`${styles.tab} ${editor === 'details' ? styles.open : ''}`} onClick={() => setEditor('details')}>
        <Image src="/file.svg" alt="navigation" width={20} height={20} />
      </div>
    </div>
  )
}
