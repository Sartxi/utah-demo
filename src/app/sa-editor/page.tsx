import styles from "@/app/styles/editor.module.css";
import Form from "next/form";
import { login } from "./actions";

export default function Login() {
  return (
    <div className={styles.login}>
      <Form action={login} className={`${styles.form} pod`}>
        <div className={styles.input}>
          <label>User</label>
          <input name="name" autoComplete="name" />
        </div>
        <div className={styles.input}>
          <label>Password</label>
          <input type="password" autoComplete="current-password" name="password" />
        </div>
        <button type="submit" className="cta">Login</button>
      </Form>
    </div>
  )
}
