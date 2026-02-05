<template>
  <q-tabs v-model="model" :dense="dense" class="itta-tabs" :data-ui="dataUi">
    <q-tab
      v-for="tab in tabs"
      :key="tab.name"
      :name="tab.name"
      :label="tab.label"
    />
  </q-tabs>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface TabItem {
  name: string;
  label: string;
}

interface Props {
  modelValue?: string;
  tabs: TabItem[];
  dense?: boolean;
  uiKey?: string;
}

const props = withDefaults(defineProps<Props>(), {
  dense: true,
});

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>();

const model = computed({
  get: () => props.modelValue ?? '',
  set: (value) => emit('update:modelValue', value),
});

const dataUi = computed(() => props.uiKey ?? 'tabs:default');
</script>
