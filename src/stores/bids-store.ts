import { defineStore } from 'pinia';
import type { Bid } from 'src/types/domain';
import { mockBids } from 'src/data/mock-data';
import { bidsApi } from 'src/services/api/bidsApi';

interface BidsState {
  bids: Bid[];
}

export const useBidsStore = defineStore('bids', {
  state: (): BidsState => ({
    bids: mockBids,
  }),
  getters: {
    bidsByRequest: (state) => (requestId: string) =>
      state.bids.filter((bid) => bid.requestId === requestId),
  },
  actions: {
    async createBid(bid: Bid) {
      // TODO: replace mock with backend response
      this.bids.unshift(bid);
      await bidsApi.createBid(bid);
    },
    async markViewed(bidId: string) {
      // TODO: replace mock with backend response
      const bid = this.bids.find((item) => item.id === bidId);
      if (bid) {
        bid.viewedBySewee = true;
      }
      await bidsApi.markViewed(bidId);
    },
  },
});
