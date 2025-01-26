import styles from "@/app/styles/page.module.css";
import { PageType } from "@/app/pages";
import BreadCrumb, { Crumb } from "@/app/ui/breadcrumb";
import DustFree from "@/app/ui/dust-free";
import Services from "@/app/ui/services";

export default function Page() {
  const breadcrumbs: Crumb[] = [{ text: 'Commercial' }];
  return (
    <div className={styles.page}>
      <BreadCrumb crumbs={breadcrumbs} />
      <Services id="commercial" type={PageType.commercial} />
      <DustFree />
    </div>
  )
}
