export const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || "1366981978831016";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

function fireFbq(
  event: string,
  params?: Record<string, unknown>,
  options?: { eventID?: string }
) {
  if (typeof window.fbq !== "function") return false;
  if (options?.eventID) {
    window.fbq("track", event, params ?? {}, { eventID: options.eventID });
  } else {
    window.fbq("track", event, params ?? {});
  }
  return true;
}

/** First-party beacon fallback when facebook.net is blocked in the browser */
function fireBeacon(event: string) {
  try {
    const qs = new URLSearchParams({
      id: META_PIXEL_ID,
      ev: event,
      noscript: "1",
      dl: window.location.href,
      _: String(Date.now()),
    });
    const img = new Image();
    img.src = `/api/meta/tr?${qs.toString()}`;
  } catch {
    /* ignore */
  }
}

/** Fire immediately, or retry briefly while Pixel base script finishes loading */
export function trackMeta(
  event: string,
  params?: Record<string, unknown>,
  options?: { eventID?: string }
) {
  if (typeof window === "undefined") return;

  // Always send first-party beacon so Meta can receive events behind blockers
  fireBeacon(event);

  if (fireFbq(event, params, options)) return;

  let attempts = 0;
  const timer = window.setInterval(() => {
    attempts += 1;
    if (fireFbq(event, params, options) || attempts >= 40) {
      window.clearInterval(timer);
    }
  }, 100);
}

export function trackPageView() {
  trackMeta("PageView");
}

export function trackViewContent(params: {
  contentName: string;
  contentIds: string[];
  value: number;
  variant?: string;
}) {
  trackMeta("ViewContent", {
    content_name: params.contentName,
    content_ids: params.contentIds,
    content_type: "product",
    contents: params.contentIds.map((id) => ({
      id,
      quantity: 1,
      item_price: params.value,
    })),
    value: params.value,
    currency: "INR",
    content_category: "wellness_massager",
    ...(params.variant ? { variant: params.variant } : {}),
  });
}

export function trackAddToCart(params: {
  contentName: string;
  contentIds: string[];
  value: number;
  quantity: number;
}) {
  trackMeta("AddToCart", {
    content_name: params.contentName,
    content_ids: params.contentIds,
    content_type: "product",
    contents: [
      {
        id: params.contentIds[0],
        quantity: params.quantity,
        item_price: params.value / Math.max(1, params.quantity),
      },
    ],
    value: params.value,
    currency: "INR",
  });
}

export function trackInitiateCheckout(params: {
  value: number;
  numItems: number;
  contentIds: string[];
}) {
  trackMeta("InitiateCheckout", {
    content_ids: params.contentIds,
    content_type: "product",
    num_items: params.numItems,
    value: params.value,
    currency: "INR",
  });
}

export function trackPurchase(params: {
  orderId: string;
  value: number;
  contentName: string;
  contentIds: string[];
  quantity: number;
}) {
  const key = `meta_purchase_${params.orderId}`;
  try {
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
  } catch {
    /* private mode */
  }

  trackMeta(
    "Purchase",
    {
      content_name: params.contentName,
      content_ids: params.contentIds,
      content_type: "product",
      contents: [
        {
          id: params.contentIds[0],
          quantity: params.quantity,
          item_price: params.value / Math.max(1, params.quantity),
        },
      ],
      num_items: params.quantity,
      value: params.value,
      currency: "INR",
    },
    { eventID: params.orderId }
  );
}
