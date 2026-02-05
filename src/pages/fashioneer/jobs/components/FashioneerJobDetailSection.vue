<template>
  <section class="itta-section">
    <JobCard v-if="job" :job="job" :show-action="false" />
    <BaseCard v-if="job" title="Update status" ui-key="card:status" class="q-mt-md">
      <BaseSelect
        v-model="status"
        label="Status"
        :options="statusOptions"
        :emit-value="true"
        :map-options="true"
      />
      <BaseButton label="Update" class="q-mt-sm" @click="updateStatus" />
    </BaseCard>
    <BaseCard v-if="job" title="Update progress" ui-key="card:progress" class="q-mt-md">
      <BaseSelect
        v-model="progressPreset"
        label="Progress preset"
        :options="presetOptions"
        :emit-value="true"
        :map-options="true"
      />
      <BaseInput v-model="progressNote" label="Optional note" type="textarea" autogrow />
      <MediaUploader label="Upload progress photos" @update:files="setProgressFiles" />
      <BaseButton label="Add update" class="q-mt-sm" @click="addProgress" />
    </BaseCard>
    <ProgressTimeline v-if="job" :updates="job.progressUpdates ?? []" class="q-mt-md" />
    <BaseCard v-if="job" title="Request extension" ui-key="card:extension" class="q-mt-md">
      <BaseInput v-model="extensionDate" label="New delivery date" type="date" />
      <BaseButton label="Request" class="q-mt-sm" @click="requestExtension" />
      <div class="text-caption text-grey-7 q-mt-sm">
        Extension can be requested once and must not exceed the hard stop date.
      </div>
    </BaseCard>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import BaseButton from 'components/base/BaseButton.vue';
import BaseCard from 'components/base/BaseCard.vue';
import BaseInput from 'components/base/BaseInput.vue';
import BaseSelect from 'components/base/BaseSelect.vue';
import MediaUploader from 'components/base/MediaUploader.vue';
import JobCard from 'components/domain/JobCard.vue';
import ProgressTimeline from 'components/domain/ProgressTimeline.vue';
import { useJobsStore } from 'src/stores/jobs-store';
import type { JobStatus } from 'src/types/domain';
import { useActivityStore } from 'src/stores/activity-store';

const route = useRoute();
const jobsStore = useJobsStore();

const job = computed(() => jobsStore.jobs.find((item) => item.id === route.params.id));
const status = ref<JobStatus>(job.value?.status ?? 'pending');
const extensionDate = ref('');
const progressPreset = ref('');
const progressNote = ref('');
const progressFiles = ref<File[]>([]);
const activityStore = useActivityStore();

const statusOptions = [
  { label: 'Pending acceptance', value: 'pending' },
  { label: 'In progress', value: 'in_progress' },
  { label: 'Ready for fitting', value: 'ready_for_fitting' },
  { label: 'Completed', value: 'completed' },
];

const presetOptions = computed(() =>
  jobsStore.progressPresets.map((preset) => ({ label: preset, value: preset }))
);

function updateStatus() {
  jobsStore.updateStatus(route.params.id as string, status.value);
}

function requestExtension() {
  if (extensionDate.value) {
    jobsStore.requestExtension(route.params.id as string, extensionDate.value);
  }
}

function setProgressFiles(files: File[]) {
  progressFiles.value = files;
}

function addProgress() {
  if (!job.value || !progressPreset.value) return;
  jobsStore.addProgressUpdate(job.value.id, {
    id: `prog-${Date.now()}`,
    jobId: job.value.id,
    preset: progressPreset.value,
    note: progressNote.value || undefined,
    photos: progressFiles.value.map((file) => URL.createObjectURL(file)),
    createdAt: new Date().toISOString().slice(0, 10),
  });
  activityStore.addEvent(
    'JOB_PROGRESS_UPDATED',
    'Progress updated',
    progressPreset.value,
    'timeline'
  );
  progressPreset.value = '';
  progressNote.value = '';
  progressFiles.value = [];
}
</script>
