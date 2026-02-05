<template>
  <BaseCard
    :title="bid.fashioneerName"
    :subtitle="`Duration ${bid.durationDays} days`"
    :meta="`Amount N ${bid.amount.toLocaleString()}`"
    ui-key="card:bid-detail"
  >
    <div v-if="bid.message" class="text-body2">{{ bid.message }}</div>
    <div class="row q-gutter-sm q-mt-md">
      <BaseButton label="Accept bid" @click="accept" />
      <BaseButton type="ghost" label="Close" @click="close" />
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseButton from 'components/base/BaseButton.vue';
import BaseCard from 'components/base/BaseCard.vue';
import type { Bid } from 'src/types/domain';

interface Props {
  bid: Bid;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'accept', bid: Bid): void;
  (e: 'close'): void;
}>();

function accept() {
  emit('accept', props.bid);
}

function close() {
  emit('close');
}
</script>
