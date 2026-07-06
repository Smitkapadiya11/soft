import { NextRequest, NextResponse } from "next/server";

type Entry = { count: number; resetAt: number };

const store = new Map<string, Entry>();

export function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

export function rateLimit(
  req: NextRequest,
  key: string,
  limit = 10,
  windowMs = 60_000
): NextResponse | null {
  const ip = getClientIp(req);
  const bucketKey = `${ip}:${key}`;
  const now = Date.now();
  const entry = store.get(bucketKey);

  if (!entry || now > entry.resetAt) {
    store.set(bucketKey, { count: 1, resetAt: now + windowMs });
    return null;
  }

  if (entry.count >= limit) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((entry.resetAt - now) / 1000)) } }
    );
  }

  entry.count += 1;
  return null;
}
