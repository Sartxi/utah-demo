import styles from "../styles/services.module.css";
import Link from "next/link";
import Pod from "./pod";
import { Content } from "../../../lib/schema";

interface ServicesProps {
  services: Content[];
  itemWidth: number;
  imgHeight: number;
}

export default function Services({ services, itemWidth, imgHeight }: ServicesProps) {
  return (
    <div className={styles.serviceList}>
      {services.map((service) => {
        const { href } = service;
        if (href) {
          return (
            <Link key={service.id} href={href}>
              <Pod content={service} width={itemWidth} imgHeight={imgHeight} />
            </Link>
          )
        }
        return <Pod key={service.id} content={service} width={itemWidth} imgHeight={imgHeight} />;
      })}
    </div>
  )
}
