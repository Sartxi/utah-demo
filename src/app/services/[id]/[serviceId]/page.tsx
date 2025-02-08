import styles from "@/app/styles/page.module.css";
import BreadCrumb, { Crumb } from "@/app/ui/breadcrumb";
import { getMetaData, getPageDetailsByName, getPageByName, PageDetails } from "../../../../../lib/db";
import { Metadata } from "next";
import DustFree from "@/app/ui/dust-free";
import Services from "@/app/ui/services";
import Image from "next/image";
import TextOver from "@/app/ui/text-over";

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getMetaData();
  const { title, description } = meta ?? {};
  return { title, description };
}

export default async function Page(props: { params: Promise<{ id: string, serviceId: string }> }) {
  const params = await props.params;
  const parent = params.id;
  const name = params.serviceId;

  const pageDetails: PageDetails | null = await getPageDetailsByName(name.replaceAll('-', ' '));
  const parentDetail = await getPageByName(parent)
  if (!pageDetails || !pageDetails.content?.length || !pageDetails.page) return <span />;

  const { page, content } = pageDetails;
  const { title, image, description } = content.find(c => c.type === 'hero') ?? {};
  const breadcrumbs: Crumb[] = [
    { text: 'Services', page: 'services' },
    { text: parentDetail?.display_name ?? parentDetail?.name ?? parent, page: `services/${parent}` },
    { text: page.display_name ?? page.name }
  ];
  
  return (
    <div className={styles.page}>
      <BreadCrumb crumbs={breadcrumbs} />
      <div className={styles.hero}>
        <Image src={`${image ?? '/home-hero.jpg'}`} className={styles.image} alt={title ?? ""} fill={true} />
        <TextOver size="small" direction="left">
          <div><h1 className="large">{page.display_name ?? page.name}</h1></div>
        </TextOver>
      </div>
      <div className="services content">
        {title && <h2>{title}</h2>}
        {description && <p>{description}</p>}
        <br />
        <Services itemWidth={300} imgHeight={230} services={content.filter(c => c.type === 'service')} />
      </div>
      <DustFree />
    </div>
  )
}
