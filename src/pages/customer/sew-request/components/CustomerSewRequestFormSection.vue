<template>
  <section class="itta-section">
    <div class="text-subtitle1 text-weight-medium">Sew Me This</div>
    <BaseStepper v-model="step" :steps="steps" class="q-mt-md" />
    <div v-if="step === 1" class="q-mt-md q-gutter-sm">
      <BaseInput v-model="form.title" label="Request title" />
      <div class="text-subtitle2 text-weight-medium">Attach a design</div>
      <BaseSelect
        v-model="selectedDesignId"
        label="Browse designs"
        :options="designOptions"
        :emit-value="true"
        :map-options="true"
      />
      <div class="row items-center q-gutter-sm">
        <BaseInput v-model="designTag" label="Paste design tag" />
        <BaseButton type="ghost" label="Attach" @click="attachDesignByTag" />
      </div>
      <div v-if="attachedDesigns.length" class="row q-gutter-xs">
        <TagPill
          v-for="design in attachedDesigns"
          :key="design.id"
          type="design"
          :label="design.tag ?? design.title"
        />
        <BaseButton type="text" label="Clear" @click="clearDesigns" />
      </div>
      <div class="text-subtitle2 text-weight-medium q-mt-md">Inspiration / Reference</div>
      <MediaUploader label="Upload reference images" @update:files="setReferenceFiles" />
    </div>
    <div v-if="step === 2" class="q-mt-md q-gutter-sm">
      <BaseInput v-model="form.notes" label="Notes" type="textarea" autogrow />
      <BaseInput v-model="form.color" label="Color preference" />
      <BaseInput v-model="form.occasion" label="Occasion" />
      <div class="text-subtitle2 text-weight-medium q-mt-md">Fabric attachment</div>
      <BaseSelect
        v-model="selectedFabricId"
        label="Browse fabric market"
        :options="fabricOptions"
        :emit-value="true"
        :map-options="true"
      />
      <div class="row items-center q-gutter-sm">
        <BaseInput v-model="fabricTag" label="Paste fabric tag" />
        <BaseButton type="ghost" label="Attach" @click="attachFabricByTag" />
      </div>
      <MediaUploader label="Upload fabric reference" :multiple="false" @update:files="setFabricFiles" />
      <BaseSelect
        v-model="form.fabricIntent"
        label="Fabric intent"
        :options="fabricIntentOptions"
        :emit-value="true"
        :map-options="true"
      />
      <BaseButton type="text" label="Go to Fabric Market" @click="goToFabricMarket" />
    </div>
    <div v-if="step === 3" class="q-mt-md q-gutter-sm">
      <BaseInput v-model="form.budgetMin" label="Minimum budget" type="number" />
      <BaseInput v-model="form.budgetMax" label="Maximum budget" type="number" />
      <BaseInput v-model="form.location" label="Location" />
    </div>
    <div class="row q-gutter-sm q-mt-md">
      <BaseButton v-if="step > 1" type="ghost" label="Back" @click="step--" />
      <BaseButton v-if="step < 3" label="Continue" @click="step++" />
      <BaseButton v-else label="Publish request" @click="submitRequest" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BaseButton from 'components/base/BaseButton.vue';
import BaseInput from 'components/base/BaseInput.vue';
import BaseSelect from 'components/base/BaseSelect.vue';
import BaseStepper from 'components/base/BaseStepper.vue';
import MediaUploader from 'components/base/MediaUploader.vue';
import TagPill from 'components/base/TagPill.vue';
import { useDesignsStore } from 'src/stores/designs-store';
import { useFabricsStore } from 'src/stores/fabrics-store';
import { useRequestsStore } from 'src/stores/requests-store';
import { useActivityStore } from 'src/stores/activity-store';

const route = useRoute();
const router = useRouter();
const requestsStore = useRequestsStore();
const designsStore = useDesignsStore();
const fabricsStore = useFabricsStore();
const activityStore = useActivityStore();

const step = ref(1);
const steps = [
  { name: 1, title: 'Upload style' },
  { name: 2, title: 'Add details' },
  { name: 3, title: 'Set budget' },
];

