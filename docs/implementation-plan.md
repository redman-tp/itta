# Itta Product Flow Implementation Plan

This plan outlines how the frontend scaffolding maps to the platform flows and how backend integration should be phased.

## Phase 1 - Auth and Onboarding
- Implement registration/login endpoints in `authApi`.
- Persist session tokens and role in `authStore`.
- Add profile setup steps per role using existing profile pages.

## Phase 2 - Customer Core Flows
- Sew Requests:
  - Connect request creation to `requestsApi`.
  - Push request to fashioneer inbox via backend broadcast.
  - Track interest list and selection to create jobs.
- Measurements:
  - Persist measurement templates and versions.
  - Generate and validate measurement codes server-side.
- Jobs:
  - Connect job creation and status updates.
  - Enforce extension rules and hard stop dates server-side.
- Marketplace:
  - Build listings browse and detail APIs.
  - Implement checkout with payment provider (scaffold only now).

## Phase 3 - Fashioneer Core Flows
- Requests Inbox:
  - Implement interest workflow and customer selection.
  - Add job acceptance/decline endpoints.
- Jobs Management:
  - Update statuses, upload progress photos, request extension.
- Listings:
  - Create CRUD endpoints for listings.
  - Add order fulfillment tracking.
- Measurement Lookup:
  - Enforce access control and logging.

## Phase 4 - Cross-Cutting
- Notifications for status changes and new requests.
- Reviews and ratings for completed jobs.
- Audit logs and permissions enforcement.
