import styles from "../styles/residential.module.css";
import Image from "next/image";
import TextOver from "../ui/text-over";

export default function Page() {
  return (
    <div className={styles.residential}>
      <div className={styles.hero}>
        <Image src="/home-hero.jpg" className={styles.heroImg} alt="Meeting at a job site" fill={true} />
        <TextOver direction="left">
          <div><h1 className="large">Residential Services</h1></div>
        </TextOver>
      </div>
      <div className={`${styles.services} content`}>
        <div className={`pod ${styles.servicepod}`}>
          <h2 className="hasicon"><Image src="/hammer-icon.svg" alt="hammer" height={30} width={35} /> Demolition Services</h2>
          <p className="semi-bold space">Before any demolition services can take place, our technicians are trained experts that carry out all the necessary steps to guarantee proper job safety. Offering demolition service accross the Wasatch Front.</p>
          <p>Including:</p>
          <ul>
            <li><Image /></li>
          </ul>
        </div>
        <div className={`pod ${styles.servicepod}`}>
          <h2 className="hasicon"><Image src="/hammer-icon.svg" alt="hammer" height={30} width={35} /> Floor Removal</h2>
          <p className="semi-bold space">Before any demolition services can take place, our technicians are trained experts that carry out the proper safety and preparation steps. Including our safety meetings.</p>
        </div>
      </div>
    </div>
  )
}
