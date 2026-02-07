<template>
  <section class="itta-section itta-section--tight">
    <q-infinite-scroll :offset="80" @load="handleLoad" class="itta-product-feed">
      <div class="marketplace-masonry">
        <div v-for="(design, index) in feedItems" :key="`${design.id}-${index}`" class="marketplace-item">
          <DesignCard
            :design="design"
            :show-bookmark="true"
            :clickable="true"
            :show-action="false"
            @action="requestFromDesign"
            @bookmark="toggleBookmark"
            @click="goToDetail"
          />
        </div>
      </div>
      <template #loading>
        <div class="row justify-center q-my-sm">
          <q-spinner size="20px" color="primary" />
        </div>
      </template>
    </q-infinite-scroll>
    <div v-if="isLoading" class="text-caption text-grey-7 q-mt-md">
      Loading marketplace items...
    </div>
    <div v-else-if="error" class="text-caption text-negative q-mt-md">
      {{ error }}
    </div>
    <div v-else-if="!filteredDesigns.length" class="text-caption text-grey-7 q-mt-md">
      No designs match your filters.
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import DesignCard from 'components/domain/DesignCard.vue';
import { useDesignsStore } from 'src/stores/designs-store';
import type { DesignItem } from 'src/types/domain';

const router = useRouter();
const designsStore = useDesignsStore();

const filteredDesigns = computed(() =>
  designsStore.items.filter((item) => {
    const query = (designsStore.filters.search ?? '').toLowerCase();
    const matchesSearch = designsStore.filters.searchActive
      ? item.title.toLowerCase().includes(query)
      : true;
    const category = (designsStore.filters.category ?? '').toLowerCase();
    if (!category) return matchesSearch;
    if (category === 'casual') return matchesSearch && item.category === 'Casual';
    if (category === 'traditional') return matchesSearch && item.category === 'Traditional';
    if (category === 'formal') return matchesSearch && item.category === 'Formal';
    if (category === 'men') return matchesSearch && ['men', 'unisex'].includes(item.audience ?? '');
    if (category === 'women') return matchesSearch && ['women', 'unisex'].includes(item.audience ?? '');
    if (category === 'kids') return matchesSearch && item.audience === 'kids';
    return matchesSearch;
  })
);
const isLoading = ref(false);
const error = ref('');
const feedItems = ref<DesignItem[]>([]);
const cursor = ref(0);
const chunkSize = 8;

function appendBatch() {
  const source = filteredDesigns.value;
  if (!source.length) return;
  const batch: DesignItem[] = [];
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

watch(filteredDesigns, () => {
  feedItems.value = [];
  cursor.value = 0;
  appendBatch();
});

function goToDetail(id: string) {
  router.push(`/marketplace/${id}`);
}

function requestFromDesign(id: string) {
  router.push({ path: '/customer/sew-request', query: { designId: id } });
}

function toggleBookmark(id: string) {
  designsStore.toggleBookmark(id);
}

</script>
