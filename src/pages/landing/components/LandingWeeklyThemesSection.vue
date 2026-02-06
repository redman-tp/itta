<template>
  <section class="itta-section">
    <div class="text-subtitle1 text-weight-medium">Weekly style themes</div>
    <div class="itta-rail-wrap">
      <div class="row no-wrap scroll q-gutter-sm q-mt-sm itta-rail">
        <BaseCard v-for="theme in themes" :key="theme.title" ui-key="card:theme" class="itta-rail-card">
          <q-img :src="theme.image" ratio="16/9" class="itta-rail-image" />
          <div class="text-body2 text-weight-medium q-mt-sm">{{ theme.title }}</div>
        </BaseCard>
      </div>
      <div class="itta-rail-arrow">
        <q-icon name="chevron_right" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseCard from 'components/base/BaseCard.vue';

const themes = [
  { title: 'City Weekend', image: 'https://picsum.photos/id/1060/600/400' },
  { title: 'Bridal Modern', image: 'https://picsum.photos/id/1027/600/400' },
  { title: 'Corporate Clean', image: 'https://picsum.photos/id/1033/600/400' },
];
</script>
