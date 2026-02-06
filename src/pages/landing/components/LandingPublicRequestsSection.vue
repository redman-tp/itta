<template>
  <section class="itta-section">
    <div class="text-subtitle1 text-weight-medium">Public request previews</div>
    <div class="itta-rail-wrap">
      <div class="row no-wrap scroll q-gutter-sm q-mt-sm itta-rail">
        <BaseCard v-for="request in requests" :key="request.title" ui-key="card:request-preview" class="itta-rail-card">
          <div class="text-body2 text-weight-medium">{{ request.title }}</div>
          <div class="text-caption text-grey-7">{{ request.location }}</div>
          <div class="text-caption text-grey-7">{{ request.bids }} bids</div>
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

const requests = [
  { title: 'Wedding guest dress', location: 'Lagos', bids: 6 },
  { title: 'Casual kaftan', location: 'Ibadan', bids: 3 },
  { title: 'Ankara set', location: 'Abuja', bids: 4 },
];
</script>
