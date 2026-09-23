# grant's workbench

A personal engineering blog built with Next.js (App Router), TypeScript,
Tailwind CSS, and MDX. Styled like an engineering drawing — minimalist,
monospace labels, hairline borders.

## Writing a post (no coding required)

1. Create a new file in `content/posts/` named `my-post-slug.mdx`
   (the filename becomes the URL: `/blog/my-post-slug`).
2. Paste this frontmatter at the top and fill it in:

```yaml
---
title: "My Post Title"
publishedAt: "2026-09-23" # YYYY-MM-DD
summary: "One or two sentences shown in the archive and RSS feed."
tags: ["machining", "cad"]
draft: false # true = hidden from production builds
image: "/images/my-cover.png" # optional — 16:9 card thumbnail, hero image, and social card
---
```

3. Write the post in Markdown below the frontmatter. Extra components
   available inside posts:

```mdx
<Callout type="info">
  {" "}
  {/* also: "warning", "tip" */}
  Useful note text.
</Callout>

![Caption shown under the figure](/images/my-post-slug/my-figure.svg)

<Image
  src="/images/my-post-slug/photo.png"
  alt="Part"
  width={1600}
  height={900}
/>
```

Keep each post's images in `public/images/<post-slug>/` (same name as
the `.mdx` file) so assets stay organized as the blog grows. Shared
assets like placeholders can stay at the `public/images/` root.

Code fences (`python, `typescript, etc.) get syntax highlighting and a
copy button automatically.

4. Save the file and restart/redeploy — the post appears on `/blog`, the
   homepage, the sitemap, and the RSS feed.

## Local development

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # production build + typecheck
npm run lint
```

## Comments (Giscus)

Comments are powered by [Giscus](https://giscus.app) (GitHub Discussions —
no separate comment database or login for readers beyond a GitHub account).
Until configured, an informational banner is shown under each post.

1. Make the site's GitHub repo public and enable **Discussions** on it.
2. Install the Giscus app: <https://github.com/apps/giscus>
3. Copy `.env.example` to `.env.local` and fill in the four
   `NEXT_PUBLIC_GISCUS_*` values from the giscus.app configurator.

## Configuration

Edit `src/lib/site.ts` to change the site name, description, email, and
social links. Set `NEXT_PUBLIC_SITE_URL` to your deployed domain so the
sitemap, RSS feed, and OpenGraph tags emit correct URLs.
