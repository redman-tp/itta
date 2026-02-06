<template>
  <q-layout view="lHh Lpr lFf">
    <AppTopBar
      title="Customer Dashboard"
      :show-back="showBack"
      @back="handleBack"
    />
    <q-page-container>
      <router-view />
    </q-page-container>
    <AppBottomNav v-if="showBottomNav" :items="navItems" />
  </q-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AppBottomNav from 'components/app/AppBottomNav.vue';
import AppTopBar from 'components/app/AppTopBar.vue';
import { customerNavItems } from 'components/app/nav-items';

const route = useRoute();
const router = useRouter();

const navItems = customerNavItems;

const topLevelRoutes = [
  '/customer',
  '/customer/sew-request',
  '/customer/requests',
  '/customer/jobs',
  '/customer/profile',
  '/customer/measurements',
];

const showBack = computed(() => !topLevelRoutes.includes(route.path));
const showBottomNav = computed(() => topLevelRoutes.includes(route.path));

function handleBack() {
  if (route.path === '/customer') return;
  router.back();
  if (router.options.history.state.back === null) {
    router.replace('/customer');
  }
}
</script>
