<template>
  <BaseCard title="Measurements" ui-key="card:profile-measurements">
    <div v-if="record" class="text-caption text-grey-7">
      Code: {{ record.code ?? '—' }} · Updated {{ record.updatedAt }}
    </div>
    <div v-else class="text-caption text-grey-7">No measurements yet.</div>
    <BaseButton class="q-mt-sm" type="ghost" label="Edit measurements" @click="edit" />
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import BaseButton from 'components/base/BaseButton.vue';
import BaseCard from 'components/base/BaseCard.vue';
import { useMeasurementsStore } from 'src/stores/measurements-store';

const router = useRouter();
const measurementsStore = useMeasurementsStore();
const record = computed(() => measurementsStore.measurements[0]);

function edit() {
  router.push('/customer/measurements');
}
</script>
