<template>
  <section v-if="showFilters" class="itta-section">
    <div class="text-subtitle1 text-weight-medium">Filters</div>
    <div class="row q-col-gutter-sm q-mt-sm">
      <div class="col-6 col-sm-3">
        <BaseSelect v-model="filters.size" label="Size" :options="sizes" />
      </div>
      <div class="col-6 col-sm-3">
        <BaseInput v-model="filters.location" label="Location" />
      </div>
      <div class="col-6 col-sm-3">
        <BaseInput v-model="filters.priceMax" label="Max price" type="number" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import BaseInput from 'components/base/BaseInput.vue';
import BaseSelect from 'components/base/BaseSelect.vue';
import { useDesignsStore } from 'src/stores/designs-store';

const designsStore = useDesignsStore();
const filters = reactive({
  size: '',
  location: '',
  priceMax: 0,
});

const sizes = ['S', 'M', 'L', 'XL'];

watch(filters, () => {
  designsStore.setFilters({ ...filters });
});

const showFilters = computed(() => !!designsStore.filters.searchActive);
</script>
