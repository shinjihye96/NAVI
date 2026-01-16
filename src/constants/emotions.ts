export const EMOTION_TYPES = [
    { type: 'heart', icon: '💚', label: '공감' },
    { type: 'thumbsUp', icon: '👍', label: '좋아요' },
    { type: 'pray', icon: '🙏', label: '응원' },
    { type: 'sad', icon: '😢', label: '위로' },
    { type: 'cheer', icon: '🎉', label: '축하' },
] as const;

export type EmotionType = typeof EMOTION_TYPES[number]['type'];
