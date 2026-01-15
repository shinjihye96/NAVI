'use client';

import { Button, TextButton } from "components/ui/button/page";
import { useState } from "react";
import { useRouter } from "next/navigation";
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

const onboardingData = [
    {
        title: '앱 설명\n타이틀 영역',
        description: '추가 설명 부분 텍스트 영역\n최대 2줄까지 작성할 수 있음',
    },
    {
        title: '앱 설명\n타이틀 영역',
        description: '추가 설명 부분 텍스트 영역\n최대 2줄까지 작성할 수 있음',
    },
    {
        title: '앱 설명\n타이틀 영역',
        description: '추가 설명 부분 텍스트 영역\n최대 2줄까지 작성할 수 있음',
    },
    {
        title: '앱 설명\n타이틀 영역',
        description: '추가 설명 부분 텍스트 영역\n최대 2줄까지 작성할 수 있음',
    },
    {
        title: '앱 설명\n타이틀 영역',
        description: '추가 설명 부분 텍스트 영역\n최대 2줄까지 작성할 수 있음',
    },
];

export default function Login() {
    const router = useRouter();
    const [hasLoginHistory, setHasLoginHistory] = useState(false);

    const handleKakaoLogin = () => {
        // 카카오 로그인 구현 예정
        console.log('카카오 로그인');
    };

    const handleNaverLogin = () => {
        // 네이버 로그인 구현 예정
        console.log('네이버 로그인');
    };

    const handleIdLogin = () => {
        router.push('/login/id');
    };

    return (
        <div className="flex flex-col min-h-screen bg-base-wf">
            {/* 온보딩 스와이퍼 */}
            <div className="flex-1 flex flex-col justify-end pb-[24rem]">
                <Swiper
                    modules={[Pagination]}
                    pagination={{ clickable: true }}
                    spaceBetween={0}
                    slidesPerView={1}
                    className="w-full"
                >
                    {onboardingData.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="px-[24rem] pb-[32rem]">
                                <h1 className="text-[28rem] leading-[36rem] font-semibold text-gray-950 whitespace-pre-line">
                                    {item.title}
                                </h1>
                                <p className="mt-[12rem] text-[14rem] leading-[20rem] text-gray-700 whitespace-pre-line">
                                    {item.description}
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* 로그인 이력 있을 경우 메시지 */}
            {hasLoginHistory && (
                <div className="px-[24rem] pb-[16rem]">
                    <div className="bg-gray-100 rounded-[8rem] py-[12rem] px-[16rem] text-center">
                        <p className="text-[14rem] leading-[20rem] text-gray-700">
                            카카오로 로그인한 기록이 있어요!
                        </p>
                    </div>
                </div>
            )}

            {/* 로그인 버튼들 */}
            <div className="px-[16rem] pb-[32rem]">
                <div className="flex flex-col gap-[8rem]">
                    {/* 카카오 로그인 */}
                    <button
                        type="button"
                        onClick={handleKakaoLogin}
                        className="h-[48rem] rounded-[8rem] bg-[#FEE500] flex items-center justify-center relative cursor-pointer"
                    >
                        <span className="absolute left-[16rem]">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M10 2.5C5.30625 2.5 1.5 5.47656 1.5 9.16406C1.5 11.5234 3.10312 13.5859 5.54688 14.7578L4.60156 18.1172C4.52344 18.3906 4.84375 18.6094 5.08594 18.4531L9.16406 15.7578C9.4375 15.7891 9.71875 15.8047 10 15.8047C14.6938 15.8047 18.5 12.8281 18.5 9.14062C18.5 5.45312 14.6938 2.5 10 2.5Z" fill="#191919"/>
                            </svg>
                        </span>
                        <span className="text-[16rem] font-medium text-[#191919]">카카오로 시작하기</span>
                    </button>

                    {/* 네이버 로그인 */}
                    <button
                        type="button"
                        onClick={handleNaverLogin}
                        className="h-[48rem] rounded-[8rem] bg-[#03C75A] flex items-center justify-center relative cursor-pointer"
                    >
                        <span className="absolute left-[16rem] text-[20rem] font-bold text-white">N</span>
                        <span className="text-[16rem] font-medium text-white">네이버로 시작하기</span>
                    </button>
                </div>

                {/* 아이디로 시작하기 */}
                <div className="mt-[16rem] text-center">
                    <TextButton
                        txt="아이디로 시작하기"
                        color="retreative"
                        onClick={handleIdLogin}
                    />
                </div>
            </div>
        </div>
    );
}
