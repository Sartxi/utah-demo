import styles from "../../styles/residential.module.css";
import BreadCrumb, { Crumb } from "@/app/ui/breadcrumb";
import DustFree from "@/app/ui/dust-free";
import Service from "@/app/ui/service";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  if (!id) return <span />;
  const crumbs: Crumb[] = [{ text: 'Residential', page: 'residential' }, { text: id }];

  return (
    <div className={styles.page}>
      <BreadCrumb crumbs={crumbs} />
      <Service id={id} />
      <DustFree />
    </div>
  )
}
