<template>
  <section class="itta-section">
    <div class="text-subtitle1 text-weight-medium">Sew requests inbox</div>
    <div class="row q-col-gutter-md q-mt-sm">
      <div v-for="request in requests" :key="request.id" class="col-12 col-sm-6">
        <RequestCard :request="request" button-label="Open" @action="openRequest" />
      </div>
    </div>
    <div v-if="isLoading" class="text-caption text-grey-7 q-mt-md">
      Loading requests...
    </div>
    <div v-else-if="error" class="text-caption text-negative q-mt-md">
      {{ error }}
    </div>
    <div v-else-if="!requests.length" class="text-caption text-grey-7 q-mt-md">
      No open requests right now.
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import RequestCard from 'components/domain/RequestCard.vue';
import { useRequestsStore } from 'src/stores/requests-store';

const requestsStore = useRequestsStore();
const requests = computed(() => requestsStore.requests.filter((item) => item.status === 'open'));
const isLoading = ref(false);
const error = ref('');
const router = useRouter();

function openRequest(id: string) {
  router.push(`/fashioneer/requests/${id}`);
}
</script>
