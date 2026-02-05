import { httpClient } from './httpClient';
import type { Bid } from 'src/types/domain';

export const bidsApi = {
  async createBid(payload: Bid) {
    // TODO: connect backend
    return httpClient.post<Bid>('/bids', payload);
  },
  async listBids(requestId: string) {
    // TODO: connect backend
    return httpClient.get<Bid[]>(`/requests/${requestId}/bids`);
  },
  async markViewed(bidId: string) {
    // TODO: connect backend
    return httpClient.post<Bid>(`/bids/${bidId}/viewed`, {});
  },
};
