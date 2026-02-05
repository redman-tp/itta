<template>
  <section class="itta-section">
    <BaseTabs v-model="category" :tabs="tabs" />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseTabs from 'components/base/BaseTabs.vue';
import { useDesignsStore } from 'src/stores/designs-store';

const designsStore = useDesignsStore();
const tabs = [
  { name: 'all', label: 'All' },
  { name: 'men', label: 'Men' },
  { name: 'women', label: 'Women' },
  { name: 'kids', label: 'Kids' },
  { name: 'casual', label: 'Casual' },
  { name: 'traditional', label: 'Traditional' },
  { name: 'formal', label: 'Formal' },
];

const category = computed({
  get: () => (designsStore.filters.category ?? 'all'),
  set: (value) => designsStore.setFilters({ category: value === 'all' ? '' : value }),
});
</script>
