import { defineStore } from 'pinia';

interface ToastMessage {
  id: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
}

interface UiState {
  isLoading: boolean;
  toasts: ToastMessage[];
  activeModal: string | null;
}

export const useUiStore = defineStore('ui', {
  state: (): UiState => ({
    isLoading: false,
    toasts: [],
    activeModal: null,
  }),
  actions: {
    setLoading(value: boolean) {
      this.isLoading = value;
    },
    pushToast(message: string, type: ToastMessage['type'] = 'info') {
      this.toasts.push({ id: Date.now().toString(), message, type });
    },
    clearToast(id: string) {
      this.toasts = this.toasts.filter((toast) => toast.id !== id);
    },
    openModal(key: string) {
      this.activeModal = key;
    },
    closeModal() {
      this.activeModal = null;
    },
  },
});
