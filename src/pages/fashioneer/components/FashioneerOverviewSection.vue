<template>
  <section class="itta-section">
    <ProfileCard v-if="profile" :profile="profile" tagline="Fashioneer" />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ProfileCard from 'components/domain/ProfileCard.vue';
import { useProfileStore } from 'src/stores/profile-store';

const profileStore = useProfileStore();
const profile = computed(() => profileStore.fashioneerProfile);
</script>
