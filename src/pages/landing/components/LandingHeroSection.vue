<template>
  <section class="itta-section itta-hero">
    <div class="text-h4 text-weight-bold">
      Request custom outfits. Get bids. Track every stitch.
    </div>
    <div class="text-subtitle1 text-grey-7 q-mt-sm">
      Sewees request outfits, fashioneers bid on jobs, and progress is tracked from start
      to finish in one place.
    </div>
    <div class="row q-gutter-sm q-mt-md">
      <BaseButton label="Join as Sewee" type="primary" to="/auth/register" />
      <BaseButton label="Join as Fashioneer" type="ghost" to="/auth/register" />
    </div>
    <div class="row q-col-gutter-sm q-mt-lg">
      <div class="col-12 col-sm-4">
        <q-img src="https://picsum.photos/id/1062/600/700" ratio="4/5" />
      </div>
      <div class="col-12 col-sm-4">
        <q-img src="https://picsum.photos/id/1050/600/650" ratio="4/5" />
      </div>
      <div class="col-12 col-sm-4">
        <q-img src="https://picsum.photos/id/1011/600/720" ratio="4/5" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseButton from 'components/base/BaseButton.vue';
</script>
