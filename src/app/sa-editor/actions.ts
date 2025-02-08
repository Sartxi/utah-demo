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
  createNav,
  updateNav,
  deleteNav,
  updateContent,
  deleteContent,
} from "../../../lib/db";
import bcrypt from "bcryptjs";
import { Pages } from "../../../lib/schema";
import * as schema from "../../../lib/schema";

interface FormatAttrs {
  attr: string;
  type: "number" | "string" | "boolean";
}

function formatFormData(attrs: FormatAttrs[] | string[], form: FormData) {
  const data = {};
  attrs.forEach((dt) => {
    const strArr = typeof attrs[0] === "string";
    const attr = strArr ? dt : dt.attr;
    const type = strArr ? 'string' : dt.type;
    const fd = form.get(attr);
    if (fd) {
      let prop: string | number | boolean = fd.toString();
      if (type === "number") prop = parseInt(prop, 10);
      if (type === "boolean") prop = Boolean(prop);
      data[attr] = prop as string | number | boolean;
    }
  });
  return data;
}

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

    const data = formatFormData(["title", "description"], formData);
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

export async function editNav(data: schema.Nav) {
  if (data.id === 0) {
    const newNav = {};
    ["name", "href", "place", "isParent", "cta"].forEach(d => newNav[d] = data[d]);
    const created = await createNav(newNav as schema.Nav);
    return created;
  } else {
    const updated = await updateNav(data.id, data);
    return updated;
  }
}

export async function removeNav(id: number) {
  const removed = await deleteNav(id);
  return removed;
}

export async function editPage(formdata: FormData) {
  const id = formdata.get("id");
  if (!id) return false;

  const data = {};
  ["name", "type", "nest_id", "display_name"].forEach((attr) => {
    const fd = formdata.get(attr);
    let prop: string | number | undefined = fd?.toString();
    if (fd && attr === "nest_id") prop = parseInt(fd.toString(), 10);
    if (prop) data[attr] = prop ?? "";
  });

  if (id === "0") {
    const created = await createPage(data as schema.Pages);
    return created;
  } else {
    const updated = await updatePage(
      parseInt(id.toString()),
      data as schema.Pages
    );
    return updated;
  }
}

export async function removePage(page: Pages) {
  const removed = await deletePage(parseInt(page.id.toString(), 10));
  return removed;
}

export async function editContent(formData: FormData) {
  const id = formData.get("id");
  const title = formData.get("title");
  const feilds = ["title", "page", "image", "description", "cta", "href", "type", "list", "order"];
  const data = formatFormData(feilds, formData) as schema.Content;
  if (data?.list && JSON.parse(data?.list ?? "")?.length == 0) data.list = null;
  if (title === "") data.title = null;
  const update = await updateContent(parseInt(id?.toString() ?? "", 10), data);
  return update;
}

export async function removeContent(id: number) {
  const removed = await deleteContent(id);
  return removed;
}
