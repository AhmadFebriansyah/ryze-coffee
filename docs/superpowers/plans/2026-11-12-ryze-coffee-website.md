# Ryze Coffee Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the 4-page Ryze Coffee company-profile site (Beranda, Tentang, Menu, Toko) with the option-C hero video, a 12-drink catalog with a URL-driven detail view, and placeholder assets that can later be swapped for AI ones.

**Architecture:** Next.js App Router, statically rendered pages. Content lives in `data/*.json`, read through typed helpers in `src/lib/`. Client components only where interaction or motion needs them (hero motion, catalog tabs, detail modal, mobile nav).

**Tech Stack:** Next.js (latest, App Router, TypeScript), Tailwind CSS, Framer Motion (`motion` package), Vitest + React Testing Library + jsdom, sharp (placeholder generation).

**Spec:** `docs/superpowers/specs/2026-11-11-ryze-coffee-design.md`

## Global Constraints

- Brand name exactly **Ryze Coffee**. No Fore Coffee (or other real brand) names, logos, photos or copy anywhere.
- UI language Indonesian; drink names may be English.
- Colors: brand `#1F4D3A`, cream `#EFE2CF`, background `#F4EFE8`, coffee `#4A2A17`, text `#2A1D14`.
- Fonts: Fraunces (headings) + Inter (body) via `next/font/google`.
- Menu photos at `public/menu/<slug>.webp`, square, displayed with `object-cover` so owner-supplied replacements of any ratio still fit.
- Price format: `"Rp 30.000"` (regular space, dot thousands separator).
- No ordering, cart, sizes, hot/iced options, login, CMS, pastry.
- Every animation respects `prefers-reduced-motion` (via Framer Motion `useReducedMotion` / `MotionConfig reducedMotion="user"`).
- Target Lighthouse mobile ≥ 90 for Performance, Accessibility, Best Practices, SEO.
- Windows dev machine; scripts must work from PowerShell (`npm run …`).

## Review Focus

1. `/menu?item=<unknown-or-garbage>` → catalog renders normally, no modal, no crash. (Task 6 test)
2. Hero video fails or loads slowly → poster image shows, frame keeps its size, text unaffected. (Task 4 test: `poster` attr + fixed aspect box)
3. `prefers-reduced-motion: reduce` → no floating cards / parallax / staggered entrance. (Task 4 test)
4. Detail modal on a phone: Esc, ✕ and backdrop click all close it, page behind doesn't scroll, focus returns to the clicked card. (Task 6 tests)
5. Owner drops in a non-square replacement photo → card and modal still crop cleanly. (Task 5 test: image has `object-cover` class inside a fixed `aspect-square` box)

---

## File Structure

```
data/menu.json, data/stores.json        content
src/lib/format.ts                        formatRupiah
src/lib/menu.ts                          types + menu queries
src/lib/stores.ts                        store types + query
src/app/layout.tsx                       fonts, metadata, Navbar, Footer, MotionConfig
src/app/page.tsx                         Beranda
src/app/tentang/page.tsx                 Tentang
src/app/menu/page.tsx                    Menu (wraps MenuCatalog in Suspense)
src/app/toko/page.tsx                    Toko
src/components/layout/{Navbar,Footer,Logo}.tsx
src/components/home/{Hero,FloatingCard,StoryTeaser,FeaturedMenu,VisitCta}.tsx
src/components/menu/{MenuCard,CategoryTabs,MenuCatalog,MenuDetail}.tsx
src/components/about/{Origins,ProcessSteps,Stats}.tsx
src/components/stores/StoreCard.tsx
src/components/ui/Reveal.tsx             fade-up-on-enter wrapper
scripts/make-placeholders.mjs            generates placeholder webp files
public/menu/*.webp, public/video/hero.mp4, public/video/hero-poster.webp
tests/**                                 Vitest tests mirroring src/
```

---

### Task 1: Project scaffold, theme, test harness

**Files:**
- Create: whole Next.js scaffold in `d:\belajar\coffee` (keep existing `docs/` and `.superpowers/`)
- Create: `vitest.config.ts`, `tests/setup.ts`, `src/components/layout/Logo.tsx`, `tests/components/layout/Logo.test.tsx`
- Modify: `src/app/globals.css` (Tailwind theme tokens), `src/app/layout.tsx` (fonts), `.gitignore` (add `.superpowers/`)

**Interfaces:**
- Produces: Tailwind color tokens `brand`, `cream`, `bg`, `coffee`, `ink`; font utilities `font-display` (Fraunces) and `font-sans` (Inter); `<Logo className? />` rendering the text "Ryze Coffee" in Fraunces with an accessible label.

