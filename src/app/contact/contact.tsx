import styles from "../styles/contact.module.css";
import Image from "next/image";
import { getContact, PageDetails } from "../../../lib/db";
import ContactForm from "./contactForm";

export default async function ContactUs({ details }: { details: PageDetails }) {
  const { title, description } = details?.content?.find(c => c.type === 'hero') ?? {};
  const user = await getContact();
  if (!user) return <span />
  const { phone, email } = user;
  const fPhone = phone?.toString().match(/^(\d{3})(\d{3})(\d{4})$/);

  return (
    <div className={`services content ${styles.contact}`}>
      <div className={styles.contacts}>
        <h2>{title}</h2>
        <p className="semi-bold space">{description}</p>
        <div className={styles.points}>
          <div className={styles.point}>
            <Image src="/phone-black.svg" width={20} height={20} alt="Location" />
            <div className={styles.text}>
              {fPhone ? (
                <a href={`tel:${phone}`}>{`${fPhone[1]}-${fPhone[2]}-${fPhone[3]}`}</a>
              ) : ''}
            </div>
          </div>
          <div className={styles.point}>
            <Image src="/email-black.svg" width={20} height={20} alt="Location" />
            <div className={styles.text}>
              <a href={`mailto:${email}`}>{email}</a>
            </div>
          </div>
          <br />
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48272.152141576196!2d-111.89994587210963!3d40.87166552473554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x875257b087b1235f%3A0x4f1f8431cf23913!2sBountiful%2C%20UT%2084010!5e0!3m2!1sen!2sus!4v1758993998117!5m2!1sen!2sus" width="350" height="300" style={{ border: 0 }} loading="lazy"></iframe>
        </div>
      </div>
      <ContactForm />
    </div>
  )
}
