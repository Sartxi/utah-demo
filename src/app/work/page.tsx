import styles from "../styles/page.module.css";
import BreadCrumb, { Crumb } from "@/app/ui/breadcrumb";
import DustFree from "../ui/dust-free";
import Image from "next/image";
import TextOver from "../ui/text-over";
import { getMetaData } from "../../../lib/db";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getMetaData();
  const { title, description } = meta ?? {};
  return { title, description };
}

export default function Page() {
  const breadcrumbs: Crumb[] = [{ text: 'Our Work' }];
  return (
    <div className={styles.page}>
      <BreadCrumb crumbs={breadcrumbs} />
      <div className={styles.hero}>
        <Image src={`/wasatch.jpg`} className={styles.image} alt="Our Work" fill={true} />
        <TextOver size="small" direction="left">
          <div><h1 className="large">Our Work</h1></div>
        </TextOver>
      </div>
      <DustFree />
    </div>
  )
}
