<template>
  <BaseCard title="Active jobs" ui-key="card:dashboard-jobs">
    <div class="row no-wrap scroll q-gutter-sm">
      <div v-for="job in jobs" :key="job.id" class="col-8">
        <JobCard :job="job" :show-action="false" />
      </div>
    </div>
    <div v-if="!jobs.length" class="text-caption text-grey-7 q-mt-sm">
      No active jobs.
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseCard from 'components/base/BaseCard.vue';
import JobCard from 'components/domain/JobCard.vue';
import { useJobsStore } from 'src/stores/jobs-store';

const jobsStore = useJobsStore();
const jobs = computed(() => jobsStore.jobs.slice(0, 5));
</script>
