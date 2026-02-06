<template>
  <BaseCard title="Performance snapshot" ui-key="card:dashboard-stats">
    <div class="row q-col-gutter-sm">
      <div class="col-6">
        <div class="text-caption text-grey-7">Jobs in progress</div>
        <div class="text-subtitle1 text-weight-medium">{{ jobsCount }}</div>
      </div>
      <div class="col-6">
        <div class="text-caption text-grey-7">Avg rating</div>
        <div class="text-subtitle1 text-weight-medium">4.8</div>
      </div>
      <div class="col-6 q-mt-sm">
        <div class="text-caption text-grey-7">Completion rate</div>
        <div class="text-subtitle1 text-weight-medium">92%</div>
      </div>
      <div class="col-6 q-mt-sm">
        <div class="text-caption text-grey-7">Response time</div>
        <div class="text-subtitle1 text-weight-medium">2h</div>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseCard from 'components/base/BaseCard.vue';
import { useJobsStore } from 'src/stores/jobs-store';

const jobsStore = useJobsStore();
const jobsCount = computed(() => jobsStore.jobs.length);
</script>
