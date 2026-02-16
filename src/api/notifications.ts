import { api } from './client';
import {
  NotificationListResponse,
  NotificationUnreadCount,
  NotificationQuery,
} from './types';

export const notificationsApi = {
  // 알림 목록 조회
  getAll: async (query?: NotificationQuery): Promise<NotificationListResponse> => {
    const params = new URLSearchParams();
    if (query?.category) params.append('category', query.category);
    if (query?.page) params.append('page', String(query.page));
    if (query?.limit) params.append('limit', String(query.limit));

    const queryString = params.toString();
    return api.get<NotificationListResponse>(`/api/notifications${queryString ? `?${queryString}` : ''}`);
  },

  // 읽지 않은 알림 수 조회
  getUnreadCount: async (): Promise<NotificationUnreadCount> => {
    return api.get<NotificationUnreadCount>('/api/notifications/unread-count');
  },

  // 모든 알림 읽음 처리
  readAll: async (): Promise<void> => {
    return api.patch<void>('/api/notifications/read-all');
  },

  // 개별 알림 읽음 처리
  read: async (id: string): Promise<void> => {
    return api.patch<void>(`/api/notifications/${id}/read`);
  },
};