- [ ] **Step 1:** `git init` in `d:\belajar\coffee`.
- [ ] **Step 2:** Scaffold with `npx create-next-app@latest . --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm` (answer "no" to Turbopack/other prompts only if asked; if it refuses a non-empty dir, scaffold into a temp folder and move files in). Install `motion`, and dev deps `vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event vite-tsconfig-paths`. Add `"test": "vitest run"` script.
- [ ] **Step 3:** Write failing test `tests/components/layout/Logo.test.tsx`: renders `<Logo />`, expects `getByText("Ryze Coffee")`.
- [ ] **Step 4:** Run `npm test` → FAIL (module not found).
- [ ] **Step 5:** Implement `Logo`, theme tokens in `globals.css` (`@theme` with the five colors from Global Constraints), fonts in `layout.tsx`, `<html lang="id">`, body background `bg`, text `ink`.
- [ ] **Step 6:** `npm test` → PASS; `npm run build` → succeeds.
- [ ] **Step 7:** Commit `chore: scaffold Next.js app with Ryze theme and test harness`.

### Task 2: Content data and query helpers

**Files:**
- Create: `data/menu.json`, `data/stores.json`, `src/lib/format.ts`, `src/lib/menu.ts`, `src/lib/stores.ts`
- Test: `tests/lib/format.test.ts`, `tests/lib/menu.test.ts`, `tests/lib/stores.test.ts`

**Interfaces:**
- Produces:
  - `type Category = "signature" | "classic" | "non-coffee"`
  - `type Badge = "best-seller" | "new"`
  - `type MenuItem = { id: string; name: string; category: Category; price: number; description: string; image: string; badge?: Badge; featured: boolean }`
  - `CATEGORIES: { id: Category; label: string }[]` with labels `"Signature"`, `"Classic Coffee"`, `"Non-Coffee"`
  - `getMenu(): MenuItem[]`, `getMenuItem(slug: string | null | undefined): MenuItem | undefined`, `getFeatured(): MenuItem[]`, `filterByCategory(items: MenuItem[], category: Category | "all"): MenuItem[]`
  - `BADGE_LABEL: Record<Badge, string>` = `{ "best-seller": "Best Seller", new: "New" }`
  - `formatRupiah(value: number): string`
  - `type Store = { id: string; name: string; city: string; address: string; hours: string; mapQuery: string }`, `getStores(): Store[]`

- [ ] **Step 1:** Write failing tests:
  - `formatRupiah(30000) === "Rp 30.000"`, `formatRupiah(18000) === "Rp 18.000"`, `formatRupiah(1250000) === "Rp 1.250.000"`.
  - `getMenu()` has length 12; 4 per category; ids unique and match `/^[a-z0-9-]+$/`; every `image === "/menu/" + id + ".webp"`; every description non-empty.
  - `getFeatured()` length 4 and includes `spanish-latte`.
  - `getMenuItem("spanish-latte")` → name `"Spanish Latte"`, price 30000, badge `"best-seller"`, category `"signature"`; `getMenuItem("matcha-cloud")` → price 32000, badge `"new"`; `getMenuItem("nope")`, `getMenuItem("")`, `getMenuItem(null)` → `undefined`.
  - `filterByCategory(getMenu(), "all")` length 12; `"classic"` → all items have category classic.
  - `getStores()` length 4, ids unique, every field non-empty.
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** Write `data/menu.json` with exactly the 12 drinks, categories, prices and badges listed in spec §6 "Data" (ids: `spanish-latte, aren-latte, caramel-cloud-latte, ryze-butterscotch, americano, cappuccino, cafe-latte, espresso, matcha-cloud, chocolate-velvet, red-velvet-latte, lychee-tea`). Featured: spanish-latte, aren-latte, matcha-cloud, caramel-cloud-latte. Descriptions: 1–2 warm, tempting Indonesian sentences in the tone of the hero copy. Write `data/stores.json` with 4 fictional branches (Jakarta, Bandung, Surabaya, Yogyakarta), hours like `"07.00 – 22.00"`, `mapQuery` = a real neighbourhood name + city (no exact real business address).
- [ ] **Step 4:** Implement the helpers. `formatRupiah` builds `"Rp " + thousands-with-dots` manually (not `Intl` currency, which inserts a non-breaking space).
- [ ] **Step 5:** `npm test` → PASS.
- [ ] **Step 6:** Commit `feat: add menu and store data with typed helpers`.

