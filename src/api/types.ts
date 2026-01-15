// API Response 타입
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Pagination 타입
export interface PaginationQuery {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

// Enum 타입들
export enum Mood {
  VERY_GOOD = 'very_good',
  GOOD = 'good',
  NORMAL = 'normal',
  BAD = 'bad',
  VERY_BAD = 'very_bad',
}

export enum EmotionType {
  CELEBRATE = 'celebrate',
  PRAY = 'pray',
  CHEER = 'cheer',
  SAD = 'sad',
  HAPPY = 'happy',
  HEART = 'heart',
}

export enum UserType {
  PATIENT_CAREGIVER = 'patient_caregiver',
  RECOVERED_CAREGIVER = 'recovered_caregiver',
  PATIENT = 'patient',
  RECOVERED = 'recovered',
}

export enum UserStatus {
  FIGHTING = 'fighting',
  RECOVERED = 'recovered',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export enum CancerStage {
  STAGE_1 = 'stage_1',
  STAGE_2 = 'stage_2',
  STAGE_3 = 'stage_3',
  STAGE_4 = 'stage_4',
}

// User 관련 타입
export interface Patient {
  id: number;
  name: string;
  gender?: Gender;
  birthDate?: string;
  cancerTypeId: number;
  cancerStage?: CancerStage;
  diagnosisDate: string;
  recoveryDate?: string;
}

export interface User {
  id: number;
  email: string;
  phone: string;
  name: string;
  nickname: string;
  gender?: Gender;
  birthDate?: string;
  userType: UserType;
  userStatus: UserStatus;
  region?: string;
  hospital?: string;
  profileImageUrl?: string;
  patient?: Patient;
  createdAt: string;
  updatedAt: string;
}

// Auth 관련 타입
export interface SignupDto {
  email: string;
  password: string;
  phone: string;
  name: string;
  nickname: string;
  gender?: Gender;
  birthDate?: string;
  userType: UserType;
  userStatus: UserStatus;
  region?: string;
  hospital?: string;
  patient?: Omit<Patient, 'id'>;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  user: User;
  tokens: AuthTokens;
}

// DailyShare 관련 타입
export interface DailyEmotion {
  id: string;
  emotionType: EmotionType;
  userId: string;
  user?: User;
}

export interface DailyShare {
  id: string;
  mood: Mood;
  content?: string;
  imageUrl?: string;
  isPrivate: boolean;
  user: User;
  emotions: DailyEmotion[];
  emotionCounts: Record<EmotionType, number>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDailyShareDto {
  mood: Mood | string;
  content?: string;
  imageUrl?: string;
  isPrivate?: boolean;
}

export interface UpdateDailyShareDto {
  mood?: Mood;
  content?: string;
  imageUrl?: string;
  isPrivate?: boolean;
}

export interface DailyShareQuery extends PaginationQuery {
  filter?: 'all' | 'caregiver' | 'patient';
  date?: string; // YYYY-MM-DD 형식
}

// Emotion 관련 타입
export interface CreateEmotionDto {
  emotionType: EmotionType;
}

// Follow 관련 타입
export interface Follow {
  id: number;
  followerId: number;
  followingId: number;
  follower?: User;
  following?: User;
  createdAt: string;
}

// User 업데이트 타입
export interface UpdateUserDto {
  nickname?: string;
  gender?: Gender;
  birthDate?: string;
  region?: string;
  hospital?: string;
  profileImageUrl?: string;
}

// Cancer Type 타입
export interface CancerType {
  id: number;
  name: string;
}
