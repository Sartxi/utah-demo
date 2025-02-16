import styles from "../styles/page.module.css";
import { Metadata } from "next";
import BreadCrumb, { Crumb } from "@/app/ui/breadcrumb";
import DustFree from "../ui/dust-free";
import Image from "next/image";
import TextOver from "../ui/text-over";
import ContactUs from "./contact";
import { getMetaData, getPageDetailsByName, PageDetails } from "../../../lib/db";

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getMetaData();
  const { title, description } = meta ?? {};
  return { title, description };
}

export default async function Page() {
  const breadcrumbs: Crumb[] = [{ text: 'Contact Us' }];
  const pageDetails: PageDetails | null = await getPageDetailsByName('contact');
  if (!pageDetails || !pageDetails.content?.length || !pageDetails.page) return <span />;

  const { page, content } = pageDetails;
  const { image } = content.find(c => c.type === 'hero') ?? {};

  return (
    <div className={styles.page}>
      <BreadCrumb crumbs={breadcrumbs} />
      <div className={styles.hero}>
        <Image src={image ? image : '/wasatch.jpg'} className={styles.image} alt="Contact us" fill={true} />
        <TextOver size="small" direction="left">
          <div><h1 className="large">{page.display_name ?? page.name}</h1></div>
        </TextOver>
      </div>
      <ContactUs details={pageDetails} />
      <DustFree />
    </div>
  )
}
