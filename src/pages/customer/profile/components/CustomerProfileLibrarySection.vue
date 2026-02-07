<template>
  <BaseCard ui-key="card:profile-library">
    <div class="text-subtitle1 text-weight-medium">Library</div>
    <div class="row q-col-gutter-sm q-mt-sm">
      <div class="col-6">
        <q-btn flat no-caps class="full-width itta-profile-library-btn" @click="goToHistory">
          <div class="itta-profile-library-btn__icon-wrap">
            <q-icon name="history" size="20px" />
          </div>
          <div class="text-caption text-weight-medium q-mt-xs">History</div>
        </q-btn>
      </div>
      <div class="col-6">
        <q-btn flat no-caps class="full-width itta-profile-library-btn" @click="openFollowedStores">
          <div class="itta-profile-library-btn__icon-wrap">
            <q-icon name="storefront" size="20px" />
          </div>
          <div class="text-caption text-weight-medium q-mt-xs">Followed stores</div>
        </q-btn>
      </div>
      <div class="col-6">
        <q-btn flat no-caps class="full-width itta-profile-library-btn" @click="openFollowedFashioneers">
          <div class="itta-profile-library-btn__icon-wrap">
            <q-icon name="groups" size="20px" />
          </div>
          <div class="text-caption text-weight-medium q-mt-xs">Followed fashioneers</div>
        </q-btn>
      </div>
      <div class="col-6">
        <q-btn flat no-caps class="full-width itta-profile-library-btn" @click="scrollToSaved">
          <div class="itta-profile-library-btn__icon-wrap">
            <q-icon name="favorite" size="20px" />
          </div>
          <div class="text-caption text-weight-medium q-mt-xs">Saved</div>
        </q-btn>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import BaseCard from 'components/base/BaseCard.vue';

const router = useRouter();
const $q = useQuasar();

function goToHistory() {
  void router.push('/customer/orders');
}

function openFollowedStores() {
  // TODO: replace with dedicated followed stores module.
  $q.notify({
    message: 'Followed stores coming soon',
    color: 'primary',
    textColor: 'white',
    position: 'bottom',
  });
}

function openFollowedFashioneers() {
  // TODO: replace with dedicated followed fashioneers module.
  $q.notify({
    message: 'Followed fashioneers coming soon',
    color: 'primary',
    textColor: 'white',
    position: 'bottom',
  });
}

function scrollToSaved() {
  const target =
    document.querySelector('[data-ui="card:profile-saved"]') ??
    document.querySelector('[data-ui="card:profile-saved-fabrics"]');
  target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
</script>
