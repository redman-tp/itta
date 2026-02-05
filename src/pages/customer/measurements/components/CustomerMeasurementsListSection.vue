<template>
  <section class="itta-section">
    <div class="text-subtitle1 text-weight-medium">Saved measurements</div>
    <div class="q-mt-sm">
      <MeasurementCard
        v-for="record in measurements"
        :key="record.id"
        :record="record"
      />
    </div>
    <div v-if="!measurements.length" class="text-caption text-grey-7 q-mt-md">
      No measurements yet. Add your first measurement set.
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import MeasurementCard from 'components/domain/MeasurementCard.vue';
import { useMeasurementsStore } from 'src/stores/measurements-store';

const measurementsStore = useMeasurementsStore();
const measurements = computed(() => measurementsStore.measurements);
</script>
