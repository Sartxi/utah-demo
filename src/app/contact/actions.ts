"use server";

import { getUsers } from "../../../lib/db";
import nodemailer from "nodemailer";

import mail from "./email";

interface FormDatas {
  name: string;
  email: string;
  phone: string;
  service: string;
  reachtime: string;
}

function getFormData(attrs: string[], form: FormData): FormDatas {
  const data = {};
  attrs.forEach((attr) => {
    const fd = form.get(attr);
    if (fd) {
      const prop: string = fd.toString();
      data[attr] = prop as string;
    }
  });
  return data as FormDatas;
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: process.env.EMAIL_HOST,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_SECRET,
  },
});

export async function sendContact(formData: FormData) {
  const users = await getUsers();
  const admin = users.find((c) => !c.contact);

  const { name, email, phone, service, reachtime } = getFormData(
    ["name", "email", "phone", "service", "reachtime"],
    formData
  );
  const message = formData.get("message")?.toString() ?? null;
  const contact = mail.template(
    mail.contact({ name, service, contact: admin?.name ?? "Mr. Robot" })
  );
  const notify = mail.template(
    mail.notify({ name, service, phone, email, message, reachtime })
  );

  if (!contact || !email) return;
  try {
    await transporter.sendMail({
      from: `"${admin?.name}"<${admin?.email}>`,
      to: email,
      subject: `${name}, we got your request for ${service}!`,
      html: contact,
    });
    await transporter.sendMail({
      from: `"Your Website"<utahdustfreedemolition.com>`,
      to: admin?.email,
      subject: "Cha Ching! Someone sent a contact request",
      html: notify,
    });
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
}
