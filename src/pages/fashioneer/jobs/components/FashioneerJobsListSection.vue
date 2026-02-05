<template>
  <section class="itta-section">
    <div class="text-subtitle1 text-weight-medium">Active jobs</div>
    <div class="row q-col-gutter-md q-mt-sm">
      <div v-for="job in jobs" :key="job.id" class="col-12 col-sm-6">
        <JobCard :job="job" @action="goToJob" />
      </div>
    </div>
    <div v-if="isLoading" class="text-caption text-grey-7 q-mt-md">
      Loading jobs...
    </div>
    <div v-else-if="error" class="text-caption text-negative q-mt-md">
      {{ error }}
    </div>
    <div v-else-if="!jobs.length" class="text-caption text-grey-7 q-mt-md">
      No active jobs.
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import JobCard from 'components/domain/JobCard.vue';
import { useJobsStore } from 'src/stores/jobs-store';

const router = useRouter();
const jobsStore = useJobsStore();
const jobs = computed(() => jobsStore.jobs);
const isLoading = ref(false);
const error = ref('');

function goToJob(id: string) {
  router.push(`/fashioneer/jobs/${id}`);
}
</script>
