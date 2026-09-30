# EditTrack - Quick Start for Claude

## Core Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS (v4)
- **Animations**: Framer Motion
- **API**: `src/app/api/waitlist/route.ts`

## Key Rules
1. **Do Not Modify**: 
   - `/api/waitlist` POST endpoint.
   - Rate-limiting logic (5 requests/IP/60s).
   - Email subject format (`[EditTrack] waitlist from`).

2. **Field Constraints**: 
   - NAME: 80 chars
   - EMAIL: 120 chars
   - CRAFT: 40 chars
   - SOURCE: 40 chars

## Commands
```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run lint      # Run ESLint
```

## Critical Files
- **API**: `src/app/api/waitlist/route.ts`
- **Logic**: `src/lib/waitlist.ts`
- **Actions**: `src/actions/waitlist.ts`
- **Content**: `src/content/site.ts` (all copy updates)

## Dependencies
- **Core**: `next`, `react`, `nodemailer`, `tailwindcss`
- **UI**: `@base-ui/react`, `lucide-react`

## Quick Start
1. Install: `npm install`
2. Configure `.env` with SMTP credentials.
3. Run: `npm run dev`

## Documentation
- **Context**: `docs/CONTEXT.md`
- **Implementation**: `docs/IMPLEMENTATION.md`
- **TODO**: `docs/TODO.md`