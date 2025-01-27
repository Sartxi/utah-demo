import styles from "../styles/page.module.css";
import { Metadata } from "next";
import BreadCrumb, { Crumb } from "@/app/ui/breadcrumb";
import DustFree from "../ui/dust-free";
import Image from "next/image";
import TextOver from "../ui/text-over";
import ContactUs from "./contact";
import { getMetaData } from "../../../lib/db";

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getMetaData();
  const { title, description } = meta ?? {};
  return { title, description };
}

export default function Page() {
  const breadcrumbs: Crumb[] = [{ text: 'Contact Us' }];
  return (
    <div className={styles.page}>
      <BreadCrumb crumbs={breadcrumbs} />
      <div className={styles.hero}>
        <Image src={`/wasatch.jpg`} className={styles.image} alt="Contact us" fill={true} />
        <TextOver size="small" direction="left">
          <div><h1 className="large">Contact Us Today</h1></div>
        </TextOver>
      </div>
      <ContactUs />
      <DustFree />
    </div>
  )
}
