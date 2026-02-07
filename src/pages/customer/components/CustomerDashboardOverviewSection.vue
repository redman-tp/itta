<template>
  <BaseCard ui-key="card:dashboard-overview">
    <div class="row items-center justify-between">
      <div class="text-subtitle1 text-weight-medium">Dashboard overview</div>
      <BaseButton type="text" label="New request" @click="goToRequest" />
    </div>

    <div class="row q-col-gutter-sm q-mt-sm">
      <div class="col-6">
        <div class="itta-dashboard-kpi">
          <div class="text-caption text-grey-7">Active Requests</div>
          <div class="text-subtitle1 text-weight-medium">{{ activeRequestsCount }}</div>
        </div>
      </div>
      <div class="col-6">
        <div class="itta-dashboard-kpi">
          <div class="text-caption text-grey-7">Active Jobs</div>
          <div class="text-subtitle1 text-weight-medium">{{ activeJobsCount }}</div>
        </div>
      </div>
      <div class="col-6">
        <div class="itta-dashboard-kpi">
          <div class="text-caption text-grey-7">Avg Job Progress</div>
          <div class="text-subtitle1 text-weight-medium">{{ averageJobProgress }}%</div>
        </div>
      </div>
      <div class="col-6">
        <div class="itta-dashboard-kpi">
          <div class="text-caption text-grey-7">New Bids</div>
          <div class="text-subtitle1 text-weight-medium">{{ unreadBidsCount }}</div>
        </div>
      </div>
    </div>

    <div class="q-mt-sm">
      <div class="row items-center justify-between">
        <div class="text-caption text-grey-7">Fulfillment pulse</div>
        <div class="text-caption text-weight-medium">{{ averageJobProgress }}%</div>
      </div>
      <q-linear-progress
        class="q-mt-xs"
        rounded
        size="8px"
        color="primary"
        :value="averageJobProgress / 100"
      />
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import BaseButton from 'components/base/BaseButton.vue';
import BaseCard from 'components/base/BaseCard.vue';
import { useBidsStore } from 'src/stores/bids-store';
import { useJobsStore } from 'src/stores/jobs-store';
import { useRequestsStore } from 'src/stores/requests-store';

const router = useRouter();
const requestsStore = useRequestsStore();
const jobsStore = useJobsStore();
const bidsStore = useBidsStore();

const activeRequestsCount = computed(
  () => requestsStore.requests.filter((request) => request.status !== 'closed').length
);
const activeJobs = computed(() => jobsStore.jobs.filter((job) => job.status !== 'completed'));
const activeJobsCount = computed(() => activeJobs.value.length);
const averageJobProgress = computed(() => {
  if (!activeJobs.value.length) return 0;
  const total = activeJobs.value.reduce((sum, job) => sum + (job.progress ?? 0), 0);
  return Math.round(total / activeJobs.value.length);
});
const unreadBidsCount = computed(() => bidsStore.bids.filter((bid) => !bid.viewedBySewee).length);

function goToRequest() {
  void router.push('/customer/sew-request');
}
</script>
