# Silk Room - E-Commerce Platform
## Project Overview & Walkthrough

This document serves as the primary context for developers (and AI assistants like Cursor) to understand the current architecture, design philosophy, and implementation status of the **Silk Room** project.

### 1. Brand & Design Philosophy
**Silk Room** is a premium, single-product intimate wellness brand. The design language emphasizes **trust, discretion, and elegance**.
- **Color Palette:** Soft neutrals—Blush (`#f4e9e4`), Cream (`#fcfaf9`), and Deep Plum (`#4a2c3a`).
- **Typography:** Playfair Display (Serif) for headings to evoke a premium feel, and Inter (Sans-serif) for clean, readable body text.
- **Styling Approach:** **Vanilla CSS Modules** are used exclusively. Tailwind has been stripped out to maintain strict, centralized control via CSS Variables in `app/globals.css`.

### 2. Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Styling:** CSS Modules (`*.module.css`)
- **State Management:** React Context (`context/CartContext.tsx`) with `localStorage` persistence.
- **Database:** PostgreSQL (hosted on Neon) managed via **Prisma ORM** (v7.8.0).
- **Icons:** `lucide-react`

### 3. Core Features Implemented
- **Age Gate (`components/AgeGate.tsx`):** A strict modal interceptor verifying users are 18+. State is persisted locally so it doesn't repeatedly annoy returning users.
- **Global Cart (`context/CartContext.tsx` & `components/CartDrawer.tsx`):** A slide-out cart drawer accessible globally.
- **Product Gallery (`app/product/page.tsx`):** Features variant selection (Blush vs. Plum), Next.js `<Image>` integration, trust badges, and accordion FAQs.
- **Mock Checkout (`app/checkout/page.tsx`):** A simulated prepaid checkout flow designed for discretion. It collects Personally Identifiable Information (PII) like name, address, and pincode.
- **Admin Dashboard (`app/admin/page.tsx`):** A protected management console (currently utilizing mock data for the UI) featuring:
  - Orders Table with CSV Export functionality.
  - Discreet Shipping Label Generator (prints only Name, Address, Pincode; strictly omits product descriptions).
  - Inventory tracking grid.
- **Compliance Pages (`app/(legal)/...`):** Static pages for Privacy Policy (explicitly defining PII usage), Terms, Shipping, Return, and Age Verification.

### 4. Database Schema
Defined in `prisma/schema.prisma`. We use Prisma 7, meaning the database `url` is configured via `prisma.config.ts` loading from the `.env` file.
- **Models:** `Admin`, `Customer`, `Order`, `Inventory`

### 5. Deployment
- **Platform:** Vercel
- **Configuration:** Since the Next.js app was initialized directly at the Git root, Vercel deploys the root directory automatically. 
- **Important Fixes Made:** The `/confirmation` page correctly utilizes `Suspense` wrapping around the `useSearchParams` hook, which is required by Next.js App Router to prevent build failures during static generation.

### 6. Next Steps & Pending Implementation (Where to pick up)
If you are taking over this project, focus on the following:
1. **NextAuth Integration:** Configure `app/api/auth/[...nextauth]/route.ts` using the Credentials Provider to authenticate against the `Admin` table in the database. Ensure the `/admin` route is actually protected by checking the session.
2. **Wire Admin Dashboard to DB:** Replace the static `MOCK_ORDERS` and `MOCK_INVENTORY` in `app/admin/page.tsx` with live Server Actions or API routes querying the Prisma database.
3. **Payment Gateway Integration:** Replace the mock "Place Order" button in `app/checkout/page.tsx` with a live Razorpay or PayU integration for Indian prepaid orders. (Cash on Delivery is strictly forbidden per brand guidelines).
4. **Order API:** Build an API route that ingests the checkout payload, writes to the `Customer` and `Order` Prisma tables, decrements the `Inventory` table, and triggers a discrete email confirmation.
