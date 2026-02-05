import { defineStore } from 'pinia';
import type { NotificationItem, NotificationType } from 'src/types/domain';
import { mockNotifications } from 'src/data/mock-data';
import { notificationsApi } from 'src/services/api/notificationsApi';

interface NotificationsState {
  notifications: NotificationItem[];
}

export const useNotificationsStore = defineStore('notifications', {
  state: (): NotificationsState => ({
    notifications: mockNotifications,
  }),
  getters: {
    unreadCount: (state) => state.notifications.filter((item) => !item.read).length,
  },
  actions: {
    async fetchNotifications() {
      // TODO: replace mock with backend response
      const response = await notificationsApi.listNotifications();
      this.notifications = response.data;
    },
    pushNotification(type: NotificationType, title: string, message: string, meta?: Record<string, string>) {
      this.notifications.unshift({
        id: `not-${Date.now()}`,
        type,
        title,
        message,
        createdAt: new Date().toISOString(),
        read: false,
        meta,
      });
    },
    async markRead(id: string) {
      // TODO: replace mock with backend response
      const notification = this.notifications.find((item) => item.id === id);
      if (notification) notification.read = true;
      await notificationsApi.markRead(id);
    },
  },
});
