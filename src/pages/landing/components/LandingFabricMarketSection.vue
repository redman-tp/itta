<template>
  <section class="itta-section">
    <div class="row items-center justify-between">
      <div class="text-subtitle1 text-weight-medium">Fabric market</div>
      <BaseButton type="text" label="Browse Fabric Market" to="/fabrics" />
    </div>
    <div class="itta-rail-wrap">
      <div class="row no-wrap scroll q-gutter-sm q-mt-sm itta-rail">
        <BaseCard
          v-for="fabric in fabrics"
          :key="fabric.id"
          :media="fabric.imageUrl"
          media-height="120px"
          ui-key="card:fabric-preview"
          class="itta-rail-card"
        >
          <div class="text-body2 text-weight-medium">{{ fabric.name }}</div>
          <div class="text-caption text-grey-7">
            N {{ fabric.pricePerUnit?.toLocaleString() ?? '-' }}
          </div>
          <BaseButton class="q-mt-sm" type="ghost" label="View fabric" to="/fabrics" />
        </BaseCard>
        <BaseCard title="Browse Fabric Market" ui-key="card:browse-fabrics" class="itta-rail-card">
          <BaseButton type="text" label="Explore" to="/fabrics" />
        </BaseCard>
      </div>
      <div class="itta-rail-arrow">
        <q-icon name="chevron_right" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseButton from 'components/base/BaseButton.vue';
import BaseCard from 'components/base/BaseCard.vue';
import { useFabricsStore } from 'src/stores/fabrics-store';

const fabricsStore = useFabricsStore();
const fabrics = computed(() => fabricsStore.items.slice(0, 6));
</script>
