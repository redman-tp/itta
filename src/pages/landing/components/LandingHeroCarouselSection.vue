<template>
  <section class="itta-section">
    <q-carousel
      v-model="slide"
      swipeable
      animated
      infinite
      navigation
      navigation-position="bottom"
      navigation-icon="fiber_manual_record"
      transition-prev="slide-right"
      transition-next="slide-left"
      :autoplay="5000"
      height="220px"
      class="itta-hero-carousel"
    >
      <q-carousel-slide v-for="item in slides" :key="item.title" :name="item.name">
        <div class="itta-hero-slide row items-center q-col-gutter-sm">
          <div class="col-6">
            <div class="text-subtitle1 text-weight-medium">{{ item.title }}</div>
            <div class="text-caption text-grey-7 q-mt-xs">{{ item.subtitle }}</div>
            <BaseButton class="q-mt-sm" type="primary" :label="item.cta" :to="item.to" />
          </div>
          <div class="col-6">
            <q-img :src="item.image" ratio="1" class="itta-hero-image" />
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BaseButton from 'components/base/BaseButton.vue';

const slide = ref(1);
const slides = [
  {
    name: 1,
    title: 'Trending designs',
    subtitle: 'Explore what people are requesting now.',
    cta: 'Browse designs',
    to: '/marketplace',
    image: 'https://picsum.photos/id/1011/600/600',
  },
  {
    name: 2,
    title: 'New fabric drops',
    subtitle: 'Fresh arrivals from the fabric market.',
    cta: 'View fabrics',
    to: '/fabrics',
    image: 'https://picsum.photos/id/1021/600/600',
  },
  {
    name: 3,
    title: 'Top rated fashioneers',
    subtitle: 'Find trusted makers in your city.',
    cta: 'Explore',
    to: '/marketplace',
    image: 'https://picsum.photos/id/1005/600/600',
  },
  {
    name: 4,
    title: 'Sew Me This',
    subtitle: 'Upload a reference and start a request.',
    cta: 'Start now',
    to: '/auth',
    image: 'https://picsum.photos/id/1050/600/600',
  },
];
</script>
