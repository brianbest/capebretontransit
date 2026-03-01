# CB Transit - Cape Breton Transit

## Project Overview
A lightweight, mobile-first web application that transforms Cape Breton Regional Municipality (CBRM) transit schedule PDFs and data into an easy-to-use, glanceable transit app.

## Tech Stack
- **Framework**: Next.js 16 (App Router, TypeScript)
- **UI**: shadcn/ui (New York style), Tailwind CSS v4
- **i18n**: next-intl (English, French-Canadian, Chinese, Mi'kmaw)
- **Deployment**: Vercel

## Project Structure
```
src/
  app/[locale]/          # Locale-prefixed routes
    layout.tsx           # Root layout with providers
    page.tsx             # Home page - route list
    routes/[id]/page.tsx # Individual route schedule
  components/
    ui/                  # shadcn components
    ...                  # App-specific components
  lib/
    utils.ts             # shadcn utilities
  data/
    routes.ts            # Static transit schedule data
  i18n/
    routing.ts           # i18n routing config
    request.ts           # i18n request config
messages/
  en.json                # English translations
  fr.json                # French-Canadian translations
  zh.json                # Chinese translations
  mi.json                # Mi'kmaw translations
```

## Design System
- **Theme**: Cape Breton inspired - deep ocean blues, highland greens, coastal grays
- **Default**: Dark mode
- **Primary color**: Ocean blue (#1e40af area)
- **Accent**: Highland green/teal
- **Typography**: Geist Sans (already configured)

## Transit Data Source
- Source: https://cbrm.ns.ca/transportation/transit-cape-breton/routes-schedules/
- 13 routes with PDF schedules and map links
- Data is manually transcribed into src/data/routes.ts as structured JSON

## Commands
- `npm run dev` - Start dev server
- `npm run build` - Production build
- `npm run lint` - ESLint

## Conventions
- Use `@/` import alias for src/ directory
- All components use TypeScript
- Server components by default, 'use client' only when needed
- Locale routing via [locale] dynamic segment
