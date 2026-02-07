<template>
  <q-card
    :flat="flat"
    :bordered="bordered"
    class="itta-card"
    :class="{ 'itta-card--clickable': clickable, 'itta-card--flat': flat }"
    :data-ui="dataUi"
    @click="handleClick"
  >
    <q-img
      v-if="media"
      :src="media"
      :ratio="mediaRatio"
      class="itta-card__media"
      :style="mediaStyle"
    />
    <q-card-section v-if="title || subtitle">
      <div class="text-subtitle1 text-weight-medium">{{ title }}</div>
      <div v-if="subtitle" class="text-caption text-grey-7">{{ subtitle }}</div>
    </q-card-section>
    <q-card-section v-if="$slots.default">
      <slot />
    </q-card-section>
    <q-card-section v-if="meta" class="text-caption text-grey-7">
      {{ meta }}
    </q-card-section>
    <q-card-actions v-if="showActions" align="between">
      <slot name="actions" />
      <BaseButton
        v-if="button"
        :label="buttonLabel"
        :type="buttonType"
        :loading="loading"
        :disabled="disabled"
        @click.stop="onButton"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import BaseButton from './BaseButton.vue';

type CardType = 'default' | 'media' | 'compact' | 'highlight';
type ButtonType = 'primary' | 'secondary' | 'ghost' | 'text' | 'danger';

interface Props {
  type?: CardType;
  title?: string;
  subtitle?: string;
  media?: string;
  mediaRatio?: number | string;
  mediaHeight?: string;
  meta?: string;
  button?: boolean;
  buttonLabel?: string;
  buttonType?: ButtonType;
  loading?: boolean;
  disabled?: boolean;
  flat?: boolean;
  bordered?: boolean;
  clickable?: boolean;
  uiKey?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  button: false,
  buttonLabel: 'Continue',
  buttonType: 'primary',
  loading: false,
  disabled: false,
  flat: false,
  bordered: false,
  clickable: false,
  mediaRatio: '4/3',
});

const emit = defineEmits<{ (e: 'button'): void; (e: 'click'): void }>();

const slots = useSlots();
const dataUi = computed(() => props.uiKey ?? `card:${props.type}`);
const showActions = computed(() => props.button || !!slots.actions);
const mediaStyle = computed(() => (props.mediaHeight ? { height: props.mediaHeight } : {}));

function onButton() {
  emit('button');
}

function handleClick() {
  if (props.clickable) {
    emit('click');
  }
}
</script>
