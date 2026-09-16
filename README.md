# AI Adoption for Recruiting Agencies

A paid digital guide for boutique and independent recruiting agencies — where to add AI across the agency workflow, what it costs, and what it's worth. Second product under the **Digital Bound** brand (same brand/author as [digital-bound](https://github.com/atf-io/digital-bound), the AI Voice Agents guide), shipped as its own repo/app rather than a shared codebase.

20 chapters across 5 parts + an appendix, with the first 4 (all of Part 1 plus the Day 1 Quick Start) free to read.

## Stack

Vite + React 18 + TypeScript + Tailwind + shadcn/ui + Framer Motion + react-router-dom. One-click PDF export via `html2canvas` + `jspdf`. Purchase gating and email capture via `localStorage`, no backend.

Chapters are **data-driven**: `src/data/agencyGuideChapters.ts` holds title/subtitle/part/HTML body for every chapter, rendered generically by `src/components/ebook/ChapterBody.tsx`. There is no per-chapter component file — add or edit a chapter by editing that one data file.

## Architecture

- `src/components/ebook/EBookReader.tsx` — sidebar nav, cover, chapter rendering, email capture, PDF export, purchase-token check, Buy gate modal. The whole commerce + UX layer.
- `src/components/ebook/ChapterBody.tsx` — renders one chapter's heading + HTML body with the `.chapter-body` styling defined in `src/index.css` (stat grids, callouts, numbered steps, icon lists, tables).
- `src/data/agencyGuideChapters.ts` — all chapter content plus the `book` config (title, tagline, free-chapter limit) and a `groupByPart` helper the sidebar/cover/PDF all use for section grouping.
- `src/pages/About.tsx` — author bio + Rivet CSR upsell, same offer-ladder pattern as the voice-agents guide.

## Environment variables

See `.env.example`. All commerce config is env-driven — no hardcoded price, checkout URL, or purchase token.

## Useful commands

```bash
npm install
npm run dev        # http://localhost:8080
npm run build       # vite build → /dist
npm run lint
npm run test
```

## Manual steps before this can go live

1. **Lemon Squeezy product.** This guide needs its own LS product and checkout link — it is not the same purchase as the voice-agents guide. Create it in the Lemon Squeezy dashboard, then set `VITE_CHECKOUT_URL` and `VITE_PURCHASE_TOKEN` (matching the LS success-URL token).
2. **Price.** Not yet decided. `VITE_PRICE_DISPLAY` is left blank; the UI reads that and shows "Get the Guide" / "Price coming soon" instead of a number until it's set.
3. **OG image.** `index.html` references `/og-image.png`, which doesn't exist yet in `public/` — generate one before sharing links publicly (a 1200×630 card with the cover title/tagline).
4. **Domain / canonical URL.** `index.html` has no `og:url`/canonical tag yet since the deploy domain isn't chosen. Add those once it's live.
5. **Email capture tool.** `VITE_EMAIL_CAPTURE_URL` is blank; the signup form still works and saves locally, but nothing is delivered server-side until this is set.

## Quiet-launch constraint

Same as the voice-agents guide: Alex Franco is named author on the cover, About page, and PDF, but no promotion through LinkedIn or his professional network. Public/paid channels operate under the "Digital Bound" brand only.