### Task 3: Site shell — Navbar, Footer, Reveal, metadata

**Files:**
- Create: `src/components/layout/Navbar.tsx`, `src/components/layout/Footer.tsx`, `src/components/ui/Reveal.tsx`
- Modify: `src/app/layout.tsx`
- Create stubs: `src/app/tentang/page.tsx`, `src/app/menu/page.tsx`, `src/app/toko/page.tsx` (heading only)
- Test: `tests/components/layout/Navbar.test.tsx`, `tests/components/layout/Footer.test.tsx`

**Interfaces:**
- Produces: `NAV_LINKS = [{href:"/tentang",label:"Tentang"},{href:"/menu",label:"Menu"},{href:"/toko",label:"Toko"}]` exported from `Navbar.tsx`; `<Reveal delay?: number>{children}</Reveal>` (fade + 16px rise when in view, once; static when reduced motion); layout wraps children in `<MotionConfig reducedMotion="user">`.
- Root metadata: `title: { default: "Ryze Coffee", template: "%s · Ryze Coffee" }`, Indonesian description, `openGraph` with site name.

- [ ] **Step 1:** Failing tests (mock `next/navigation` `usePathname`):
  - Navbar renders Logo linking to `/`, and the three links with the hrefs above.
  - With pathname `/menu`, the Menu link has `aria-current="page"`, others don't.
  - Mobile toggle button (`aria-label="Buka menu"`) toggles `aria-expanded` and shows the links panel.
  - Footer contains "Ryze Coffee", the three page links, and the text "proyek portofolio".
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** Implement. Navbar is sticky, translucent `bg` with backdrop blur; collapses to a toggle under `md`.
- [ ] **Step 4:** `npm test` → PASS; `npm run build` OK; `npm run dev` and check all 4 routes load with nav + footer.
- [ ] **Step 5:** Commit `feat: add site shell with navbar, footer and reveal animation`.

### Task 4: Placeholder assets and Hero (option C)

**Files:**
- Create: `scripts/make-placeholders.mjs`, `public/menu/*.webp` (12, generated), `public/video/hero.mp4`, `public/video/hero-poster.webp`
- Create: `src/components/home/Hero.tsx`, `src/components/home/FloatingCard.tsx`
- Modify: `src/app/page.tsx`
- Test: `tests/components/home/Hero.test.tsx`

**Interfaces:**
- Consumes: `getMenuItem`, `formatRupiah`, `BADGE_LABEL` (Task 2).
- Produces: `<FloatingCard item: MenuItem; className?: string />` → `<Link href={"/menu?item=" + item.id}>` showing name, badge label, price. Reused by nothing else.

- [ ] **Step 1:** Write `scripts/make-placeholders.mjs` (uses `sharp`, already a Next dependency): for each item in `data/menu.json`, render an 800×800 cream (`#EFE2CF`) SVG with a simple plastic-cup silhouette and the drink name, save to `public/menu/<id>.webp`; also render a 720×960 dark-coffee poster to `public/video/hero-poster.webp`. Add `"placeholders": "node scripts/make-placeholders.mjs"` script. Run it; expect 13 files.
- [ ] **Step 2:** Get the hero video: download the Pexels clip from the spec (smallest HD rendition, portrait or square preferred) to `public/video/hero.mp4`. If it can't be downloaded programmatically, stop and ask the owner to save it there. If the file is > 4 MB and `ffmpeg` is available, re-encode to 720p H.264 without audio; if not available, note size in the commit message. If possible, replace the generated poster with the clip's first frame.
- [ ] **Step 3:** Failing tests for `Hero`:
  - `getByRole("heading", { level: 1 })` has text `"Iced Spanish Latte"`.
  - Supporting copy exactly: `"Racikan espresso pilihan berpadu dengan susu manis, menghasilkan rasa creamy yang lembut namun tetap ringan. Sekali teguk, langsung jatuh hati."`
  - Link "Lihat Menu" has `href="/menu"`.
  - Floating cards: link containing "Spanish Latte" → `/menu?item=spanish-latte` and shows "Best Seller" + "Rp 30.000"; link containing "Matcha Cloud" → `/menu?item=matcha-cloud` and shows "New" + "Rp 32.000".
  - `<video>` has `autoplay`, `muted`, `loop`, `playsinline`, `poster="/video/hero-poster.webp"`, source `/video/hero.mp4`, and `aria-hidden="true"`.
  - With `window.matchMedia` mocked to match `(prefers-reduced-motion: reduce)`, the floating cards have no `animate` transform (assert the card wrapper has `data-motion="off"`; implement that attribute from `useReducedMotion()`).
