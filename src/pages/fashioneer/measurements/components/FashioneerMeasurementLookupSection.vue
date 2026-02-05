<template>
  <section class="itta-section">
    <div class="text-subtitle1 text-weight-medium">Measurement code lookup</div>
    <div class="q-mt-md q-gutter-sm">
      <BaseInput v-model="code" label="Measurement code" />
      <BaseButton label="Lookup" @click="lookup" />
    </div>
    <BaseCard v-if="lookupResult" title="Measurement details" class="q-mt-md">
      <div v-for="(value, key) in lookupResult.values" :key="key" class="text-body2">
        {{ key }}: {{ value }}
      </div>
    </BaseCard>
    <div v-else class="text-caption text-grey-7 q-mt-md">
      Enter a code to view measurements. Access is enforced on the backend.
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import BaseButton from 'components/base/BaseButton.vue';
import BaseCard from 'components/base/BaseCard.vue';
import BaseInput from 'components/base/BaseInput.vue';
import { useMeasurementsStore } from 'src/stores/measurements-store';

const measurementsStore = useMeasurementsStore();
const code = ref('');
const lookupResult = computed(() => measurementsStore.selectedCode);

function lookup() {
  measurementsStore.lookupCode(code.value);
}
</script>
