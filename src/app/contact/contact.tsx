import styles from "../styles/contact.module.css";
import Image from "next/image";
import { getContact, PageDetails } from "../../../lib/db";
import ContactForm from "./contactForm";

export default async function ContactUs({ details }: { details: PageDetails }) {
  const { title, description } = details?.content?.find(c => c.type === 'hero') ?? {};
  const user = await getContact();
  if (!user) return <span />
  const { phone, address, city, state, zip, email } = user;
  const fPhone = phone?.toString().match(/^(\d{3})(\d{3})(\d{4})$/);
  
  return (
    <div className={`${styles.contact} content`}>
      <div className={styles.contacts}>
        <p className="semi-bold space">{description}</p>
        <h2>{title}</h2>
        <div className={styles.points}>
          <br />
          <p className="semi-bold space">Contact Info:</p>
          <div className={styles.point}>
            <Image src="/location.svg" width={20} height={20} alt="Location" />
            <div className={styles.text}>
              {address}<br />{city}, {state} {zip}
            </div>
          </div>
          <div className={styles.point}>
            <Image src="/phone.svg" width={20} height={20} alt="Location" />
            <div className={styles.text}>
              {fPhone ? (
                <a href={`tel:${phone}`}>{`${fPhone[1]}-${fPhone[2]}-${fPhone[3]}`}</a>
              ) : ''}
            </div>
          </div>
          <div className={styles.point}>
            <Image src="/email.svg" width={20} height={20} alt="Location" />
            <div className={styles.text}>
              <a href={`mailto:${email}`}>{email}</a>
            </div>
          </div>
        </div>
      </div>
      <ContactForm />
    </div>
  )
}
