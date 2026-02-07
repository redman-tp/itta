<template>
  <BaseCard ui-key="card:profile-saved">
    <div class="row items-center justify-between">
      <div class="text-subtitle1 text-weight-medium">Saved designs</div>
      <BaseButton type="text" label="View all" @click="viewAll" />
    </div>
    <div class="row no-wrap scroll q-gutter-sm itta-rail q-mt-sm">
      <div v-for="design in railItems" :key="design.id" class="itta-saved-rail-card">
        <q-img :src="design.imageUrl" ratio="1" class="itta-thumb" />
        <div class="text-caption text-weight-medium q-mt-xs ellipsis">{{ design.title }}</div>
        <div class="text-caption text-grey-7 ellipsis">{{ design.designerName }}</div>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import BaseButton from 'components/base/BaseButton.vue';
import BaseCard from 'components/base/BaseCard.vue';
import { useDesignsStore } from 'src/stores/designs-store';

const designsStore = useDesignsStore();
const router = useRouter();

const saved = computed(() => designsStore.items.filter((item) => item.isBookmarked));
const railItems = computed(() => {
  if (saved.value.length > 0) {
    return saved.value.slice(0, 10);
  }
  // Keep the section populated during early/local testing.
  return designsStore.items.slice(0, 10);
});

function viewAll() {
  void router.push('/marketplace');
}
</script>
