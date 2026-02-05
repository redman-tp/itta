<template>
  <section class="itta-section">
    <div class="row items-center justify-between">
      <div class="text-subtitle1 text-weight-medium">Featured designs</div>
      <BaseButton type="text" label="View all designs" to="/marketplace" />
    </div>
    <div class="row q-col-gutter-sm q-mt-sm">
      <div v-for="design in featured" :key="design.id" class="col-6 col-sm-3">
        <DesignCard
          :design="design"
          :show-action="false"
          :clickable="true"
          @click="goToDetail"
        />
        <BaseButton
          label="Request this design"
          type="ghost"
          class="q-mt-sm"
          to="/auth/register"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import BaseButton from 'components/base/BaseButton.vue';
import DesignCard from 'components/domain/DesignCard.vue';
import { useDesignsStore } from 'src/stores/designs-store';

const router = useRouter();
const designsStore = useDesignsStore();
const featured = computed(() => designsStore.items.slice(0, 4));

function goToDetail(id: string) {
  router.push(`/marketplace/${id}`);
}
</script>
