export const EMOTION_TYPES = [
    { type: 'heart', icon: '/img/icon/Heart-image.png', label: '공감' },
    { type: 'thumbsUp', icon: '/img/icon/Like-thumb-up-image.png', label: '좋아요' },
    { type: 'pray', icon: '/img/icon/Pray-image.png', label: '응원' },
    { type: 'sad', icon: '/img/icon/Sad-image.png', label: '위로' },
    { type: 'cheer', icon: '/img/icon/Congrats-image.png', label: '축하' },
] as const;

export type EmotionType = typeof EMOTION_TYPES[number]['type'];
