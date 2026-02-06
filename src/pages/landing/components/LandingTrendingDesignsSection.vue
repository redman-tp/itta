<template>
  <section class="itta-section">
    <div class="row items-center justify-between">
      <div class="text-subtitle1 text-weight-medium">Trending designs</div>
      <BaseButton type="text" label="Browse all designs" to="/marketplace" />
    </div>
    <div class="row no-wrap scroll q-gutter-sm q-mt-sm itta-rail">
      <BaseCard
        v-for="design in designs"
        :key="design.id"
        :media="design.imageUrl"
        media-height="140px"
        ui-key="card:trending-design"
        class="itta-rail-card"
        :clickable="true"
        @click="goToDetail(design.id)"
      >
        <div class="row items-center q-gutter-xs">
          <TagPill type="info" :label="tags[design.id] ?? 'Trending'" />
        </div>
        <div class="text-body2 text-weight-medium q-mt-xs">{{ design.title }}</div>
        <div class="text-caption text-grey-7">by {{ design.designerName ?? 'Itta Studio' }}</div>
        <BaseButton class="q-mt-sm" type="ghost" label="Request" to="/auth" />
      </BaseCard>
      <BaseCard title="Browse all designs" ui-key="card:browse-designs" class="itta-rail-card">
        <BaseButton type="text" label="Explore" to="/marketplace" />
      </BaseCard>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import BaseButton from 'components/base/BaseButton.vue';
import BaseCard from 'components/base/BaseCard.vue';
import TagPill from 'components/base/TagPill.vue';
import { useDesignsStore } from 'src/stores/designs-store';

const router = useRouter();
const designsStore = useDesignsStore();
const designs = computed(() => designsStore.items.slice(0, 6));

const tags: Record<string, string> = {
  'des-001': 'Trending',
  'des-002': 'Hot',
  'des-003': 'New',
};

function goToDetail(id: string) {
  router.push(`/marketplace/${id}`);
}
</script>
