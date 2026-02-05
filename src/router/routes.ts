import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/PublicLayout.vue'),
    meta: { public: true },
    children: [
      { path: '', component: () => import('pages/LandingPage.vue') },
      { path: 'auth', component: () => import('pages/AuthPage.vue') },
      { path: 'marketplace', component: () => import('pages/MarketplacePage.vue') },
      { path: 'fabrics', component: () => import('pages/FabricMarketPage.vue') },
      {
        path: 'marketplace/:id',
        component: () => import('pages/MarketplaceDetailPage.vue'),
      },
      { path: 'featured', component: () => import('pages/FeaturedDesignsPage.vue') },
    ],
  },
  {
    path: '/customer',
    component: () => import('layouts/CustomerLayout.vue'),
    meta: { requiresAuth: true, role: 'customer' },
    children: [
      {
        path: '',
        component: () => import('pages/customer/CustomerDashboardPage.vue'),
      },
      {
        path: 'profile',
        component: () => import('pages/customer/profile/CustomerProfilePage.vue'),
      },
      {
        path: 'measurements',
        component: () => import('pages/customer/measurements/CustomerMeasurementsPage.vue'),
      },
      {
        path: 'sew-request',
        component: () => import('pages/customer/sew-request/CustomerSewRequestPage.vue'),
      },
      {
        path: 'requests',
        component: () => import('pages/customer/requests/CustomerRequestsPage.vue'),
      },
      {
        path: 'requests/:id',
        component: () => import('pages/customer/requests/CustomerRequestDetailPage.vue'),
      },
      {
        path: 'jobs',
        component: () => import('pages/customer/jobs/CustomerJobsPage.vue'),
      },
      {
        path: 'jobs/:id',
        component: () => import('pages/customer/jobs/CustomerJobDetailPage.vue'),
      },
      {
        path: 'orders',
        component: () => import('pages/customer/orders/CustomerOrdersPage.vue'),
      },
    ],
  },
  {
    path: '/fashioneer',
    component: () => import('layouts/FashioneerLayout.vue'),
    meta: { requiresAuth: true, role: 'fashioneer' },
    children: [
      {
        path: '',
        component: () => import('pages/fashioneer/FashioneerDashboardPage.vue'),
      },
      {
        path: 'profile',
        component: () => import('pages/fashioneer/profile/FashioneerProfilePage.vue'),
      },
      {
        path: 'requests',
        component: () => import('pages/fashioneer/requests/FashioneerRequestsPage.vue'),
      },
      {
        path: 'requests/:id',
        component: () =>
          import('pages/fashioneer/requests/FashioneerRequestDetailPage.vue'),
      },
      {
        path: 'jobs',
        component: () => import('pages/fashioneer/jobs/FashioneerJobsPage.vue'),
      },
      {
        path: 'jobs/:id',
        component: () => import('pages/fashioneer/jobs/FashioneerJobDetailPage.vue'),
      },
      {
        path: 'listings',
        component: () => import('pages/fashioneer/listings/FashioneerListingsPage.vue'),
      },
      {
        path: 'notifications',
        component: () =>
          import('pages/fashioneer/notifications/FashioneerNotificationsPage.vue'),
      },
      {
        path: 'measurements/lookup',
        component: () =>
          import('pages/fashioneer/measurements/FashioneerMeasurementLookupPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
