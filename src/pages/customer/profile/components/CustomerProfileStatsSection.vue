<template>
  <BaseCard ui-key="card:profile-stats">
    <div class="text-subtitle1 text-weight-medium">Quick actions</div>
    <div class="row q-col-gutter-sm q-mt-sm">
      <div class="col-3">
        <q-btn flat no-caps class="full-width itta-profile-stat" @click="goToRequests">
          <div class="itta-profile-stat__icon-wrap">
            <q-icon name="content_cut" size="20px" />
            <q-badge v-if="activeRequestsCount > 0" color="primary" rounded class="itta-profile-stat__badge">
              {{ activeRequestsCount }}
            </q-badge>
          </div>
          <div class="text-caption text-weight-medium q-mt-xs">Requests</div>
        </q-btn>
      </div>
      <div class="col-3">
        <q-btn flat no-caps class="full-width itta-profile-stat" @click="goToJobs">
          <div class="itta-profile-stat__icon-wrap">
            <q-icon name="work" size="20px" />
            <q-badge v-if="activeJobsCount > 0" color="primary" rounded class="itta-profile-stat__badge">
              {{ activeJobsCount }}
            </q-badge>
          </div>
          <div class="text-caption text-weight-medium q-mt-xs">Jobs</div>
        </q-btn>
      </div>
      <div class="col-3">
        <q-btn flat no-caps class="full-width itta-profile-stat" @click="goToMeasurements">
          <div class="itta-profile-stat__icon-wrap">
            <q-icon name="straighten" size="20px" />
          </div>
          <div class="text-caption text-weight-medium q-mt-xs">Measurements</div>
        </q-btn>
      </div>
      <div class="col-3">
        <q-btn flat no-caps class="full-width itta-profile-stat" @click="goToNewRequest">
          <div class="itta-profile-stat__icon-wrap">
            <q-icon name="add_circle" size="20px" />
          </div>
          <div class="text-caption text-weight-medium q-mt-xs">New request</div>
        </q-btn>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import BaseCard from 'components/base/BaseCard.vue';
import { useJobsStore } from 'src/stores/jobs-store';
import { useRequestsStore } from 'src/stores/requests-store';

const router = useRouter();
const requestsStore = useRequestsStore();
const jobsStore = useJobsStore();

const activeRequestsCount = computed(
  () => requestsStore.requests.filter((request) => request.status !== 'closed').length
);
const activeJobsCount = computed(
  () => jobsStore.jobs.filter((job) => job.status !== 'completed').length
);

function goToRequests() {
  void router.push('/customer/requests');
}

function goToJobs() {
  void router.push('/customer/jobs');
}

function goToNewRequest() {
  void router.push('/customer/sew-request');
}

function goToMeasurements() {
  void router.push('/customer/measurements');
}
</script>
