<template>
  <section class="itta-section">
    <div class="text-subtitle1 text-weight-medium">Your workspace</div>
    <div class="row q-col-gutter-sm q-mt-sm">
      <div class="col-6">
        <BaseCard title="Requests Inbox" subtitle="Open sew requests" :button="true" button-label="Open" @button="goToRequests" />
      </div>
      <div class="col-6">
        <BaseCard title="Jobs" subtitle="Active jobs" :button="true" button-label="Manage" @button="goToJobs" />
      </div>
      <div class="col-6">
        <BaseCard title="Listings" subtitle="Marketplace items" :button="true" button-label="Manage" @button="goToListings" />
      </div>
      <div class="col-6">
        <BaseCard title="Measurements" subtitle="Lookup code" :button="true" button-label="Lookup" @button="goToMeasurements" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import BaseCard from 'components/base/BaseCard.vue';

const router = useRouter();

function goToRequests() {
  router.push('/fashioneer/requests');
}

function goToJobs() {
  router.push('/fashioneer/jobs');
}

function goToListings() {
  router.push('/fashioneer/listings');
}

function goToMeasurements() {
  router.push('/fashioneer/measurements/lookup');
}
</script>
