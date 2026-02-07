<template>
  <BaseCard
    :title="fabric.name"
    :subtitle="fabric.tag"
    :media="fabric.imageUrl"
    :media-ratio="1"
    :button="showAction"
    :button-label="buttonLabel"
    class="itta-fabric-card"
    ui-key="card:fabric"
    @button="select"
  >
    <div class="row items-center q-gutter-xs">
      <TagPill type="fabric" :label="fabric.tag" />
      <TagPill v-for="tag in fabric.tags ?? []" :key="tag" :label="tag" />
    </div>
    <div class="row items-center justify-between q-mt-sm">
      <div v-if="fabric.pricePerUnit" class="text-subtitle2 text-weight-bold">
        N {{ fabric.pricePerUnit.toLocaleString() }} / unit
      </div>
      <q-btn flat dense round icon="shopping_cart" />
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from 'components/base/BaseCard.vue';
import TagPill from 'components/base/TagPill.vue';
import type { FabricItem } from 'src/types/domain';

interface Props {
  fabric: FabricItem;
  showAction?: boolean;
  buttonLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  showAction: true,
  buttonLabel: 'Select',
});

const emit = defineEmits<{ (e: 'select', id: string): void }>();

function select() {
  emit('select', props.fabric.id);
}
</script>
