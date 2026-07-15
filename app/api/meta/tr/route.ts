import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

/**
 * First-party beacon → Meta. Helps when facebook.com/tr is filtered by blockers
 * that still allow same-origin requests.
 */
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const target = new URL("https://www.facebook.com/tr");
  url.searchParams.forEach((value, key) => {
    target.searchParams.set(key, value);
  });

  try {
    const upstream = await fetch(target.toString(), {
      method: "GET",
      headers: {
        "User-Agent": req.headers.get("user-agent") ?? "SilkRoomPixel/1.0",
        Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
      },
      redirect: "follow",
    });

    const buf = await upstream.arrayBuffer();
    return new NextResponse(buf, {
      status: 200,
      headers: {
        "Content-Type":
          upstream.headers.get("content-type") ?? "image/gif",
        "Cache-Control": "no-store",
      },
    });
  } catch {
    // 1x1 transparent gif
    const gif = Uint8Array.from(
      atob("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"),
      (c) => c.charCodeAt(0)
    );
    return new NextResponse(gif, {
      status: 200,
      headers: { "Content-Type": "image/gif", "Cache-Control": "no-store" },
    });
  }
}
