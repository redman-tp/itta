<template>
  <q-page class="itta-page">
    <FashioneerOverviewSection />
    <FashioneerQuickActionsSection />
    <FashioneerProfileFormSection />
  </q-page>
</template>

<script setup lang="ts">
import FashioneerOverviewSection from 'src/pages/fashioneer/components/FashioneerOverviewSection.vue';
import FashioneerQuickActionsSection from 'src/pages/fashioneer/components/FashioneerQuickActionsSection.vue';
import FashioneerProfileFormSection from 'src/pages/fashioneer/profile/components/FashioneerProfileFormSection.vue';
</script>
