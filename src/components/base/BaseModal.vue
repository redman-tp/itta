<template>
  <q-dialog v-model="model">
    <q-card class="itta-modal" :data-ui="dataUi">
      <q-card-section>
        <div class="text-subtitle1 text-weight-medium">{{ title }}</div>
        <div v-if="subtitle" class="text-caption text-grey-7">{{ subtitle }}</div>
      </q-card-section>
      <q-card-section v-if="$slots.default">
        <slot />
      </q-card-section>
      <q-card-actions align="right">
        <BaseButton v-if="showCancel" type="text" label="Cancel" @click="onCancel" />
        <BaseButton v-if="showConfirm" :label="confirmLabel" @click="onConfirm" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseButton from './BaseButton.vue';

interface Props {
  modelValue: boolean;
  title: string;
  subtitle?: string;
  confirmLabel?: string;
  showCancel?: boolean;
  showConfirm?: boolean;
  uiKey?: string;
}

const props = withDefaults(defineProps<Props>(), {
  confirmLabel: 'Confirm',
  showCancel: true,
  showConfirm: true,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}>();

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const dataUi = computed(() => props.uiKey ?? 'modal:default');

function onConfirm() {
  emit('confirm');
}

function onCancel() {
  emit('cancel');
  emit('update:modelValue', false);
}
</script>
