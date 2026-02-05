import { defineStore } from 'pinia';
import type { SewRequest } from 'src/types/domain';
import { mockSewRequests } from 'src/data/mock-data';
import { requestsApi } from 'src/services/api/requestsApi';

interface RequestsState {
  requests: SewRequest[];
  interestedFashioneers: Record<string, string[]>;
}

export const useRequestsStore = defineStore('requests', {
  state: (): RequestsState => ({
    requests: mockSewRequests,
    interestedFashioneers: {
      'req-001': ['Esther Adebayo', 'Kelechi Anozie'],
    },
  }),
  actions: {
    createRequest(request: SewRequest) {
      this.requests.unshift(request);
    },
    async createRequestRemote(request: SewRequest) {
      // TODO: replace mock with backend response
      const response = await requestsApi.createRequest(request);
      this.createRequest(response.data);
    },
    addInterest(requestId: string, fashioneerName: string) {
      if (!this.interestedFashioneers[requestId]) {
        this.interestedFashioneers[requestId] = [];
      }
      this.interestedFashioneers[requestId].push(fashioneerName);
    },
    async fetchRequests() {
      // TODO: replace mock with backend response
      const response = await requestsApi.fetchRequests();
      this.requests = response.data;
    },
  },
});