- [ ] **Step 4:** `npm test` → FAIL.
- [ ] **Step 5:** Implement `Hero` per spec §5–6: two-column on `md+` (text left, arch frame right with `rounded-t-full rounded-b-2xl`, fixed aspect `aspect-[3/4]`, video `object-cover`), stacked on mobile with the video full-width below the text and cards smaller beneath/over its lower edge. Motion: headline lines stagger in, copy/button follow; cards float (y ±8px, ~4s loop); arch frame parallax via `useScroll`/`useTransform` (small range). All disabled when reduced motion.
- [ ] **Step 6:** `npm test` → PASS; `npm run dev`, check `/` at 375px and 1280px widths.
- [ ] **Step 7:** Commit `feat: add option-C hero with video, floating menu cards and placeholders`.

### Task 5: Menu card, category tabs, catalog grid

**Files:**
- Create: `src/components/menu/MenuCard.tsx`, `src/components/menu/CategoryTabs.tsx`
- Test: `tests/components/menu/MenuCard.test.tsx`, `tests/components/menu/CategoryTabs.test.tsx`

**Interfaces:**
- Consumes: Task 2 types/helpers.
- Produces:
  - `<MenuCard item: MenuItem; href: string />` — a `Link` (so it works on Home and in the catalog) with image, name, price, optional badge.
  - `<CategoryTabs value: Category | "all"; onChange(value): void />` — `role="tablist"`, tabs "Semua", "Signature", "Classic Coffee", "Non-Coffee", `aria-selected` on the active one.

- [ ] **Step 1:** Failing tests:
  - MenuCard for spanish-latte: link href equals the passed `href`; shows "Spanish Latte", "Rp 30.000", "Best Seller"; `img` alt `"Spanish Latte"`; image element has class `object-cover` and its wrapper has class `aspect-square`.
  - MenuCard for americano shows no badge text.
  - CategoryTabs: 4 tabs in order above; clicking "Non-Coffee" calls `onChange("non-coffee")`; `value="classic"` marks "Classic Coffee" `aria-selected="true"`.
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** Implement with `next/image` (`fill`, `sizes` for 2/3/4 columns). Card hover: slight lift + image scale (not under reduced motion).
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5:** Commit `feat: add menu card and category tabs`.

### Task 6: Menu page — catalog with URL-driven detail modal

**Files:**
- Create: `src/components/menu/MenuCatalog.tsx` (client), `src/components/menu/MenuDetail.tsx`
- Modify: `src/app/menu/page.tsx` (heading/intro + `<Suspense><MenuCatalog items={getMenu()} /></Suspense>`, page metadata title "Menu")
- Test: `tests/components/menu/MenuCatalog.test.tsx`

