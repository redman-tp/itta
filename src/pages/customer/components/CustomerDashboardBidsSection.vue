<template>
  <BaseCard ui-key="card:dashboard-bids">
    <div class="row items-center justify-between">
      <div class="text-subtitle1 text-weight-medium">Latest bids</div>
      <BaseButton type="text" label="Open requests" @click="goToRequests" />
    </div>

    <div v-if="bids.length" class="q-mt-sm">
      <div v-for="bid in bids" :key="bid.id" class="itta-dashboard-row">
        <div class="row items-center justify-between q-gutter-sm">
          <div class="text-caption text-weight-medium">{{ bid.fashioneerName }}</div>
          <q-badge :color="bid.viewedBySewee ? 'grey-7' : 'primary'" text-color="white" rounded>
            {{ bid.viewedBySewee ? 'Viewed' : 'New' }}
          </q-badge>
        </div>
        <div class="row items-center justify-between q-mt-xs">
          <div class="text-caption text-grey-7">{{ formatAmount(bid.amount) }}</div>
          <div class="text-caption text-grey-7">{{ bid.durationDays }} days</div>
        </div>
      </div>
    </div>
    <div v-else class="text-caption text-grey-7 q-mt-sm">No bids yet.</div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import BaseButton from 'components/base/BaseButton.vue';
import BaseCard from 'components/base/BaseCard.vue';
import { useBidsStore } from 'src/stores/bids-store';

const router = useRouter();
const bidsStore = useBidsStore();
const bids = computed(() => bidsStore.bids.slice(0, 5));

function formatAmount(amount: number) {
  return `N ${amount.toLocaleString()}`;
}

function goToRequests() {
  void router.push('/customer/requests');
}
</script>
