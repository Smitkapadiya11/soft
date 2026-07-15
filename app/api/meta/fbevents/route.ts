import { NextResponse } from "next/server";

export const runtime = "edge";

/** First-party proxy so ad blockers that filter connect.facebook.net still allow the script */
export async function GET() {
  try {
    const upstream = await fetch(
      "https://connect.facebook.net/en_US/fbevents.js",
      {
        headers: { Accept: "application/javascript,*/*" },
        next: { revalidate: 86400 },
      }
    );

    if (!upstream.ok) {
      return NextResponse.json(
        { error: "Upstream fbevents unavailable", status: upstream.status },
        { status: 502 }
      );
    }

    const body = await upstream.text();
    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": "application/javascript; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to proxy fbevents" }, { status: 502 });
  }
}
