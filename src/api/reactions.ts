import { api } from './client';

export type ReactionType = 'heart' | 'thumbsUp' | 'pray' | 'sad' | 'cheer';

export interface ToggleReactionResponse {
  action: 'added' | 'removed';
  reactionType: ReactionType;
  id?: string;
  createdAt?: string;
}

export const reactionsApi = {
  toggle: async (dailyShareId: string, reactionType: ReactionType) => {
    return api.post<ToggleReactionResponse>(
      `/api/daily-shares/${dailyShareId}/reactions`,
      { reactionType }
    );
  },

  getMyReactions: async (dailyShareId: string) => {
    return api.get<ReactionType[]>(
      `/api/daily-shares/${dailyShareId}/reactions/my`
    );
  },

  getReactionCounts: async (dailyShareId: string) => {
    return api.get<{ type: string; count: number }[]>(
      `/api/daily-shares/${dailyShareId}/reactions/counts`
    );
  },
};
