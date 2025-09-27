import { getUsers } from "../../../lib/db";
import { FooterContent } from "./footer-content";


export default async function Footer() {
  const users = await getUsers();
  const contact = users.filter(u => u.contact)?.[0];
  if (!contact) return null;

  return (
    <FooterContent phone={contact.phone} email={contact.email} />
  );
}
