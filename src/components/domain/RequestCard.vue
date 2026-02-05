<template>
  <BaseCard
    :title="request.title"
    :subtitle="request.location"
    :meta="metaLine"
    :button="showAction"
    :button-label="buttonLabel"
    :button-type="buttonType"
    ui-key="card:request"
    @button="onAction"
  >
    <div class="text-caption text-grey-7">{{ request.notes }}</div>
    <div class="row items-center q-gutter-xs q-mt-sm">
      <BaseBadge v-if="request.status" :label="request.status" type="info" />
      <BaseBadge v-if="request.fabric" :label="request.fabric" />
      <BaseBadge v-if="request.color" :label="request.color" />
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseBadge from 'components/base/BaseBadge.vue';
import BaseCard from 'components/base/BaseCard.vue';
import type { SewRequest } from 'src/types/domain';

interface Props {
  request: SewRequest;
  showAction?: boolean;
  buttonLabel?: string;
  buttonType?: 'primary' | 'secondary' | 'ghost' | 'text' | 'danger';
}

const props = withDefaults(defineProps<Props>(), {
  showAction: true,
  buttonLabel: 'View',
  buttonType: 'primary',
});

const emit = defineEmits<{ (e: 'action', id: string): void }>();

const metaLine = computed(() => {
  if (!props.request.budgetMin && !props.request.budgetMax) return undefined;
  return `Budget N ${props.request.budgetMin ?? '-'} - N ${props.request.budgetMax ?? '-'}`;
});

function onAction() {
  emit('action', props.request.id);
}
</script>
