import { defineStore } from 'pinia';
import type { UserRole, UserProfile } from 'src/types/domain';
import { hydrateSession, loginLocal, logoutLocal, registerLocal } from 'src/services/localAuth';

interface AuthState {
  isAuthenticated: boolean;
  role: UserRole | null;
  user: UserProfile | null;
  token: string | null;
  initialized: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isAuthenticated: false,
    role: null,
    user: null,
    token: null,
    initialized: false,
  }),
  getters: {
    isCustomer: (state) => state.role === 'customer',
    isFashioneer: (state) => state.role === 'fashioneer',
  },
  actions: {
    login(role: UserRole, user: UserProfile, token?: string) {
      this.isAuthenticated = true;
      this.role = role;
      this.user = user;
      this.token = token ?? null;
    },
    logout() {
      this.isAuthenticated = false;
      this.role = null;
      this.user = null;
      this.token = null;
      logoutLocal();
    },
    async loginWithCredentials(email: string, password: string) {
      const { session, user } = await loginLocal({ email, password });
      this.login(session.role, user, session.token);
    },
    async registerWithCredentials(email: string, password: string, role: UserRole, name?: string) {
      const { session, user } = await registerLocal({ email, password, role, name });
      this.login(session.role, user, session.token);
    },
    initialize() {
      if (this.initialized) return;
      const data = hydrateSession();
      if (data) {
        this.login(data.session.role, data.user, data.session.token);
      }
      this.initialized = true;
    },
    getDashboardRoute() {
      if (this.role === 'customer') return '/customer/profile';
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
