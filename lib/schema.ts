import {
  integer,
  boolean,
  pgTable,
  serial,
  text,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    password: text("password").notNull(),
    edited: text(),
    phone: integer(),
    address: text("address"),
    city: text("city"),
    state: text("state"),
    zip: text("zip"),
    linkedn: text("linkedn"),
    instagram: text("instagram"),
    facebook: text("facebook"),
    contact: boolean().notNull(),
  },
  (users) => [uniqueIndex("unique_idx").on(users.email)]
);

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  edited?: string;
  phone?: number;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  linkedn?: string;
  instagram?: string;
  facebook?: string;
  contact: boolean;
}

export const nav = pgTable(
  "nav",
  {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
    place: integer().notNull(),
    href: text("href").notNull(),
    cta: boolean().notNull(),
    isParent: boolean().notNull(),
  },
  (nav) => [uniqueIndex("unique_idx").on(nav.name)]
);

export interface Nav {
  id: number;
  name: string;
  place: number;
  href: string;
  cta: boolean;
  isParent: boolean;
  children?: { name: string; display_name: string }[];
}

export const meta = pgTable(
  "meta",
  {
    id: integer("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    page: integer(),
  },
  (meta) => [uniqueIndex("unique_idx").on(meta.id)]
);

export interface Meta {
  id: number;
  title: string;
  description: string;
  page: number | null;
}

export const pages = pgTable(
  "pages",
  {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
    type: text("type").notNull(),
    nest_id: integer("nest_id"),
    display_name: text("display_name"),
  },
  (page) => [uniqueIndex("unique_idx").on(page.id)]
);

export interface Pages {
  id: number;
  name: string;
  type: string;
  nest_id: number | null;
  display_name: string | null;
}

export const content = pgTable(
  "content",
  {
    id: integer("id").primaryKey(),
    page: integer("page").notNull(),
    type: text("type").notNull(),
    title: text("title"),
    description: text("description"),
    cta: text("cta"),
    href: text("href"),
    image: text("image"),
    list: text("list"),
    order: integer("order").notNull(),
  },
  (content) => [uniqueIndex("unique_idx").on(content.id)]
);

export interface Content {
  id: number;
  page: number;
  type: string;
  order: number;
  title: string | null;
  description: string | null;
  cta: string | null;
  href: string | null;
  image: string | null;
  list: string | null;
}
