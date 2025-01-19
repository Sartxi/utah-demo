import styles from "../styles/residential.module.css";
import Image from "next/image";
import TextOver from "../ui/text-over";
import Link from "next/link";
import { pages, PageData } from "./data";
import BreadCrumb, { Crumb } from "@/app/ui/breadcrumb";
import DustFree from "../ui/dust-free";

export default function Page() {
  const breadcrumbs: Crumb[] = [{ text: 'Residential' }];
  return (
    <div className={styles.residential}>
      <BreadCrumb crumbs={breadcrumbs} />
      <div className={styles.hero}>
        <Image src="/home-hero.jpg" className={styles.heroImg} alt="Meeting at a job site" fill={true} />
        <TextOver size="small" direction="left">
          <div><h1 className="large">Residential Services</h1></div>
        </TextOver>
      </div>
      <div className={`${styles.services} content`}>
        <p className="semi-bold space">Before any demolition services can take place, our technicians are trained experts that carry out all the necessary steps to guarantee proper job safety. Offering demolition service across the Wasatch Front.</p>
        <h3>Services:</h3>
        <ul className="no-style">
          {pages.map((s: PageData) => (
            <li key={s.id}>
              <Link href={`/residential/${s.id}`} className={`${styles.elpodsm} pod`}>
                <Image src={`/${s.image}`} width={200} height={130} alt={s.title} />
                <div className={styles.podtext}>
                  <h4>{s.title}</h4>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <DustFree />
    </div>
  )
}
