"use client"

import styles from "../styles/services.module.css";
import Link from "next/link";
import Pod from "./pod";
import { Content } from "../../../lib/schema";
import { useMedia } from "../hooks";

interface ServicesProps {
  services: Content[];
  itemWidth: number;
  imgHeight: number;
}

export default function Services({ services, itemWidth, imgHeight }: ServicesProps) {
  const { mobile } = useMedia();
  const width = mobile ? 100 : itemWidth;
  return (
    <div className={styles.serviceList}>
      {services.map((service) => {
        const { href } = service;
        if (href) {
          return (
            <Link key={service.id} href={href} style={{ width: `${width}%` }}>
              <Pod content={service} width={100} imgHeight={imgHeight} />
            </Link>
          )
        }
        return <Pod key={service.id} content={service} width={width} imgHeight={imgHeight} />;
      })}
    </div>
  )
}
