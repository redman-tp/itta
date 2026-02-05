<template>
  <section class="itta-section">
    <div class="text-subtitle1 text-weight-medium">How it works</div>
    <div class="row q-col-gutter-md q-mt-sm">
      <div class="col-12 col-sm-6">
        <BaseCard title="Sewee flow" ui-key="card:flow-sewee">
          <ol class="itta-steps">
            <li>Save measurements</li>
            <li>Choose a design or upload a reference</li>
            <li>Receive bids</li>
            <li>Select a fashioneer and track progress</li>
          </ol>
        </BaseCard>
      </div>
      <div class="col-12 col-sm-6">
        <BaseCard title="Fashioneer flow" ui-key="card:flow-fashioneer">
          <ol class="itta-steps">
            <li>Create profile and portfolio</li>
            <li>Browse requests</li>
            <li>Bid and get selected</li>
            <li>Deliver and earn reviews</li>
          </ol>
        </BaseCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseCard from 'components/base/BaseCard.vue';
</script>
