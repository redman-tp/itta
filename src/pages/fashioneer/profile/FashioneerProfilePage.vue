<template>
  <q-page class="itta-page">
    <FashioneerProfileHeaderSection @open-settings="showSettings = true" />
    <FashioneerProfileStatsSection class="q-mt-sm" />
    <FashioneerProfileActionsSection class="q-mt-sm" />
    <FashioneerProfileMeasurementsSection class="q-mt-sm" />
    <FashioneerProfilePortfolioSection class="q-mt-sm" />
    <FashioneerProfileDiscoverSection class="q-mt-sm" />
    <q-drawer v-model="showSettings" side="right" overlay>
      <div class="q-pa-md">
        <div class="text-subtitle1 text-weight-medium">Settings</div>
        <FashioneerProfileFormSection class="q-mt-md" />
      </div>
    </q-drawer>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FashioneerProfileHeaderSection from 'src/pages/fashioneer/profile/components/FashioneerProfileHeaderSection.vue';
import FashioneerProfileStatsSection from 'src/pages/fashioneer/profile/components/FashioneerProfileStatsSection.vue';
import FashioneerProfileActionsSection from 'src/pages/fashioneer/profile/components/FashioneerProfileActionsSection.vue';
import FashioneerProfileMeasurementsSection from 'src/pages/fashioneer/profile/components/FashioneerProfileMeasurementsSection.vue';
import FashioneerProfilePortfolioSection from 'src/pages/fashioneer/profile/components/FashioneerProfilePortfolioSection.vue';
import FashioneerProfileDiscoverSection from 'src/pages/fashioneer/profile/components/FashioneerProfileDiscoverSection.vue';
import FashioneerProfileFormSection from 'src/pages/fashioneer/profile/components/FashioneerProfileFormSection.vue';

const showSettings = ref(false);
</script>
