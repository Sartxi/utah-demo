import styles from "../styles/page.module.css";
import BreadCrumb, { Crumb } from "@/app/ui/breadcrumb";
import DustFree from "../ui/dust-free";
import Image from "next/image";
import TextOver from "../ui/text-over";
import { getMetaData, getPageDetailsByName, PageDetails } from "../../../lib/db";
import { Metadata } from "next";
import Services from "../ui/services";

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getMetaData();
  const { title, description } = meta ?? {};
  return { title, description };
}

export default async function Page() {
  const pageDetails: PageDetails | null = await getPageDetailsByName('work');
  if (!pageDetails || !pageDetails.content?.length || !pageDetails.page) return <span />;

  const { page, content } = pageDetails;

  const { title, image, description } = content.find(c => c.type === 'hero') ?? {};
  const breadcrumbs: Crumb[] = [{ text: page.display_name ?? page.name }];

  return (
    <div className={styles.page}>
      <BreadCrumb crumbs={breadcrumbs} />
      <div className={styles.hero}>
        <Image src={`${image}`} className={styles.image} alt={title ?? ""} fill={true} />
        <TextOver size="small" direction="left">
          <div><h1 className="large">{page.display_name ?? page.name}</h1></div>
        </TextOver>
      </div>
      <div className="services content">
        {title && <h2>{title}</h2>}
        {description && <p>{description}</p>}
        <Services itemWidth={200} imgHeight={130} services={content.filter(c => c.type === 'service')} />
      </div>
      <DustFree />
    </div>
  )
}
