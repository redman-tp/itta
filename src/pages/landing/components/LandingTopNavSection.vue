<template>
  <section class="itta-section itta-topnav">
    <div class="column q-gutter-sm">
      <div class="itta-brand">
        <q-img src="~assets/logo.png" class="itta-brand__logo" fit="contain" />
      </div>
      <BaseInput
        v-model="search"
        class="itta-topnav__search"
        label="Search designs, fabrics, fashioneers"
      >
        <template #append>
          <q-btn dense unelevated class="itta-search-btn bg-primary text-white" icon="search" />
        </template>
      </BaseInput>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BaseInput from 'components/base/BaseInput.vue';

const search = ref('');
</script>
