<template>
  <q-page class="itta-page">
    <CustomerProfileHeaderSection @open-settings="showSettings = true" />
    <CustomerProfileStatsSection class="q-mt-sm" />
    <CustomerProfileActionsSection class="q-mt-sm" />
    <CustomerProfileLibrarySection class="q-mt-sm" />
    <CustomerProfileServicesSection class="q-mt-sm" />
    <CustomerProfileMeasurementsSection class="q-mt-sm" />
    <CustomerProfileSavedDesignsSection class="q-mt-sm" />
    <CustomerProfileSavedFabricsSection class="q-mt-sm" />
    <CustomerProfileDiscoverSection class="q-mt-sm" />
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
import CustomerProfileLibrarySection from 'src/pages/customer/profile/components/CustomerProfileLibrarySection.vue';
import CustomerProfileServicesSection from 'src/pages/customer/profile/components/CustomerProfileServicesSection.vue';
import CustomerProfileActionsSection from 'src/pages/customer/profile/components/CustomerProfileActionsSection.vue';
import CustomerProfileMeasurementsSection from 'src/pages/customer/profile/components/CustomerProfileMeasurementsSection.vue';
import CustomerProfileSavedDesignsSection from 'src/pages/customer/profile/components/CustomerProfileSavedDesignsSection.vue';
import CustomerProfileSavedFabricsSection from 'src/pages/customer/profile/components/CustomerProfileSavedFabricsSection.vue';
import CustomerProfileDiscoverSection from 'src/pages/customer/profile/components/CustomerProfileDiscoverSection.vue';
import CustomerProfileFormSection from 'src/pages/customer/profile/components/CustomerProfileFormSection.vue';

const showSettings = ref(false);
</script>
