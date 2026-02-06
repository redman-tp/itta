<template>
  <BaseCard ui-key="card:profile-actions">
    <div class="row q-gutter-sm">
      <BaseButton label="New Sew Request" type="primary" @click="goToRequest" />
      <BaseButton label="View Dashboard" type="ghost" @click="goToDashboard" />
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import BaseButton from 'components/base/BaseButton.vue';
import BaseCard from 'components/base/BaseCard.vue';

const router = useRouter();

function goToRequest() {
  router.push('/customer/sew-request');
}

function goToDashboard() {
  router.push('/customer/profile/dashboard');
}
</script>
