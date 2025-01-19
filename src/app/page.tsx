import Image from "next/image";
import styles from "./styles/home.module.css";
import TextOver from "./ui/text-over";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.hero}>
        <Image src="/home-hero.jpg" className={styles.image} alt="Meeting at a job site" fill={true} />
        <TextOver direction="left" size="large">
          <div>
            <h1><strong>UNMATCHED</strong> DEMOLITION EXPERIENCE & EXPERTISE</h1>
            <p className="semi-bold space">There is no job too big or small. Utah Demolition can provide the services you require, from complete demolition to selective demolition. <br /><strong>Dust Free Guarantee!</strong></p>
            <div>
              <Link href="/" className="cta large">Free Consultation</Link>
            </div>
          </div>
        </TextOver>
      </div>
      <div className={`content pod shadow ${styles.services}`}>
        <Image className={styles.technician} src="/technician.png" width={200} height={220} alt="Demolition Worker" />
        <div className={styles.text}>
          <h2 className="has-icon">
            <Image src="/hammer-icon.svg" alt="hammer" height={30} width={35} /> Demolition Contract Services
          </h2>
          <p className="space">When you work with us, you can expect   flexibility and a dynamic approach to your demolition plan and needs, unsurpassed customer service with an emphasis on client relations, an active, family-like approach to safety day in and day out, and a paramount amount of experience and expertise. Call today to learn more!</p>
          <div className={styles.industries}>
            <h3 className="has-icon">
              <Image src="/residential.svg" alt="residential" width={25} height={25} />
              Residential
            </h3>
            <h3 className="has-icon">
              <Image src="/commercial.svg" alt="commercial" width={30} height={30} />
              Commercial
            </h3>
            <h3 className="has-icon">
              <Image src="/industrial.svg" alt="industrial" width={25} height={25} />
              Industrial
            </h3>
          </div>
        </div>
      </div>
      <div className={styles.solutions}>
        <Image src="/solutions.jpg" className={styles.heroImg} alt="Meeting at a job site" fill={true} />
        <TextOver direction="right" size="large">
          <div>
            <h2>Customized Project Solutions</h2>
            <div className={styles.checks}>
              <h3 className="has-icon">
                <Image src="/check.svg" alt="industrial" width={25} height={25} />
                Dust Free Guarantee
              </h3>
              <h3 className="has-icon">
                <Image src="/check.svg" alt="industrial" width={25} height={25} />
                Safety First Approach
              </h3>
              <h3 className="has-icon">
                <Image src="/check.svg" alt="industrial" width={25} height={25} />
                Time Saving & Efficient
              </h3>
            </div>
            <p className="semi-bold space">No matter the job size, we are always willing to supply you with a demo plan laid out in an easy-to-understand format with pictures and explanations. You deserve this kind of attention, and our design team is readily prepared. In addition to demolition plans and advice, we are capable of doing everything from pulling permits to coordinating inspections to unusual, out-of-the-ordinary dismantlement. We want you to feel confident when you are partnered with us.</p>
            <div>
              <Link href="/" className="cta large">Get Started</Link>
            </div>
          </div>
        </TextOver>
      </div>
    </div>
  );
}
