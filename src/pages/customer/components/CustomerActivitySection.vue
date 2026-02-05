<template>
  <section class="itta-section">
    <div class="text-subtitle1 text-weight-medium">Activity</div>
    <div v-if="events.length" class="q-mt-sm">
      <BaseCard
        v-for="event in events"
        :key="event.id"
        :title="event.title"
        :subtitle="event.createdAt"
        ui-key="card:activity"
        class="q-mb-sm"
      >
        <div class="text-caption text-grey-7">{{ event.description }}</div>
      </BaseCard>
    </div>
    <div v-else class="text-caption text-grey-7 q-mt-sm">No activity yet.</div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseCard from 'components/base/BaseCard.vue';
import { useActivityStore } from 'src/stores/activity-store';

const activityStore = useActivityStore();
const events = computed(() => activityStore.events);
</script>
