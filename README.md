# SAGA16 - Web Design & Development Studio

Website built with **Astro**, **TypeScript**, and **Tailwind CSS**, focused on UI, motion, and interaction polish.

---

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Development Server
```bash
npm run dev
```
Open `http://localhost:4321` in your browser.

### 3. Production Build & Preview
```bash
npm run build
npm run preview
```

---

## Project Structure & Architecture

```
saga16/
├── src/
│   ├── components/            # Reusable Astro UI components
│   │   ├── AboutSection.astro
│   │   ├── BentoGrid.astro
│   │   ├── CategoriesSection.astro
│   │   ├── ContactBand.astro
│   │   ├── ContactCards.astro
│   │   ├── ContactForm.astro
│   │   ├── FactBand.astro
│   │   ├── FaqSection.astro
│   │   ├── Hero.astro
│   │   ├── PricingList.astro
│   │   ├── ProcessSection.astro
│   │   ├── TeamCardsSection.astro
│   │   ├── TeamPreviewSection.astro
│   │   ├── TeamWhySection.astro
│   │   ├── TechRibbon.astro
│   │   ├── TechStackSection.astro
│   │   └── WorkPreviewSection.astro
│   ├── data/
│   │   └── site.ts            # Single source of truth for ALL text, links, and content
│   ├── layouts/
│   │   └── Base.astro         # Layout with navbar, exact footer, and progressive enhancement
│   ├── pages/
│   │   ├── index.astro        # Home page
│   │   ├── our-work.astro     # Our Work page
│   │   ├── team.astro         # Team page
│   │   └── contact.astro      # Contact page
│   ├── scripts/
│   │   ├── boxReveal.ts       # Effect 2: Box reveal curtain animation
│   │   ├── counters.ts        # Effect 5: Easing count-up animation
│   │   ├── lettersReveal.ts   # Effect 8: Oversized brand typography reveal
│   │   ├── main.ts            # Master script coordinating interactions
│   │   ├── reveal.ts          # Effect 1: Scroll-triggered masked text reveal
│   │   └── tilt.ts            # Effect 6: 3D perspective tilt & specular highlight
│   └── styles/
│       └── global.css         # Design tokens, keyframes, transitions, and reduced motion
├── design/                    # Stitch visual reference exports
│   ├── DESIGN.md
│   ├── home/ (code.html, screen.png)
│   ├── our-work/ (code.html, screen.png)
│   ├── team/ (code.html, screen.png)
│   └── contact/ (code.html, screen.png)
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

## Content Customization

All text copy, phone numbers, WhatsApp links, emails, team members, projects, FAQs, pricing, and process steps are located in **`src/data/site.ts`**.
To edit any content:
1. Open [`src/data/site.ts`](file:///Users/saga16/Downloads/saga16/src/data/site.ts)
2. Update the corresponding object field
3. Astro will automatically hot-reload or rebuild the pages.

---

## Placeholders & TODOs

In strict compliance with project constraints:
1. **Team Photos**: No stock or AI-generated photos of people are used. Avatar placeholders (soft mint circle with a person icon) are implemented in `src/components/TeamPreviewSection.astro` and `src/components/TeamCardsSection.astro`, with `TODO` comments for replacing them with real team portraits.
2. **Project Screenshots**: No stock photos are used. Project tiles in `src/components/Hero.astro`, `src/components/WorkPreviewSection.astro`, and `src/components/BentoGrid.astro` use abstract CSS/SVG wireframe mockups with no readable text, marked with `TODO` comments for inserting real client screenshots.

---

## The 9 Built Effects

1. **Scroll-triggered text reveal (`data-reveal="text"`)**: Accessible masked rising text with slight stagger.
2. **Box reveal (`data-reveal="box"`)**: Colored deep teal / green curtain wipe reveal that settles into place.
3. **Single-row bracket marquee**: Infinite continuous left-scroll framed with corner brackets, fade masks, and pause on hover.
4. **Two-row opposite-direction tech box carousel**: Row 1 moving left, Row 2 moving right (offset by half a box) with line icons.
5. **Count-up animation (`data-counter`)**: `6`, `3`, and `₹599` (₹ prefix stays fixed) with easeOut cubic over ~1.6s.
6. **3D Tilt / hover card effect (`data-tilt`)**: Max ~8° perspective tilt toward pointer with soft specular highlight; strictly disabled on touch devices.
7. **Full-bleed bento grid**: Masonry bento grid with S.N. Public School as the featured tile, live links, visible captions, and instant filter chips.
8. **Oversized brand typography**: Full-width viewport-scaled `SAGA16` with staggered rising letters on scroll.
9. **Sticky sidebar / column layout**: Sticky left column on desktop (>=1024px) for process and team sections, gracefully collapsing to a normal stack on tablet/mobile.
