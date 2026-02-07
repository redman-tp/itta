<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-page-sticky
      v-if="showBack"
      position="top-left"
      :offset="[8, 8]"
      class="itta-back-sticky"
    >
      <AppBackButton @click="handleBack" />
    </q-page-sticky>
    <AppBottomNav v-if="showBottomNav" :items="navItems" />
  </q-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AppBottomNav from 'components/app/AppBottomNav.vue';
import AppBackButton from 'components/app/AppBackButton.vue';
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
  router.back();
  if (router.options.history.state.back === null) {
    void router.replace('/customer/profile');
  }
}
</script>
