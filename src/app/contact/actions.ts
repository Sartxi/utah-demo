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

const recaptch = `https://recaptchaenterprise.googleapis.com/v1/projects/${process.env.CAPTCHA_SITE_KEY}/assessments?key=${process.env.CAPTCHA_API_KEY}`;

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: process.env.EMAIL_HOST,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_SECRET,
  },
});

export async function sendContact(formData: FormData, token: string) {
  const users = await getUsers();
  const admin = users.find((c) => c.contact);

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
  if (!contact || !email || !token) return;
  try {
    const sendCaptcha = await fetch(recaptch, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event: {
          token: token,
          expectedAction: "CONTACT_FORM",
          siteKey: process.env.CAPTCHA_SECRET_KEY,
        },
      }),
    });

    const captcha = await sendCaptcha.json();

    if (captcha.riskAnalysis.score < 0.7)
      return { success: false, reason: "Failed security check" };

    await transporter.sendMail({
      from: `"${admin?.name}"<${admin?.email}>`,
      to: email,
      subject: `${name}, we got your request for ${service}!`,
      html: contact,
    });
    await transporter.sendMail({
      from: `"Your Website"<vicshaulandpickup.com>`,
      to: admin?.email,
      subject: "Cha Ching! Someone sent a contact request",
      html: notify,
    });

    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, reason: 'There was a problem, please try again later' };
  }
}
