import Image from "next/image";
import styles from "../styles/service.module.css";
import TextOver from "./text-over";
import { PageData, TitleDesc, usePage } from "../data"

interface ServiceProps {
  id: string;
}

export default function Service({ id }: ServiceProps) {
  const service: PageData | undefined = usePage(id);
  if (!service) return <span />;
  const { image, title, description, detail, elements } = service;
  return (
    <>
      <div className={styles.hero}>
        <Image src={`/${image}`} className={styles.image} alt={title} fill={true} />
        <TextOver size="small" direction="left">
          <div><h1 className="large">{title}</h1></div>
        </TextOver>
      </div>
      <div className={`${styles.service} content`}>
        <h2>{detail}</h2>
        <p className="semi-bold space">{description}</p>
        <div className={styles.elements}>
          {elements?.map((el: TitleDesc) => (
            <div key={el.title} className={`${styles.element} pod shadow`}>
              <Image src={`/${el.image}`} width={400} height={200} alt={el.title} />
              <div className={styles.text}>
                <h3>{el.title}</h3>
                <p>{el.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
