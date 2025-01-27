import bcrypt from "bcryptjs";
import { db } from "@vercel/postgres";
import { users, nav, pages, content, meta } from "./seeds";

const client = await db.connect();

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      edited TEXT,
      phone: VARCHAR(10),
      address: TEXT,
      city: TEXT,
      state: TEXT,
      zip: VARCHAR(10),
      linkedn: VARCHAR(255),
      instagram: VARCHAR(255),
      facebook: VARCHAR(255),
      contact: BOOLEAN NOT NULL,
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (id, name, email, password, edited, phone, address, city, state, zip, linkedn, instagram, facebook, contact)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.edited}, ${user.phone}, ${user.address}, ${user.city}, ${user.state}, ${user.zip}, ${user.linkedn}, ${user.instagram}, ${user.facebook}, ${user.contact})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedUsers;
}

async function seedNav() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS nav (
      id INT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      place INT NOT NULL UNIQUE,
      href TEXT NOT NULL,
    );
  `;

  const insertedNav = await Promise.all(
    nav.map(async (n) => {
      return client.sql`
        INSERT INTO nav (id, name, place, href)
        VALUES (${n.id}, ${n.name}, ${n.place}, ${n.href})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedNav;
}

async function seedPages() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS pages (
      id INT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      type VARCHAR(255) NOT NULL,
    );
  `;

  const insertedPages = await Promise.all(
    pages.map(async (n) => {
      return client.sql`
        INSERT INTO pages (id, name, type)
        VALUES (${n.id}, ${n.name}, ${n.type})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedPages;
}

async function seedMeta() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS meta (
      id INT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description VARCHAR(255) NOT NULL,
      page: INT UNIQUE
    );
  `;

  const insertedMeta = await Promise.all(
    meta.map(async (n) => {
      return client.sql`
        INSERT INTO meta (id, title, description, page)
        VALUES (${n.id}, ${n.title}, ${n.description}, ${n.page})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedMeta;
}

async function seedContent() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS content (
      id INT PRIMARY KEY,
      page INT NOT NULL
      type VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      cta: VARCHAR(255),
      ctal: VARCHAR(255),
      image: VARCHAR(255),
      list: TEXT,
    );
  `;

  const insertedContent = await Promise.all(
    content.map(async (n) => {
      return client.sql`
        INSERT INTO content (id, page, type, title, description, cta, ctal, image, list)
        VALUES (${n.id}, ${n.page}, ${n.type}, ${n.title}, ${n.description}, ${n.cta}, ${n.ctal}, ${n.image}, ${n.list})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedContent;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await seedUsers();
    await seedNav();
    await seedPages();
    await seedContent();
    await seedMeta();
    await client.sql`COMMIT`;

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
