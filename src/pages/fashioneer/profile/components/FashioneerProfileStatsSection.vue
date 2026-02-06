<template>
  <BaseCard ui-key="card:profile-stats">
    <div class="row q-col-gutter-sm">
      <div class="col-4">
        <div class="text-caption text-grey-7">Jobs</div>
        <div class="text-subtitle1 text-weight-medium">{{ jobsCount }}</div>
      </div>
      <div class="col-4">
        <div class="text-caption text-grey-7">Rating</div>
        <div class="text-subtitle1 text-weight-medium">4.8</div>
      </div>
      <div class="col-4">
        <div class="text-caption text-grey-7">Completion</div>
        <div class="text-subtitle1 text-weight-medium">92%</div>
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
