<template>
  <BaseCard title="Portfolio preview" ui-key="card:profile-portfolio">
    <div v-if="items.length" class="row q-col-gutter-sm">
      <div v-for="item in items" :key="item.id" class="col-6">
        <q-img :src="item.imageUrl" ratio="1" class="itta-thumb" />
        <div class="text-caption text-weight-medium q-mt-xs">{{ item.title }}</div>
      </div>
    </div>
    <div v-else class="text-caption text-grey-7">No portfolio items yet.</div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseCard from 'components/base/BaseCard.vue';
import { useDesignsStore } from 'src/stores/designs-store';

const designsStore = useDesignsStore();
const items = computed(() => designsStore.items.slice(0, 4));
</script>
