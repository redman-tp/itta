<template>
  <q-input
    v-model="model"
    :label="label"
    :type="inputType"
    :placeholder="placeholder"
    :dense="dense"
    :outlined="outlined"
    :autogrow="autogrow"
    :disable="disabled"
    class="itta-input"
    :data-ui="dataUi"
  >
    <template v-if="$slots.append" #append>
      <slot name="append" />
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type InputType = 'text' | 'email' | 'password' | 'number' | 'textarea' | 'date';

interface Props {
  modelValue?: string | number;
  label?: string;
  placeholder?: string;
  type?: InputType;
  dense?: boolean;
  outlined?: boolean;
  autogrow?: boolean;
  disabled?: boolean;
  uiKey?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  dense: true,
  outlined: true,
  autogrow: false,
  disabled: false,
});

const emit = defineEmits<{ (e: 'update:modelValue', value: string | number): void }>();

const model = computed({
  get: () => props.modelValue ?? '',
  set: (value) => emit('update:modelValue', value),
});

const inputType = computed(() => (props.type === 'textarea' ? 'textarea' : props.type));
const dataUi = computed(() => props.uiKey ?? `input:${props.type}`);
</script>
