<template>
  <BaseCard ui-key="card:profile-dashboard-preview">
    <div class="row items-center justify-between">
      <div class="text-subtitle1 text-weight-medium">Dashboard preview</div>
      <BaseButton type="text" label="View full dashboard" @click="goToDashboard" />
    </div>

    <div class="row q-col-gutter-sm q-mt-sm">
      <div class="col-4">
        <div class="itta-dashboard-preview-stat">
          <div class="text-caption text-grey-7">Requests</div>
          <div class="text-subtitle2 text-weight-medium">{{ activeRequestsCount }}</div>
        </div>
      </div>
      <div class="col-4">
        <div class="itta-dashboard-preview-stat">
          <div class="text-caption text-grey-7">Jobs</div>
          <div class="text-subtitle2 text-weight-medium">{{ activeJobsCount }}</div>
        </div>
      </div>
      <div class="col-4">
        <div class="itta-dashboard-preview-stat">
          <div class="text-caption text-grey-7">New bids</div>
          <div class="text-subtitle2 text-weight-medium">{{ newBidsCount }}</div>
        </div>
      </div>
    </div>

    <div class="q-mt-sm">
      <div class="row items-center justify-between q-mb-xs">
        <div class="text-caption text-grey-7">Active jobs</div>
        <div class="text-caption text-grey-7">{{ activeJobsCount }}</div>
      </div>
      <div v-if="currentActiveJob" class="itta-dashboard-job-viewport">
        <transition name="itta-vertical-slide" mode="out-in">
          <div
            :key="`${currentActiveJob.id}-${activeJobIndex}`"
            class="itta-dashboard-preview-row itta-dashboard-preview-row--carousel"
          >
            <div class="row items-center justify-between">
              <div class="text-caption text-weight-medium ellipsis">{{ currentActiveJob.title }}</div>
              <div class="text-caption text-grey-7">{{ currentActiveJob.progress ?? 0 }}%</div>
            </div>
            <div class="text-caption text-grey-7 q-mt-xs">
              {{ formatStatus(currentActiveJob.status) }} · due {{ currentActiveJob.dueDate ?? 'TBD' }}
            </div>
            <q-linear-progress
              class="q-mt-xs"
              rounded
              size="6px"
              color="primary"
              :value="(currentActiveJob.progress ?? 0) / 100"
            />
          </div>
        </transition>
      </div>
      <div v-else class="text-caption text-grey-7">No active jobs yet.</div>
    </div>

    <div class="q-mt-sm">
      <div class="row items-center justify-between q-mb-xs">
        <div class="text-caption text-grey-7">Active requests</div>
        <div class="text-caption text-grey-7">{{ activeRequestsCount }}</div>
      </div>
      <div v-if="currentRequestRow" class="itta-dashboard-job-viewport">
        <transition name="itta-vertical-slide" mode="out-in">
          <div
            :key="`${currentRequestRow.id}-${activeRequestIndex}`"
            class="itta-dashboard-preview-row itta-dashboard-preview-row--carousel"
          >
            <div class="row items-center justify-between">
              <div class="text-caption text-weight-medium ellipsis">{{ currentRequestRow.title }}</div>
              <div class="text-caption text-grey-7">{{ currentRequestRow.progressLabel }}</div>
            </div>
            <div class="text-caption text-grey-7 q-mt-xs">
              {{ currentRequestRow.statusLabel }} · {{ currentRequestRow.bids }} bids
            </div>
            <q-linear-progress
              class="q-mt-xs"
              rounded
              size="6px"
              color="primary"
              :value="currentRequestRow.progress"
            />
          </div>
        </transition>
      </div>
      <div v-else class="text-caption text-grey-7">No active requests yet.</div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
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
const newBidsCount = computed(() => bidsStore.bids.filter((bid) => !bid.viewedBySewee).length);
const activeJobIndex = ref(0);
const currentActiveJob = computed(() => activeJobs.value[activeJobIndex.value] ?? null);
const activeRequestIndex = ref(0);
let rotateTimer: ReturnType<typeof setInterval> | null = null;
let requestRotateTimer: ReturnType<typeof setInterval> | null = null;

const requestRows = computed(() =>
  requestsStore.requests
    .filter((request) => request.status !== 'closed')
    .map((request) => {
      const bidCount = bidsStore.bidsByRequest(request.id).length;
      const progress =
        request.status === 'matched' ? 0.9 : Math.min(0.25 + bidCount * 0.2, 0.8);
      return {
        id: request.id,
        title: request.title,
        progress,
        bids: bidCount,
        statusLabel: request.status === 'matched' ? 'Matched' : 'Open',
        progressLabel: `${Math.round(progress * 100)}%`,
      };
    })
);
const currentRequestRow = computed(() => requestRows.value[activeRequestIndex.value] ?? null);

function goToDashboard() {
  void router.push('/customer/profile/dashboard');
}

function formatStatus(status: string) {
  return status.replace(/_/g, ' ');
}

function syncActiveIndex() {
  if (!activeJobs.value.length) {
    activeJobIndex.value = 0;
    return;
  }
  if (activeJobIndex.value >= activeJobs.value.length) {
    activeJobIndex.value = 0;
  }
}

function advanceJob() {
  if (activeJobs.value.length <= 1) return;
  activeJobIndex.value = (activeJobIndex.value + 1) % activeJobs.value.length;
}

function stopAutoRotate() {
  if (rotateTimer) {
    clearInterval(rotateTimer);
    rotateTimer = null;
  }
}

function stopRequestAutoRotate() {
  if (requestRotateTimer) {
    clearInterval(requestRotateTimer);
    requestRotateTimer = null;
  }
}

function startAutoRotate() {
  stopAutoRotate();
  if (activeJobs.value.length <= 1) return;
  rotateTimer = setInterval(() => {
    advanceJob();
  }, 3200);
}

function syncRequestIndex() {
  if (!requestRows.value.length) {
    activeRequestIndex.value = 0;
    return;
  }
  if (activeRequestIndex.value >= requestRows.value.length) {
    activeRequestIndex.value = 0;
  }
}

function advanceRequest() {
  if (requestRows.value.length <= 1) return;
  activeRequestIndex.value = (activeRequestIndex.value + 1) % requestRows.value.length;
}

function startRequestAutoRotate() {
  stopRequestAutoRotate();
  if (requestRows.value.length <= 1) return;
  requestRotateTimer = setInterval(() => {
    advanceRequest();
  }, 3400);
}

onMounted(() => {
  syncActiveIndex();
  startAutoRotate();
  syncRequestIndex();
  startRequestAutoRotate();
});

onBeforeUnmount(() => {
  stopAutoRotate();
  stopRequestAutoRotate();
});

watch(activeJobs, () => {
  syncActiveIndex();
  startAutoRotate();
});

watch(requestRows, () => {
  syncRequestIndex();
  startRequestAutoRotate();
});
</script>
