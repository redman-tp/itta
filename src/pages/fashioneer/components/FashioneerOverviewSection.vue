<template>
  <section class="itta-section">
    <ProfileCard v-if="profile" :profile="profile" tagline="Fashioneer" />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ProfileCard from 'components/domain/ProfileCard.vue';
import { useAuthStore } from 'src/stores/auth-store';
import { useProfileStore } from 'src/stores/profile-store';

const authStore = useAuthStore();
const profileStore = useProfileStore();
profileStore.ensureFashioneerProfile(authStore.user);

const profile = computed(() => profileStore.fashioneerProfile ?? authStore.user);
</script>
