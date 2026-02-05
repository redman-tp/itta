<template>
  <div class="itta-uploader" :data-ui="dataUi">
    <q-uploader
      :url="null"
      :auto-upload="false"
      :multiple="multiple"
      :label="label"
      accept="image/*"
      @added="handleFiles"
    />
    <div v-if="previews.length" class="row q-col-gutter-sm q-mt-sm">
      <div v-for="(src, index) in previews" :key="src" class="col-4">
        <q-img :src="src" ratio="1" class="itta-uploader__preview" />
        <BaseButton type="text" label="Remove" class="q-mt-xs" @click="remove(index)" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import BaseButton from './BaseButton.vue';

interface Props {
  label?: string;
  multiple?: boolean;
  uiKey?: string;
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Upload images',
  multiple: true,
});

const emit = defineEmits<{ (e: 'update:files', files: File[]): void }>();

const previews = ref<string[]>([]);
const files = ref<File[]>([]);

const dataUi = computed(() => props.uiKey ?? 'uploader:media');

function handleFiles(added: File[]) {
  files.value = [...files.value, ...added];
  previews.value = files.value.map((file) => URL.createObjectURL(file));
  emit('update:files', files.value);
}

function remove(index: number) {
  files.value.splice(index, 1);
  previews.value = files.value.map((file) => URL.createObjectURL(file));
  emit('update:files', files.value);
}
</script>
