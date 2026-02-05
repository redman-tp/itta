<template>
  <section class="itta-section">
    <BaseCard v-if="request" :title="request.title" ui-key="card:request-detail">
      <div class="text-caption text-grey-7">{{ request.notes }}</div>
      <div class="row q-gutter-xs q-mt-sm">
        <TagPill v-for="design in attachedDesigns" :key="design.id" type="design" :label="design.tag ?? design.title" />
        <TagPill v-if="request.attachedFabricTag" type="fabric" :label="request.attachedFabricTag" />
      </div>
      <div v-if="request.fabricIntent" class="text-caption text-grey-7 q-mt-sm">
        Fabric intent: {{ request.fabricIntent }}
      </div>
      <div v-if="request.images?.length" class="row q-col-gutter-sm q-mt-sm">
        <div v-for="img in request.images" :key="img" class="col-6">
          <q-img :src="img" ratio="1" />
        </div>
      </div>
      <div v-if="request.attachedFabricImage" class="q-mt-sm">
        <q-img :src="request.attachedFabricImage" ratio="1" />
      </div>
    </BaseCard>
    <BaseCard title="Place a bid" ui-key="card:bid-form" class="q-mt-md">
      <div class="q-gutter-sm">
        <BaseInput v-model="amount" label="Bid amount" type="number" />
        <BaseInput v-model="durationDays" label="Proposed duration (days)" type="number" />
        <BaseInput v-model="message" label="Message" type="textarea" autogrow />
        <BaseButton label="Submit bid" @click="submitBid" />
      </div>
    </BaseCard>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import BaseButton from 'components/base/BaseButton.vue';
import BaseCard from 'components/base/BaseCard.vue';
import BaseInput from 'components/base/BaseInput.vue';
import TagPill from 'components/base/TagPill.vue';
import { useDesignsStore } from 'src/stores/designs-store';
import { useRequestsStore } from 'src/stores/requests-store';
import { useBidsStore } from 'src/stores/bids-store';
import { useActivityStore } from 'src/stores/activity-store';

const route = useRoute();
const requestsStore = useRequestsStore();
const designsStore = useDesignsStore();
const bidsStore = useBidsStore();
const activityStore = useActivityStore();

const request = computed(() =>
  requestsStore.requests.find((item) => item.id === route.params.id)
);
const attachedDesigns = computed(() =>
  designsStore.items.filter((item) => request.value?.attachedDesignIds?.includes(item.id))
);

const amount = ref('');
const durationDays = ref('');
const message = ref('');

async function submitBid() {
  if (!request.value) return;
  const bid = {
    id: `bid-${Date.now()}`,
    requestId: request.value.id,
    fashioneerId: 'fash-101',
    fashioneerName: 'Esther Adebayo',
    amount: Number(amount.value) || 0,
    durationDays: Number(durationDays.value) || 7,
    message: message.value,
    createdAt: new Date().toISOString().slice(0, 10),
  };
  await bidsStore.createBid(bid as any);
  activityStore.addEvent('BID_RECEIVED', 'Bid submitted', request.value.title, 'local_offer');
  amount.value = '';
  durationDays.value = '';
  message.value = '';
}
</script>
