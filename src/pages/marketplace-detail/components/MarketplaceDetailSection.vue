<template>
  <section class="itta-section">
    <DesignCard v-if="design" :design="design" :show-action="false" />
    <BaseCard v-if="design" title="Design details" ui-key="card:design-detail" class="q-mt-md">
      <div class="row items-center q-gutter-xs">
        <TagPill v-if="design.tag" type="design" :label="design.tag" />
        <q-btn
          v-if="design.tag"
          flat
          dense
          round
          icon="content_copy"
          @click="copyTag"
        />
      </div>
      <div v-if="design.description" class="text-body2 q-mt-sm">
        {{ design.description }}
      </div>
      <div v-if="design.images?.length" class="row q-col-gutter-sm q-mt-sm">
        <div v-for="img in design.images" :key="img" class="col-6">
          <q-img :src="img" ratio="1" />
        </div>
      </div>
      <BaseButton label="Request this design" class="q-mt-md" @click="requestDesign" />
    </BaseCard>
    <BaseCard v-if="design" title="Order details" ui-key="card:order" class="q-mt-md">
      <div class="text-caption text-grey-7">
        Checkout flow is scaffolded. Payment integration will follow.
      </div>
      <BaseButton label="Mock Checkout" class="q-mt-sm" />
    </BaseCard>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BaseButton from 'components/base/BaseButton.vue';
import BaseCard from 'components/base/BaseCard.vue';
import DesignCard from 'components/domain/DesignCard.vue';
import TagPill from 'components/base/TagPill.vue';
import { useDesignsStore } from 'src/stores/designs-store';

const route = useRoute();
const router = useRouter();
const designsStore = useDesignsStore();
const designId = computed(() => route.params.id as string);
const design = computed(() =>
  designsStore.items.find((item) => item.id === designId.value)
);

async function copyTag() {
  if (design.value?.tag) {
    await navigator.clipboard.writeText(design.value.tag);
  }
}

function requestDesign() {
  if (!design.value) return;
  router.push({ path: '/customer/sew-request', query: { designId: design.value.id } });
}
</script>
