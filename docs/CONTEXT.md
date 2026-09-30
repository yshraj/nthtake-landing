# EditTrack - Core Product Context

## Overview
EditTrack is a **Next.js 16 (App Router)** landing page for a platform that enables freelancers (video editors, designers) to securely deliver work and get paid before handing over clean files.

## Key Features
- **Waitlist System**: Users submit work details (name, email, craft, source, company) via a form.
- **Validation & Rate Limiting**: IP-based rate limiting (5 requests/60s) and strict input validation.
- **Email Notifications**: Confirmation emails via Zoho SMTP.

## Architecture
- **Frontend**: Next.js with Tailwind CSS, Framer Motion animations.
- **API**: `src/app/api/waitlist/route.ts` handles POST requests, validation, and email notifications.
- **Libraries**: `src/lib/waitlist.ts` (business logic), `src/actions/waitlist.ts` (React actions).

## Constraints
- **API Contract**: POST `/api/waitlist` must remain unchanged.
- **Rate Limiting**: IP-based, max 5 requests per 60-second window.
- **Field Constraints**: 
  - NAME: 80 chars
  - EMAIL: 120 chars
  - CRAFT: 40 chars
  - SOURCE: 40 chars
- **Email Format**: Subject must start with `[EditTrack] waitlist from`.

## Dependencies
| Category       | Package                     | Version   |
|----------------|----------------------------|-----------|
| Framework       | next                          | 16.3.4    |
| Runtime         | react                         | 19.2.8    |
| UI              | @base-ui/react              | ^1.8.0    |
| Styling         | tailwindcss                   | ^4.x      |
| Utilities       | cn                            | ^0.2.6    |
| Network         | nodemailer                    | ^10.0.3   |
| State           | class-variance-authority      | ^0.7.1    |
| Action Hooks    | react-router-dom              | ^7.18.3   |
| Types           | @types/*                     | ^20 / ^19 |

## Commands
```bash
# Development
npm run dev           # Start dev server (port 3000)
npm start             # Start production server
npm run build         # Build for production

# Quality Assurance
npm run lint          # ESLint check
```

## Product Vision
- **Core Value**: Get paid before handing over clean files.
- **Target Audience**: Freelancers (video editors, designers) who need secure payment workflows.
- **Key Flows**: 
  1. User joins waitlist via form.
  2. System validates inputs and sends confirmation email.
  3. Admin can retrieve waitlisted users via API.

## References
- **Code**: `src/lib/waitlist.ts`, `src/actions/waitlist.ts`, `src/app/api/waitlist/route.ts`.
- **Content**: `src/content/site.ts` (all copy updates).

## Boundaries
- **Do Not Modify**: API contract, rate-limiting logic, or email format.
- **Do Not Add**: New features outside MVP scope (e.g., AI feedback).