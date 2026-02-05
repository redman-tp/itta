import { httpClient } from './httpClient';
import type { SewRequest } from 'src/types/domain';

export const requestsApi = {
  async createRequest(payload: SewRequest) {
    // TODO: connect backend
    return httpClient.post<SewRequest>('/requests', payload);
  },
  async fetchRequests() {
    // TODO: connect backend
    return httpClient.get<SewRequest[]>('/requests');
  },
  async fetchRequestDetail(id: string) {
    // TODO: connect backend
    return httpClient.get<SewRequest>(`/requests/${id}`);
  },
};
