<template>
  <section class="itta-section itta-topnav">
    <div class="row items-center q-gutter-sm">
      <div class="text-subtitle1 text-weight-bold">Itta</div>
      <BaseInput v-model="search" label="Search designs, fabrics, fashioneers">
        <template #append>
          <q-btn round dense flat icon="search" />
        </template>
      </BaseInput>
      <q-btn flat dense round icon="bookmark_border" />
      <q-btn flat dense round icon="account_circle" to="/auth" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BaseInput from 'components/base/BaseInput.vue';

const search = ref('');
</script>
