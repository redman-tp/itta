import { httpClient } from './httpClient';
import type { UserRole, UserProfile } from 'src/types/domain';

export interface LoginPayload {
  email: string;
  password: string;
  role: UserRole;
}

export interface LoginResponse {
  token: string;
  user: UserProfile;
}

export const authApi = {
  async login(payload: LoginPayload) {
    // TODO: connect backend
    return httpClient.post<LoginResponse>('/auth/login', payload);
  },
  async register(payload: LoginPayload) {
    // TODO: connect backend
    return httpClient.post<LoginResponse>('/auth/register', payload);
  },
};
