import { api } from './client';

export interface DailyQuestion {
  id: string;
  content: string;
  hasAnswered: boolean;
  expiresAt: string;
  date?: string;
  isActive?: boolean;
  createdAt?: string;
}

export type WeatherType = 'sunny' | 'partly_cloudy' | 'cloudy' | 'rainy' | 'lightning';

export interface AnswerDailyQuestionDto {
  questionId: number;
  content?: string;
  imageUrl?: string;
  weather: WeatherType;
}

export const dailyQuestionsApi = {
  // 오늘의 질문 조회
  getTodayQuestion: async (): Promise<DailyQuestion> => {
    return api.get<DailyQuestion>('/api/daily-questions/today');
  },

  // 질문에 답변 제출
  submitAnswer: async (data: AnswerDailyQuestionDto): Promise<void> => {
    return api.post<void>('/api/daily-questions/answer', data);
  },
};
