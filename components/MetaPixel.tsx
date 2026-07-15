"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { META_PIXEL_ID, trackPageView } from "@/lib/meta-pixel";

function injectMetaPixel(pixelId: string) {
  if (typeof window === "undefined") return;
  if (document.getElementById("meta-pixel-bootstrap")) {
    if (typeof window.fbq === "function") {
      window.fbq("init", pixelId);
    }
    return;
  }

  const bootstrap = document.createElement("script");
  bootstrap.id = "meta-pixel-bootstrap";
  bootstrap.text = `
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${pixelId}');
`;
  document.head.appendChild(bootstrap);
}

/** Client-injected Pixel — DOM script runs in browser so Pixel Helper sees events */
export default function MetaPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirst = useRef(true);

  useEffect(() => {
    if (!META_PIXEL_ID) return;
    injectMetaPixel(META_PIXEL_ID);
    trackPageView();
    isFirst.current = false;
  }, [pathname, searchParams]);

  return null;
}
