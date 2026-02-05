<template>
  <q-select
    v-model="model"
    :label="label"
    :options="options"
    :dense="dense"
    :outlined="outlined"
    :emit-value="emitValue"
    :map-options="mapOptions"
    :disable="disabled"
    class="itta-select"
    :data-ui="dataUi"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modelValue?: string | number;
  label?: string;
  options: Array<string | { label: string; value: string | number }>;
  dense?: boolean;
  outlined?: boolean;
  emitValue?: boolean;
  mapOptions?: boolean;
  disabled?: boolean;
  uiKey?: string;
}

const props = withDefaults(defineProps<Props>(), {
  dense: true,
  outlined: true,
  emitValue: false,
  mapOptions: false,
  disabled: false,
});

const emit = defineEmits<{ (e: 'update:modelValue', value: string | number): void }>();

const model = computed({
  get: () => props.modelValue ?? '',
  set: (value) => emit('update:modelValue', value),
});

const dataUi = computed(() => props.uiKey ?? 'select:default');
</script>
