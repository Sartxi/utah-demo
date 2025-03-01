import styles from "../styles/service.module.css";
import Image from "next/image";
import { Content } from "../../../lib/schema";

interface PodProps {
  content: Content;
  width: number;
  imgHeight: number;
}

export default function Pod({ content, width, imgHeight }: PodProps) {
  const description = content.description?.split('\r\n') ?? [content.description];
  
  return (
    <div className={`${styles.service} pod shadow`} style={{ width: `${width}%` }}>
      <div className={styles.img} style={{ height: `${imgHeight}px` }}>
        <Image src={content.image ?? ""} fill alt={content.title ?? ""} />
      </div>
      <div className={styles.text}>
        <h4>{content.title}</h4>
        {description.map(desc => {
          return <p key={desc}>{desc}</p>
        })}
      </div>
    </div>
  )
}
