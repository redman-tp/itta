<template>
  <q-badge :color="color" :outline="outline" class="itta-badge" :data-ui="dataUi">
    <slot>{{ label }}</slot>
  </q-badge>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type BadgeType = 'default' | 'success' | 'warning' | 'danger' | 'info';

interface Props {
  label?: string;
  type?: BadgeType;
  outline?: boolean;
  uiKey?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  outline: false,
});

const color = computed(() => {
  if (props.type === 'success') return 'positive';
  if (props.type === 'warning') return 'warning';
  if (props.type === 'danger') return 'negative';
  if (props.type === 'info') return 'info';
  return 'grey-6';
});

const dataUi = computed(() => props.uiKey ?? `badge:${props.type}`);
</script>
