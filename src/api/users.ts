import { api } from './client';
import { User, UpdateUserDto, PaginatedResponse } from './types';

export const usersApi = {
  // 닉네임 중복 확인
  checkNickname: async (nickname: string): Promise<{ available: boolean }> => {
    return api.get<{ available: boolean }>(`/users/check-nickname?nickname=${encodeURIComponent(nickname)}`);
  },

  // 현재 사용자 정보 조회
  getMe: async (): Promise<User> => {
    return api.get<User>('/users/me');
  },

  // 현재 사용자 정보 수정
  updateMe: async (data: UpdateUserDto): Promise<User> => {
    return api.patch<User>('/users/me', data);
  },

  // 특정 사용자 프로필 조회
  getUser: async (userId: number): Promise<User> => {
    return api.get<User>(`/users/${userId}`);
  },

  // 사용자의 팔로워 목록
  getFollowers: async (userId: number, page = 1, limit = 20): Promise<PaginatedResponse<User>> => {
    return api.get<PaginatedResponse<User>>(`/users/${userId}/followers?page=${page}&limit=${limit}`);
  },

  // 사용자가 팔로우하는 목록
  getFollowing: async (userId: number, page = 1, limit = 20): Promise<PaginatedResponse<User>> => {
    return api.get<PaginatedResponse<User>>(`/users/${userId}/following?page=${page}&limit=${limit}`);
  },
};
