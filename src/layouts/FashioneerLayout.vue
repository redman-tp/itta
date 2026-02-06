<template>
  <q-layout view="lHh Lpr lFf">
    <AppTopBar
      title="Fashioneer Dashboard"
      :show-back="showBack"
      @back="handleBack"
    >
      <template #actions>
        <q-btn flat dense round icon="notifications" @click="goToNotifications">
          <q-badge
            v-if="unreadCount"
            color="negative"
            floating
            :label="unreadCount"
          />
        </q-btn>
      </template>
    </AppTopBar>
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
import { fashioneerNavItems } from 'components/app/nav-items';
import { useNotificationsStore } from 'src/stores/notifications-store';

const route = useRoute();
const router = useRouter();
const notificationsStore = useNotificationsStore();

const unreadCount = computed(() => notificationsStore.unreadCount);

const navItems = fashioneerNavItems;

const topLevelRoutes = [
  '/fashioneer',
  '/fashioneer/requests',
  '/fashioneer/jobs',
  '/fashioneer/listings',
  '/fashioneer/profile',
  '/fashioneer/notifications',
  '/fashioneer/measurements/lookup',
];

const showBack = computed(() => !topLevelRoutes.includes(route.path));
const showBottomNav = computed(() => topLevelRoutes.includes(route.path));

function handleBack() {
  if (route.path === '/fashioneer') return;
  router.back();
  if (router.options.history.state.back === null) {
    router.replace('/fashioneer');
  }
}

function goToNotifications() {
  router.push('/fashioneer/notifications');
}
</script>
