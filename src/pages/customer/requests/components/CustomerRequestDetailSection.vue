<template>
  <section class="itta-section">
    <BaseCard v-if="request" :title="request.title" ui-key="card:request-detail">
      <div class="text-caption text-grey-7">{{ request.notes }}</div>
      <div class="row q-gutter-xs q-mt-sm">
        <TagPill v-for="design in attachedDesigns" :key="design.id" type="design" :label="design.tag ?? design.title" />
        <TagPill v-if="request.attachedFabricTag" type="fabric" :label="request.attachedFabricTag" />
      </div>
      <div v-if="request.attachedFabricImage" class="q-mt-sm">
        <q-img :src="request.attachedFabricImage" ratio="1" />
      </div>
    </BaseCard>
    <BaseCard title="Bids" ui-key="card:bids" class="q-mt-md">
      <div v-if="bids.length" class="row q-col-gutter-md">
        <div v-for="bid in bids" :key="bid.id" class="col-12 col-sm-6">
          <BidCard :bid="bid" @open="openBid" />
        </div>
      </div>
      <div v-else class="text-caption text-grey-7">No bids yet.</div>
    </BaseCard>
    <BaseModal
      v-model="showBid"
      title="Bid detail"
      :show-confirm="false"
      @cancel="closeBid"
    >
      <BidDetail v-if="activeBid" :bid="activeBid" @accept="acceptBid" @close="closeBid" />
    </BaseModal>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BaseCard from 'components/base/BaseCard.vue';
import BaseModal from 'components/base/BaseModal.vue';
import TagPill from 'components/base/TagPill.vue';
import BidCard from 'components/domain/BidCard.vue';
import BidDetail from 'components/domain/BidDetail.vue';
import { useDesignsStore } from 'src/stores/designs-store';
import { useRequestsStore } from 'src/stores/requests-store';
import { useBidsStore } from 'src/stores/bids-store';
import { useJobsStore } from 'src/stores/jobs-store';
import { useActivityStore } from 'src/stores/activity-store';
import { useNotificationsStore } from 'src/stores/notifications-store';
import type { Bid } from 'src/types/domain';

const route = useRoute();
const router = useRouter();
const requestsStore = useRequestsStore();
const designsStore = useDesignsStore();
const bidsStore = useBidsStore();
const jobsStore = useJobsStore();
const activityStore = useActivityStore();
const notificationsStore = useNotificationsStore();

const request = computed(() =>
  requestsStore.requests.find((item) => item.id === route.params.id)
);
const bids = computed(() => bidsStore.bidsByRequest(route.params.id as string));
const attachedDesigns = computed(() =>
  designsStore.items.filter((item) => request.value?.attachedDesignIds?.includes(item.id))
);

const showBid = ref(false);
const activeBidId = ref('');

const activeBid = computed(() => bids.value.find((item) => item.id === activeBidId.value));

async function openBid(bidId: string) {
  activeBidId.value = bidId;
  showBid.value = true;
  await bidsStore.markViewed(bidId);
  notificationsStore.pushNotification(
    'BID_VIEWED',
    'Bid viewed',
    `Your bid was viewed by the sewee.`,
    { bidId, requestId: route.params.id as string }
  );
  activityStore.addEvent('BID_VIEWED', 'Bid viewed', `Viewed bid ${bidId}`, 'visibility');
}

function closeBid() {
  showBid.value = false;
}

function acceptBid(bid: Bid) {
  if (!request.value) return;
  request.value.status = 'matched';
  const startDate = new Date().toISOString().slice(0, 10);
  const endDate = new Date(Date.now() + bid.durationDays * 86400000)
    .toISOString()
    .slice(0, 10);
  jobsStore.createJob({
    id: `job-${Date.now()}`,
    title: request.value.title,
    status: 'pending',
    startDate,
    dueDate: endDate,
    endDate,
    durationDays: bid.durationDays,
    selectedBidId: bid.id,
    seweeId: 'cust-001',
    fashioneerId: bid.fashioneerId,
    customerName: 'Amina Okoye',
    fashioneerName: bid.fashioneerName,
    progressUpdates: [],
  });
  activityStore.addEvent('BID_ACCEPTED', 'Bid accepted', bid.fashioneerName, 'check');
  notificationsStore.pushNotification(
    'BID_ACCEPTED',
    'Bid accepted',
    `Your bid was accepted for ${request.value.title}.`,
    { bidId: bid.id, requestId: request.value.id }
  );
  showBid.value = false;
  router.push('/customer/jobs');
}
</script>
