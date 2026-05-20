# AGENTS.md

Guidance for coding agents working on this repository.

## Project

This is **The Coding Lab**, a personal blog built with Astro.

- Framework: Astro 6
- Package manager: npm
- Source root: repository root
- Content: Markdown posts in `src/content/blog/`
- Static assets: `public/`
- Deployment: GitHub Pages via `.github/workflows/deploy.yml`
- Custom domain: `public/CNAME` contains `the-coding-lab.com`

The old Hugo site was removed. Do not reintroduce Hugo output or committed build artifacts.

## Common Commands

Run from the repository root:

```sh
npm install
npm run dev
npm run build
npm run preview
```

`npm run build` must pass before claiming changes are complete.

## Content Rules

Blog posts live in:

```text
src/content/blog/
```

Posts use Astro content collection frontmatter. Keep these fields stable:

```yaml
title: "Post title"
description: "Short description"
pubDatetime: 2021-01-21
slug: "legacy-url-slug"
tags:
  - "python"
categories:
  - "Python"
draft: false
```

Optional fields:

```yaml
category: "Python"
featured: true
modDatetime: 2026-05-20
```

Prefer plain Markdown for normal posts. Use MDX only when a post needs custom interactive components.

## URLs

Preserve legacy post URLs:

```text
/:year/:slug/
```

The route is implemented in:

```text
src/pages/[year]/[slug].astro
```

Do not change post URLs to `/posts/...` unless the migration includes redirects for every old URL.

## Design

The active design is the Spectrum-style Astro redesign:

- Dark theme by default
- Light theme opt-in via toggle
- Teal-to-indigo signature gradient
- Homepage with hero, featured post, and year-grouped post cards
- Post pages with readable prose styling and category/tag metadata

Reusable UI lives in:

```text
src/components/
src/layouts/BaseLayout.astro
src/styles/global.css
src/consts.ts
```

Prefer small component changes over large one-off page CSS. Category colors are mapped in `src/consts.ts`.

## Deployment

GitHub Pages should build with GitHub Actions, not from committed `docs/` output.

The workflow is:

```text
.github/workflows/deploy.yml
```

The Astro config is:

```text
astro.config.mjs
```

For the custom domain, keep:

```text
public/CNAME
```

## Archives

`_archive/hugo-data/` contains old Hugo-era material that was not part of the published Astro content. Do not delete it unless explicitly asked.

## Git Hygiene

- Do not commit `dist/`, `.astro/`, or `node_modules/`.
- Do not restore the old Hugo `docs/` publish workflow.
- Preserve user-authored post text unless asked to edit it.
- If adding new dependencies, explain why they are needed.
