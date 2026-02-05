<template>
  <q-layout view="lHh Lpr lFf">
    <AppTopBar title="Itta" :show-back="showBack" @back="handleBack" />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AppTopBar from 'components/app/AppTopBar.vue';

const route = useRoute();
const router = useRouter();

const showBack = computed(() => route.path !== '/');

function handleBack() {
  if (route.path === '/') return;
  router.back();
  if (router.options.history.state.back === null) {
    router.replace('/');
  }
}
</script>
