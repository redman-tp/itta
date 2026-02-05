import { defineStore } from 'pinia';
import type { CustomerProfile, FashioneerProfile } from 'src/types/domain';
import { mockCustomerProfile, mockFashioneerProfile } from 'src/data/mock-data';
import { profileApi } from 'src/services/api/profileApi';

interface ProfileState {
  customerProfile: CustomerProfile | null;
  fashioneerProfile: FashioneerProfile | null;
}

export const useProfileStore = defineStore('profile', {
  state: (): ProfileState => ({
    customerProfile: mockCustomerProfile,
    fashioneerProfile: mockFashioneerProfile,
  }),
  actions: {
    setCustomerProfile(profile: CustomerProfile) {
      this.customerProfile = profile;
    },
    setFashioneerProfile(profile: FashioneerProfile) {
      this.fashioneerProfile = profile;
    },
    async fetchCustomerProfile() {
      // TODO: replace mock with backend response
      const response = await profileApi.fetchCustomerProfile();
      this.customerProfile = response.data;
    },
    async fetchFashioneerProfile() {
      // TODO: replace mock with backend response
      const response = await profileApi.fetchFashioneerProfile();
      this.fashioneerProfile = response.data;
    },
  },
});
