<template>
  <section class="itta-section">
    <div class="text-subtitle1 text-weight-medium">Why Itta</div>
    <div class="row q-col-gutter-sm q-mt-sm">
      <div v-for="item in items" :key="item.title" class="col-12 col-sm-6">
        <BaseCard :title="item.title" :subtitle="item.subtitle" ui-key="card:highlight" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseCard from 'components/base/BaseCard.vue';

const items = [
  { title: 'Store measurements once', subtitle: 'Reuse for every request.' },
  { title: 'Transparent bidding', subtitle: 'Compare offers with clarity.' },
  { title: 'Verified fashioneers', subtitle: 'Work with trusted makers.' },
  { title: 'Track progress clearly', subtitle: 'Stay updated end to end.' },
];
</script>
