<template>
  <BaseCard title="Recent bids" ui-key="card:dashboard-bids">
    <div v-if="bids.length" class="row q-col-gutter-sm">
      <div v-for="bid in bids" :key="bid.id" class="col-12">
        <BidCard :bid="bid" :show-action="false" />
      </div>
    </div>
    <div v-else class="text-caption text-grey-7">No bids yet.</div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseCard from 'components/base/BaseCard.vue';
import BidCard from 'components/domain/BidCard.vue';
import { useBidsStore } from 'src/stores/bids-store';

const bidsStore = useBidsStore();
const bids = computed(() => bidsStore.bids.slice(0, 4));
</script>
