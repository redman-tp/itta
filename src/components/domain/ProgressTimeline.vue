<template>
  <BaseCard title="Progress" ui-key="timeline:job">
    <div v-if="updates.length">
      <div v-for="item in updates" :key="item.id" class="q-mb-sm">
        <div class="text-body2 text-weight-medium">{{ item.preset }}</div>
        <div v-if="item.note" class="text-caption text-grey-7">{{ item.note }}</div>
        <div class="text-caption text-grey-6">{{ item.createdAt }}</div>
      </div>
    </div>
    <div v-else class="text-caption text-grey-7">No progress updates yet.</div>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from 'components/base/BaseCard.vue';
import type { ProgressUpdate } from 'src/types/domain';

interface Props {
  updates: ProgressUpdate[];
}

withDefaults(defineProps<Props>(), {
  updates: () => [],
});
</script>
