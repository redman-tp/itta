<template>
  <BaseCard title="Open requests" ui-key="card:dashboard-requests">
    <div v-if="requests.length" class="row q-col-gutter-sm">
      <div v-for="request in requests" :key="request.id" class="col-12">
        <RequestCard :request="request" :show-action="false" />
      </div>
    </div>
    <div v-else class="text-caption text-grey-7">No open requests.</div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseCard from 'components/base/BaseCard.vue';
import RequestCard from 'components/domain/RequestCard.vue';
import { useRequestsStore } from 'src/stores/requests-store';

const requestsStore = useRequestsStore();
const requests = computed(() =>
  requestsStore.requests.filter((item) => item.status === 'open').slice(0, 3)
);
</script>
