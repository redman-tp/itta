import { httpClient } from './httpClient';
import type { DesignItem } from 'src/types/domain';

export interface DesignsQuery {
  category?: string;
  size?: string;
  priceMin?: number;
  priceMax?: number;
  location?: string;
  rating?: number;
}

export const designsApi = {
  async fetchDesigns(query?: DesignsQuery) {
    // TODO: connect backend
    return httpClient.post<DesignItem[]>('/designs/search', query ?? {});
  },
  async fetchDesignDetail(id: string) {
    // TODO: connect backend
    return httpClient.get<DesignItem>(`/designs/${id}`);
  },
  async lookupByTag(tag: string) {
    // TODO: connect backend
    return httpClient.get<DesignItem>(`/designs/tag/${tag}`);
  },
  async bookmark(id: string) {
    // TODO: connect backend
    return httpClient.post<DesignItem>(`/designs/${id}/bookmark`, {});
  },
  async createDesign(payload: DesignItem) {
    // TODO: connect backend
    return httpClient.post<DesignItem>('/designs', payload);
  },
};
