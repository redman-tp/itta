import { defineStore } from 'pinia';
import type { FabricItem } from 'src/types/domain';
import { mockFabrics } from 'src/data/mock-data';
import { fabricsApi } from 'src/services/api/fabricsApi';

interface FabricsState {
  items: FabricItem[];
  selected: FabricItem | null;
}

export const useFabricsStore = defineStore('fabrics', {
  state: (): FabricsState => ({
    items: mockFabrics,
    selected: null,
  }),
  actions: {
    async fetchFabrics() {
      // TODO: replace mock with backend response
      const response = await fabricsApi.fetchFabrics();
      this.items = response.data;
    },
    async lookupByTag(tag: string) {
      // TODO: replace mock with backend response
      const response = await fabricsApi.lookupByTag(tag);
      this.selected = response.data;
      return response.data;
    },
    setSelectedFabric(item: FabricItem | null) {
      this.selected = item;
    },
  },
});
