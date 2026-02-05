<template>
  <BaseCard
    :title="design.title"
    :subtitle="design.location"
    :media="design.imageUrl"
    media-height="160px"
    :button="showAction"
    :button-label="buttonLabel"
    :button-type="buttonType"
    :clickable="clickable"
    class="itta-design-card"
    ui-key="card:design"
    @button="onAction"
    @click="onCardClick"
  >
    <div class="row items-center q-gutter-xs">
      <BaseBadge v-if="design.rating" type="info" :label="`${design.rating}`" />
      <BaseBadge v-if="design.category" type="default" :label="design.category" />
    </div>
    <div class="text-subtitle2 text-weight-bold q-mt-sm">
      {{ formatPrice(design.price) }}
    </div>
    <div class="text-caption q-mt-xs">
      {{ design.sewedCount ?? 0 }} sewed
    </div>
    <q-btn
      v-if="showBookmark"
      flat
      dense
      round
      icon="bookmark"
      class="itta-design-card__bookmark"
      :color="design.isBookmarked ? 'primary' : 'grey-6'"
      @click.stop="toggleBookmark"
    />
  </BaseCard>
</template>

<script setup lang="ts">
import BaseBadge from 'components/base/BaseBadge.vue';
import BaseCard from 'components/base/BaseCard.vue';
import type { DesignItem } from 'src/types/domain';

interface Props {
  design: DesignItem;
  showAction?: boolean;
  buttonLabel?: string;
  buttonType?: 'primary' | 'secondary' | 'ghost' | 'text' | 'danger';
  showBookmark?: boolean;
  clickable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showAction: true,
  buttonLabel: 'View',
  buttonType: 'primary',
  showBookmark: false,
  clickable: false,
});

const emit = defineEmits<{
  (e: 'action', id: string): void;
  (e: 'bookmark', id: string): void;
  (e: 'click', id: string): void;
}>();

function onAction() {
  emit('action', props.design.id);
}

function toggleBookmark() {
  emit('bookmark', props.design.id);
}

function onCardClick() {
  emit('click', props.design.id);
}

function formatPrice(value: number) {
  return `N ${value.toLocaleString()}`;
}
</script>
