"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { META_PIXEL_ID, trackPageView } from "@/lib/meta-pixel";

function ensureFbqStub() {
  if (typeof window.fbq === "function") return;
  // Official Meta stub (same as Events Manager snippet)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const f = window as any;
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

/** Load fbevents once, then init + fire route PageViews */
function bootPixel(pixelId: string, onReady: () => void) {
  ensureFbqStub();

  const existing = document.getElementById("meta-pixel-fbevents");
  if (existing) {
    window.fbq?.("init", pixelId);
    onReady();
    return;
  }

  const script = document.createElement("script");
  script.id = "meta-pixel-fbevents";
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  script.onload = () => {
    window.fbq?.("init", pixelId);
    onReady();
  };
  script.onerror = () => {
    console.warn(
      "[Meta Pixel] Could not load connect.facebook.net — ad blocker or network blocked it"
    );
  };
  document.head.appendChild(script);
}

export default function MetaPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastKey = useRef<string | null>(null);

  useEffect(() => {
    if (!META_PIXEL_ID) return;
    const key = `${pathname}?${searchParams?.toString() ?? ""}`;

    bootPixel(META_PIXEL_ID, () => {
      if (lastKey.current === key) return;
      lastKey.current = key;
      trackPageView();
    });
  }, [pathname, searchParams]);

  return null;
}
