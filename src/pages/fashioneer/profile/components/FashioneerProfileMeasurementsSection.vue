<template>
  <BaseCard title="Measurements" ui-key="card:profile-measurements">
    <div class="text-caption text-grey-7">
      Lookup a measurement code to access a sewee's sizes.
    </div>
    <BaseButton class="q-mt-sm" type="ghost" label="Lookup code" @click="lookup" />
  </BaseCard>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import BaseButton from 'components/base/BaseButton.vue';
import BaseCard from 'components/base/BaseCard.vue';

const router = useRouter();

function lookup() {
  router.push('/fashioneer/measurements/lookup');
}
</script>
