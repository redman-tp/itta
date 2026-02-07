<template>
  <BaseCard ui-key="card:profile-saved-fabrics">
    <div class="row items-center justify-between">
      <div class="text-subtitle1 text-weight-medium">Saved fabrics</div>
      <BaseButton type="text" label="View all" @click="viewAll" />
    </div>
    <div class="row no-wrap scroll q-gutter-sm itta-rail q-mt-sm">
      <div v-for="fabric in railItems" :key="fabric.id" class="itta-saved-rail-card">
        <q-img :src="fabric.imageUrl" ratio="1" class="itta-thumb" />
        <div class="text-caption text-weight-medium q-mt-xs ellipsis">{{ fabric.name }}</div>
        <div class="text-caption text-grey-7 ellipsis">{{ fabric.tag }}</div>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import BaseButton from 'components/base/BaseButton.vue';
import BaseCard from 'components/base/BaseCard.vue';
import { useFabricsStore } from 'src/stores/fabrics-store';

const fabricsStore = useFabricsStore();
const router = useRouter();

const saved = computed(() => fabricsStore.items.filter((item) => item.isBookmarked));
const railItems = computed(() => {
  if (saved.value.length > 0) {
    return saved.value.slice(0, 10);
  }
  // Keep this populated with dummy data while backend bookmark sync is pending.
  return fabricsStore.items.slice(0, 10);
});

function viewAll() {
  void router.push('/fabrics');
}
</script>
