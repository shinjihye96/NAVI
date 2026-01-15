import { api } from './client';
import {
  DailyShare,
  CreateDailyShareDto,
  UpdateDailyShareDto,
  DailyShareQuery,
  PaginatedResponse,
} from './types';

export const dailySharesApi = {
  // 하루공유 목록 조회
  getAll: async (query?: DailyShareQuery): Promise<PaginatedResponse<DailyShare>> => {
    const params = new URLSearchParams();
    if (query?.page) params.append('page', String(query.page));
    if (query?.limit) params.append('limit', String(query.limit));
    if (query?.userId) params.append('userId', String(query.userId));
    if (query?.mood) params.append('mood', query.mood);
    if (query?.isFollowing !== undefined) params.append('isFollowing', String(query.isFollowing));
    if (query?.sortBy) params.append('sortBy', query.sortBy);

    const queryString = params.toString();
    return api.get<PaginatedResponse<DailyShare>>(`/api/daily-shares${queryString ? `?${queryString}` : ''}`);
  },

  // 하루공유 상세 조회
  getById: async (id: number): Promise<DailyShare> => {
    return api.get<DailyShare>(`/api/daily-shares/${id}`);
  },

  // 오늘 공유 여부 확인
  checkTodayShare: async (): Promise<{ hasShared: boolean; dailyShare?: DailyShare }> => {
    return api.get<{ hasShared: boolean; dailyShare?: DailyShare }>('/api/daily-shares/today/check');
  },

  // 하루공유 생성
  create: async (data: CreateDailyShareDto): Promise<DailyShare> => {
    return api.post<DailyShare>('/api/daily-shares', data);
  },

  // 하루공유 수정
  update: async (id: number, data: UpdateDailyShareDto): Promise<DailyShare> => {
    return api.patch<DailyShare>(`/api/daily-shares/${id}`, data);
  },

  // 하루공유 삭제
  delete: async (id: number): Promise<void> => {
    return api.delete<void>(`/api/daily-shares/${id}`);
  },
};
