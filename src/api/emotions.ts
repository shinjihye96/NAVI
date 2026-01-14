import { api } from './client';
import { DailyEmotion, CreateEmotionDto } from './types';

export const emotionsApi = {
  // 감정 추가
  create: async (dailyShareId: number, data: CreateEmotionDto): Promise<DailyEmotion> => {
    return api.post<DailyEmotion>(`/daily-shares/${dailyShareId}/emotions`, data);
  },

  // 감정 삭제
  delete: async (dailyShareId: number): Promise<void> => {
    return api.delete<void>(`/daily-shares/${dailyShareId}/emotions`);
  },
};
