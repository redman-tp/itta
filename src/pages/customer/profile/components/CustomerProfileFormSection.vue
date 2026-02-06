<template>
  <section class="itta-section">
    <div class="text-subtitle1 text-weight-medium">My profile</div>
    <div class="q-mt-md q-gutter-sm">
      <BaseInput v-model="name" label="Full name" />
      <BaseInput v-model="location" label="Location" />
      <BaseButton label="Save changes" />
      <BaseButton type="ghost" label="Log out" @click="logout" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import BaseButton from 'components/base/BaseButton.vue';
import BaseInput from 'components/base/BaseInput.vue';
import { useAuthStore } from 'src/stores/auth-store';
import { useProfileStore } from 'src/stores/profile-store';

const profileStore = useProfileStore();
const authStore = useAuthStore();
const router = useRouter();

profileStore.ensureCustomerProfile(authStore.user);
const name = computed({
  get: () => profileStore.customerProfile?.name ?? '',
  set: (value) => {
    if (profileStore.customerProfile) {
      profileStore.customerProfile.name = value;
    }
  },
});
const location = computed({
  get: () => profileStore.customerProfile?.location ?? '',
  set: (value) => {
    if (profileStore.customerProfile) {
      profileStore.customerProfile.location = value;
    }
  },
});

function logout() {
  authStore.logout();
  router.push('/');
}
</script>
