<template>
  <section class="itta-section itta-section--tight itta-section--discover-vertical">
    <div class="text-subtitle1 text-weight-medium itta-section-title--inset">More to love</div>
    <q-infinite-scroll :offset="80" @load="handleLoad" class="itta-product-feed">
      <div class="marketplace-masonry">
        <div v-for="(item, index) in feedItems" :key="`${item.id}-${index}`" class="marketplace-item">
          <DesignCard
            v-if="item.type === 'design'"
            :design="item.design"
            :show-action="false"
            :show-bookmark="true"
            :clickable="true"
            @click="goToDesign"
          />
          <FabricCard v-else :fabric="item.fabric" :show-action="false" />
        </div>
      </div>
      <template #loading>
        <div class="row justify-center q-my-sm">
          <q-spinner size="20px" color="primary" />
        </div>
      </template>
    </q-infinite-scroll>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import DesignCard from 'components/domain/DesignCard.vue';
import FabricCard from 'components/domain/FabricCard.vue';
import { useDesignsStore } from 'src/stores/designs-store';
import { useFabricsStore } from 'src/stores/fabrics-store';

const router = useRouter();
const designsStore = useDesignsStore();
const fabricsStore = useFabricsStore();

const items = computed(() => {
  const designs = designsStore.items.slice(0, 6).map((design) => ({
    id: `design-${design.id}`,
    type: 'design' as const,
    design,
  }));
  const fabrics = fabricsStore.items.slice(0, 6).map((fabric) => ({
    id: `fabric-${fabric.id}`,
    type: 'fabric' as const,
    fabric,
  }));
  const mixed: Array<(typeof designs)[number] | (typeof fabrics)[number]> = [];
  const max = Math.max(designs.length, fabrics.length);
  for (let i = 0; i < max; i += 1) {
    if (designs[i]) mixed.push(designs[i]);
    if (fabrics[i]) mixed.push(fabrics[i]);
  }
  return mixed;
});

const feedItems = ref<typeof items.value>([]);
const chunkSize = 6;

function appendBatch() {
  const source = items.value;
  if (!source.length) return;
  const batch = [];
  for (let i = 0; i < chunkSize; i += 1) {
    const idx = Math.floor(Math.random() * source.length);
    batch.push(source[idx]);
  }
  feedItems.value = [...feedItems.value, ...batch];
}

function handleLoad(_index: number, done: () => void) {
  appendBatch();
  done();
}

function goToDesign(id: string) {
  void router.push(`/marketplace/${id}`);
}

onMounted(() => {
  appendBatch();
});

watch(items, () => {
  feedItems.value = [];
  appendBatch();
});
</script>
