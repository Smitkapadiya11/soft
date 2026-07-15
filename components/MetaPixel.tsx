"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { META_PIXEL_ID, trackPageView } from "@/lib/meta-pixel";

const FBE_SOURCES = [
  "/api/meta/fbevents",
  "https://connect.facebook.net/en_US/fbevents.js",
] as const;

function ensureFbqStub() {
  if (typeof window.fbq === "function") return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const f = window as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const n: any = function (...args: unknown[]) {
    if (n.callMethod) n.callMethod(...args);
    else n.queue.push(args);
  };
  if (!f._fbq) f._fbq = n;
  f.fbq = n;
  n.push = n;
  n.loaded = true;
  n.version = "2.0";
  n.queue = [];
}

/** Beacon that reaches Meta even when fbq library fails to load */
function fireBeacon(pixelId: string, event: string) {
  const qs = new URLSearchParams({
    id: pixelId,
    ev: event,
    noscript: "1",
    dl: typeof window !== "undefined" ? window.location.href : "",
    _: String(Date.now()),
  });
  const img = new Image();
  img.src = `/api/meta/tr?${qs.toString()}`;
}

function loadFbevents(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const prev = document.getElementById("meta-pixel-fbevents");
    if (prev) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.id = "meta-pixel-fbevents";
    script.async = true;
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => {
      script.remove();
      reject(new Error(`Failed to load ${src}`));
    };
    document.head.appendChild(script);
  });
}

async function bootPixel(pixelId: string, onReady: () => void) {
  ensureFbqStub();
  window.fbq?.("init", pixelId);

  // Always send a first-party beacon so Events Manager can get PageView
  // even when connect.facebook.net is blocked in the browser.
  fireBeacon(pixelId, "PageView");

  for (const src of FBE_SOURCES) {
    try {
      await loadFbevents(src);
      window.fbq?.("init", pixelId);
      onReady();
      return;
    } catch {
      // try next source
    }
  }

  // Library blocked — beacon already sent; mark for debugging
  (window as Window & { __META_PIXEL_BLOCKED?: boolean }).__META_PIXEL_BLOCKED =
    true;
}

export default function MetaPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastKey = useRef<string | null>(null);

  useEffect(() => {
    if (!META_PIXEL_ID) return;
    const key = `${pathname}?${searchParams?.toString() ?? ""}`;

    void bootPixel(META_PIXEL_ID, () => {
      if (lastKey.current === key) return;
      lastKey.current = key;
      trackPageView();
    });
  }, [pathname, searchParams]);

  return null;
}
