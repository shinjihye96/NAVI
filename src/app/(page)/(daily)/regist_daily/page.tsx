'use client';

import AppBar from "components/appBar/page";
import { Button, IconButton } from "components/ui/button/page";
import { Icon } from "icon/page";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { dailySharesApi, emotionTypesApi, EmotionTypeInfo, dailyQuestionsApi, DailyQuestion } from "api";

// type별 그라데이션 매핑
const gradientMap: Record<string, { from: string; to: string }> = {
    sun: { from: '#A8EEF7', to: '#E1F0FF' },
    sun_cloud: { from: '#FFF4E1', to: '#FCE4A6' },
    cloud: { from: '#E8EAF6', to: '#C5CAE9' },
    rain: { from: '#BBDEFB', to: '#64B5F6' },
    lightning: { from: '#D1C4E9', to: '#7E57C2' },
};

// EmotionTypeInfo에 gradient 추가한 타입
export interface WeatherOption extends EmotionTypeInfo {
    gradientFrom: string;
    gradientTo: string;
}

const MAX_CONTENT_LENGTH = 80;

export default function RegistDaily() {
    const router = useRouter();
    const [emotionTypes, setEmotionTypes] = useState<WeatherOption[]>([]);
    const [selectedMood, setSelectedMood] = useState<string | null>(null);
    const [textContent, setTextContent] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const swiperRef = useRef<any>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const cameraInputRef = useRef<HTMLInputElement>(null);
    const galleryInputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [currentQuestion, setCurrentQuestion] = useState<DailyQuestion | null>(null);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);

    // 모바일 환경 감지
    useEffect(() => {
        const checkMobile = () => {
            const userAgent = navigator.userAgent || navigator.vendor;
            const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
            setIsMobile(isMobileDevice);
        };
        checkMobile();
    }, []);

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
        if (cameraInputRef.current) {
            cameraInputRef.current.value = '';
        }
        if (galleryInputRef.current) {
            galleryInputRef.current.value = '';
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
            }

            // 오늘의 질문에 답변 제출 (질문이 있는 경우)
            if (currentQuestion && textContent) {
                try {
                    await dailyQuestionsApi.submitAnswer({
                        questionId: currentQuestion.id,
                        content: textContent,
                    });
                } catch (error: any) {
                    // QUESTION_INACTIVE 에러 처리
                    if (error.response?.data?.error?.code === 'QUESTION_INACTIVE') {
                        // 새 질문 가져오기
                        const newQuestion = await fetchTodayQuestion();
                        setCurrentQuestion(newQuestion);
                        showAlert('질문이 변경되었습니다. 새 질문에 답변해주세요.');
                        return; // 제출 중단
                    }
                    throw error;
                }
            }

            // 하루공유 게시글 작성
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

    const handleBack = () => {
        if (selectedMood !== null) {
            setSelectedMood(null);
            setTextContent('');
            setImageFile(null);
            setImagePreview(null);
        } else {
            router.back();
        }
    };

    const fetchEmotionTypes = async () => {
        try {
            const data = await emotionTypesApi.getAll();

            const weatherOptions: WeatherOption[] = data.map((item) => ({
                ...item,
                gradientFrom: gradientMap[item.type]?.from || '#E8EAF6',
                gradientTo: gradientMap[item.type]?.to || '#C5CAE9',
            }));
            setEmotionTypes(weatherOptions);
        } catch (e) {
            console.error('Failed to fetch emotion types:', e);
        }
    };

    // 오늘의 질문 가져오기
    const fetchTodayQuestion = async () => {
        try {
            const question = await dailyQuestionsApi.getTodayQuestion();
            setCurrentQuestion(question);
            return question;
        } catch (e) {
            console.error('Failed to fetch today question:', e);
            return null;
        }
    };

    // 알림 메시지 표시
    const showAlert = (message: string) => {
        setAlertMessage(message);
        setTimeout(() => setAlertMessage(null), 3000);
    };

    useEffect(() => {
        fetchEmotionTypes();
        fetchTodayQuestion();
    }, []);

    return (
        <div className="flex flex-col min-h-[calc(100vh-76rem)] bg-base-wf">
            {/* 알림 메시지 */}
            {alertMessage && (
                <div className="fixed top-[72rem] left-1/2 -translate-x-1/2 z-50 bg-gray-800 text-white px-[16rem] py-[12rem] rounded-[8rem] shadow-lg">
                    <p className="text-[14rem] leading-[20rem]">{alertMessage}</p>
                </div>
            )}

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
                sticky={true}
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
                        {emotionTypes.map((weather, index) => {
                            const styles = getCardStyles(index);
                            const isSelected = selectedMood === weather.type;

                            return (
                                <SwiperSlide key={weather.id} className="!w-auto">
                                    <div
                                        onClick={() => {
                                            setSelectedMood(weather.type);
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
                                            backgroundImage: `linear-gradient(to bottom, ${weather.gradientFrom}, ${weather.gradientTo})`,
                                        } : {
                                            backgroundColor: '#ffffff',
                                        }}
                                    >
                                        <div className={`h-full flex flex-col items-center justify-center ${styles.gap}`}>
                                            <div className={styles.imgSize}>
                                                <img
                                                    src={weather.imageUrl}
                                                    alt={weather.label}
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
                                                {weather.label}
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
                                {emotionTypes.map((weather, index) => (
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
                    <div className="flex-1 flex flex-col px-[16rem] mt-[32rem] pb-[73rem]">
                        {/* 오늘의 질문 */}
                        <h2 className="text-[24rem] leading-[32rem] font-semibold text-gray-950 flex-shrink-0">
                            {currentQuestion?.content || '마음의 에너지를 채워주는 나만의 장소가 있나요?'}
                        </h2>

                        {/* 텍스트 입력 */}
                        <div className="mt-[16rem] flex-1 flex flex-col">
                            <textarea
                                ref={textareaRef}
                                value={textContent}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    // 80자 초과 시 잘라서 저장
                                    setTextContent(value.slice(0, MAX_CONTENT_LENGTH));
                                    // 높이 자동 조절
                                    if (textareaRef.current) {
                                        textareaRef.current.style.height = 'auto';
                                        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
                                    }
                                }}
                                placeholder={`오늘의 질문에 대한 답변을 작성해주세요.\n사진은 1장만 올릴 수 있어요.`}
                                className="w-full min-h-[48rem] resize-none text-[16rem] leading-[24rem] text-gray-900 placeholder:text-gray-600 bg-transparent outline-none"
                            />
                        </div>

                        {/* 이미지 미리보기 */}
                        {imagePreview && (
                            <div className="relative w-[120rem] h-[120rem] mt-[16rem]">
                                {isUploading ? (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                        <div className="w-[40rem] h-[40rem] border-4 border-green-400 border-t-transparent rounded-full animate-spin" />
                                    </div>
                                ) : (
                                    <div className="block rounded-[12rem] overflow-hidden">
                                        <Image
                                            src={imagePreview}
                                            alt="업로드 이미지"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
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
                <div className="fixed max-w-[414rem] w-full bottom-[76rem] left-1/2 -translate-x-1/2 bg-base-wf border-t border-gray-300 p-[4rem] flex items-center justify-between z-10">
                    <div className="flex items-center gap-[4rem]">
                        {/* 카메라 input (모바일: 카메라, PC: 파일선택) */}
                        <input
                            ref={cameraInputRef}
                            type="file"
                            accept="image/*"
                            capture={isMobile ? "environment" : undefined}
                            onChange={handleImageSelect}
                            className="hidden"
                            id="camera-upload"
                        />
                        {/* 갤러리 input (모바일: 갤러리, PC: 파일선택) */}
                        <input
                            ref={galleryInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageSelect}
                            className="hidden"
                            id="gallery-upload"
                        />
                        <label
                            htmlFor="camera-upload"
                            className="cursor-pointer p-[8rem]"
                        >
                            <Icon name="Camera" size={24} className="text-green-400" />
                        </label>
                        <label
                            htmlFor="gallery-upload"
                            className="cursor-pointer p-[8rem]"
                        >
                            <Icon name="Image" size={24} className="text-green-400" />
                        </label>
                    </div>
                    <div className="flex items-center gap-[8rem]">
                        {/* 글자 수 카운터 */}
                        <div className="flex justify-end mt-[8rem]">
                            <span className="text-[14rem] leading-[20rem] text-gray-600">
                                {textContent.length} / {MAX_CONTENT_LENGTH}
                            </span>
                        </div>
                        <IconButton
                            iconName="KeyboardDown"
                            size="l"
                            color="tertiary"
                            onClick={() => textareaRef.current?.blur()}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
