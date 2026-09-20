# AI Adoption for Recruiting Agencies

A paid digital guide for boutique and independent recruiting agencies: where to add AI across the agency workflow, what it costs, and what it's worth. Second product under the **Digital Bound** brand (same brand/author as [digital-bound](https://github.com/atf-io/digital-bound), the AI Voice Agents guide), shipped as its own repo/app rather than a shared codebase.

21 chapters across 5 parts + an appendix (including a Prompt Library of copy-paste Claude prompts, scorecard/disclosure templates, and worksheets), with the first 4 (all of Part 1 plus the Day 1 Quick Start) free to read. The 9 core-function chapters (Part 3) are each self-contained: every one covers its own Build, Launch, Measure, and Advanced segments (what to evaluate, when to roll it out relative to the other 8 functions, what to track once it's live, and how to go further) instead of splitting that across separate Build/Launch/Advanced parts of the book. Part 5 ("Scaling & Operations") sits after the Guardrails chapters and covers cross-cutting topics that aren't tied to a single juncture: chaining tools into end-to-end agentic workflows, managing the recruiting team itself once there's more than one recruiter, and a size-specific implementation roadmap (solo / 3-person / 10-person agency).

## Stack

Vite + React 18 + TypeScript + Tailwind + shadcn/ui + Framer Motion + react-router-dom. One-click PDF export via `html2canvas` + `jspdf`. Purchase gating and email capture via `localStorage`, no backend.

**Gating is currently off.** `GATING_ENABLED` in `EBookReader.tsx` is `Boolean(VITE_CHECKOUT_URL)`. With no checkout URL configured, every chapter and the PDF are open to any visitor (this is the state for review, before there's a real product to sell). The moment `VITE_CHECKOUT_URL` and `VITE_PURCHASE_TOKEN` are set for launch, the paywall re-enables automatically, no code change needed.

Chapters are **data-driven**: `src/data/agencyGuideChapters.ts` holds title/subtitle/part/HTML body for every chapter, rendered generically by `src/components/ebook/ChapterBody.tsx`. There is no per-chapter component file; add or edit a chapter by editing that one data file.

## Architecture

- `src/components/ebook/EBookReader.tsx`: sidebar nav, cover, chapter rendering, email capture, PDF export, purchase-token check, Buy gate modal. The whole commerce + UX layer.
- `src/components/ebook/ChapterBody.tsx`: renders one chapter's heading + HTML body with the `.chapter-body` styling defined in `src/index.css` (stat grids, callouts, numbered steps, icon lists, tables).
- `src/data/agencyGuideChapters.ts`: all chapter content plus the `book` config (title, tagline, free-chapter limit) and a `groupByPart` helper the sidebar/cover/PDF all use for section grouping.
- `src/pages/About.tsx`: author bio + Rivet CSR upsell, same offer-ladder pattern as the voice-agents guide.

## Environment variables

See `.env.example`. All commerce config is env-driven; no hardcoded price, checkout URL, or purchase token.

## Useful commands

```bash
npm install
npm run dev        # http://localhost:8080
npm run build       # vite build → /dist
npm run lint
npm run test
```

## Manual steps before this can go live

1. **Lemon Squeezy product.** This guide needs its own LS product and checkout link; it is not the same purchase as the voice-agents guide. Create it in the Lemon Squeezy dashboard, then set `VITE_CHECKOUT_URL` and `VITE_PURCHASE_TOKEN` (matching the LS success-URL token). This is also what turns the paywall back on; see "Gating is currently off" above.
2. **Price.** Not yet decided. `VITE_PRICE_DISPLAY` is left blank; the UI reads that and shows "Get the Guide" / "Price coming soon" instead of a number until it's set.
3. **OG image.** `index.html` references `/og-image.png`, which doesn't exist yet in `public/`. Generate one before sharing links publicly (a 1200×630 card with the cover title/tagline).
4. **Domain / canonical URL.** `index.html` has no `og:url`/canonical tag yet since the deploy domain isn't chosen. Add those once it's live.
5. **Email capture tool.** `VITE_EMAIL_CAPTURE_URL` is blank; the signup form still works and saves locally, but nothing is delivered server-side until this is set.

## Quiet-launch constraint

Same as the voice-agents guide: Alex Franco is named author on the cover, About page, and PDF, but no promotion through LinkedIn or his professional network. Public/paid channels operate under the "Digital Bound" brand only.
