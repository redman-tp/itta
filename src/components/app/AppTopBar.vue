<template>
  <q-header elevated class="itta-topbar">
    <q-toolbar>
      <q-btn
        v-if="showBack"
        flat
        dense
        round
        icon="arrow_back"
        aria-label="Back"
        @click="onBack"
      />
      <q-toolbar-title class="text-weight-medium">{{ title }}</q-toolbar-title>
      <slot name="actions" />
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  showBack?: boolean;
}

withDefaults(defineProps<Props>(), {
  showBack: false,
});

const emit = defineEmits<{ (e: 'back'): void }>();

function onBack() {
  emit('back');
}
</script>
