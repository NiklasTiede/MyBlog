# The Coding Lab

Personal blog built with Astro. Posts are Markdown files, old publication dates are preserved, and legacy URLs such as `/2021/conda-and-pip/` are still generated.

## Local Development

Install dependencies:

```sh
npm install
```

Start the dev server:

```sh
npm run dev
```

Build the static site:

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```

## Content

Blog posts live in `src/content/blog/`. Existing Hugo posts were migrated with their original publication dates and legacy slugs, so the old Hugo post:

```text
content/post/1-The-Evolution-of-a-Script.md
```

is available at:

```text
/2021/1-the-evolution-of-a-script/
```

Images live in `public/img/`, preserving old Markdown paths like `/img/conda.png`.

## Deployment

GitHub Pages deployment is handled by `.github/workflows/deploy.yml`.

The custom domain is configured by `public/CNAME`:

```text
the-coding-lab.com
```
