# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project Overview

**Loopline** — a Next.js web app using Contentful as a headless CMS.

- **Framework:** Next.js 16.2.1 (React 18.2)
- **Router:** **Pages Router** (`/pages`). This project is staying on Pages Router — do not suggest or perform an App Router migration.
- **CMS:** Contentful (`contentful` SDK) for content modeling and delivery
- **Styling:** SCSS Modules (`.module.scss`) — also has MUI (Joy UI + Material UI) and Emotion installed, so some components may use CSS-in-JS instead. Check the component before assuming the styling approach.
- **UI libraries:** `@mui/joy`, `@mui/material`, `@emotion/react` + `@emotion/styled`, FontAwesome icon sets
- **Animation:** Framer Motion
- **Other notables:** `axios` for HTTP, `nodemailer` (likely a contact form / server-side email), `js-cookie` + `cookies` (client + server cookie handling), `next-sitemap` for sitemap generation, `react-intersection-observer` for scroll-based effects

## Commands

```bash
npm run dev       # start local dev server
npm run build     # production build
npm run start     # run production build
npm run lint      # eslint (eslint-config-next is installed)
```

## Folder Structure

- `pages/` — page files (file-based routing)
- `pages/api/` — API routes
- `components/` — React components. **Every component has its own dedicated folder** containing the component file and its own SCSS Module file (e.g. `components/Button/Button.tsx` + `components/Button/Button.module.scss`).
- `context/` — React Context providers
- `hooks/` — custom React hooks

When creating a new component, always scaffold it as a folder with a colocated `.module.scss` file, matching the existing pattern — don't drop a loose component file directly in `components/`.

## Styling Conventions

- **SCSS Modules** are the standard, one per component, colocated in that component's folder (`ComponentName.module.scss`) — this is the convention for all components, not just some.
- MUI (Joy + Material) and Emotion are also installed and may appear in some components — if you're editing an existing component that already uses MUI/Emotion, keep it consistent with what's there rather than converting it to SCSS Modules unprompted.
- Two MUI systems are installed (`@mui/joy` and `@mui/material`) — check which one a given part of the app uses before adding new MUI-based UI, and don't introduce the other one into that area without asking.

## Contentful

- Content is fetched via the `contentful` SDK (delivery API client).
- Rich text fields are rendered via `@contentful/rich-text-react-renderer`.
- Uses `@contentful/content-source-maps` — suggests Contentful's Live Preview / visual editing may be wired up. Check for an env var like `CONTENTFUL_PREVIEW_ACCESS_TOKEN` or similar before assuming preview mode isn't in use.
- Content model changes (new content types/fields in Contentful) aren't reflected in code automatically — check with the user before assuming a field exists.

## Things to Avoid / Watch For

- **Do not migrate to App Router** — this project is intentionally staying on Pages Router.
- Don't introduce a competing styling system (e.g. Tailwind, styled-components) — this project already has SCSS Modules + MUI + Emotion, which is enough surface area.
- Don't place a new component directly in `components/` without its own folder + SCSS Module — follow the existing per-component folder pattern.
- Sharp (image processing) is an optional dependency of Next.js — expected for `next/image` optimization, not something to remove.
