<template>
  <section class="itta-section">
    <div class="row items-center justify-between">
      <div class="text-subtitle1 text-weight-medium">Marketplace</div>
      <BaseButton type="text" label="Browse" to="/marketplace" />
    </div>
    <div class="row q-col-gutter-md q-mt-sm">
      <div v-for="design in designs" :key="design.id" class="col-12 col-sm-6">
        <DesignCard :design="design" :show-action="false" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseButton from 'components/base/BaseButton.vue';
import DesignCard from 'components/domain/DesignCard.vue';
import { useDesignsStore } from 'src/stores/designs-store';

const designsStore = useDesignsStore();
const designs = computed(() => designsStore.items.slice(0, 2));
</script>
