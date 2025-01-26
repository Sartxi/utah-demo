"use server";

import { redirect } from "next/navigation";
import { loginSession } from "../../../lib/session";
import { getUsers } from "../../../lib/db";
import bcrypt from "bcryptjs";

function compare(guess: string, pw: string) {
  return new Promise(async function (resolve, reject) {
    bcrypt.compare(guess, pw, async (err, res) => {
      if (err) reject(false);
      else resolve(res);
    });
  });
}

export async function login(formData: FormData) {
  const name = formData.get("name");
  const guess = formData.get("password");
  if (name && guess) {
    const users = await getUsers();
    const user = users.find((u) => u.name === name);
    if (user) {
      const auth = await compare(guess.toString(), user.password);
      if (auth) {
        const cookie = user;
        await loginSession(cookie);
        redirect("/");
      }
    }
  }
}
