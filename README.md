# Itta

Itta is a fashion-tech platform connecting Customers and Fashioneers (tailors/designers). This repository contains frontend scaffolding only; backend integration will follow.

## Roles

- Customer: stores measurements, requests outfits, and tracks jobs/orders.
- Fashioneer: posts designs, responds to sew requests, and manages jobs/listings.

## Core idea

Customers save measurements and request outfits. Fashioneers publish designs and accept sewing jobs.

## Tech stack

- Quasar + Vue 3
- Composition API with `<script setup>`
- Pinia for state management
- Vue Router
- Mobile-first approach

## Scaffolding overview

- Public pages: Landing, Auth, Marketplace, Marketplace Detail, Featured Designs
- Customer dashboard: Overview, Profile, Measurements, Sew Request, Requests, Jobs, Orders
- Fashioneer dashboard: Overview, Profile, Requests Inbox, Jobs, Listings, Measurement Lookup
- Role-based route guards in `src/router/index.ts`
- Base UI system in `src/components/base` and domain cards in `src/components/domain`
- API service placeholders in `src/services/api` (TODO: backend wiring)
- Mock data in `src/data/mock-data.ts`
- Product flow plan in `docs/implementation-plan.md`

## Run locally

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```
