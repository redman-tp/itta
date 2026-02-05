import { httpClient } from './httpClient';
import type { NotificationItem } from 'src/types/domain';

export const notificationsApi = {
  async listNotifications() {
    // TODO: connect backend
    return httpClient.get<NotificationItem[]>('/notifications');
  },
  async markRead(id: string) {
    // TODO: connect backend
    return httpClient.post<NotificationItem>(`/notifications/${id}/read`, {});
  },
};
