<template>
  <q-btn
    :label="label"
    :icon="icon"
    :loading="loading"
    :disable="disabled"
    :color="computedColor"
    :flat="computedFlat"
    :outline="computedOutline"
    :to="to"
    :href="href"
    class="itta-btn"
    :data-ui="dataUi"
    @click="onClick"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';

type ButtonType = 'primary' | 'secondary' | 'ghost' | 'text' | 'danger';

interface Props {
  label?: string;
  icon?: string;
  loading?: boolean;
  disabled?: boolean;
  type?: ButtonType;
  to?: string;
  href?: string;
  uiKey?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'primary',
  loading: false,
  disabled: false,
});

const emit = defineEmits<{ (e: 'click', event: MouseEvent): void }>();

const computedColor = computed(() => {
  if (props.type === 'primary') return 'primary';
  if (props.type === 'secondary') return 'secondary';
  if (props.type === 'danger') return 'negative';
  return 'dark';
});

const computedOutline = computed(() => props.type === 'ghost');
const computedFlat = computed(() => props.type === 'text');

const dataUi = computed(() => props.uiKey ?? `btn:${props.type}`);

function onClick(event: MouseEvent) {
  emit('click', event);
}
</script>