const form = reactive({
  title: '',
  notes: '',
  color: '',
  occasion: '',
  budgetMin: '',
  budgetMax: '',
  location: '',
  fabricIntent: 'none',
});

const referenceFiles = ref<File[]>([]);
const fabricFiles = ref<File[]>([]);
const selectedDesignId = ref('');
const selectedFabricId = ref('');
const designTag = ref('');
const fabricTag = ref('');

const designOptions = computed(() =>
  designsStore.items.map((item) => ({ label: item.title, value: item.id }))
);
const fabricOptions = computed(() =>
  fabricsStore.items.map((item) => ({ label: item.name, value: item.id }))
);
const fabricIntentOptions = [
  { label: 'No fabric intent', value: 'none' },
  { label: 'Purchase from market', value: 'market_purchase' },
  { label: 'Fashioneer sources fabric', value: 'fashioneer_source' },
  { label: 'Upload fabric reference', value: 'customer_upload' },
];

const attachedDesigns = computed(() =>
  designsStore.items.filter((item) => formDesignIds.value.includes(item.id))
);

const formDesignIds = ref<string[]>([]);

watch(selectedDesignId, (value) => {
  if (value && !formDesignIds.value.includes(value)) {
    formDesignIds.value.push(value);
  }
});

watch(selectedFabricId, (value) => {
  if (value) {
    form.fabricIntent = 'market_purchase';
  }
});

watch(
  () => route.query.designId,
  (value) => {
    if (typeof value === 'string') {
      selectedDesignId.value = value;
    }
  },
  { immediate: true }
);

watch(
  () => route.query.designTag,
  (value) => {
    if (typeof value === 'string') {
      designTag.value = value;
      void attachDesignByTag();
    }
  },
  { immediate: true }
);

function attachDesignByTag() {
  const match = designsStore.items.find((item) => item.tag === designTag.value);
  if (match && !formDesignIds.value.includes(match.id)) {
    formDesignIds.value.push(match.id);
  }
}

function attachFabricByTag() {
  const match = fabricsStore.items.find((item) => item.tag === fabricTag.value);
  if (match) {
    selectedFabricId.value = match.id;
  }
}

function clearDesigns() {
  formDesignIds.value = [];
  selectedDesignId.value = '';
  designTag.value = '';
}

function setReferenceFiles(files: File[]) {
  referenceFiles.value = files;
}

function setFabricFiles(files: File[]) {
  fabricFiles.value = files;
  if (files.length) {
    form.fabricIntent = 'customer_upload';
  }
}

function goToFabricMarket() {
  router.push('/fabrics');
}

function submitRequest() {
  requestsStore.createRequest({
    id: `req-${Date.now()}`,
    title: form.title || 'Custom outfit',
    notes: form.notes,
    images: referenceFiles.value.map((file) => URL.createObjectURL(file)),
    color: form.color,
    occasion: form.occasion,
    budgetMin: Number(form.budgetMin) || undefined,
    budgetMax: Number(form.budgetMax) || undefined,
    status: 'open',
    createdAt: new Date().toISOString().slice(0, 10),
    location: form.location,
    attachedDesignIds: formDesignIds.value,
    attachedFabricId: selectedFabricId.value || undefined,
    attachedFabricTag: fabricTag.value || undefined,
    attachedFabricImage: fabricFiles.value[0]
      ? URL.createObjectURL(fabricFiles.value[0])
      : undefined,
    fabricIntent: form.fabricIntent as any,
  });
  activityStore.addEvent('REQUEST_CREATED', 'Request created', form.title, 'assignment');
  if (formDesignIds.value.length) {
    activityStore.addEvent('DESIGN_ATTACHED', 'Design attached', 'Design linked', 'style');
  }
  if (fabricTag.value || selectedFabricId.value || fabricFiles.value.length) {
    activityStore.addEvent('FABRIC_ATTACHED', 'Fabric attached', 'Fabric linked', 'texture');
  }
  router.push('/customer/requests');
}
</script>
