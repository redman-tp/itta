<template>
  <section class="itta-section">
    <div class="text-subtitle1 text-weight-medium">Measurements</div>
    <div class="q-mt-md q-gutter-sm">
      <BaseInput v-model="values.chest" label="Chest / Bust" type="number" />
      <BaseInput v-model="values.waist" label="Waist" type="number" />
      <BaseInput v-model="values.hips" label="Hips" type="number" />
      <BaseInput v-model="values.sleeve" label="Sleeve length" type="number" />
      <BaseInput v-model="values.shoulder" label="Shoulder" type="number" />
      <BaseInput v-model="values.trouserLength" label="Trouser length" type="number" />
      <BaseButton label="Save measurements" @click="saveMeasurements" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import BaseButton from 'components/base/BaseButton.vue';
import BaseInput from 'components/base/BaseInput.vue';
import { useMeasurementsStore } from 'src/stores/measurements-store';

const measurementsStore = useMeasurementsStore();

const values = reactive({
  chest: '',
  waist: '',
  hips: '',
  sleeve: '',
  shoulder: '',
  trouserLength: '',
});

function saveMeasurements() {
  const updated = {
    id: 'msr-001',
    label: 'Default Set',
    updatedAt: new Date().toISOString().slice(0, 10),
    values: { ...values },
  };
  measurementsStore.updateMeasurement(updated);
  measurementsStore.generateCode();
}
</script>
