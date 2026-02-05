<template>
  <BaseCard
    :title="bid.fashioneerName"
    :subtitle="`Duration ${bid.durationDays} days`"
    :meta="`Amount N ${bid.amount.toLocaleString()}`"
    :button="showAction"
    :button-label="buttonLabel"
    ui-key="card:bid"
    @button="open"
  >
    <div v-if="bid.viewedBySewee" class="text-caption text-grey-7">
      Viewed
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from 'components/base/BaseCard.vue';
import type { Bid } from 'src/types/domain';

interface Props {
  bid: Bid;
  showAction?: boolean;
  buttonLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  showAction: true,
  buttonLabel: 'View bid',
});

const emit = defineEmits<{ (e: 'open', bidId: string): void }>();

function open() {
  emit('open', props.bid.id);
}
</script>
