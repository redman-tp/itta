import { httpClient } from './httpClient';
import type { Job } from 'src/types/domain';

export const jobsApi = {
  async createJob(payload: Job) {
    // TODO: connect backend
    return httpClient.post<Job>('/jobs', payload);
  },
  async fetchJobs() {
    // TODO: connect backend
    return httpClient.get<Job[]>('/jobs');
  },
  async updateJobStatus(id: string, status: Job['status']) {
    // TODO: connect backend
    return httpClient.put<Job>(`/jobs/${id}/status`, { status });
  },
  async requestExtension(id: string, newDate: string) {
    // TODO: connect backend
    return httpClient.post<Job>(`/jobs/${id}/extension`, { newDate });
  },
};
