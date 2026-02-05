<template>
  <q-page class="itta-page">
    <LandingHeroSection />
    <LandingRolesSection />
    <LandingMarketplacePreviewSection />
  </q-page>
</template>

<script setup lang="ts">
import LandingHeroSection from 'src/pages/landing/components/LandingHeroSection.vue';
import LandingMarketplacePreviewSection from 'src/pages/landing/components/LandingMarketplacePreviewSection.vue';
import LandingRolesSection from 'src/pages/landing/components/LandingRolesSection.vue';
</script>
