# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a **Tailwind NextJS Starter Blog** - a feature-rich, modern blogging platform built with:

- **Next.js 15** with App Router and React 19
- **Tailwind CSS v4** for styling
- **Contentlayer2** for content management (MDX/Markdown)
- **TypeScript** for type safety
- **Pliny** library for analytics, comments, and newsletter integration

## Common Development Commands

### Development Server

```bash
# Start development server (primary command)
pnpm dev

# Alternative start command
pnpm start
```

### Build and Deployment

```bash
# Production build with post-build processing
pnpm build

# Serve production build locally
pnpm serve

# Analyze bundle size
pnpm analyze

# Static export build (for GitHub Pages, etc.)
EXPORT=1 UNOPTIMIZED=1 pnpm build

# Static export with custom base path
EXPORT=1 UNOPTIMIZED=1 BASE_PATH=/myblog pnpm build
```

### Code Quality

```bash
# Run ESLint with auto-fix across all directories
pnpm lint

# Format and lint (triggered by Husky pre-commit)
npx lint-staged
```

### Package Management

This project uses **pnpm**. Always use `pnpm` instead of `npm` or `yarn`. Use Corepack to manage the version.

## Architecture & Structure

### Content Management System

- **Contentlayer2** processes MDX files from `/data/blog/` and `/data/authors/`
- Content is type-safe with auto-generated TypeScript definitions
- Supports frontmatter, reading time calculation, table of contents generation
- Automatic tag counting and search index creation

### Next.js App Structure

- **App Router** architecture with `/app` directory
- Layout components in `/layouts` (PostLayout, PostSimple, PostBanner, ListLayout, etc.)
- Reusable components in `/components`
- Path aliases configured: `@/components/*`, `@/data/*`, `@/layouts/*`, `@/css/*`

### Styling & Design

- **Tailwind CSS v4** with custom configuration
- Dark/light theme support via `next-themes`
- Custom CSS in `/css/tailwind.css` and `/css/prism.css`
- Space Grotesk font loaded via next/font

### Content Processing Pipeline

- **Remark plugins**: GitHub Flavored Markdown, Math notation, Frontmatter extraction, Image optimization
- **Rehype plugins**: Syntax highlighting (Prism+), KaTeX math, Auto-linking headings, Citations
- **MDX Components**: Custom JSX components available in markdown (see `/components/MDXComponents.tsx`)

## Configuration Files

### Critical Configuration

- `data/siteMetadata.js` - Site-wide settings (analytics, comments, newsletter, SEO)
- `contentlayer.config.ts` - Content processing and plugin configuration
- `next.config.js` - Next.js config with Contentlayer, security headers, CSP
- `jsconfig.json` - Path aliases and compiler options

### Content Management

- `data/headerNavLinks.ts` - Navigation menu items
- `data/projectsData.ts` - Projects page content
- `data/authors/` - Author profile MDX files
- `data/blog/` - Blog post MDX files

## Development Workflow

### Adding Blog Posts

1. Create `.mdx` files in `/data/blog/`
2. Include required frontmatter: `title`, `date`
3. Optional fields: `tags`, `authors`, `layout`, `summary`, `images`, `draft`
4. Use MDX syntax for rich content with React components

### Adding Authors

1. Create `.mdx` files in `/data/authors/`
2. Include author metadata: `name`, `avatar`, `occupation`, etc.
3. Reference authors in blog post frontmatter

### Testing Content Changes

- Content changes are hot-reloaded in development
- Contentlayer automatically rebuilds when files change
- Check browser console for content processing errors

## Deployment Notes

### Environment Variables

- Analytics: `NEXT_UMAMI_ID`
- Comments (Giscus): `NEXT_PUBLIC_GISCUS_*` variables
- Newsletter: Provider-specific environment variables
- Build: `BASE_PATH`, `EXPORT`, `UNOPTIMIZED`

### Supported Platforms

- **Vercel** (recommended) - Zero config deployment
- **Netlify** - Uses Next.js runtime
- **GitHub Pages** - Use static export build
- **Static hosting** - Use `EXPORT=1 UNOPTIMIZED=1` build

### Analytics & Third-party Services

- **Analytics**: Umami, Plausible, Google Analytics, Posthog
- **Comments**: Giscus (GitHub Discussions), Utterances, Disqus
- **Newsletter**: Mailchimp, Buttondown, Convertkit, Klaviyo, etc.
- **Search**: Kbar (local) or Algolia

## Troubleshooting

### Content Issues

- Check Contentlayer console output for parsing errors
- Verify frontmatter format matches schema in `contentlayer.config.ts`
- Ensure MDX syntax is valid

### Build Issues

- Windows users may need: `$env:PWD = $(Get-Location).Path`
- For static builds, comment out `headers()` in `next.config.js`
- Remove API routes for static deployments

### Styling Issues

- Check Tailwind CSS configuration
- Verify dark mode theme settings
- Custom CSS should go in `/css/tailwind.css`

## Key Features to Leverage

### Built-in Integrations

- **SEO**: Auto-generated sitemaps, RSS feeds, structured data
- **Performance**: Image optimization, bundle analysis, lighthouse scoring
- **Math**: KaTeX support for mathematical expressions
- **Citations**: Bibliography support via rehype-citation
- **Code**: Syntax highlighting with line numbers and highlighting

### Customization Points

- **Layouts**: Multiple post and listing layout options
- **Components**: Extend MDX components for rich content
- **Themes**: Customize Tailwind configuration and CSS variables
- **Analytics**: Multiple provider options with privacy focus
