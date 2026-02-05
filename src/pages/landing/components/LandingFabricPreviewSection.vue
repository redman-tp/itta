<template>
  <section class="itta-section">
    <div class="row items-center justify-between">
      <div class="text-subtitle1 text-weight-medium">Fabric market</div>
      <BaseButton type="text" label="Browse Fabric Market" to="/fabrics" />
    </div>
    <div class="text-caption text-grey-7 q-mt-xs">
      Sewees can buy fabric or allow fashioneers to source using a fabric tag.
    </div>
    <div class="row q-col-gutter-sm q-mt-sm">
      <div v-for="fabric in fabrics" :key="fabric.id" class="col-6 col-sm-3">
        <FabricCard :fabric="fabric" :show-action="false" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseButton from 'components/base/BaseButton.vue';
import FabricCard from 'components/domain/FabricCard.vue';
import { useFabricsStore } from 'src/stores/fabrics-store';

const fabricsStore = useFabricsStore();
const fabrics = computed(() => fabricsStore.items.slice(0, 4));
</script>
