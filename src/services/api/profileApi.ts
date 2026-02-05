import { httpClient } from './httpClient';
import type { CustomerProfile, FashioneerProfile } from 'src/types/domain';

export const profileApi = {
  async fetchCustomerProfile() {
    // TODO: connect backend
    return httpClient.get<CustomerProfile>('/profiles/customer');
  },
  async fetchFashioneerProfile() {
    // TODO: connect backend
    return httpClient.get<FashioneerProfile>('/profiles/fashioneer');
  },
  async updateCustomerProfile(payload: Partial<CustomerProfile>) {
    // TODO: connect backend
    return httpClient.put<CustomerProfile>('/profiles/customer', payload);
  },
  async updateFashioneerProfile(payload: Partial<FashioneerProfile>) {
    // TODO: connect backend
    return httpClient.put<FashioneerProfile>('/profiles/fashioneer', payload);
  },
};
