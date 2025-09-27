import Image from "next/image";
import styles from "./styles/home.module.css";
// import TextOver from "./ui/text-over";
// import Link from "next/link";
import { wrapFirstWord } from "./util";
import { getPageDetailsByName } from "../../lib/db";
import ContactForm from "./contact/contactForm";
import TextOver from "./ui/text-over";
import { HeroLogo } from "./ui/hero-logo";
import Link from "next/link";

export default async function Home() {
  const { page, content } = await getPageDetailsByName('home');
  if (!content) return <span />;
  const hero = content.find((c) => c.type === 'hero');
  const services = content.find((c) => c.type === 'service pod');
  const solutions = content.find((c) => c.type === 'solutions');
  if (!hero || !services || !solutions) return <span />;

  return (
    <div className={styles.home}>
      <Image src={hero.image ?? ''} className={styles.heroImg} alt={page?.name ?? ''} fill priority />
      <div className={styles.hero}>
        <div className={styles.herocontent}>
          <HeroLogo style={styles.homelogo} />
          <div className={styles.btmcontent}>
            <div className={styles.titleicon}>
              <Image className={styles.technician} src={services.image ?? ''} width={200} height={220} alt={services.title ?? ""} />
              <h1 dangerouslySetInnerHTML={{ __html: wrapFirstWord(hero.title ?? "", 'strong') }}></h1>
            </div>
            <h3>{hero.description}</h3>
            <br />
            <p className="semi-bold space">{services.description}</p>
          </div>
        </div>
        <div className={styles.formcontainer}>
          <h3 className={styles.cta}>{hero.cta}</h3>
          <ContactForm formwidth={100} />
        </div>
      </div>
      <div className={`content ${styles.services}`}>
        <div className={styles.industries}>
          {services.list && JSON.parse(services.list).map((service) => {
            return (
              <h3 key={service} className="has-icon">
                <Image src={`/${service.toLowerCase().replaceAll(' ', '')}` + '.svg'} alt={service} width={40} height={40} />
                {service}
              </h3>
            )
          })}
        </div>
      </div>
      <div className={styles.solutions}>
        <Image src="/oldtruck.jpg" className={styles.oldtruck} width={500} height={243} alt="Vic's old truck" />
        <Image src="/solutionsbg.png" className={styles.heroImg} alt={solutions.title ?? ""} fill={true} />
        <TextOver direction="right" size="large">
          <div className={styles.solutioncontent}>
            <Image src={solutions.image ?? ''} alt={solutions.title ?? ""} width={543} height={390} />
            <div className={styles.solutioncontenttext}>
              <h2>{solutions.title}</h2>
              <p className="semi-bold space">{solutions.description}</p>
              <div className={styles.checks}>
                {solutions.list && JSON.parse(solutions.list).map((solution) => {
                  return (
                    <h3 key={solution} className="has-icon">
                      <Image src="/check.svg" alt={solution} width={25} height={25} />
                      {solution}
                    </h3>
                  )
                })}
              </div>
              <div>
                <br />
                <Link href={solutions.href ?? "/"} className="cta large">{solutions.cta}</Link>
              </div>
            </div>
          </div>
        </TextOver>
      </div>
    </div>
  );
}
