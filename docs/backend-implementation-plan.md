# Backend Implementation Plan

## 1. Scope and Contracts
- Define backend features for this site:
  - Inquiry capture from Start Your Design form
  - Lead status tracking (new, contacted, quoted, booked)
  - Optional design briefing storage (style, budget, date, notes)
  - Internal notifications (email or WhatsApp workflow trigger)
  - Public content read APIs only if needed (works/testimonials from DB)

## 2. Data Model Design
- Core tables:
  - users (admin/team accounts)
  - leads (customer inquiries)
  - lead_events (status history and notes)
  - attachments (reference images if uploads are enabled)
  - settings (business config like contact channels)
- Add indexes for email, phone, created_at, status.
- Add soft-delete and audit fields for admin actions.

## 3. Tech Stack Setup
- Database: PostgreSQL
- ORM: Prisma
- Validation: Zod
- Auth for admin: NextAuth or Clerk
- Transactional email: Resend or SendGrid
- Optional queue/background jobs: Upstash QStash or BullMQ

## 4. API Design
- `POST /api/inquiries`
  - Validates payload
  - Stores lead
  - Sends notification
  - Returns success id
- `GET /api/admin/leads`
  - Paginated, filter by status/date/search
- `PATCH /api/admin/leads/:id`
  - Update status, assign owner, add note
- `POST /api/admin/leads/:id/events`
  - Append timeline event
- `POST /api/uploads` (optional)
  - Secure upload flow to object storage

## 5. Security and Abuse Prevention
- Server-side validation on every endpoint.
- Rate limiting per IP and per route.
- Bot protection on inquiry endpoint (honeypot and captcha).
- Strict CORS and security headers.
- Input sanitization for notes fields.
- Role-based access for admin endpoints.

## 6. Business Workflow Automation
- On new inquiry:
  - Send confirmation email to user
  - Send alert to business inbox/team channel
  - Create initial lead_event
- On status change:
  - Trigger optional follow-up template email
  - Log actor and timestamp

## 7. Admin Operations Layer
- Build admin API first, then minimal admin UI.
- Filters: status, date range, source.
- Actions: assign owner, update stage, export CSV.
- Add server-side logging for all admin mutations.

## 8. Testing Strategy
- Unit tests for validators and service functions.
- Integration tests for inquiry and lead update APIs.
- Contract tests for request and response schemas.
- Load test inquiry endpoint for burst traffic.
- Security tests for rate limits and auth boundaries.

## 9. Observability and Reliability
- Structured logging with request ids.
- Error tracking with Sentry.
- Metrics: inquiries per day, failure rates, response latency.
- Health endpoint and DB connectivity checks.
- Alerting for failed notifications or DB errors.

## 10. Deployment and Rollout
- Create staging with production-like DB.
- Run migrations in CI.
- Seed baseline data for testing.
- Roll out behind env flag if needed.
- Monitor first 72 hours with alerts.

## 11. Suggested Implementation Order
- Phase 1: Inquiry API + DB + validation + email notifications.
- Phase 2: Admin lead read/update APIs + auth.
- Phase 3: Workflow automation + exports + observability hardening.
- Phase 4: Optional uploads, CRM sync, advanced analytics.

## 12. Definition of Done
- Inquiry form reliably creates leads in DB.
- Team gets immediate notification.
- Admin can view and update leads securely.
- No high-severity security issues in review.
- Build, tests, and migrations pass in CI.
- Mobile and desktop frontend flows remain unaffected.