**Interfaces:**
- Consumes: `MenuCard`, `CategoryTabs`, Task 2 helpers.
- Produces: `<MenuCatalog items: MenuItem[] />` reads `useSearchParams().get("item")`; opens `<MenuDetail item onClose />` when it resolves via `getMenuItem`; cards link to `/menu?item=<id>` with `scroll={false}`; closing calls `router.replace("/menu", { scroll: false })`.
- `<MenuDetail item: MenuItem; onClose(): void />`: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` the item name heading; image left / text right on `md+`, stacked on mobile; shows category label, badge label, name, description, price; ✕ button `aria-label="Tutup"`.

- [ ] **Step 1:** Failing tests (mock `next/navigation`: `useSearchParams`, `useRouter().replace` spy):
  - No `item` param → 12 cards, no dialog.
  - Selecting tab "Signature" → 4 cards, all signature names.
  - `item=spanish-latte` → dialog with heading "Spanish Latte", text "Rp 30.000", "Best Seller", "Signature", and its description.
  - `item=does-not-exist` and `item=%3Cscript%3E` → no dialog, 12 cards rendered.
  - Clicking ✕, pressing Escape, and clicking the backdrop each call `replace("/menu", { scroll: false })`.
  - While open, `document.body.style.overflow === "hidden"`; after unmount/close it is restored.
  - Focus moves into the dialog on open (✕ button focused).
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** Implement. Animate tab changes with `AnimatePresence` + `layout`; dialog fades/scales in. On close, return focus to the card whose id matches the closed item if present.
- [ ] **Step 4:** `npm test` → PASS; `npm run build` OK (no "useSearchParams should be wrapped in suspense" error); manually open `/menu?item=matcha-cloud` in the browser.
- [ ] **Step 5:** Commit `feat: add menu catalog with filterable grid and detail modal`.

### Task 7: Rest of Beranda — story teaser, featured menu, visit CTA

**Files:**
- Create: `src/components/home/StoryTeaser.tsx`, `src/components/home/FeaturedMenu.tsx`, `src/components/home/VisitCta.tsx`
- Modify: `src/app/page.tsx`
- Test: `tests/components/home/HomeSections.test.tsx`

**Interfaces:**
- Consumes: `MenuCard`, `getFeatured`, `Reveal`.

- [ ] **Step 1:** Failing tests:
  - StoryTeaser has a link to `/tentang`.
  - FeaturedMenu renders 4 card links, each `href="/menu?item=<id>"` for the featured ids, plus a "Lihat semua menu" link to `/menu`.
  - VisitCta has a link to `/toko`.
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** Implement (2–3 sentence brand story in Indonesian; sections wrapped in `Reveal`). Page order: Hero → StoryTeaser → FeaturedMenu → VisitCta.
- [ ] **Step 4:** `npm test` → PASS; click a featured card in dev → lands on `/menu` with the detail open.
- [ ] **Step 5:** Commit `feat: complete home page sections`.

### Task 8: Tentang page

**Files:**
- Create: `src/components/about/Origins.tsx`, `src/components/about/ProcessSteps.tsx`, `src/components/about/Stats.tsx`
- Modify: `src/app/tentang/page.tsx` (metadata title "Tentang")
- Test: `tests/app/tentang.test.tsx`

- [ ] **Step 1:** Failing tests: page renders an `h1`; Origins mentions "Gayo", "Toraja", "Kintamani"; ProcessSteps renders 4 ordered steps (`listitem`s inside an `ol`); Stats renders 3 figures including "4" cabang (matching `getStores().length`, not hard-coded).
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** Implement: brand story intro, origins (3 regions with one-line flavor notes), "Dari biji ke gelas" steps (Dipetik → Disangrai → Diseduh → Dituang), stats. Use placeholder imagery from `public/` only (cream panels), all wrapped in `Reveal`.
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5:** Commit `feat: add about page`.

### Task 9: Toko page

**Files:**
- Create: `src/components/stores/StoreCard.tsx`
- Modify: `src/app/toko/page.tsx` (metadata title "Toko")
- Test: `tests/components/stores/StoreCard.test.tsx`

**Interfaces:**
- Consumes: `getStores`, `Store`.
- Produces: `<StoreCard store: Store />`.

- [ ] **Step 1:** Failing tests: StoreCard shows name, city, address, hours; contains an `iframe` with `loading="lazy"`, a `title` of `"Peta " + store.name`, and `src` = `https://maps.google.com/maps?q=${encodeURIComponent(store.mapQuery)}&output=embed`; has an "Buka di Google Maps" link to `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.mapQuery)}` with `target="_blank"` and `rel="noopener noreferrer"`.
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** Implement; page lists the 4 stores in a 1-col (mobile) / 2-col (md+) grid.
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5:** Commit `feat: add stores page`.

### Task 10: Polish, quality pass, README

**Files:**
- Create: `src/app/opengraph-image.tsx` (or static `public/og.png` from the placeholder script), `README.md`
- Modify: page metadata where missing

- [ ] **Step 1:** Each page exports `metadata` with Indonesian `description`; root has `openGraph` image.
- [ ] **Step 2:** `npm run lint` → no errors; `npm test` → all pass; `npm run build` → succeeds.
- [ ] **Step 3:** `npm run build && npm start`, run Lighthouse (Chrome DevTools, mobile) on `/` and `/menu`. Fix until each category ≥ 90; record scores in the commit message. Common fixes: `priority` on poster/hero image, `preload="metadata"` on video, image `sizes`.
- [ ] **Step 4:** Manually check with DevTools "Emulate prefers-reduced-motion: reduce" that nothing floats/parallaxes; check 375px width on all 4 pages for horizontal scroll (none allowed).
- [ ] **Step 5:** Write `README.md` (Indonesian): how to run (`npm install`, `npm run dev`), how to replace a menu photo (overwrite `public/menu/<slug>.webp`, square ≥ 800px recommended, list of slugs), how to replace the hero video/poster, and step-by-step deploy: create GitHub repo, push, import on vercel.com, default settings, get `*.vercel.app` link.
- [ ] **Step 6:** Commit `chore: polish metadata, verify quality, add README`.

---

**Out of scope for this plan (later, separate):** generating AI menu photos and the AI hero video via ElevenLabs once the connector is authorized; they only overwrite files in `public/menu/` and `public/video/`.
