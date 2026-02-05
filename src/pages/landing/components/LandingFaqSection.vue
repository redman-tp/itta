<template>
  <section class="itta-section">
    <div class="text-subtitle1 text-weight-medium">FAQ</div>
    <div class="q-mt-sm">
      <BaseCard
        v-for="item in faqs"
        :key="item.q"
        :title="item.q"
        :subtitle="item.a"
        ui-key="card:faq"
        class="q-mb-sm"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseCard from 'components/base/BaseCard.vue';

const faqs = [
  { q: 'Can I upload my own design?', a: 'Yes, add a reference during request creation.' },
  { q: 'What is a design tag?', a: 'A unique ID that links a design to a request.' },
  { q: 'Can I use my own fabric?', a: 'Yes, you can upload fabric reference images.' },
  { q: 'How do bids work?', a: 'Fashioneers bid with price and timeline.' },
  { q: 'How long does a job take?', a: 'Timelines vary by bid and complexity.' },
];
</script>
