"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { META_PIXEL_ID, trackPageView } from "@/lib/meta-pixel";

/**
 * SPA PageView on client navigations only.
 * Base fbq init + first PageView live in app/layout.tsx (raw HTML for Meta).
 */
export default function MetaPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (!META_PIXEL_ID) return;
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    trackPageView();
  }, [pathname, searchParams]);

  return null;
}
