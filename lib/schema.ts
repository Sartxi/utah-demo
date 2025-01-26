import {
  integer,
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
  },
  (users) => [uniqueIndex("unique_idx").on(users.email)]
);

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  edited: string | null;
}

export const nav = pgTable(
  "nav",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    place: integer().notNull(),
    href: text("href").notNull(),
  },
  (nav) => [uniqueIndex("unique_idx").on(nav.name)]
);

export interface Nav {
  id: number;
  name: string;
  place: number;
  href: string;
}
