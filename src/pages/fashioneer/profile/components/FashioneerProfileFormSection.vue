<template>
  <section class="itta-section">
    <div class="text-subtitle1 text-weight-medium">Storefront profile</div>
    <div class="q-mt-md q-gutter-sm">
      <BaseInput v-model="name" label="Brand name" />
      <BaseInput v-model="location" label="Location" />
      <BaseInput v-model="serviceInfo" label="Service info" type="textarea" autogrow />
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

profileStore.ensureFashioneerProfile(authStore.user);
const name = computed({
  get: () => profileStore.fashioneerProfile?.name ?? '',
  set: (value) => {
    if (profileStore.fashioneerProfile) {
      profileStore.fashioneerProfile.name = value;
    }
  },
});
const location = computed({
  get: () => profileStore.fashioneerProfile?.location ?? '',
  set: (value) => {
    if (profileStore.fashioneerProfile) {
      profileStore.fashioneerProfile.location = value;
    }
  },
});
const serviceInfo = computed({
  get: () => profileStore.fashioneerProfile?.serviceInfo ?? '',
  set: (value) => {
    if (profileStore.fashioneerProfile) {
      profileStore.fashioneerProfile.serviceInfo = value;
    }
  },
});

function logout() {
  authStore.logout();
  router.push('/');
}
</script>
