<template>
  <section class="itta-section">
    <div class="text-h6 text-weight-bold">Welcome to Itta</div>
    <div class="text-caption text-grey-7 q-mt-xs">
      Login or register to continue.
    </div>
    <BaseTabs v-model="mode" :tabs="modeTabs" class="q-mt-md" />
    <div class="q-mt-md q-gutter-sm">
      <BaseInput v-if="mode === 'register'" v-model="name" label="Full name" />
      <BaseInput v-model="email" label="Email" type="email" />
      <BaseInput v-model="password" label="Password" type="password" />
      <BaseSelect
        v-if="mode === 'register'"
        v-model="role"
        label="Select role"
        :options="roleOptions"
        :emit-value="true"
        :map-options="true"
      />
      <div v-if="error" class="text-caption text-negative">{{ error }}</div>
      <BaseButton :label="mode === 'login' ? 'Sign in' : 'Create account'" @click="handleSubmit" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BaseButton from 'components/base/BaseButton.vue';
import BaseInput from 'components/base/BaseInput.vue';
import BaseSelect from 'components/base/BaseSelect.vue';
import BaseTabs from 'components/base/BaseTabs.vue';
import { useAuthStore } from 'src/stores/auth-store';
import { useProfileStore } from 'src/stores/profile-store';
import type { UserRole } from 'src/types/domain';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const profileStore = useProfileStore();

const mode = ref<'login' | 'register'>('login');
const modeTabs = [
  { name: 'login', label: 'Login' },
  { name: 'register', label: 'Register' },
];
const email = ref('');
const password = ref('');
const role = ref<UserRole>('customer');
const name = ref('');
const error = ref('');

const roleOptions = [
  { label: 'Customer', value: 'customer' },
  { label: 'Fashioneer', value: 'fashioneer' },
];

watch(
  () => route.path,
  (path) => {
    if (path.endsWith('/register')) mode.value = 'register';
    if (path.endsWith('/login')) mode.value = 'login';
  },
  { immediate: true }
);

async function handleSubmit() {
  error.value = '';
  try {
    if (mode.value === 'login') {
      await authStore.loginWithCredentials(email.value, password.value);
    } else {
      await authStore.registerWithCredentials(email.value, password.value, role.value, name.value);
    }
    if (authStore.role === 'fashioneer') {
      profileStore.ensureFashioneerProfile(authStore.user);
    } else {
      profileStore.ensureCustomerProfile(authStore.user);
    }
    const redirect = route.query.redirect as string | undefined;
    if (redirect) {
      router.push(redirect);
    } else {
      router.push(authStore.getDashboardRoute());
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unable to authenticate';
  }
}
</script>
