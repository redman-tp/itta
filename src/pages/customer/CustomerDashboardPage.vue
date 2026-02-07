<template>
  <q-page class="itta-page">
    <CustomerDashboardOverviewSection />
    <CustomerDashboardJobsSection class="q-mt-sm" />
    <CustomerDashboardRequestsSection class="q-mt-sm" />
    <CustomerDashboardBidsSection class="q-mt-sm" />
    <CustomerDashboardActivitySection class="q-mt-sm" />
  </q-page>
</template>

<script setup lang="ts">
import CustomerDashboardOverviewSection from 'src/pages/customer/components/CustomerDashboardOverviewSection.vue';
import CustomerDashboardJobsSection from 'src/pages/customer/components/CustomerDashboardJobsSection.vue';
import CustomerDashboardRequestsSection from 'src/pages/customer/components/CustomerDashboardRequestsSection.vue';
import CustomerDashboardBidsSection from 'src/pages/customer/components/CustomerDashboardBidsSection.vue';
import CustomerDashboardActivitySection from 'src/pages/customer/components/CustomerDashboardActivitySection.vue';
</script>
