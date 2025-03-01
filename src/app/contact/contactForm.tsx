"use client"

import Form from "next/form";
import styles from "../styles/contact.module.css";
import { sendContact } from "./actions";
import Select from "../sa-editor/elements/select";
import { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function ContactForm() {
  const recaptcha: ReCAPTCHA = useRef(null);
  const [reachtime, setReachtime] = useState("Morning");
  const [sent, setSent] = useState<boolean | string>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (sent) setTimeout(() => setSent(false), 2500);
  }, [sent])

  const onSubmit = async (data: FormData) => {
    const token = await recaptcha?.current?.executeAsync();
    const send = await sendContact(data, token);
    setSent(send?.success ? "success" : "error");
    if (!send?.success) setError(send?.reason ?? "");
  };

  return (
    <div className={styles.form}>
      {typeof sent === 'string' && <div className={styles.sentmessage}>{sent === "error" ? <span>{error}</span> : <strong>Your message sent!</strong>}</div>}
      <Form action={onSubmit}>
        <label>Full Name</label>
        <input name="name" type="text" />
        <label>Email</label>
        <input name="email" type="text" />
        <label>Phone</label>
        <input name="phone" type="text" />
        <label>Best time to reach you?</label>
        <Select value={reachtime} values={["Morning", "Afternoon", "Evening", "Any Time"]} changed={(value) => setReachtime(value)} />
        <label>Service</label>
        <input name="service" type="text" />
        <label>Message</label>
        <textarea rows={4} name="message"></textarea>
        <input type="hidden" name="reachtime" value={reachtime} />
        <ReCAPTCHA
          ref={recaptcha}
          size="invisible"
          sitekey="6LfQBtoqAAAAAChkVcvzbNdPRMZz6pp1Vgg-t4k3"
        />
        <button type="submit" className="cta">Send</button>
      </Form>
    </div>
  )
}
