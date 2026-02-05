<template>
  <q-page class="itta-page">
    <CustomerOverviewSection />
    <CustomerQuickActionsSection />
    <CustomerActivitySection />
    <CustomerProfileFormSection />
  </q-page>
</template>

<script setup lang="ts">
import CustomerOverviewSection from 'src/pages/customer/components/CustomerOverviewSection.vue';
import CustomerQuickActionsSection from 'src/pages/customer/components/CustomerQuickActionsSection.vue';
import CustomerActivitySection from 'src/pages/customer/components/CustomerActivitySection.vue';
import CustomerProfileFormSection from 'src/pages/customer/profile/components/CustomerProfileFormSection.vue';
</script>
