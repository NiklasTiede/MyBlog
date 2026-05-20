# The Coding Lab Astro Migration

This folder contains the Astro version of the blog. The Hugo project in the repository root is still present while this migration is being tested.

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

Blog posts live in `src/content/blog/`. Existing Hugo posts were migrated with their original publication dates and legacy slugs, so a post such as:

```text
content/post/1-The-Evolution-of-a-Script.md
```

is available at:

```text
/2021/1-the-evolution-of-a-script/
```

Images live in `public/img/`, preserving old Markdown paths like `/img/conda.png`.

## Deployment

The file `.github/workflows/deploy.yml.example` contains a GitHub Pages workflow. It is only an example for now because this Astro project lives in a subfolder during migration.
