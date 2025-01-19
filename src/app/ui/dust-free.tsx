import TextOver from "./text-over";
import styles from "../styles/dust-free.module.css";
import Image from "next/image";

export default function DustFree() {
  return (
    <div className={styles.dustfree}>
      <Image src="/wasatch.jpg" className={styles.heroImg} alt="Wasatch Mountains" fill={true} />
      <TextOver size="cover" direction="left">
        <div className={styles.hero}>
          <Image src="/dust-free.png" alt="Dust Free Badge" width={200} height={200} />
          <div>
            <h1 className={`large ${styles.title}`}>100% Dust Free <strong>Guaranteed.</strong></h1>
            <p className="semi-bold space">Using dust free technology our technicians are trained to complete your job without leaving a spec of dust or debris. Feel rest assured that providing a dust free service experience is our number one priority!</p>
          </div>
        </div>
      </TextOver>
    </div>
  )
}