<template>
  <section class="itta-section itta-split-banner">
    <div class="row items-center">
      <div class="col-7">
        <div class="row q-gutter-xs">
          <TagPill type="info" label="Measurement Code" />
          <TagPill type="info" label="Transparent Bids" />
          <TagPill type="info" label="Progress Tracking" />
        </div>
      </div>
      <div class="col-5">
        <q-carousel
          v-model="slide"
          vertical
          animated
          infinite
          height="48px"
          class="itta-mini-carousel"
        >
          <q-carousel-slide v-for="item in messages" :key="item" :name="item">
            <div class="text-caption text-grey-7">{{ item }}</div>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TagPill from 'components/base/TagPill.vue';

const messages = [
  'Trusted local makers',
  'Fast turnaround options',
  'Fabric tags for sourcing',
];
const slide = ref(messages[0]);
</script>
