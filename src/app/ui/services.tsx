import styles from "../styles/services.module.css";
import Image from "next/image";
import TextOver from "../ui/text-over";
import Link from "next/link";
import { PageData, usePage, usePages } from "../data";
import { PageType } from "../pages";

interface ServicesProps {
  id: string;
  type: PageType;
}

export default function Services({ id, type }: ServicesProps) {
  const page: PageData | undefined = usePage(id);
  const pages: PageData[] = usePages(type);

  if (!page || !pages.length) return <span />;
  const { title, description } = page;

  return (
    <>
      <div className={styles.hero}>
        <Image src="/home-hero.jpg" className={styles.image} alt={title} fill={true} />
        <TextOver size="small" direction="left">
          <div><h1 className="large">{title}</h1></div>
        </TextOver>
      </div>
      <div className={`${styles.services} content`}>
        <p className="semi-bold space">{description}</p>
        <h3>Services:</h3>
        <ul className="no-style">
          {pages.map((s: PageData) => (
            <li key={s.id}>
              <Link href={`/residential/${s.id}`} className={`${styles.service} pod shadow`}>
                <Image src={`/${s.image}`} width={200} height={130} alt={s.title} />
                <div className={styles.text}>
                  <h4>{s.title}</h4>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
