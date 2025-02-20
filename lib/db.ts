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
    const name = pathname.split("/").pop();
    if (name && name !== "") pagename = name;
  }
  return (
    pages.find((pg) => pg.name === pagename.replaceAll("-", " ")) ?? {
      name: pagename,
      id: 1,
    }
  );
}

export const db = drizzle(sql, { schema });

export const getUsers = async () => {
  return db.query.users.findMany();
};

export const getContact = async () => {
  const user = await db.query.users.findFirst({
    where: eq(schema.users.contact, true),
  });
  if (user) return user
  else return false
}

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
  const nav = await db.query.nav.findMany();
  if (nav.filter(n => n.isParent).length) {
    const getChilds = nav.map(async (n) => {
      if (n.isParent) {
        const page = await getPageByName(n.name);
        if (page) {
          const children = await db.select({
            name: schema.pages.name,
            display_name: schema.pages.display_name,
          }).from(schema.pages).where(eq(schema.pages.nest_id, page.id));
          return { ...n, children };
        }
      }
      return n;
    });
    const navWithChildren = await Promise.all(getChilds)
    return navWithChildren;
  }
  return nav;
};

export const getPages = async () => {
  return db.query.pages.findMany();
};

export const getPageByName = async (name: string): Promise<schema.Pages | undefined> => {
  const page = await db.query.pages.findFirst({
    where: eq(schema.pages.name, name),
  });
  return page;
};

export interface PageDetails {
  page: schema.Pages | null;
  content: schema.Content[] | null;
  metadata: schema.Meta | null;
}

export const getPageDetailsByName = async (name: string, getMeta: boolean = false): Promise<PageDetails> => {
  const page = await getPageByName(name);
  if (page) {
    const content = await db.query.content.findMany({
      where: eq(schema.content.page, page.id),
    });
    let metadata;
    if (getMeta) {
      const meta = await db.query.meta.findMany();
      metadata =
        meta.find((data) => data.page === page.id) ??
        meta.find((i) => i.page === null) ??
        null;
    }
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
    const newPage = await db.insert(schema.pages).values(data).returning();
    const { id, name, display_name } = newPage[0];
    const hero = { title: display_name ?? name, page: id, type: 'hero', order: 1 } as schema.Content;
    await db.insert(schema.content).values(hero).returning();
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
};

export const createNav = async (data: schema.Nav) => {
  if (data) {
    await db.insert(schema.nav).values(data).returning();
    return true;
  } else return false;
};

export const updateNav = async (id: number, data: schema.Nav) => {
  if (data) {
    await db.update(schema.nav).set(data).where(eq(schema.nav.id, id));
    return true;
  } else return false;
};

export const deleteNav = async (id: number) => {
  if (id) {
    await db.delete(schema.nav).where(eq(schema.nav.id, id));
    return true;
  } else return false;
};

export const updateContent = async (
  id: number | null,
  data: schema.Content
) => {
  if (id) {
    await db.update(schema.content).set(data).where(eq(schema.content.id, id));
    return true;
  } else {
    await db.insert(schema.content).values(data).returning();
    return true;
  }
};

export const deleteContent = async (id: number) => {
  if (id) {
    await db.delete(schema.content).where(eq(schema.content.id, id));
    return true;
  } else return false;
};
