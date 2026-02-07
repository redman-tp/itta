<template>
  <BaseCard ui-key="card:dashboard-activity">
    <div class="row items-center justify-between">
      <div class="text-subtitle1 text-weight-medium">Recent activity</div>
      <BaseButton type="text" label="Profile" @click="goToProfile" />
    </div>

    <div v-if="events.length" class="q-mt-sm">
      <div v-for="event in events" :key="event.id" class="itta-dashboard-row">
        <div class="row items-start q-gutter-sm">
          <q-icon :name="event.icon || 'notifications'" size="18px" color="primary" />
          <div class="col">
            <div class="text-caption text-weight-medium">{{ event.title }}</div>
            <div class="text-caption text-grey-7">{{ event.description }}</div>
            <div class="text-caption text-grey-6 q-mt-xs">{{ event.createdAt }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-caption text-grey-7 q-mt-sm">No recent activity.</div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import BaseButton from 'components/base/BaseButton.vue';
import BaseCard from 'components/base/BaseCard.vue';
import { useActivityStore } from 'src/stores/activity-store';

const router = useRouter();
const activityStore = useActivityStore();
const events = computed(() => activityStore.events.slice(0, 6));

function goToProfile() {
  void router.push('/customer/profile');
}
</script>
