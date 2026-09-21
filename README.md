# LUNARA V3.3

Quiet Luxury / Natural Mysticism prototype.

## What's new
- Reworked homepage into a premium editorial structure.
- Five Elements system: Wood, Fire, Earth, Metal, Water.
- 10-crystal starter library with element + secondary-element mapping.
- Reading result now surfaces the Five Element match.
- Mystery Mine and Journal sections added to the homepage.
- Admin route protected by an HTTP-only cookie gate; ordinary visitors are redirected to `/admin/login`.
- GET `/api/leads` requires admin authentication; POST remains public so reading leads can be captured.

## Admin
Local demo password: `LUNARA-LOCAL-2026`.

Before production, set a strong environment variable:
`LUNARA_ADMIN_PASSWORD=your-strong-password`

The local JSON lead store is still an MVP. Move to Supabase/Postgres before public launch.


## LUNARA Launch Candidate
- Complete visitor flow: homepage → Five Elements → 20-question reading → personalized result → lead capture → shop → product → cart → demo checkout.
- Protected admin: login, leads, demo orders, refresh/no-store behavior, logout.
- Added Elements, About, Journal, Privacy and Terms pages.
- Demo checkout intentionally does not charge money. Connect Shopify/Stripe and replace local JSON storage with a production database before launch.
- Local admin password: `LUNARA-LOCAL-2026`; set `LUNARA_ADMIN_PASSWORD` for production.

## FIXED2 note
The @/* alias is explicitly configured in tsconfig.json so admin auth routes compile correctly. Delete .next if upgrading an existing local copy.
