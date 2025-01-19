import Image from "next/image";
import styles from "../../styles/residential.module.css";
import { pages, TitleDesc } from "../data";
import BreadCrumb, { Crumb } from "@/app/ui/breadcrumb";
import TextOver from "../../ui/text-over";
import DustFree from "@/app/ui/dust-free";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const pageData = pages.find((p) => p.id === id);

  if (!pageData) return <span />;
  const { title, description, detail, elements, image } = pageData;
  const crumbs: Crumb[] = [{ text: 'Residential', page: 'residential' }, { text: id }];

  return (
    <div className={styles.page}>
      <BreadCrumb crumbs={crumbs} />
      <div className={styles.hero}>
        <Image src={`/${image}`} className={styles.heroImg} alt="Meeting at a job site" fill={true} />
        <TextOver size="small" direction="left">
          <div><h1 className="large">{title}</h1></div>
        </TextOver>
      </div>
      <div className={`${styles.service} content`}>
        <h2>{detail}</h2>
        <p className="semi-bold space">{description}</p>
        <div className={styles.elements}>
          {elements.map((el: TitleDesc) => (
            <div key={el.title} className={`${styles.elpod} pod`}>
              <Image src={`/${el.image}`} width={400} height={200} alt={el.title} />
              <div className={styles.podtext}>
                <h3>{el.title}</h3>
                <p>{el.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <DustFree />
    </div>
  )
}
