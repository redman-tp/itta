<template>
  <BaseCard title="Notifications" ui-key="card:dashboard-notifications">
    <div v-if="items.length">
      <div v-for="notice in items" :key="notice.id" class="q-mb-sm">
        <div class="text-body2 text-weight-medium">{{ notice.title }}</div>
        <div class="text-caption text-grey-7">{{ notice.message }}</div>
      </div>
    </div>
    <div v-else class="text-caption text-grey-7">No notifications.</div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseCard from 'components/base/BaseCard.vue';
import { useNotificationsStore } from 'src/stores/notifications-store';

const notificationsStore = useNotificationsStore();
const items = computed(() => notificationsStore.notifications.slice(0, 4));
</script>
