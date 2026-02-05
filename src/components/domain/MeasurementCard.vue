<template>
  <BaseCard
    :title="record.label"
    :subtitle="`Updated ${record.updatedAt}`"
    ui-key="card:measurement"
  >
    <div class="row items-center q-gutter-xs">
      <BaseBadge v-if="record.code" type="success" :label="`Code ${record.code}`" />
      <BaseBadge v-if="record.photoUrl" type="info" label="Photo" />
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseBadge from 'components/base/BaseBadge.vue';
import BaseCard from 'components/base/BaseCard.vue';
import type { MeasurementRecord } from 'src/types/domain';

interface Props {
  record: MeasurementRecord;
}

defineProps<Props>();
</script>
