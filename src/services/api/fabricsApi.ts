import { httpClient } from './httpClient';
import type { FabricItem } from 'src/types/domain';

export const fabricsApi = {
  async fetchFabrics() {
    // TODO: connect backend
    return httpClient.get<FabricItem[]>('/fabrics');
  },
  async fetchFabricDetail(id: string) {
    // TODO: connect backend
    return httpClient.get<FabricItem>(`/fabrics/${id}`);
  },
  async lookupByTag(tag: string) {
    // TODO: connect backend
    return httpClient.get<FabricItem>(`/fabrics/tag/${tag}`);
  },
};
