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

// emotion_types 테이블과 동일한 값 사용
export type WeatherType = 'sun' | 'sun_cloud' | 'cloud' | 'rain' | 'lightning';

export interface AnswerDailyQuestionDto {
  questionId: number;
  content?: string;
  imageUrl?: string;
  weather: WeatherType;
}

// 내 답변 응답 타입
export interface DailyAnswer {
  id: number;
  questionId: number;
  content?: string;
  imageUrl?: string;
  weather: WeatherType;
  createdAt: string;
  question?: DailyQuestion;
}

export interface MyAnswersResponse {
  items: DailyAnswer[];
  total: number;
  page: number;
  limit: number;
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

  // 내 답변 히스토리 조회
  getMyAnswers: async (page: number = 1, limit: number = 20): Promise<MyAnswersResponse> => {
    return api.get<MyAnswersResponse>(`/api/daily-questions/my-answers?page=${page}&limit=${limit}`);
  },
};
