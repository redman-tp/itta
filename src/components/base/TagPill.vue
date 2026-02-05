<template>
  <q-badge
    class="itta-tag-pill"
    :color="computedColor"
    :outline="outline"
    :data-ui="dataUi"
  >
    <slot>{{ label }}</slot>
  </q-badge>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type TagType = 'default' | 'design' | 'fabric' | 'info';

interface Props {
  label?: string;
  type?: TagType;
  outline?: boolean;
  uiKey?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  outline: true,
});

const computedColor = computed(() => {
  if (props.type === 'design') return 'primary';
  if (props.type === 'fabric') return 'secondary';
  if (props.type === 'info') return 'info';
  return 'grey-6';
});

const dataUi = computed(() => props.uiKey ?? `tag:${props.type}`);
</script>
