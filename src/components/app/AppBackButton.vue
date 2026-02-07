<template>
  <q-btn
    round
    unelevated
    icon="chevron_left"
    aria-label="Go back"
    class="itta-back-btn"
    @click="$emit('click')"
  />
</template>

<script setup lang="ts">
defineEmits<{ (e: 'click'): void }>();
</script>
