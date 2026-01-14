import { api, setAccessToken, setRefreshToken, clearTokens } from './client';
import { SignupDto, LoginDto, LoginResponse, User, AuthTokens } from './types';

export const authApi = {
  // 회원가입
  signup: async (data: SignupDto): Promise<User> => {
    return api.post<User>('/auth/signup', data);
  },

  // 로그인
  login: async (data: LoginDto): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', data);
    setAccessToken(response.tokens.accessToken);
    setRefreshToken(response.tokens.refreshToken);
    return response;
  },

  // 로그아웃
  logout: async (): Promise<void> => {
    try {
      await api.post<void>('/auth/logout');
    } finally {
      clearTokens();
    }
  },

  // 토큰 갱신
  refresh: async (refreshToken: string): Promise<AuthTokens> => {
    const response = await api.post<AuthTokens>('/auth/refresh', { refreshToken });
    setAccessToken(response.accessToken);
    setRefreshToken(response.refreshToken);
    return response;
  },
};
