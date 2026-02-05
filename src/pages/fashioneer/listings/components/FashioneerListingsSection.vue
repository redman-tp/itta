<template>
  <section class="itta-section">
    <div class="row items-center justify-between">
      <div class="text-subtitle1 text-weight-medium">Marketplace listings</div>
      <BaseButton label="New listing" />
    </div>
    <div class="row q-col-gutter-md q-mt-sm">
      <div v-for="design in designs" :key="design.id" class="col-12 col-sm-6">
        <DesignCard :design="design" button-label="Edit" @action="editListing" />
      </div>
    </div>
    <div v-if="!designs.length" class="text-caption text-grey-7 q-mt-md">
      No listings yet. Create your first design.
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseButton from 'components/base/BaseButton.vue';
import DesignCard from 'components/domain/DesignCard.vue';
import { useDesignsStore } from 'src/stores/designs-store';

const designsStore = useDesignsStore();
const designs = computed(() => designsStore.items);

function editListing(id: string) {
  void id;
}
</script>
