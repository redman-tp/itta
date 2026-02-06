<template>
  <q-page class="itta-page">
    <CustomerProfileHeaderSection @open-settings="showSettings = true" />
    <CustomerProfileStatsSection class="q-mt-sm" />
    <CustomerProfileActionsSection class="q-mt-sm" />
    <CustomerProfileMeasurementsSection class="q-mt-sm" />
    <CustomerProfileSavedDesignsSection class="q-mt-sm" />
    <q-drawer v-model="showSettings" side="right" overlay>
      <div class="q-pa-md">
        <div class="text-subtitle1 text-weight-medium">Settings</div>
        <CustomerProfileFormSection class="q-mt-md" />
      </div>
    </q-drawer>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CustomerProfileHeaderSection from 'src/pages/customer/profile/components/CustomerProfileHeaderSection.vue';
import CustomerProfileStatsSection from 'src/pages/customer/profile/components/CustomerProfileStatsSection.vue';
import CustomerProfileActionsSection from 'src/pages/customer/profile/components/CustomerProfileActionsSection.vue';
import CustomerProfileMeasurementsSection from 'src/pages/customer/profile/components/CustomerProfileMeasurementsSection.vue';
import CustomerProfileSavedDesignsSection from 'src/pages/customer/profile/components/CustomerProfileSavedDesignsSection.vue';
import CustomerProfileFormSection from 'src/pages/customer/profile/components/CustomerProfileFormSection.vue';

const showSettings = ref(false);
</script>
