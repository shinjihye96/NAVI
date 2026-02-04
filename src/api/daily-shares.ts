import { api } from './client';
import {
  DailyShare,
  CreateDailyShareDto,
  UpdateDailyShareDto,
  DailyShareQuery,
  PaginatedResponse,
} from './types';

export const dailySharesApi = {
  // 하루공유 목록 조회 (비로그인 시에도 빈 배열 반환)
  getAll: async (query?: DailyShareQuery): Promise<PaginatedResponse<DailyShare>> => {
    const params = new URLSearchParams();
    if (query?.filter) params.append('filter', query.filter);
    if (query?.date) params.append('date', query.date);
    if (query?.page) params.append('page', String(query.page));
    if (query?.limit) params.append('limit', String(query.limit));

    const queryString = params.toString();
    try {
      return await api.get<PaginatedResponse<DailyShare>>(`/api/daily-shares${queryString ? `?${queryString}` : ''}`);
    } catch {
      // 비로그인 시 401 에러 발생하면 빈 배열 반환
      return { items: [], total: 0, page: 1, limit: 10, totalPages: 0 };
    }
  },

  // 하루공유 상세 조회
  getById: async (id: string): Promise<DailyShare> => {
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
  update: async (id: string, data: UpdateDailyShareDto): Promise<DailyShare> => {
    return api.patch<DailyShare>(`/api/daily-shares/${id}`, data);
  },

  // 하루공유 삭제
  delete: async (id: string): Promise<void> => {
    return api.delete<void>(`/api/daily-shares/${id}`);
  },
};
