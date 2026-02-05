import { defineStore } from 'pinia';
import type { UserRole, UserProfile } from 'src/types/domain';

interface AuthState {
  isAuthenticated: boolean;
  role: UserRole | null;
  user: UserProfile | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isAuthenticated: false,
    role: null,
    user: null,
  }),
  getters: {
    isCustomer: (state) => state.role === 'customer',
    isFashioneer: (state) => state.role === 'fashioneer',
  },
  actions: {
    login(role: UserRole, user: UserProfile) {
      this.isAuthenticated = true;
      this.role = role;
      this.user = user;
    },
    logout() {
      this.isAuthenticated = false;
      this.role = null;
      this.user = null;
    },
    getDashboardRoute() {
      if (this.role === 'customer') return '/customer';
      if (this.role === 'fashioneer') return '/fashioneer';
      return '/';
    },
    canAccess(requiredRole?: UserRole) {
      if (!this.isAuthenticated) return false;
      if (!requiredRole) return true;
      return this.role === requiredRole;
    },
  },
});
