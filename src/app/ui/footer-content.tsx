"use client"

import styles from "../styles/footer.module.css";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
// ...existing imports...

function useFooterFixed() {
  const [fixed, setFixed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    function checkFooter() {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      setFixed(spaceBelow > 0);
    }
    checkFooter();
    window.addEventListener("resize", checkFooter);
    window.addEventListener("orientationchange", checkFooter);

    return () => {
      window.removeEventListener("resize", checkFooter);
      window.removeEventListener("orientationchange", checkFooter);
    };
  }, []);

  // Recalculate on route change
  useEffect(() => {
    setFixed(false);
    setTimeout(() => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        setFixed(spaceBelow > 0);
      }
    }, 50);
  }, [pathname]);

  return { ref, fixed };
}

interface FooterContentProps {
  phone: number | null;
  email?: string;
}

export function FooterContent({ phone, email }: FooterContentProps) {
  const { ref, fixed } = useFooterFixed();
  const formattedPhone = phone ? phone.toString().replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3') : '';

  return (
    <footer ref={ref} className={`${styles.footer} ${fixed ? styles.fixedFooter : ""}`}>
      <div className={`${styles.content} content`}>
        <div className={styles.company}>
          <div className={styles.contact}>
            <h3>Contact Us</h3>
            <a href={`tel:+${phone}`}>{formattedPhone}</a>
            <a href={`mailto:${email}`}>{email}</a>
          </div>
        </div>
        <div>
          <div className={styles.methods}>
            <a href={`tel:+${phone}`}>
              <Image src="/phone.svg" width={30} height={30} alt="Call Utah Demo" />
            </a>
            <a href={`mailto:${email}`}>
              <Image src="/email.svg" width={30} height={33} alt="Email Utah Demo" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
