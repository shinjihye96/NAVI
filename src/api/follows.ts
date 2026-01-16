import { api } from './client';
import { Follow } from './types';

export const followsApi = {
  // 팔로우
  follow: async (userId: string): Promise<Follow> => {
    return api.post<Follow>(`/api/follows/${userId}`);
  },

  // 언팔로우
  unfollow: async (userId: string): Promise<void> => {
    return api.delete<void>(`/api/follows/${userId}`);
  },
};
