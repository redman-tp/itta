<template>
  <BaseCard ui-key="card:profile-header">
    <div class="row items-center justify-between">
      <div class="row items-center q-gutter-sm">
        <q-avatar size="52px" color="grey-3" text-color="primary">
          {{ initials }}
        </q-avatar>
        <div>
          <div class="text-subtitle1 text-weight-medium">{{ name }}</div>
          <div class="text-caption text-grey-7">Sewee · {{ location || '—' }}</div>
        </div>
      </div>
      <q-btn flat dense round icon="settings" @click="openSettings" />
    </div>
    <div class="row q-gutter-sm q-mt-sm">
      <BaseButton type="ghost" label="Edit profile" @click="openSettings" />
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseButton from 'components/base/BaseButton.vue';
import BaseCard from 'components/base/BaseCard.vue';
import { useAuthStore } from 'src/stores/auth-store';
import { useProfileStore } from 'src/stores/profile-store';

const emit = defineEmits<{ (e: 'open-settings'): void }>();

const authStore = useAuthStore();
const profileStore = useProfileStore();
profileStore.ensureCustomerProfile(authStore.user);

const profile = computed(() => profileStore.customerProfile ?? authStore.user);
const name = computed(() => profile.value?.name ?? 'Itta User');
const location = computed(() => profile.value?.location ?? '');
const initials = computed(() =>
  name.value
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
);

function openSettings() {
  emit('open-settings');
}
</script>
