<template>
  <section class="itta-section">
    <div class="text-subtitle1 text-weight-medium">Two roles, one flow</div>
    <div class="row q-col-gutter-md q-mt-sm">
      <div class="col-12 col-sm-6">
        <BaseCard title="Customer" subtitle="Save measurements, request outfits">
          <div class="text-caption text-grey-7">
            Store measurements and request custom outfits from trusted fashioneers.
          </div>
        </BaseCard>
      </div>
      <div class="col-12 col-sm-6">
        <BaseCard title="Fashioneer" subtitle="Post designs, accept jobs">
          <div class="text-caption text-grey-7">
            Showcase designs, respond to sew requests, and manage sewing jobs.
          </div>
        </BaseCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseCard from 'components/base/BaseCard.vue';
</script>
