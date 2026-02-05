<template>
  <section class="itta-section">
    <div class="text-subtitle1 text-weight-medium">Featured designs</div>
    <div class="row q-col-gutter-md q-mt-sm">
      <div v-for="design in featured" :key="design.id" class="col-12 col-sm-6">
        <DesignCard :design="design" @action="goToDetail" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import DesignCard from 'components/domain/DesignCard.vue';
import { useDesignsStore } from 'src/stores/designs-store';

const router = useRouter();
const designsStore = useDesignsStore();
const featured = computed(() => designsStore.featured);

function goToDetail(id: string) {
  router.push(`/marketplace/${id}`);
}
</script>
