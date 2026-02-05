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
    <AppBottomNav :items="navItems" />
  </q-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AppBottomNav from 'components/app/AppBottomNav.vue';
import AppTopBar from 'components/app/AppTopBar.vue';
import { useNotificationsStore } from 'src/stores/notifications-store';

const route = useRoute();
const router = useRouter();
const notificationsStore = useNotificationsStore();

const unreadCount = computed(() => notificationsStore.unreadCount);

const navItems = [
  { label: 'Home', icon: 'home', to: '/fashioneer' },
  { label: 'Requests', icon: 'inbox', to: '/fashioneer/requests' },
  { label: 'Jobs', icon: 'construction', to: '/fashioneer/jobs' },
  { label: 'Listings', icon: 'storefront', to: '/fashioneer/listings' },
  { label: 'Profile', icon: 'person', to: '/fashioneer/profile' },
];

const showBack = computed(() => route.path !== '/fashioneer');

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
