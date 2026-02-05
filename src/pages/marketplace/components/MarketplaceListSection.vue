<template>
  <section class="itta-section">
    <div class="marketplace-masonry">
      <div v-for="design in designs" :key="design.id" class="marketplace-item">
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
    <div v-if="isLoading" class="text-caption text-grey-7 q-mt-md">
      Loading marketplace items...
    </div>
    <div v-else-if="error" class="text-caption text-negative q-mt-md">
      {{ error }}
    </div>
    <div v-else-if="!designs.length" class="text-caption text-grey-7 q-mt-md">
      No designs match your filters.
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import DesignCard from 'components/domain/DesignCard.vue';
import { useDesignsStore } from 'src/stores/designs-store';

const router = useRouter();
const designsStore = useDesignsStore();

const designs = computed(() =>
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
