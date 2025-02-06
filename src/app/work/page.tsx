import styles from "../styles/page.module.css";
import BreadCrumb, { Crumb } from "@/app/ui/breadcrumb";
import DustFree from "../ui/dust-free";
import Image from "next/image";
import TextOver from "../ui/text-over";
import { getMetaData, getPage, PageDetails } from "../../../lib/db";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getMetaData();
  const { title, description } = meta ?? {};
  return { title, description };
}

export default async function Page() {
  const page: PageDetails | null = await getPage('work');
  if (!page || !page.content?.length) return <span />;
  const { title, image, description } = page.content.find(c => c.type === 'hero') ?? {};
  const breadcrumbs: Crumb[] = [{ text: page.page?.display_name ?? '' }];
  return (
    <div className={styles.page}>
      <BreadCrumb crumbs={breadcrumbs} />
      <div className={styles.hero}>
        <Image src={`${image}`} className={styles.image} alt={title ?? ""} fill={true} />
        <TextOver size="small" direction="left">
          <div><h1 className="large">{page.page?.display_name}</h1></div>
        </TextOver>
      </div>
      <div className={`content`}>
        {title && <h2>{title}</h2>}
        {description && <p>{description}</p>}
      </div>
      <DustFree />
    </div>
  )
}
