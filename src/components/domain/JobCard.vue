<template>
  <BaseCard
    :title="job.title"
    :subtitle="jobStatus"
    :meta="metaLine"
    :button="showAction"
    :button-label="buttonLabel"
    :button-type="buttonType"
    ui-key="card:job"
    @button="onAction"
  >
    <div v-if="job.progress !== undefined" class="text-caption text-grey-7">
      Progress {{ job.progress }}%
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseCard from 'components/base/BaseCard.vue';
import type { Job } from 'src/types/domain';

interface Props {
  job: Job;
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

const jobStatus = computed(() => props.job.status.replace(/_/g, ' '));

const metaLine = computed(() => {
  if (!props.job.dueDate) return undefined;
  return `Due ${props.job.dueDate}`;
});

function onAction() {
  emit('action', props.job.id);
}
</script>
