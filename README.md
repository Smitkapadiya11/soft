# Silk Room — Wellness Massager Store

**Silk Room** is a single-product e-commerce store selling the **Deep Relief Massager** — a cordless percussion muscle massage device for recovery and everyday relaxation in India.

## Stack
- Next.js 16 (App Router) · CSS Modules · Prisma + Neon Postgres · NextAuth · Razorpay Standard Checkout

## Product
- **Name:** Deep Relief Massager
- **Price:** ₹549 INR (free standard delivery across India)
- **Variants:** Pearl · Sage

## Key routes
- `/` Home · `/product` · `/checkout` · `/confirmation`
- `/privacy` · `/terms` · `/shipping` · `/replacement` (Return & Refund) · `/contact`
- `/admin` (protected)

## Local setup
1. Copy `.env.example` → `.env.local` and fill values
2. `npm install`
3. `npm run db:seed` (or `npm run admin:sync`)
4. `npm run dev`
