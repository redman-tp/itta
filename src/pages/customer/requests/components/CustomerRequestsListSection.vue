<template>
  <section class="itta-section">
    <div class="text-subtitle1 text-weight-medium">My sew requests</div>
    <div class="row q-col-gutter-md q-mt-sm">
      <div class="col-12 col-sm-6">
        <RequestCard
          v-for="request in requests"
          :key="request.id"
          :request="request"
          button-label="View bids"
          @action="openRequest"
        />
        <div v-if="isLoading" class="text-caption text-grey-7 q-mt-md">
          Loading requests...
        </div>
        <div v-else-if="error" class="text-caption text-negative q-mt-md">
          {{ error }}
        </div>
        <div v-else-if="!requests.length" class="text-caption text-grey-7 q-mt-md">
          No requests yet.
        </div>
      </div>
      <div class="col-12 col-sm-6">
        <BaseCard title="Bid summary" ui-key="card:bid-summary">
          <div v-if="selectedRequest">
            <div class="text-body2">
              Bids received: {{ bidCount }}
            </div>
            <div class="text-caption text-grey-7">
              Open the request to view bid details and accept.
            </div>
          </div>
          <div v-else class="text-caption text-grey-7">
            Select a request to view bid summary.
          </div>
        </BaseCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import BaseCard from 'components/base/BaseCard.vue';
import RequestCard from 'components/domain/RequestCard.vue';
import { useRequestsStore } from 'src/stores/requests-store';
import { useBidsStore } from 'src/stores/bids-store';

const requestsStore = useRequestsStore();
const bidsStore = useBidsStore();
const selectedRequestId = ref('');
const router = useRouter();
const isLoading = ref(false);
const error = ref('');

const requests = computed(() => requestsStore.requests);
const selectedRequest = computed(() =>
  requestsStore.requests.find((item) => item.id === selectedRequestId.value)
);
const bidCount = computed(() =>
  selectedRequestId.value ? bidsStore.bidsByRequest(selectedRequestId.value).length : 0
);

function openRequest(id: string) {
  selectedRequestId.value = id;
  router.push(`/customer/requests/${id}`);
}
</script>
