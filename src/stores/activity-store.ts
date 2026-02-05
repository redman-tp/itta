import { defineStore } from 'pinia';
import type { ActivityEvent, ActivityType } from 'src/types/domain';
import { mockActivities } from 'src/data/mock-data';

interface ActivityState {
  events: ActivityEvent[];
}

export const useActivityStore = defineStore('activity', {
  state: (): ActivityState => ({
    events: mockActivities,
  }),
  actions: {
    addEvent(type: ActivityType, title: string, description?: string, icon?: string, meta?: Record<string, string>) {
      this.events.unshift({
        id: `act-${Date.now()}`,
        type,
        title,
        description,
        createdAt: new Date().toISOString(),
        icon,
        meta,
      });
    },
  },
});
