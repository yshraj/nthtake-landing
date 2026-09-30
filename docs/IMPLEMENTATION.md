# EditTrack - Implementation Guide

## Waitlist API

### Endpoint
- **Route**: `POST /api/waitlist`
- **Purpose**: Handle user waitlist submissions.

### Key Logic
- **Rate Limiting**: IP-based, max 5 requests per 60-second window.
- **Validation**: Email format and field length checks.
- **Email Notifications**: Uses Zoho SMTP for confirmation emails.

### Error Handling
- **400**: Invalid payload or missing fields.
- **422**: Invalid email format.
- **429**: Rate limit exceeded.
- **503**: SMTP configuration missing.

## React Actions

### `joinWaitlist`
- **Purpose**: Handle form submissions for waitlist.
- **Usage**: Call from `CtaSection` component.

## UI Components

### `CtaSection`
- **Purpose**: Waitlist form and status display.
- **Key Features**: Form validation, loading states, error handling.
- **Dependencies**: `joinWaitlist` action, `site` content.

### `ProductFlow`
- **Purpose**: Visual representation of the workflow.
- **Dependencies**: `site` content for tool and step descriptions.

## Development Workflow

1. **Install Dependencies**: `npm install`.
2. **Start Server**: `npm run dev`.
3. **Configure Environment**: Set up `.env` with SMTP credentials.

## Testing
- **Local Testing**: Use Postman or `curl` to test the `/api/waitlist` endpoint.
- **Form Validation**: Manually test edge cases (e.g., empty fields, invalid emails).

## Debugging
- **Logs**: Check `console.log` in `waitlist.ts` for submission details.
- **API Errors**: Review `NextResponse.json` error messages for troubleshooting.