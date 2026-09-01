---
title: Migrating this blog from Jekyll to Next.js
date: '2026-09-01'
categories:
  - Programming
---

This blog ran on Jekyll since 2020. It worked fine for years, but I wanted to move it to something I use every day, which is React. I rebuilt it with Next.js 15 and React 19, kept it as a static site, and kept it on GitHub Pages. The main constraint was that old links should not break.

### Why move at all

Jekyll did the job. Push to GitHub, Pages builds it, done. The problem was not Jekyll itself, it was that I was not touching Ruby at all outside this blog. Every small change meant remembering how Jekyll layouts, includes, and plugins work. With Next.js I already know the tooling, and I can reuse the same components for headers, footers, and post pages.

I also wanted a real static export I can inspect locally. `npm run build` writes everything to `out/`, and I can run `npx serve out` and see exactly what Pages will serve.

### Keeping old URLs working

This was the only non negotiable part. A post like `content/posts/programming/2023-02-17-caching-in-spring-boot.md` has always been available at `/programming/caching-in-spring-boot/`.

Three things keep that working:

1. The file name still starts with `YYYY-MM-DD-slug.md`. The date is for sorting and front matter, the slug for the URL.
2. The route is `app/[category]/[slug]/page.tsx`. `generateStaticParams` reads every file in `content/posts` and returns `{ category, slug }` pairs. Next.js then prerenders each one to `out/<category>/<slug>/index.html`.
3. `next.config.ts` sets `output: 'export'`, `trailingSlash: true`, and `images: { unoptimized: true }`. That makes the output match what GitHub Pages expects, with a trailing slash on every page.

So the permalink did not change at all. It is still `/:category/:slug/`. `/about/`, `/categories/`, and `/feed.xml` are also at the same paths as before.

### Where posts live now

Before, posts were in `_posts/<category>/`. Now they live in `content/posts/<category>/`. Front matter is minimal:

```
title: Caching in Spring Boot
date: '2023-02-17'
categories:
  - Programming
```

No `layout`, `author`, or `permalink` in each file. The date comes from the filename, the category from the folder name, and `lib/posts.ts` does the rest with `gray-matter`. `getAllPosts` reads all categories, parses each markdown file, and sorts by date. `getPostBySlug` loads a single post.

To move the old content I left a one time script at `scripts/migrate-posts.mjs`. It reads from `_posts`, lowercases the category, replaces Jekyll's `{{ "/assets/img/..." | relative_url }}` with `/assets/img/...`, strips Kramdown attributes like `{: style="..." }`, renames `.markdown` to `.md`, and writes to `content/posts`. It also keeps the date from the filename.

Drafts still sit in `_drafts/` if I need them. When I want to publish one, I move it to `content/posts/<category>/` and make sure the name is `YYYY-MM-DD-slug.md`.

### Markdown rendering

I use `react-markdown` with `remark-gfm` for GitHub Flavored Markdown. There is no build time syntax highlighting right now. Code blocks render as plain `pre` and `code` tags, which keeps the export simple and avoids async rendering issues.

One small fix is for old images. Many posts used `![alt](/assets/img/blog.svg?style=centerme)`. That `?style=centerme` was a Jekyll centering hack. The post page strips it out before rendering so the image still loads from `/assets/img/...`.

### Assets and loose files

Everything in `public/` is copied as is. That includes `public/assets/` for images and favicons, plus `public/fosshack.html` and `public/housie.html` which were standalone pages in the old site. They are still available at the root. `public/.nojekyll` is there too, so Pages does not ignore folders that start with an underscore.

### Build and deploy on GitHub Pages

The deploy did not change much in spirit. Push to `master`, GitHub builds it, Pages serves it. The implementation is now explicit in `.github/workflows/deploy-pages.yml`:

* Trigger on push to `master`, or manual `workflow_dispatch`
* `permissions` for `contents: read`, `pages: write`, `id-token: write`
* `concurrency` group `pages`
* Jobs:
  1. `build` on `ubuntu-latest` with Node 22 and `npm ci`, then `npm run migrate-posts`, then `npm run build`
  2. `upload-pages-artifact` uploads `out/`
  3. `deploy` uses `actions/deploy-pages@v4` with the `github-pages` environment

`npm run build` does `next build`, which creates `out/`. Then the `postbuild` script runs `node scripts/rss.mjs` to generate `out/feed.xml`. That script reads the same `content/posts` files, builds a feed with the `feed` package, and writes it to `out/feed.xml` with site URL `https://ajinkyabawaskar.github.io`.

The only repo setting you need to change once is in Settings then Pages. Switch Source from Deploy from a branch to GitHub Actions. After that, every push to master deploys automatically.

### What did not need to change

The site metadata is the same: title Variable, description "A web log about programming, software, technology, life and my thoughts in general.", author Ajinkya Bawaskar. Utterances still loads on post pages with repo `ajinkyabawaskar/ajinkyabawaskar.github.io` and `issue-term=pathname` and theme `github-light`. Analytics is still the same ID. The RSS feed is still at `/feed.xml`.

If you have an old bookmark with a trailing slash, it still works. If you fetch `/feed.xml` in a reader, it still works. That was the point.

The code is simpler to work on now, and the deploy log is easy to read. If something breaks, I can run the same three commands locally and see the same output Pages will serve.
