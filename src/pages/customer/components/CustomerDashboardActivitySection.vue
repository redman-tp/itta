<template>
  <BaseCard title="Recent updates" ui-key="card:dashboard-activity">
    <div v-if="events.length">
      <div v-for="event in events" :key="event.id" class="q-mb-sm">
        <div class="text-body2 text-weight-medium">{{ event.title }}</div>
        <div class="text-caption text-grey-7">{{ event.description }}</div>
      </div>
    </div>
    <div v-else class="text-caption text-grey-7">No recent activity.</div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseCard from 'components/base/BaseCard.vue';
import { useActivityStore } from 'src/stores/activity-store';

const activityStore = useActivityStore();
const events = computed(() => activityStore.events.slice(0, 5));
</script>
