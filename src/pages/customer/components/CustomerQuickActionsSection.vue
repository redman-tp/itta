<template>
  <section class="itta-section">
    <div class="text-subtitle1 text-weight-medium">Your options</div>
    <div class="row q-col-gutter-sm q-mt-sm">
      <div class="col-6">
        <BaseCard title="Sew Me This" subtitle="Request a custom outfit" :button="true" button-label="Start" @button="goToSewRequest" />
      </div>
      <div class="col-6">
        <BaseCard title="Measurements" subtitle="Update your sizes" :button="true" button-label="View" @button="goToMeasurements" />
      </div>
      <div class="col-6">
        <BaseCard title="Jobs" subtitle="Track your orders" :button="true" button-label="Open" @button="goToJobs" />
      </div>
      <div class="col-6">
        <BaseCard title="Marketplace" subtitle="Ready-made outfits" :button="true" button-label="Browse" @button="goToMarketplace" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import BaseCard from 'components/base/BaseCard.vue';

const router = useRouter();

function goToSewRequest() {
  router.push('/customer/sew-request');
}

function goToMeasurements() {
  router.push('/customer/measurements');
}

function goToJobs() {
  router.push('/customer/jobs');
}

function goToMarketplace() {
  router.push('/marketplace');
}
</script>
