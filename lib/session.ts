"use server";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = process.env.SESSION_SECRET;
const sessionKey = "sa_editor_session";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .sign(key);
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function loginSession(user) {
  const session = await encrypt({ user });
  const cookie = await cookies();
  cookie?.set(sessionKey, session, { httpOnly: true });
}

export async function logout() {
  const cookie = await cookies();
  cookie?.set(sessionKey, "", { expires: new Date(0) });
}

export async function getSession() {
  const cookie = await cookies();
  const session = cookie.get(sessionKey)?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get(sessionKey)?.value;
  if (!session) return;
  const parsed = await decrypt(session);
  const res = NextResponse.next();
  res.cookies.set({
    name: sessionKey,
    value: await encrypt(parsed),
    httpOnly: true,
  });
  return res;
}
