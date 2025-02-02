"use server";

import { redirect } from "next/navigation";
import { loginSession } from "../../../lib/session";
import {
  createMeta,
  createPage,
  getUsers,
  updateMeta,
  updatePage,
  deletePage,
} from "../../../lib/db";
import bcrypt from "bcryptjs";
import { Pages } from "../../../lib/schema";
import * as schema from "../../../lib/schema";

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

export async function updataMeta(formData: FormData) {
  const id = formData.get("id");
  const metaPage = formData.get("metapage");
  const pageId = formData.get("pageid");

  if (id && pageId) {
    const shouldUpdate =
      metaPage === pageId || (!metaPage && parseInt(pageId.toString()) === 1);

    const data = {};
    ["title", "description"].forEach((attr) => {
      const fd = formData.get(attr);
      const prop = fd?.toString();
      data[attr] = prop ?? "";
    });

    if (shouldUpdate) {
      const updated = await updateMeta(parseInt(id.toString()), data);
      return updated;
    } else {
      data["page"] = parseInt(pageId.toString());
      const inserted = await createMeta(data);
      return inserted;
    }
  }
}

export async function addNav(formdata: FormData) {
  console.log("add a nav item", formdata);
}

export async function editNav(formdata: FormData) {
  console.log("edit a nav item", formdata);
}

export async function removeNav(id: number) {
  console.log("remove a nav item", id);
}

export async function reorderNav() {
  console.log("reorder the nav");
}

export async function editPage(formdata: FormData) {
  const id = formdata.get("id");
  if (!id) return false;

  const data = {};
  ["name", "type", "nest_id", "display_name"].forEach((attr) => {
    const fd = formdata.get(attr);
    let prop: string | number | undefined = fd?.toString();
    if (fd && attr === "nest_id") prop = parseInt(fd.toString(), 10)
    if (prop) data[attr] = prop ?? "";
  });

  if (id === "0") {
    const created = await createPage(data as schema.Pages);
    return created;
  } else {
    const updated = await updatePage(parseInt(id.toString()), data);
    return updated;
  }
}

export async function removePage(page: Pages) {
  const removed = await deletePage(parseInt(page.id.toString(), 10));
  return removed;
}
