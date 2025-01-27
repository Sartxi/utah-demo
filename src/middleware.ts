import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "../lib/session";

export async function middleware(request: NextRequest) {
  await updateSession(request);
  const headers = new Headers(request.headers);
  headers.set("x-url", request.url);
  return NextResponse.next({ request: { headers } });
}
