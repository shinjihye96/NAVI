import { api } from './client';
import { DailyEmotion, CreateEmotionDto, EmotionType } from './types';

export interface EmotionTypeInfo {
  id: number;
  type: string;
  label: string;
  imageUrl: string;
}

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

export const emotionTypesApi = {
  // 모든 감정 타입 조회
  getAll: async (): Promise<EmotionTypeInfo[]> => {
    return api.get<EmotionTypeInfo[]>('/api/emotion-types');
  },
};
