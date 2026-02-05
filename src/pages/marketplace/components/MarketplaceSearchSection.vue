<template>
  <section class="itta-section">
    <BaseInput v-model="search" label="Search designs">
      <template #append>
        <q-btn
          round
          dense
          flat
          icon="search"
          aria-label="Search"
          @click="submitSearch"
        />
      </template>
    </BaseInput>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseInput from 'components/base/BaseInput.vue';
import { useDesignsStore } from 'src/stores/designs-store';

const designsStore = useDesignsStore();
const search = computed({
  get: () => designsStore.filters.search ?? '',
  set: (value) => designsStore.setFilters({ search: value }),
});

function submitSearch() {
  const query = (designsStore.filters.search ?? '').trim();
  designsStore.setFilters({ search: query, searchActive: query.length > 0 });
}
</script>
