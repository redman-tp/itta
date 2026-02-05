<template>
  <BaseCard :title="profile.name" :subtitle="profile.location" ui-key="card:profile">
    <div class="row items-center q-gutter-xs">
      <BaseBadge v-if="profile.rating" type="info" :label="`${profile.rating}`" />
      <BaseBadge v-if="tagline" :label="tagline" />
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseBadge from 'components/base/BaseBadge.vue';
import BaseCard from 'components/base/BaseCard.vue';
import type { UserProfile } from 'src/types/domain';

interface Props {
  profile: UserProfile;
  tagline?: string;
}

defineProps<Props>();
</script>
