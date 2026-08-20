<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and this may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# StackSpacer Agent Rules

## Project Overview
- Next.js 16 App Router
- React 19
- TypeScript
- Prisma 6
- SQLite for local development
- CSS Modules
- Dark UI with gold/yellow accent (#d8af25)
- Domain: https://stackspacer.com
- Canonical brand name: StackSpacer (one word)

## Analytics & Privacy
- GTM Container: GTM-WPTNGVFR
- GA4 Property: G-NKP6BWG546
- Consent storage key: stackspacer_consent_v1
- Default consent: analytics_storage = denied
- Advertising consent is ALWAYS denied:
  - ad_storage = denied
  - ad_user_data = denied
  - ad_personalization = denied
- NEVER send PII to GA4 (no email, name, phone, message in events)
- Admin routes (/admin/*) must be excluded from public analytics

## Events
- generate_lead: Pushed on successful contact form submission only
  - Parameters: event, lead_source, form_name
  - NO personal data included
- email_click: Handled by GTM (mailto: link tracking)
  - Do NOT add React onClick handlers for email clicks (causes duplicates)

## Phase 1C — HOLD
- Do NOT implement UTM persistence
- Do NOT implement gclid/gbraid/wbraid persistence
- Do NOT implement Google Ads conversion tracking
- Do NOT implement enhanced conversions
- Do NOT implement advertising personalization

## Security
- Never expose secrets in code or reports
- Never commit .env files
- ADMIN_PASSWORD and ADMIN_SESSION_SECRET must remain in .env only
- Contact form has honeypot spam protection
- Server-side validation using Zod

## Code Practices
- Preserve existing StackSpacer visual design
- Preserve working functionality
- Prefer minimal changes
- Do not create duplicate analytics architectures
- Use existing lib/analytics.ts for dataLayer pushes
- No @ts-ignore or any without justification
- Run lint and build after changes
- Do not fabricate business claims, testimonials, or statistics
- Do not invent timelines, pricing, or results not supported by repository data

## Database
- Prisma + SQLite for local development
- Do NOT run destructive migrations without approval
- Do NOT delete existing submissions
- Schema: ContactSubmission (id, name, email, message, status, createdAt)

## SEO
- Admin routes: noindex, nofollow
- Public pages: indexable
- Canonical URLs on all pages
- robots.txt disallows /admin and /api
- sitemap.xml excludes private routes
- No keyword stuffing
- No thin pages
- Unique titles and descriptions per page
- Natural, human-sounding copy

## Do Not Touch Unless Required
- Music/background audio
- Portfolio animations
- Project content
- Hero design
- Service cards
- Skills
- Footer graphics
- Custom cursor
- Admin styling
- Database submission data
- Phase 1 analytics architecture
- Consent banner implementation

## Phase 4 — Authority & Search Distribution Rules
- Do NOT fabricate social profile URLs (LinkedIn, GitHub, X, etc.)
- Do NOT fabricate backlinks, citations, directories, press, awards, or reviews
- Do NOT add LocalBusiness, PostalAddress, or office location schema unless addresses are separately approved for structured data
- Do NOT use testimonials as Review/AggregateRating schema without owner confirmation
- Do NOT create generic SEO/GEO filler content or thin articles
- Do NOT create llms.txt, ai.txt, or AI sitemap files for SEO purposes
- Do NOT implement IndexNow without a real approved key from Bing Webmaster Tools
- Do NOT modify Phase 1C or Google Ads tracking
- Preserve crawler access for public content (Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User)
- Preserve /admin and /api protections in robots.ts
- Global Locations data in siteConfig is approved for WEBSITE DISPLAY only — not for structured data until separately confirmed

## Phase 5 — Insights & Content Growth Rules
- Do NOT create generic mass SEO content or thin articles
- Do NOT fabricate author names, publication dates, or reading times
- Insights target INFORMATIONAL search intent; service pages target COMMERCIAL intent
- Avoid keyword cannibalization between insights and service pages
- P1/P2 insight articles are NOT published until separately approved by owner
- Do NOT use the unverified "8hrs Weekly Time Saved" claim in any content or schema
- Do NOT create fake E-E-A-T signals (reviewers, certifications, years of experience)
- Article structured data should only include truthful fields (no dates until approved)
- Phase 1C / Google Ads tracking remains strictly ON HOLD
