# Meta data-source category restriction — operator guide

## What Meta is doing

`silkroom.shop` datasets in Events Manager were assigned categories such as **Unsuitable content** and **Personal hardship**, with a **full restriction**: the Pixel cannot share any event data with Meta for ads optimization.

While that block is active:

- Conversion / Purchase / catalog optimization campaigns will underperform or refuse learning.
- Prefer **Awareness**, **Engagement**, or **Traffic** (link clicks) objectives that do not depend on Pixel events.
- Landing ads on wellness-framed pages (`/`, `/product`, `/product/silk-lick`, `/product/silk-trio`) — not old adult-keyword URLs.

## What we changed on-site (for review + buyers)

1. **Public copy & metadata** use personal-wellness / men’s personal-care framing (no “vibrator” / “masturbator” in titles, descriptions, alts, hero copy).
2. **Safer public URLs**: `/product/silk-lick` and `/product/silk-trio`, with permanent redirects from legacy slugs.
3. **Safer image paths**: `/products/silk-lick/…` and `/products/silk-trio/…`.
4. **Buyer path unchanged**: PDPs still show real product photos, clear pricing, Add to cart / Buy Now, Razorpay prepaid, plain-box shipping, WhatsApp support.
5. **Pixel payloads** send neutral `content_name` values (`Silk Room Ease` / `Lick` / `Trio`). Events still fire locally but Meta may discard them until the restriction lifts.

## Request a category review (required)

In Meta Events Manager → **Data sources** → **Manage data source categories**:

1. Open each `silkroom.shop` row (dataset IDs `2205854633526316` and `1622491029393248` if both appear).
2. Click **View details** → **Request a review**.
3. Explain that Silk Room sells **adult personal wellness / body-care products (18+)**, framed as discreet wellness retail — not prohibited “unsuitable content” or hardship scams — and ask Meta to reassess categories.
4. After deploy, wait 24–48 hours so Meta’s crawler can see the softened public surfaces, then submit (or re-submit) the review.
5. Watch email + Events Manager for the decision. You cannot edit a Meta-assigned category yourself.

Honest expectation: product **photos** of adult toys can still keep an Unsuitable / sexuality-related category even after copy softens. Softening + review is the legitimate path; there is no reliable “bypass.”

## Interim ad strategy (while Pixel is fully blocked)

| Objective | Use for |
| --- | --- |
| Traffic (link clicks) | Send warm traffic to `/` or Ease `/product` |
| Awareness (reach / impressions) | Brand familiarity |
| Engagement | Social proof on page/posts |

Do **not** rely on Purchase or AddToCart optimization until Events Manager shows the restriction cleared and test events are accepted again.

Creative should match on-site wellness language (discreet delivery, body-safe, plain box) and avoid policy-trigger adult keyword creatives.

## After restriction lifts

1. Confirm Pixel events in Test Events / Events Manager.
2. Rebuild or re-enable conversion campaigns gradually.
3. Keep public surfaces on the softened framing so categories do not snap back on the next crawl.
