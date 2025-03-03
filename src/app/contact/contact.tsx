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
    <div className={`services content ${styles.contact}`}>
      <div className={styles.contacts}>
        <h2>{title}</h2>
        <p className="semi-bold space">{description}</p>
        <div className={styles.points}>
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
          <div className={styles.point}>
            <Image src="/location.svg" width={20} height={20} alt="Location" />
            <div className={styles.text}>
              {address}<br />{city}, {state} {zip}
            </div>
          </div>
          <br />
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153902.706930817!2d-114.19207516562611!3d39.46971022509934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc8e60f59d297a67%3A0x6ffcb56e8aad4d71!2sUtah%20Dustfree%20Demo!5e0!3m2!1sen!2sus!4v1740963322282!5m2!1sen!2sus" width="350" height="300" style={{ border: 0 }} loading="lazy"></iframe>
        </div>
      </div>
      <ContactForm />
    </div>
  )
}
