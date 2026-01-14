'use client';

import AppBar from "components/appBar/page";
import { Button, IconButton } from "components/ui/button/page";
import { Icon } from "icon/page";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { dailySharesApi, Mood } from "api";

const weatherOptions: {
    id: number;
    mood: Mood;
    label: string;
    img: string;
    gradientFrom: string;
    gradientTo: string;
}[] = [
    {
        id: 0,
        mood: Mood.VERY_GOOD,
        label: '화창해요',
        img: '/img/weather/Sun.png',
        gradientFrom: '#A8EEF7',
        gradientTo: '#E1F0FF',
    },
    {
        id: 1,
        mood: Mood.GOOD,
        label: '조금 맑아요',
        img: '/img/weather/Sun_and_Cloud.png',
        gradientFrom: '#FFF4E1',
        gradientTo: '#FCE4A6',
    },
    {
        id: 2,
        mood: Mood.NORMAL,
        label: '흐려요',
        img: '/img/weather/Cloud.png',
        gradientFrom: '#E8EAF6',
        gradientTo: '#C5CAE9',
    },
    {
        id: 3,
        mood: Mood.BAD,
        label: '비 내려요',
        img: '/img/weather/Rain.png',
        gradientFrom: '#BBDEFB',
        gradientTo: '#64B5F6',
    },
    {
        id: 4,
        mood: Mood.VERY_BAD,
        label: '번개쳐요',
        img: '/img/weather/Lightning.png',
        gradientFrom: '#D1C4E9',
        gradientTo: '#7E57C2',
    },
];

const MAX_CONTENT_LENGTH = 80;

