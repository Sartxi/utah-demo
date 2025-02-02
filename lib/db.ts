import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import * as schema from "./schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export async function getPageUrl() {
  const header = await headers();
  return header.get("x-url") || "";
}

export function getPageData(pages: schema.Pages[], url: string) {
  let pagename = "home";
  if (url) {
    const { pathname } = new URL(url);
    const name = pathname.replace("/", "");
    if (name.length) pagename = name;
  }
  return pages.find((pg) => pg.name === pagename) ?? { name: pagename, id: 1 };
}

export const db = drizzle(sql, { schema });

export const getUsers = async () => {
  return db.query.users.findMany();
};

export const getMeta = async () => {
  return db.query.meta.findMany();
};

export const getMetaData = async () => {
  const pages = await getPages();
  const url = await getPageUrl();
  const page = getPageData(pages, url);
  let meta = await db.query.meta.findFirst({
    where: eq(schema.meta.page, page.id),
  });
  if (!meta) {
    meta = await db.query.meta.findFirst({
      where: eq(schema.meta.id, 1),
    });
  }
  return meta;
};

export const getNav = async () => {
  return db.query.nav.findMany();
};

export const getPages = async () => {
  return db.query.pages.findMany();
};

export interface PageDetails {
  page: schema.Pages | null;
  content: schema.Content[] | null;
  metadata: schema.Meta | null;
}

export const getPage = async (name: string): Promise<PageDetails> => {
  const page = await db.query.pages.findFirst({
    where: eq(schema.pages.name, name),
  });
  if (page) {
    const content = await db.query.content.findMany({
      where: eq(schema.content.page, page.id),
    });
    const meta = await db.query.meta.findMany();
    const metadata =
      meta.find((data) => data.page === page.id) ??
      meta.find((i) => i.page === null) ??
      null;
    return { page, content, metadata };
  }
  return { page: null, content: null, metadata: null };
};

export const createMeta = async (data) => {
  if (data) {
    await db.insert(schema.meta).values(data).returning();
    return true;
  } else return false;
};

export const updateMeta = async (id: number, data: unknown) => {
  if (data) {
    await db.update(schema.meta).set(data).where(eq(schema.meta.id, id));
    return true;
  } else return false;
};

export const createPage = async (data: schema.Pages) => {
  if (data) {
    await db.insert(schema.pages).values(data).returning();
    return true;
  } else return false;
};

export const updatePage = async (id: number, data: unknown) => {
  if (data) {
    await db.update(schema.pages).set(data).where(eq(schema.pages.id, id));
    return true;
  } else return false;
};

export const deletePage = async (id: number) => {
  if (id) {
    await db.delete(schema.pages).where(eq(schema.pages.id, id));
    return true;
  } else return false;
}
