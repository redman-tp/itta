<template>
  <section class="itta-auth">
    <div class="itta-auth__grid">
      <div class="itta-auth__hero">
        <div class="itta-auth__brand">
          <q-img src="~assets/logo.png" class="itta-auth__logo" fit="contain" />
        </div>
        <div class="itta-auth__title">Where custom fashion becomes effortless.</div>
        <div class="itta-auth__subtitle">
          Discover designs, attach fabrics, and work with trusted fashioneers through transparent bids
          and tracked progress.
        </div>
        <div class="itta-auth__pill-row">
          <q-chip color="primary" text-color="white">Sewee</q-chip>
          <q-chip color="grey-2" text-color="dark">Fashioneer</q-chip>
        </div>
      </div>

      <div class="itta-auth__form-card">
        <div class="text-subtitle1 text-weight-medium">
          {{ mode === 'login' ? 'Sign in' : 'Create account' }}
        </div>
        <div class="text-caption text-grey-7 q-mt-xs">
          {{ mode === 'login' ? 'Welcome back. Continue your requests.' : 'Join to request or accept jobs.' }}
        </div>

        <div class="itta-auth__social-row q-mt-md">
          <q-btn round dense unelevated class="itta-auth__social-icon" icon="google" />
          <q-btn round dense unelevated class="itta-auth__social-icon" icon="facebook" />
          <q-btn round dense unelevated class="itta-auth__social-icon" icon="more_horiz" />
        </div>

        <div class="itta-auth__divider">
          <span>or continue with email</span>
        </div>

        <div class="q-gutter-sm">
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
          <BaseButton
            class="full-width"
            :label="mode === 'login' ? 'Sign in' : 'Create account'"
            @click="handleSubmit"
          />
          <div class="text-caption text-grey-7 text-center q-mt-xs">
            <span v-if="mode === 'login'">
              New here?
              <q-btn flat dense class="itta-auth__link" label="Create an account" to="/auth/register" />
            </span>
            <span v-else>
              Already have an account?
              <q-btn flat dense class="itta-auth__link" label="Sign in" to="/auth/login" />
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BaseButton from 'components/base/BaseButton.vue';
import BaseInput from 'components/base/BaseInput.vue';
import BaseSelect from 'components/base/BaseSelect.vue';
import { useAuthStore } from 'src/stores/auth-store';
import { useProfileStore } from 'src/stores/profile-store';
import type { UserRole } from 'src/types/domain';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const profileStore = useProfileStore();

const mode = computed<'login' | 'register'>(() =>
  route.path.endsWith('/register') ? 'register' : 'login'
);
const email = ref('');
const password = ref('');
const role = ref<UserRole>('customer');
const name = ref('');
const error = ref('');

const roleOptions = [
  { label: 'Customer', value: 'customer' },
  { label: 'Fashioneer', value: 'fashioneer' },
];

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
