import Form from "next/form";
import styles from "../styles/contact.module.css";
import { sendContact } from "./actions";
import Image from "next/image";

export default function ContactUs() {
  return (
    <div className={`${styles.contact} content`}>
      <div className={styles.contacts}>
        <h2>Get a Free Estimate</h2>
        <p className="semi-bold space">Whether you are an individual or contractor, call us, email us, or use this form to request an estimate or to discuss your project.</p>
        <div className={styles.points}>
          <div className={styles.point}>
            <Image src="/location.svg" width={20} height={20} alt="Location" />
            <div className={styles.text}>
              276 North 680 East<br />Vineyard, UT 84059
            </div>
          </div>
          <div className={styles.point}>
            <Image src="/phone.svg" width={20} height={20} alt="Location" />
            <div className={styles.text}>385-335-1499</div>
          </div>
          <div className={styles.point}>
            <Image src="/email.svg" width={20} height={20} alt="Location" />
            <div className={styles.text}>motiondemolition385@gmail.com </div>
          </div>
        </div>
        <div className={styles.socials}>
          Follow us!
        </div>
      </div>
      <div className={styles.form}>
        <Form action={sendContact}>
          <label>Full Name</label>
          <input name="name" />
          <label>Email</label>
          <input name="email" />
          <label>Phone</label>
          <input name="phone" />
          <button type="submit" className="cta">Send</button>
        </Form>
      </div>
    </div>
  )
}
