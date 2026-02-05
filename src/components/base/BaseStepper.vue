<template>
  <q-stepper v-model="model" flat animated class="itta-stepper" :data-ui="dataUi">
    <q-step
      v-for="step in steps"
      :key="step.name"
      :name="step.name"
      :title="step.title"
      :done="model > step.name"
    >
      <slot :name="`step-${step.name}`" />
    </q-step>
  </q-stepper>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface StepItem {
  name: number;
  title: string;
}

interface Props {
  modelValue?: number;
  steps: StepItem[];
  uiKey?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{ (e: 'update:modelValue', value: number): void }>();

const model = computed({
  get: () => props.modelValue ?? 1,
  set: (value) => emit('update:modelValue', value),
});

const dataUi = computed(() => props.uiKey ?? 'stepper:default');
</script>
