<template>
  <BaseCard ui-key="card:profile-stats">
    <div class="row q-col-gutter-sm">
      <div class="col-4">
        <div class="text-caption text-grey-7">Requests</div>
        <div class="text-subtitle1 text-weight-medium">{{ requestsCount }}</div>
      </div>
      <div class="col-4">
        <div class="text-caption text-grey-7">Jobs</div>
        <div class="text-subtitle1 text-weight-medium">{{ jobsCount }}</div>
      </div>
      <div class="col-4">
        <div class="text-caption text-grey-7">Saved</div>
        <div class="text-subtitle1 text-weight-medium">{{ savedCount }}</div>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseCard from 'components/base/BaseCard.vue';
import { useDesignsStore } from 'src/stores/designs-store';
import { useJobsStore } from 'src/stores/jobs-store';
import { useRequestsStore } from 'src/stores/requests-store';

const requestsStore = useRequestsStore();
const jobsStore = useJobsStore();
const designsStore = useDesignsStore();

const requestsCount = computed(() => requestsStore.requests.length);
const jobsCount = computed(() => jobsStore.jobs.length);
const savedCount = computed(
  () => designsStore.items.filter((item) => item.isBookmarked).length
);
</script>
