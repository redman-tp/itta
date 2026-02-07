<template>
  <section class="itta-section itta-section--tight">
    <div class="row items-center justify-between q-mb-sm">
      <div class="text-subtitle1 text-weight-medium">Fabric Market</div>
      <BaseInput v-model="search" label="Search fabrics" />
    </div>
    <q-infinite-scroll :offset="80" @load="handleLoad" class="itta-product-feed">
      <div class="marketplace-masonry">
        <div
          v-for="(fabric, index) in feedItems"
          :key="`${fabric.id}-${index}`"
          class="marketplace-item"
        >
          <FabricCard :fabric="fabric" :show-action="false" />
        </div>
      </div>
      <template #loading>
        <div class="row justify-center q-my-sm">
          <q-spinner size="20px" color="primary" />
        </div>
      </template>
    </q-infinite-scroll>
    <div v-if="!filteredFabrics.length" class="text-caption text-grey-7 q-mt-md">
      No fabrics match your search.
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import BaseInput from 'components/base/BaseInput.vue';
import FabricCard from 'components/domain/FabricCard.vue';
import { useFabricsStore } from 'src/stores/fabrics-store';
import type { FabricItem } from 'src/types/domain';

const fabricsStore = useFabricsStore();
const search = ref('');
const filteredFabrics = computed(() =>
  fabricsStore.items.filter((item) =>
    item.name.toLowerCase().includes(search.value.toLowerCase())
  )
);

const feedItems = ref<FabricItem[]>([]);
const cursor = ref(0);
const chunkSize = 6;

function appendBatch() {
  const source = filteredFabrics.value;
  if (!source.length) return;
  const batch: FabricItem[] = [];
  for (let i = 0; i < chunkSize; i += 1) {
    const idx = (cursor.value + i) % source.length;
    batch.push(source[idx]);
  }
  cursor.value = (cursor.value + chunkSize) % source.length;
  feedItems.value = [...feedItems.value, ...batch];
}

function handleLoad(_index: number, done: () => void) {
  appendBatch();
  done();
}

onMounted(() => {
  appendBatch();
});

watch(filteredFabrics, () => {
  feedItems.value = [];
  cursor.value = 0;
  appendBatch();
});
</script>
