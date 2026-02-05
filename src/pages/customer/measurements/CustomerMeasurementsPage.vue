<template>
  <q-page class="itta-page">
    <CustomerMeasurementsFormSection />
    <CustomerMeasurementsListSection />
  </q-page>
</template>

<script setup lang="ts">
import CustomerMeasurementsFormSection from 'src/pages/customer/measurements/components/CustomerMeasurementsFormSection.vue';
import CustomerMeasurementsListSection from 'src/pages/customer/measurements/components/CustomerMeasurementsListSection.vue';
</script>
