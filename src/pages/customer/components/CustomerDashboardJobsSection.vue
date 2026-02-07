<template>
  <BaseCard ui-key="card:dashboard-jobs-pipeline">
    <div class="row items-center justify-between">
      <div class="text-subtitle1 text-weight-medium">Jobs pipeline</div>
      <BaseButton type="text" label="View all" @click="goToJobs" />
    </div>

    <div v-if="jobs.length" class="q-mt-sm">
      <div v-for="job in jobs" :key="job.id" class="itta-dashboard-row">
        <div class="row items-center justify-between q-gutter-sm">
          <div class="text-caption text-weight-medium ellipsis">{{ job.title }}</div>
          <q-badge color="secondary" text-color="white" rounded>
            {{ formatStatus(job.status) }}
          </q-badge>
        </div>
        <div class="row items-center justify-between q-mt-xs">
          <div class="text-caption text-grey-7">Due {{ job.dueDate ?? 'TBD' }}</div>
          <div class="text-caption text-weight-medium">{{ job.progress ?? 0 }}%</div>
        </div>
        <q-linear-progress
          class="q-mt-xs"
          rounded
          size="7px"
          color="secondary"
          :value="(job.progress ?? 0) / 100"
        />
      </div>
    </div>
    <div v-else class="text-caption text-grey-7 q-mt-sm">No active jobs.</div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import BaseButton from 'components/base/BaseButton.vue';
import BaseCard from 'components/base/BaseCard.vue';
import { useJobsStore } from 'src/stores/jobs-store';

const router = useRouter();
const jobsStore = useJobsStore();
const jobs = computed(() => jobsStore.jobs.filter((job) => job.status !== 'completed').slice(0, 4));

function formatStatus(status: string) {
  return status.replace(/_/g, ' ');
}

function goToJobs() {
  void router.push('/customer/jobs');
}
</script>
