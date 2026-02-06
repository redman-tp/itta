import { defineStore } from 'pinia';
import type { CustomerProfile, FashioneerProfile, UserProfile } from 'src/types/domain';
import { profileApi } from 'src/services/api/profileApi';

interface ProfileState {
  customerProfile: CustomerProfile | null;
  fashioneerProfile: FashioneerProfile | null;
}

export const useProfileStore = defineStore('profile', {
  state: (): ProfileState => ({
    customerProfile: null,
    fashioneerProfile: null,
  }),
  actions: {
    setCustomerProfile(profile: CustomerProfile) {
      this.customerProfile = profile;
    },
    setFashioneerProfile(profile: FashioneerProfile) {
      this.fashioneerProfile = profile;
    },
    ensureCustomerProfile(user: UserProfile | null) {
      if (this.customerProfile || !user) return;
      this.customerProfile = {
        id: user.id,
        name: user.name,
        location: user.location ?? '',
      };
    },
    ensureFashioneerProfile(user: UserProfile | null) {
      if (this.fashioneerProfile || !user) return;
      this.fashioneerProfile = {
        id: user.id,
        name: user.name,
        location: user.location ?? '',
      };
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
