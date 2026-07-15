"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { META_PIXEL_ID, trackPageView } from "@/lib/meta-pixel";

/**
 * Base Pixel lives in layout HTML (Helper can "find" the ID).
 * This component:
 * 1) Always fires PageView (incl. first paint) via trackMeta beacons
 * 2) If Facebook CDN is blocked, loads fbevents from our first-party proxy
 */
function loadScript(id: string, src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.getElementById(id);
    if (existing) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.id = id;
    script.async = true;
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => {
      script.remove();
      reject(new Error(src));
    };
    document.head.appendChild(script);
  });
}

async function ensureFbeventsLibrary() {
  // Prefer official CDN when available (Pixel Helper counts these events)
  try {
    await loadScript(
      "meta-pixel-fbevents",
      "https://connect.facebook.net/en_US/fbevents.js"
    );
    return "cdn";
  } catch {
    /* blocked */
  }

  try {
    await loadScript("meta-pixel-fbevents", "/api/meta/fbevents");
    return "proxy";
  } catch {
    return "none";
  }
}

export default function MetaPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastKey = useRef<string | null>(null);
  const libraryReady = useRef(false);

  useEffect(() => {
    if (!META_PIXEL_ID) return;
    const key = `${pathname}?${searchParams?.toString() ?? ""}`;

    void (async () => {
      if (!libraryReady.current) {
        const source = await ensureFbeventsLibrary();
        libraryReady.current = source !== "none";
        if (typeof window.fbq === "function") {
          window.fbq("init", META_PIXEL_ID);
        }
      }

      // Always fire — including first load. Layout may have queued a PageView
      // that never sent if Facebook CDN was blocked.
      if (lastKey.current === key) return;
      lastKey.current = key;
      trackPageView();
    })();
  }, [pathname, searchParams]);

  return null;
}
