<template>
  <section class="itta-section">
    <BaseCard title="Sew Me This (Quick)" ui-key="card:quick-request">
      <div class="text-caption text-grey-7">
        Upload one reference or paste a design tag to start a request.
      </div>
      <MediaUploader class="q-mt-sm" :multiple="false" @update:files="setFiles" />
      <BaseInput v-model="tag" label="Paste design tag" class="q-mt-sm" />
      <div class="row q-gutter-sm q-mt-sm">
        <BaseButton label="Continue" type="primary" @click="goToAuth" />
        <BaseButton label="Sign in" type="ghost" @click="goToAuth" />
      </div>
    </BaseCard>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BaseButton from 'components/base/BaseButton.vue';
import BaseCard from 'components/base/BaseCard.vue';
import BaseInput from 'components/base/BaseInput.vue';
import MediaUploader from 'components/base/MediaUploader.vue';

const router = useRouter();
const tag = ref('');

function setFiles() {
  // public teaser only
}

function goToAuth() {
  router.push('/auth');
}
</script>
