<template>
  <q-page class="itta-page">
    <FashioneerDashboardStatsSection />
    <FashioneerDashboardRequestsSection class="q-mt-sm" />
    <FashioneerDashboardJobsSection class="q-mt-sm" />
    <FashioneerDashboardBidsSection class="q-mt-sm" />
    <FashioneerDashboardNotificationsSection class="q-mt-sm" />
  </q-page>
</template>

<script setup lang="ts">
import FashioneerDashboardStatsSection from 'src/pages/fashioneer/components/FashioneerDashboardStatsSection.vue';
import FashioneerDashboardRequestsSection from 'src/pages/fashioneer/components/FashioneerDashboardRequestsSection.vue';
import FashioneerDashboardJobsSection from 'src/pages/fashioneer/components/FashioneerDashboardJobsSection.vue';
import FashioneerDashboardBidsSection from 'src/pages/fashioneer/components/FashioneerDashboardBidsSection.vue';
import FashioneerDashboardNotificationsSection from 'src/pages/fashioneer/components/FashioneerDashboardNotificationsSection.vue';
</script>
