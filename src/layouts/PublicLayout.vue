<template>
  <q-layout view="lHh Lpr lFf">
    <AppTopBar v-if="showHeader" title="Itta" :show-back="showBack" @back="handleBack" />
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

const showBack = computed(() => route.path !== '/');
const showHeader = computed(() => route.path !== '/');
const topLevelRoutes = ['/', '/marketplace', '/fabrics', '/auth', '/auth/login', '/auth/register'];
const showBottomNav = computed(() => topLevelRoutes.includes(route.path));

const navItems = customerNavItems;

function handleBack() {
  if (route.path === '/') return;
  router.back();
  if (router.options.history.state.back === null) {
    router.replace('/');
  }
}
</script>
