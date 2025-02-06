import Image from "next/image";
import styles from "./styles/home.module.css";
import TextOver from "./ui/text-over";
import Link from "next/link";
import { wrapFirstWord } from "./util";
import { getPage } from "../../lib/db";

export default async function Home() {
  const { content, metadata } = await getPage('home');
  if (!content) return <span />;
  const hero = content.find((c) => c.type === 'hero');
  const services = content.find((c) => c.type === 'service pod');
  const solutions = content.find((c) => c.type === 'solutions');
  if (!hero || !services || !solutions) return <span />;

  return (
    <div className={styles.home}>
      <div className={styles.hero}>
        <Image src={hero.image ?? ''} className={styles.image} alt={metadata?.title ?? ''} fill={true} priority />
        <TextOver direction="left" size="large">
          <div>
            <h1 dangerouslySetInnerHTML={{ __html: wrapFirstWord(hero.title ?? "", 'strong') }}></h1>
            <p className="semi-bold space">{hero.description}</p>
            <div>
              <Link href={hero.ctal ?? "/"} className="cta large">{hero.cta}</Link>
            </div>
          </div>
        </TextOver>
      </div>
      <div className={`content pod shadow ${styles.services}`}>
        <Image className={styles.technician} src={services.image ?? ''} width={200} height={220} alt={services.title ?? ""} />
        <div className={styles.text}>
          <h2 className="has-icon">
            <Image src="/hammer-icon.svg" alt="hammer" height={30} width={35} /> {services.title}
          </h2>
          <p className="space">{services.description}</p>
          <div className={styles.industries}>
            {services.list && JSON.parse(services.list).map((service) => {
              return (
                <h3 key={service} className="has-icon">
                  <Image src={`/${service.toLowerCase()}` + '.svg'} alt={service} width={25} height={25} />
                  {service}
                </h3>
              )
            })}
          </div>
        </div>
      </div>
      <div className={styles.solutions}>
        <Image src={solutions.image ?? ''} className={styles.heroImg} alt={solutions.title ?? ""} fill={true} />
        <TextOver direction="right" size="large">
          <div>
            <h2>{solutions.title}</h2>
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
            <p className="semi-bold space">{solutions.description}</p>
            <div>
              <Link href={solutions.ctal ?? "/"} className="cta large">{solutions.cta}</Link>
            </div>
          </div>
        </TextOver>
      </div>
    </div>
  );
}
