import { api } from './client';
import { Follow } from './types';

export const followsApi = {
  // 팔로우
  follow: async (userId: number): Promise<Follow> => {
    return api.post<Follow>(`/api/follows/${userId}`);
  },

  // 언팔로우
  unfollow: async (userId: number): Promise<void> => {
    return api.delete<void>(`/api/follows/${userId}`);
  },
};
