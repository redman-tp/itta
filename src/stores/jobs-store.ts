import { defineStore } from 'pinia';
import type { Job, JobStatus, ProgressUpdate } from 'src/types/domain';
import { mockJobs, mockProgressUpdates } from 'src/data/mock-data';
import { progressPresets } from 'src/utils/progress-presets';
import { jobsApi } from 'src/services/api/jobsApi';

interface JobsState {
  jobs: Job[];
  extensionRequests: Record<string, string>;
  progressPresets: string[];
}

export const useJobsStore = defineStore('jobs', {
  state: (): JobsState => ({
    jobs: mockJobs,
    extensionRequests: {},
    progressPresets: [...progressPresets],
  }),
  actions: {
    createJob(job: Job) {
      this.jobs.unshift(job);
    },
    async createJobRemote(job: Job) {
      // TODO: replace mock with backend response
      const response = await jobsApi.createJob(job);
      this.createJob(response.data);
    },
    updateStatus(jobId: string, status: JobStatus) {
      const job = this.jobs.find((item) => item.id === jobId);
      if (job) {
        job.status = status;
      }
    },
    async updateStatusRemote(jobId: string, status: JobStatus) {
      // TODO: replace mock with backend response
      const response = await jobsApi.updateJobStatus(jobId, status);
      this.updateStatus(jobId, response.data.status);
    },
    requestExtension(jobId: string, newDate: string) {
      this.extensionRequests[jobId] = newDate;
    },
    async requestExtensionRemote(jobId: string, newDate: string) {
      // TODO: replace mock with backend response
      const response = await jobsApi.requestExtension(jobId, newDate);
      this.requestExtension(jobId, response.data.dueDate ?? newDate);
    },
    resolveExtension(jobId: string, approved: boolean) {
      if (!approved) {
        delete this.extensionRequests[jobId];
      }
    },
    addProgressUpdate(jobId: string, update: ProgressUpdate) {
      const job = this.jobs.find((item) => item.id === jobId);
      if (!job) return;
      if (!job.progressUpdates) {
        job.progressUpdates = [];
      }
      job.progressUpdates.unshift(update);
      if (update.preset === 'Delivered and completed') {
        job.status = 'completed';
      }
    },
    seedProgressUpdates() {
      const job = this.jobs[0];
      if (job && (!job.progressUpdates || job.progressUpdates.length === 0)) {
        job.progressUpdates = mockProgressUpdates.filter((item) => item.jobId === job.id);
      }
    },
    async fetchJobs() {
      // TODO: replace mock with backend response
      const response = await jobsApi.fetchJobs();
      this.jobs = response.data;
    },
  },
});
