# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal blog of Ajinkya Bawaskar, hosted as a GitHub Pages user site. Built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, deployed as a static export via GitHub Actions.

**Deployment**: Push to `master` triggers GitHub Actions workflow that builds and deploys to GitHub Pages.

## Commands

```bash
npm install                      # install dependencies
npm run dev                      # dev server at http://localhost:3000
npm run build                    # static export to out/
npm run serve                    # serve out/ locally (requires `npx serve out`)
npm run migrate-posts            # one-time migration from old Jekyll _posts/
```

## Content model

- Posts live in `content/posts/<category>/`: `content/posts/personal/` and `content/posts/programming/`
- File naming: `YYYY-MM-DD-slug.md` (the slug becomes the URL path segment)
- Permalink is `/:category/:slug/` (trailing slash enforced), so `content/posts/programming/2023-02-17-caching-in-spring-boot.md` serves at `/programming/caching-in-spring-boot/`
- Front matter convention: `title`, `date` (YYYY-MM-DD, parsed from filename), `categories` (array with one entry). Do **not** set `layout`, `author`, or `permalink` per post.
- Drafts: keep in `_drafts/` (legacy Jekyll folder, untouched). To publish a draft, move it into `content/posts/<category>/` and ensure the filename matches `YYYY-MM-DD-slug.md`.

## Structure

- `app/` — Next.js App Router pages:
  - `layout.tsx` — root layout, metadata, header/footer, GA, utterances
  - `page.tsx` — homepage: post list grouped by category
  - `[category]/[slug]/page.tsx` — post page with markdown rendering + utterances
  - `about/page.tsx` — about page from `content/pages/about.md`
  - `categories/page.tsx` — category index with post counts
  - `not-found.tsx` — 404 page
  - `globals.css` — Tailwind v4 import + minimal bare styles
- `content/posts/<category>/*.md` — blog posts (migrated from Jekyll)
- `content/pages/about.md` — about page content
- `lib/posts.ts` — post utilities (`getAllPosts`, `getPostBySlug`, `getAllCategories`, `getPage`)
- `scripts/migrate-posts.mjs` — one-time migration from Jekyll `_posts/` (run once, then keep for reference)
- `scripts/rss.mjs` — generates `out/feed.xml` after build (runs via `postbuild` script)
- `public/assets/` — static assets (images, favicon, sounds) copied verbatim from legacy `assets/`
- `public/fosshack.html`, `public/housie.html` — standalone pages copied verbatim
- `public/.nojekyll` — required so GitHub Pages doesn't ignore underscore-prefixed folders
- `.github/workflows/deploy-pages.yml` — GitHub Actions workflow for Pages deployment

## Markdown pipeline

- `react-markdown` + `remark-gfm` for GFM support
- Custom `img` component strips `?style=centerme` query strings from legacy Jekyll images
- No syntax highlighting at build time (removed due to async issues in static export); code blocks render as plain `<pre><code>`

## Config values (from legacy `_config.yml` / `_includes/`)

- Site title: "Variable"
- Author: Ajinkya Bawaskar
- Description: "A web log about programming, software, technology, life and my thoughts in general."
- Social links in footer: GitHub, Instagram, LinkedIn → all `ajinkyabawaskar`
- Google Analytics: `UA-143186517-3` (note: Universal Analytics sunset 2023–24; ID kept for continuity but may need replacement)
- Utterances comments: repo `ajinkyabawaskar/ajinkyabawaskar.github.io`, `issue-term=pathname`, theme `github-light`

## Key dependencies

- `next@15`, `react@19`, `react-dom@19`
- `gray-matter`, `react-markdown`, `remark-gfm`
- `feed` (RSS generation)
- Tailwind v4 via `@tailwindcss/postcss` (wired, essentially bare at launch)
- `output: 'export'`, `trailingSlash: true`, `images: { unoptimized: true }` in `next.config.ts`

## GitHub Pages deployment

1. Push to `master` triggers the workflow
2. Workflow runs `npm ci` → `npm run migrate-posts` → `npm run build` → uploads `out/` artifact → deploys
3. If this is the first deploy after migration: in repo Settings → Pages, change Source from "Deploy from a branch" to "GitHub Actions" (one-time manual step)

## Verification checklist after deploy

- Homepage loads at `https://ajinkyabawaskar.github.io/`
- Old post URLs work (e.g. `/programming/caching-in-spring-boot/`)
- `/about/`, `/categories/`, `/feed.xml` all return 200
- `fosshack.html` and `housie.html` still accessible at root
- Post images load (e.g. `/assets/img/blog.svg`)
- Utterances comments appear on post pages