import { api } from './client';
import { Follow, PaginatedResponse, User } from './types';

export interface FollowListQuery {
  page?: number;
  limit?: number;
}

export const followsApi = {
  // 팔로우
  follow: async (userId: string): Promise<Follow> => {
    return api.post<Follow>(`/api/follows/${userId}`);
  },

  // 언팔로우
  unfollow: async (userId: string): Promise<void> => {
    return api.delete<void>(`/api/follows/${userId}`);
  },

  // 팔로워 목록 조회
  getFollowers: async (userId: string, query?: FollowListQuery): Promise<PaginatedResponse<User>> => {
    const params = new URLSearchParams();
    if (query?.page) params.append('page', String(query.page));
    if (query?.limit) params.append('limit', String(query.limit));
    const queryString = params.toString();
    return api.get<PaginatedResponse<User>>(`/api/users/${userId}/followers${queryString ? `?${queryString}` : ''}`);
  },

  // 팔로잉 목록 조회
  getFollowing: async (userId: string, query?: FollowListQuery): Promise<PaginatedResponse<User>> => {
    const params = new URLSearchParams();
    if (query?.page) params.append('page', String(query.page));
    if (query?.limit) params.append('limit', String(query.limit));
    const queryString = params.toString();
    return api.get<PaginatedResponse<User>>(`/api/users/${userId}/following${queryString ? `?${queryString}` : ''}`);
  },
};
