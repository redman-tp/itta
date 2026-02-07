<template>
  <BaseCard ui-key="card:profile-services">
    <div class="text-subtitle1 text-weight-medium">Profile services</div>
    <div class="row q-col-gutter-sm q-mt-sm">
      <div class="col-6" v-for="item in serviceItems" :key="item.label">
        <q-btn flat no-caps class="full-width itta-service-item" @click="openItem(item.label)">
          <span class="itta-service-item__content">
            <span class="itta-service-item__main">
              <q-icon :name="item.icon" size="18px" />
              <span class="text-caption text-weight-medium">{{ item.label }}</span>
            </span>
          </span>
        </q-btn>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import BaseCard from 'components/base/BaseCard.vue';

const $q = useQuasar();

const serviceItems = [
  { icon: 'payments', label: 'Payment' },
  { icon: 'location_on', label: 'Shipping Address' },
  { icon: 'support_agent', label: 'Help Center' },
  { icon: 'lightbulb', label: 'Suggestion' },
];

function openItem(label: string) {
  // TODO: link these shortcuts to backend-powered profile modules.
  $q.notify({
    message: `${label} settings coming soon`,
    color: 'primary',
    textColor: 'white',
    position: 'bottom',
  });
}
</script>
