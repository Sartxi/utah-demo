"use client"

import Form from "next/form";
import styles from "../styles/contact.module.css";
import { sendContact } from "./actions";
import Select from "../sa-editor/elements/select";
import { useEffect, useState } from "react";

export default function ContactForm() {
  const [reachtime, setReachtime] = useState("Morning");
  const [sent, setSent] = useState<boolean | string>(false);

  useEffect(() => {
    if (sent) setTimeout(() => setSent(false), 2500);
  }, [sent])

  const onSubmit = async (data: FormData) => {
    const send = await sendContact(data);
    setSent(send?.success ? "success" : "error")
  };

  return (
    <div className={styles.form}>
      {typeof sent === 'string' && <div className={styles.sentmessage}>{sent === "error" ? <span>There was a problem</span> : <strong>Your message sent!</strong>}</div>}
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
        <button type="submit" className="cta">Send</button>
      </Form>
    </div>
  )
}
