<template>
  <BaseCard ui-key="card:dashboard-requests-progress">
    <div class="row items-center justify-between">
      <div class="text-subtitle1 text-weight-medium">Active requests</div>
      <BaseButton type="text" label="View all" @click="goToRequests" />
    </div>

    <div v-if="requestRows.length" class="q-mt-sm">
      <div v-for="row in requestRows" :key="row.id" class="itta-dashboard-row">
        <div class="row items-center justify-between q-gutter-sm">
          <div class="text-caption text-weight-medium ellipsis">{{ row.title }}</div>
          <q-badge :color="row.statusColor" text-color="white" rounded>
            {{ row.statusLabel }}
          </q-badge>
        </div>
        <div class="row items-center justify-between q-mt-xs">
          <div class="text-caption text-grey-7">{{ row.bids }} bids received</div>
          <div class="text-caption text-weight-medium">{{ row.progressLabel }}</div>
        </div>
        <q-linear-progress
          class="q-mt-xs"
          rounded
          size="7px"
          :value="row.progress"
          color="primary"
        />
      </div>
    </div>

    <div v-else class="text-caption text-grey-7 q-mt-sm">No active requests.</div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import BaseButton from 'components/base/BaseButton.vue';
import BaseCard from 'components/base/BaseCard.vue';
import { useBidsStore } from 'src/stores/bids-store';
import { useRequestsStore } from 'src/stores/requests-store';

const router = useRouter();
const requestsStore = useRequestsStore();
const bidsStore = useBidsStore();

const requestRows = computed(() =>
  requestsStore.requests
    .filter((request) => request.status !== 'closed')
    .slice(0, 4)
    .map((request) => {
      const bids = bidsStore.bidsByRequest(request.id).length;
      const progress =
        request.status === 'matched'
          ? 0.85
          : Math.min(0.2 + bids * 0.2, 0.75);
      return {
        id: request.id,
        title: request.title,
        bids,
        progress,
        progressLabel: `${Math.round(progress * 100)}%`,
        statusLabel: request.status === 'matched' ? 'Matched' : 'Open',
        statusColor: request.status === 'matched' ? 'positive' : 'primary',
      };
    })
);

function goToRequests() {
  void router.push('/customer/requests');
}
</script>
