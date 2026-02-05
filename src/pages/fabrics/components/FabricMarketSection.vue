<template>
  <section class="itta-section">
    <div class="row items-center justify-between q-mb-sm">
      <div class="text-subtitle1 text-weight-medium">Fabric Market</div>
      <BaseInput v-model="search" label="Search fabrics" />
    </div>
    <div class="row q-col-gutter-md">
      <div v-for="fabric in fabrics" :key="fabric.id" class="col-12 col-sm-6">
        <FabricCard :fabric="fabric" :show-action="false" />
      </div>
    </div>
    <div v-if="!fabrics.length" class="text-caption text-grey-7 q-mt-md">
      No fabrics match your search.
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import BaseInput from 'components/base/BaseInput.vue';
import FabricCard from 'components/domain/FabricCard.vue';
import { useFabricsStore } from 'src/stores/fabrics-store';

const fabricsStore = useFabricsStore();
const search = ref('');
const fabrics = computed(() =>
  fabricsStore.items.filter((item) =>
    item.name.toLowerCase().includes(search.value.toLowerCase())
  )
);
</script>
