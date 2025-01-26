"use server";

import { getUsers } from "../../../lib/db";

export async function sendContact(formData: FormData) {
  const users = await getUsers();
  console.log(users);
  console.log(formData);
}
