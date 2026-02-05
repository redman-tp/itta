<template>
  <section class="itta-section">
    <div class="text-h6 text-weight-bold">Welcome to Itta</div>
    <div class="text-caption text-grey-7 q-mt-xs">
      Login or register to continue.
    </div>
    <div class="q-mt-md q-gutter-sm">
      <BaseInput v-model="email" label="Email" type="email" />
      <BaseInput v-model="password" label="Password" type="password" />
      <BaseSelect
        v-model="role"
        label="Select role"
        :options="roleOptions"
        :emit-value="true"
        :map-options="true"
      />
      <BaseButton label="Continue" @click="handleLogin" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BaseButton from 'components/base/BaseButton.vue';
import BaseInput from 'components/base/BaseInput.vue';
import BaseSelect from 'components/base/BaseSelect.vue';
import { useAuthStore } from 'src/stores/auth-store';
import type { UserRole } from 'src/types/domain';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const role = ref<UserRole>('customer');

const roleOptions = [
  { label: 'Customer', value: 'customer' },
  { label: 'Fashioneer', value: 'fashioneer' },
];

function handleLogin() {
  authStore.login(role.value, {
    id: 'user-001',
    name: email.value || 'Itta User',
    location: 'Lagos, Nigeria',
  });
  router.push(authStore.getDashboardRoute());
}
</script>
