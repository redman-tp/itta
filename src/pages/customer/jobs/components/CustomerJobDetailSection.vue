<template>
  <section class="itta-section">
    <JobCard v-if="job" :job="job" :show-action="false" />
    <BaseCard v-if="job" title="Timeline" ui-key="card:timeline" class="q-mt-md">
      <div class="text-caption text-grey-7">
        Time remaining: {{ timeRemaining }}
      </div>
    </BaseCard>
    <ProgressTimeline v-if="job" :updates="job.progressUpdates ?? []" class="q-mt-md" />
    <BaseCard v-if="job" title="Extension request" ui-key="card:extension" class="q-mt-md">
      <div v-if="extensionDate" class="text-body2">
        Requested new date: {{ extensionDate }}
      </div>
      <div v-else class="text-caption text-grey-7">
        No extension requested.
      </div>
      <div v-if="extensionDate" class="row q-gutter-sm q-mt-sm">
        <BaseButton label="Approve" @click="approveExtension" />
        <BaseButton type="ghost" label="Reject" @click="rejectExtension" />
      </div>
    </BaseCard>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import BaseButton from 'components/base/BaseButton.vue';
import BaseCard from 'components/base/BaseCard.vue';
import JobCard from 'components/domain/JobCard.vue';
import ProgressTimeline from 'components/domain/ProgressTimeline.vue';
import { useJobsStore } from 'src/stores/jobs-store';

const route = useRoute();
const jobsStore = useJobsStore();
jobsStore.seedProgressUpdates();

const job = computed(() => jobsStore.jobs.find((item) => item.id === route.params.id));
const extensionDate = computed(() => jobsStore.extensionRequests[route.params.id as string]);
const timeRemaining = computed(() => {
  if (!job.value?.endDate) return 'N/A';
  const end = new Date(job.value.endDate).getTime();
  const diff = end - Date.now();
  const days = Math.max(Math.ceil(diff / 86400000), 0);
  return `${days} days`;
});

function approveExtension() {
  jobsStore.resolveExtension(route.params.id as string, true);
}

function rejectExtension() {
  jobsStore.resolveExtension(route.params.id as string, false);
}
</script>
