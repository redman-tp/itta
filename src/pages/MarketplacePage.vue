<template>
  <q-page class="itta-page">
    <MarketplaceSearchSection />
    <MarketplaceCategoriesSection />
    <MarketplaceFiltersSection />
    <MarketplaceListSection />
  </q-page>
</template>

<script setup lang="ts">
import MarketplaceSearchSection from 'src/pages/marketplace/components/MarketplaceSearchSection.vue';
import MarketplaceCategoriesSection from 'src/pages/marketplace/components/MarketplaceCategoriesSection.vue';
import MarketplaceFiltersSection from 'src/pages/marketplace/components/MarketplaceFiltersSection.vue';
import MarketplaceListSection from 'src/pages/marketplace/components/MarketplaceListSection.vue';
</script>
