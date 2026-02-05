<template>
  <section class="itta-section">
    <div class="text-subtitle1 text-weight-medium">My profile</div>
    <div class="q-mt-md q-gutter-sm">
      <BaseInput v-model="name" label="Full name" />
      <BaseInput v-model="location" label="Location" />
      <BaseButton label="Save changes" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseButton from 'components/base/BaseButton.vue';
import BaseInput from 'components/base/BaseInput.vue';
import { useProfileStore } from 'src/stores/profile-store';

const profileStore = useProfileStore();
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
</script>
