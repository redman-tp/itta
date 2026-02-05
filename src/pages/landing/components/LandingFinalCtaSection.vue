<template>
  <section class="itta-section itta-cta">
    <div class="text-h5 text-weight-bold">Ready to start?</div>
    <div class="text-subtitle2 text-grey-7 q-mt-xs">
      Join as a sewee to request outfits, or a fashioneer to receive bids.
    </div>
    <div class="row q-gutter-sm q-mt-md">
      <BaseButton label="Join as Sewee" type="primary" to="/auth/register" />
      <BaseButton label="Join as Fashioneer" type="ghost" to="/auth/register" />
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseButton from 'components/base/BaseButton.vue';
</script>
