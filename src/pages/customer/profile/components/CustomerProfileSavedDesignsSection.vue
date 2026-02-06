<template>
  <BaseCard title="Saved designs" ui-key="card:profile-saved">
    <div v-if="saved.length" class="row q-col-gutter-sm">
      <div v-for="design in saved" :key="design.id" class="col-6">
        <q-img :src="design.imageUrl" ratio="1" class="itta-thumb" />
        <div class="text-caption text-weight-medium q-mt-xs">{{ design.title }}</div>
      </div>
    </div>
    <div v-else class="text-caption text-grey-7">No saved designs yet.</div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseCard from 'components/base/BaseCard.vue';
import { useDesignsStore } from 'src/stores/designs-store';

const designsStore = useDesignsStore();
const saved = computed(() =>
  designsStore.items.filter((item) => item.isBookmarked).slice(0, 4)
);
</script>
