import { defineStore } from 'pinia';
import type { DesignItem } from 'src/types/domain';
import { mockDesigns } from 'src/data/mock-data';
import { designsApi } from 'src/services/api/designsApi';

interface DesignsState {
  items: DesignItem[];
  featured: DesignItem[];
  filters: {
    category?: string;
    size?: string;
    priceMin?: number;
    priceMax?: number;
    location?: string;
    rating?: number;
    search?: string;
    searchActive?: boolean;
  };
  hasLoaded: boolean;
}

export const useDesignsStore = defineStore('designs', {
  state: (): DesignsState => ({
    items: mockDesigns,
    featured: mockDesigns,
    filters: {},
    hasLoaded: true,
  }),
  actions: {
    setFilters(filters: DesignsState['filters']) {
      this.filters = { ...this.filters, ...filters };
    },
    setItems(items: DesignItem[]) {
      this.items = items;
    },
    async fetchDesigns() {
      // TODO: replace mock with backend response
      if (this.hasLoaded) return;
      const response = await designsApi.fetchDesigns(this.filters);
      this.items = response.data;
      this.hasLoaded = true;
    },
    async fetchFeatured() {
      // TODO: replace mock with backend response
      const response = await designsApi.fetchDesigns();
      this.featured = response.data;
    },
    async lookupByTag(tag: string) {
      // TODO: replace mock with backend response
      const response = await designsApi.lookupByTag(tag);
      return response.data;
    },
    toggleBookmark(id: string) {
      const design = this.items.find((item) => item.id === id);
      if (design) {
        design.isBookmarked = !design.isBookmarked;
      }
    },
  },
});
