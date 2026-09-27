# LooseCode

> **Developer & Builder Collective** — A community for developers, designers, students, founders, and creators powered by hackathons, challenges, and high-energy sprints to collaborate, compete, and ship real products.

---

## Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [GSAP](https://gsap.com/) + [ScrollTrigger](https://gsap.com/scrolltrigger/) & [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Linting**: [Oxlint](https://oxc.rs/)

---

## Project Structure

```
loosecode/
├── public/
│   ├── favicon.png               # Browser tab icon
│   ├── fonts/                    # Custom font families (Rader, Formula, Humane, Bodoni)
│   ├── icons/                    # Social media & UI vector icons
│   └── images/
│       ├── services/             # Pillar card illustration assets
│       ├── buildCurveTextWhite.svg
│       └── circlerotation.svg
├── src/
│   ├── assets/                   # High-resolution branding imagery
│   │   ├── herosectionbg.png
│   │   ├── logo.png
│   │   └── loosefooterr.png
│   ├── components/
│   │   ├── Navbar.tsx            # Floating pill navigation with drop-down tray
│   │   ├── Hero.tsx              # Interactive entry section with 3D scale/rotation
│   │   ├── FeaturedEvent.tsx     # Bento-style event tracks & active sprint cards
│   │   ├── WhatIsLooseCode.tsx   # Stacking/pinned 4-pillar cards via GSAP ScrollTrigger
│   │   ├── WhatsHappening.tsx    # Accordion FAQ with animated headings
│   │   ├── FlowFooter.tsx        # Dynamic curve display & rotating badge
│   │   ├── FlareRedFooter.tsx    # Electric blue footer with contact & social links
│   │   └── ClosingSkewBanner.tsx # Angular skew marquee banner
│   ├── utils/
│   │   └── audio.ts              # Web Audio API sound synthesizers for micro-interactions
│   ├── App.tsx                   # Main layout container with Lenis scroll integration
│   ├── index.css                 # Core design tokens, typography, and base styles
│   └── main.tsx                  # Application entry point
├── index.html                    # HTML document entry
├── package.json                  # Dependencies & scripts
├── tsconfig.json                 # TypeScript compiler configuration
└── vite.config.ts                # Vite build and plugin configuration
```

---

## Asset Structure

- **`public/fonts/`**: Houses typography families including PP Rader, PP Formula, Humane, and Bodoni Moda.
- **`public/icons/`**: Houses standalone SVG vector graphics (Discord, Twitter/X, Instagram, YouTube, menu drop tab).
- **`public/images/`**: Houses SVG badges, curve decorations, and `/services/` card artwork.
- **`src/assets/`**: High-resolution branding artwork bundled directly into the application build (hero backdrop, official LooseCode logo, and footer mascot artwork).

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation

```bash
npm install
```

### Development Server

Start the local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The app will be available at `http://localhost:5173/`.

### Production Build

Type-check and create an optimized production bundle in `dist/`:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

### Linting

Run Oxlint for fast code quality checks:

```bash
npm run lint
```