export default function RegistDaily() {
    const router = useRouter();
    const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
    const [textContent, setTextContent] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const swiperRef = useRef<any>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // 카드 UI 상태
    function getCardStyles(index: number) {
        if (selectedMood === null) {
            // Step 1: 큰 카드
            const isActive = activeIndex === index;
            return {
                size: 'w-[220rem] rounded-[64rem]',
                scale: isActive ? 'scale-100' : 'scale-75',
                shadow: isActive ? 'shadow-l' : 'shadow-m',
                imgSize: 'w-[140rem]',
                textSize: 'text-[24rem] leading-[32rem]',
                gap: 'gap-[40rem]',
            };
        } else {
            // Step 2: 작은 카드
            return {
                size: 'w-[110rem] rounded-[32rem]',
                scale: 'scale-100',
                shadow: 'shadow-s',
                imgSize: 'w-[70rem]',
                textSize: 'text-[12rem] leading-[16rem]',
                gap: 'gap-[20rem]',
            };
        }
    }

    // 이미지 선택 핸들러
    const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // 이미지 삭제
    const handleRemoveImage = () => {
        setImageFile(null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // 기록 저장
    const handleSubmit = async () => {
        if (!selectedMood) return;

        try {
            setIsSubmitting(true);

            let imageUrl: string | undefined;

            // 이미지가 있으면 먼저 업로드
            if (imageFile) {
                setIsUploading(true);
                // TODO: 이미지 업로드 API 연결
                // const uploadResponse = await uploadApi.upload(imageFile);
                // imageUrl = uploadResponse.url;
                setIsUploading(false);
            }

            await dailySharesApi.create({
                mood: selectedMood,
                content: textContent || undefined,
                imageUrl,
                isPrivate: false,
            });

            router.push('/daily_share');
        } catch (error) {
            console.error('Failed to create daily share:', error);
            alert('기록 저장에 실패했습니다.');
        } finally {
            setIsSubmitting(false);
            setIsUploading(false);
        }
    };

    // 뒤로가기
    const handleBack = () => {
        if (selectedMood !== null) {
            // Step 2에서 Step 1로
            setSelectedMood(null);
            setTextContent('');
            setImageFile(null);
            setImagePreview(null);
        } else {
            router.back();
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-base-wf">
            <AppBar
                left={
                    <IconButton
                        iconName="ArrowLeft"
                        size="l"
                        color="tertiary"
                        onClick={handleBack}
                    />
                }
                right={
                    <Button
                        txt="기록"
                        size="s"
                        onClick={handleSubmit}
                        disabled={!selectedMood || isSubmitting}
                    />
                }
            />

            <article className="flex-1 flex flex-col">
                {/* 질문 영역 */}
                <div className="px-[16rem] pt-[16rem]">
                    <h1 className="text-[24rem] leading-[32rem] font-semibold text-gray-950">
                        {selectedMood === null
                            ? '오늘의 마음 날씨는 어떤가요?\n날씨를 선택해주세요!'
                            : '오늘의 마음 날씨는 어떤가요?'
                        }
                    </h1>
                </div>

                {/* 날씨 카드 영역 */}
                <div className="relative mt-[24rem]">
                    <Swiper
                        slidesPerView={'auto'}
                        centeredSlides={true}
                        spaceBetween={selectedMood === null ? 24 : 12}
                        onSwiper={s => (swiperRef.current = s)}
                        onSlideChange={s => setActiveIndex(s.activeIndex)}
                        className={selectedMood === null ? '!pb-[48rem]' : '!pb-[24rem]'}
                    >
                        {weatherOptions.map((opt, index) => {
                            const styles = getCardStyles(index);
                            const isSelected = selectedMood === opt.mood;

                            return (
                                <SwiperSlide key={opt.id} className="!w-auto">
                                    <div
                                        onClick={() => {
                                            setSelectedMood(opt.mood);
                                            swiperRef.current?.slideTo(index);
                                        }}
                                        className={`
                                            ${styles.size}
                                            ${styles.scale}
                                            ${styles.shadow}
                                            aspect-[2/3]
                                            overflow-hidden
                                            transition-all
                                            duration-300
                                            ease-in-out
                                            origin-center
                                            cursor-pointer
                                        `}
                                        style={isSelected ? {
                                            backgroundImage: `linear-gradient(to bottom, ${opt.gradientFrom}, ${opt.gradientTo})`,
                                        } : {
                                            backgroundColor: '#ffffff',
                                        }}
                                    >
                                        <div className={`h-full flex flex-col items-center justify-center ${styles.gap}`}>
                                            <div className={styles.imgSize}>
                                                <img
                                                    src={opt.img}
                                                    alt={opt.label}
                                                    className="w-full h-auto"
                                                />
                                            </div>
                                            <span className={`
                                                font-semibold
                                                transition-all
                                                duration-300
                                                ${styles.textSize}
                                                ${isSelected ? 'text-base-wf' : 'text-gray-800'}
                                            `}>
                                                {opt.label}
                                            </span>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>

                    {/* 페이지 인디케이터 (Step 1에서만) */}
                    {selectedMood === null && (
                        <div className="absolute bottom-[16rem] left-1/2 -translate-x-1/2 z-10">
                            <div className="flex items-center gap-[6rem]">
                                {weatherOptions.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`w-[8rem] h-[8rem] rounded-full transition-colors ${
                                            activeIndex === index ? 'bg-gray-950' : 'bg-gray-400'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Step 2: 질문과 답변 입력 영역 */}
                {selectedMood !== null && (
                    <div className="flex-1 flex flex-col px-[16rem] mt-[32rem]">
                        {/* 오늘의 질문 */}
                        <h2 className="text-[24rem] leading-[32rem] font-semibold text-gray-950">
                            마음의 에너지를 채워주는 나만의 장소가 있나요?
                        </h2>

                        {/* 텍스트 입력 */}
                        <div className="mt-[16rem] flex-1">
                            <textarea
                                value={textContent}
                                onChange={(e) => {
                                    if (e.target.value.length <= MAX_CONTENT_LENGTH) {
                                        setTextContent(e.target.value);
                                    }
                                }}
                                placeholder={`오늘의 질문에 대한 답변을 작성해주세요.\n사진은 1장만 올릴 수 있어요.`}
                                className="w-full min-h-[120rem] resize-none text-[16rem] leading-[24rem] text-gray-900 placeholder:text-gray-600 bg-transparent outline-none"
                            />

                            {/* 글자 수 카운터 */}
                            <div className="flex justify-end mt-[8rem]">
                                <span className="text-[14rem] leading-[20rem] text-gray-600">
                                    {textContent.length} / {MAX_CONTENT_LENGTH}
                                </span>
                            </div>
                        </div>

                        {/* 이미지 미리보기 */}
                        {imagePreview && (
                            <div className="relative w-[120rem] h-[120rem] mt-[16rem] rounded-[12rem] overflow-hidden">
                                {isUploading ? (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                        <div className="w-[40rem] h-[40rem] border-4 border-green-400 border-t-transparent rounded-full animate-spin" />
                                    </div>
                                ) : (
                                    <Image
                                        src={imagePreview}
                                        alt="업로드 이미지"
                                        fill
                                        className="object-cover"
                                    />
                                )}
                                <button
                                    onClick={handleRemoveImage}
                                    className="absolute -top-[8rem] -right-[8rem] w-[24rem] h-[24rem] bg-gray-800 rounded-full flex items-center justify-center"
                                >
                                    <Icon name="Close" size={16} className="text-base-wf" />
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </article>

            {/* 하단 툴바 (Step 2에서만) */}
            {selectedMood !== null && (
                <div className="sticky bottom-0 bg-base-wf border-t border-gray-300 px-[16rem] py-[12rem]">
                    <div className="flex items-center gap-[16rem]">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageSelect}
                            className="hidden"
                            id="image-upload"
                        />
                        <label
                            htmlFor="image-upload"
                            className="cursor-pointer p-[8rem]"
                        >
                            <Icon name="Camera" size={24} className="text-green-400" />
                        </label>
                        <label
                            htmlFor="image-upload"
                            className="cursor-pointer p-[8rem]"
                        >
                            <Icon name="Image" size={24} className="text-green-400" />
                        </label>
                    </div>
                </div>
            )}
        </div>
    );
}
