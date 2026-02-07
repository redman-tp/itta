<template>
  <BaseCard title="Measurements" ui-key="card:profile-measurements">
    <div v-if="record" class="itta-measurement-preview">
      <div class="row items-center justify-between q-gutter-sm">
        <div class="text-caption text-grey-7">Quick preview</div>
        <q-btn flat dense round icon="edit" @click="edit" />
      </div>
      <div class="text-caption text-grey-7 q-mt-xs">
        Last updated {{ record.updatedAt }}
      </div>
      <div class="row q-col-gutter-sm q-mt-sm">
        <div v-for="entry in previewEntries" :key="entry.key" class="col-6">
          <div class="itta-measurement-chip">
            <div class="text-caption text-grey-7">{{ entry.label }}</div>
            <div class="text-caption text-weight-medium">{{ entry.value }}</div>
          </div>
        </div>
      </div>
      <div class="row items-center justify-between q-mt-sm q-gutter-sm">
        <div class="text-caption text-grey-7">Measurement code</div>
        <q-badge color="primary" text-color="white" class="q-px-sm q-py-xs">
          {{ record.code ?? 'N/A' }}
        </q-badge>
      </div>
      <div class="text-caption text-grey-7 q-mt-sm">
        {{ fieldsCount }} saved fields ready to share with fashioneers.
      </div>
    </div>
    <div v-else class="text-caption text-grey-7">No measurements yet.</div>
    <BaseButton v-if="!record" class="q-mt-sm" type="ghost" label="Add measurements" @click="edit" />
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
const fieldsCount = computed(() => Object.keys(record.value?.values ?? {}).length);
const previewEntries = computed(() => {
  const source = record.value?.values ?? {};
  return Object.entries(source)
    .slice(0, 4)
    .map(([key, value]) => ({
      key,
      label: key
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (letter) => letter.toUpperCase()),
      value: String(value),
    }));
});

function edit() {
  void router.push('/customer/measurements');
}
</script>
