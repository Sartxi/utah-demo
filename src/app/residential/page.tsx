import styles from "../styles/residential.module.css";
import { PageType } from "../pages";
import BreadCrumb, { Crumb } from "@/app/ui/breadcrumb";
import DustFree from "../ui/dust-free";
import Services from "../ui/services";

export default function Page() {
  const breadcrumbs: Crumb[] = [{ text: 'Residential' }];
  return (
    <div className={styles.residential}>
      <BreadCrumb crumbs={breadcrumbs} />
      <Services id="residential" type={PageType.residential} />
      <DustFree />
    </div>
  )
}
