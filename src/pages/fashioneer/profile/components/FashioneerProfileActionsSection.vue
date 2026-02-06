<template>
  <BaseCard ui-key="card:profile-actions">
    <div class="row q-gutter-sm">
      <BaseButton label="Open Requests" type="primary" @click="goToRequests" />
      <BaseButton label="View Dashboard" type="ghost" @click="goToDashboard" />
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import BaseButton from 'components/base/BaseButton.vue';
import BaseCard from 'components/base/BaseCard.vue';

const router = useRouter();

function goToRequests() {
  router.push('/fashioneer/requests');
}

function goToDashboard() {
  router.push('/fashioneer/profile/dashboard');
}
</script>
