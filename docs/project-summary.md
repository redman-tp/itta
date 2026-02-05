# Itta Project Summary (handoff)

This is a Quasar + Vue 3 + Pinia frontend scaffold for Itta, a fashion‑tech platform connecting Sewee (Customer) and Fashioneer (Tailor/Designer).

## High-level
- Two roles with separate dashboards and protected routes.
- Frontend‑only scaffolding with mock data; backend integration is TODO in services/stores.
- Mobile‑first layout, reusable base components, domain components, and page sections per feature.

## Tech & conventions
- Quasar + Vue 3 (Composition API, `<script setup>`).
- Pinia for state.
- Vue Router with role guards.
- Pages are thin, sections live in `src/pages/<feature>/components`.
- Base UI in `src/components/base`, domain components in `src/components/domain`.

## Routing & layouts
- Public routes: Landing, Auth, Marketplace, Marketplace Detail, Featured Designs, Fabric Market.
- Customer routes: Dashboard, Profile, Measurements, Sew Request, Requests (list + detail), Jobs (list + detail), Orders.
- Fashioneer routes: Dashboard, Profile, Requests (list + detail), Jobs (list + detail), Listings, Measurement Lookup, Notifications.
- Layouts: `PublicLayout`, `CustomerLayout`, `FashioneerLayout`.
- Top bar has back button for nested routes; Fashioneer layout shows notifications badge.
- Role guards in `src/router/index.ts`.

## Stores (Pinia)
- `auth-store`: session + role + guards.
- `profile-store`: customer/fashioneer profile.
- `designs-store`: marketplace items, featured, filters, bookmarks.
- `requests-store`: sew requests.
- `bids-store`: bids per request, mark viewed.
- `jobs-store`: jobs + progress presets + updates.
- `measurements-store`: measurements + code lookup.
- `fabrics-store`: fabric market items + lookup by tag.
- `notifications-store`: notifications list + unread count.
- `activity-store`: unified activity feed for sewee.
- `ui-store`: global UI state.

## Services (API stubs)
`src/services/api/*` contains mock wrappers with TODOs:
- `authApi`, `profileApi`, `designsApi` (lookup by tag, bookmark), `requestsApi`, `bidsApi`, `jobsApi`, `measurementsApi`, `fabricsApi`, `notificationsApi`.

## Reusable components
Base:
- `BaseButton`, `BaseCard` (clickable support + media height), `BaseInput`, `BaseSelect`, `BaseModal`, `BaseBadge`, `BaseTabs`, `BaseStepper`, `TagPill`, `MediaUploader`.
Domain:
- `DesignCard`, `FabricCard`, `RequestCard`, `JobCard`, `BidCard`, `BidDetail`, `ProgressTimeline`, `ProfileCard`, `MeasurementCard`.

## Marketplace
- Search bar above category tabs (All, Men, Women, Kids, Casual, Traditional, Formal).
- Filters appear after search or category selection.
- Masonry layout using CSS columns (2 columns), flat card style, small radius, no borders/shadows.
- Cards are clickable to open details; no “request” button on cards; bookmark is bottom‑right.
- Design detail shows tag + copy icon + “Request this design”.
- Uses varied image heights (picsum) for masonry testing.

## Sew request flow (Sewee)
Improved multi‑step “Sew Me This” form:
- Attach design by browse or by design tag (auto attach).
- Reference images via `MediaUploader`.
- Fabric attachment: browse fabric market, paste fabric tag, or upload fabric image.
- Fabric intent selection (market purchase / fashioneer source / upload / none).
- On submit: request created, activity events added.

## Bidding & notifications
- Fashioneer requests list shows open requests; detail page allows placing bid (amount + duration + message).
- Sewee request detail shows bids, opening a bid marks viewed and triggers notification for fashioneer.
- Accepting a bid creates a job (duration determines end date).
- Notifications list page for fashioneer with unread badge in top bar.

## Job progress
- Presets defined in `src/utils/progress-presets.ts`.
- Fashioneer job detail lets you add progress update (preset + note + images).
- Sewee job detail shows timeline via `ProgressTimeline`, time remaining indicator.

## Activity feed
- Sewee dashboard shows activity feed (request created, design attached, fabric attached, bid viewed/accepted, job progress).

## Styling notes
- Bottom nav no-caps, indicator hidden via CSS.
- Button text not forced uppercase.
- Primary color aligned with header (#0b1b3a); bottom nav uses lighter shade.
- Marketplace flat style and masonry layout in `src/css/app.sass`.

## Mock data
`src/data/mock-data.ts` now includes:
- 10 design items with varied image heights (picsum), tags, sewed counts.
- Fabrics, bids, notifications, activities, progress updates.

## Known fixes applied
- BaseButton emits native click event to fix `.stop` error.
- Import issues fixed in Marketplace list.

## Key files to start from
- `src/pages/marketplace/*`
- `src/pages/customer/sew-request/*`
- `src/pages/customer/requests/*`
- `src/pages/fashioneer/requests/*`
- `src/pages/fashioneer/jobs/*`
- `src/components/domain/DesignCard.vue`, `ProgressTimeline.vue`, `BidCard.vue`, `BidDetail.vue`
- `src/stores/*` (bids, notifications, activity, jobs, designs, fabrics)
- `src/services/api/*`
- `src/css/app.sass`

## Next steps (likely)
- Tighten marketplace UI and search styling per reference.
- Connect stores to real API endpoints.
- Persist bookmarks, bids, and progress updates.
- Add pagination and real filters for marketplace and fabric market.
