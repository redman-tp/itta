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
    <AppBottomNav :items="navItems" />
  </q-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AppBottomNav from 'components/app/AppBottomNav.vue';
import AppTopBar from 'components/app/AppTopBar.vue';

const route = useRoute();
const router = useRouter();

const navItems = [
  { label: 'Home', icon: 'home', to: '/' },
  { label: 'Sew', icon: 'checkroom', to: '/customer/sew-request' },
  { label: 'Requests', icon: 'list_alt', to: '/customer/requests' },
  { label: 'Jobs', icon: 'work', to: '/customer/jobs' },
  { label: 'Profile', icon: 'person', to: '/customer/profile' },
];

const primaryRoutes = [
  '/customer',
  '/customer/sew-request',
  '/customer/requests',
  '/customer/jobs',
  '/customer/profile',
];

const showBack = computed(() => !primaryRoutes.includes(route.path));

function handleBack() {
  if (route.path === '/customer') return;
  router.back();
  if (router.options.history.state.back === null) {
    router.replace('/customer');
  }
}
</script>
