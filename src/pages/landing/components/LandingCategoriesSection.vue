<template>
  <section class="itta-section">
    <div class="text-subtitle1 text-weight-medium">Categories</div>
    <div class="row q-col-gutter-xs q-mt-sm">
      <div v-for="item in categories" :key="item" class="col-6 col-sm-3">
        <BaseCard :title="item" ui-key="card:category" :clickable="true" @click="goToCategory(item)" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import BaseCard from 'components/base/BaseCard.vue';

const router = useRouter();
const categories = [
  'Ankara',
  'Lace',
  'Bridal',
  'Casual',
  'Corporate',
  'Kids',
  'Traditional',
  'Ready-to-wear',
];

function goToCategory(category: string) {
  void category;
  router.push('/marketplace');
}
</script>
