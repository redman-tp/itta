<template>
  <section class="itta-section">
    <div class="text-subtitle1 text-weight-medium">Notifications</div>
    <div v-if="notifications.length" class="q-mt-sm">
      <BaseCard
        v-for="notice in notifications"
        :key="notice.id"
        :title="notice.title"
        :subtitle="notice.createdAt"
        ui-key="card:notification"
        class="q-mb-sm"
      >
        <div class="text-caption text-grey-7">{{ notice.message }}</div>
        <BaseButton type="text" label="Mark read" class="q-mt-xs" @click="markRead(notice.id)" />
      </BaseCard>
    </div>
    <div v-else class="text-caption text-grey-7 q-mt-sm">No notifications yet.</div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseButton from 'components/base/BaseButton.vue';
import BaseCard from 'components/base/BaseCard.vue';
import { useNotificationsStore } from 'src/stores/notifications-store';

const notificationsStore = useNotificationsStore();
const notifications = computed(() => notificationsStore.notifications);

function markRead(id: string) {
  notificationsStore.markRead(id);
}
</script>
