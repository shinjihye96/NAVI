'use client';

import { Button } from "components/ui/button/page";
import Label from "components/ui/label/page";
import { Icon } from "icon/page";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { dailySharesApi, dailyQuestionsApi, usersApi, DailyShare, DailyQuestion, Mood, getAccessToken } from "api";
import dayjs from "dayjs";

interface TodayMyMoodProps {
    dailyListLength: number;
}

export default function TodayMyMood({ dailyListLength }: TodayMyMoodProps) {
    const router = useRouter();
    const [myDaily, setMyDaily] = useState<DailyShare | null>(null);
    console.log('myDaily: ', myDaily);
    const [hasShared, setHasShared] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedWeather, setSelectedWeather] = useState<Mood | null>(null);
    const [todayQuestion, setTodayQuestion] = useState<DailyQuestion | null>(null);
    const [remainingTime, setRemainingTime] = useState<string>('');
    const [isUrgent, setIsUrgent] = useState(false); // 30분 미만 여부
    const [nickname, setNickname] = useState<string>('');

    const fetchMyDaily = async () => {
        // 로그인하지 않은 경우 API 호출 스킵
        const token = getAccessToken();
        if (!token) {
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            const [shareResponse, questionResponse, userResponse] = await Promise.all([
                dailySharesApi.checkTodayShare(),
                dailyQuestionsApi.getTodayQuestion().catch(() => null),
                usersApi.getMe().catch(() => null),
            ]);

            setHasShared(shareResponse.hasShared);
            if (shareResponse.hasShared && shareResponse.dailyShare) {
                setMyDaily(shareResponse.dailyShare);
            }

            if (questionResponse) {
                setTodayQuestion(questionResponse);
            }

            if (userResponse?.nickname) {
                setNickname(userResponse.nickname);
            }
        } catch {
            // 백엔드 미실행 시 기본값 유지 (에러 무시)
            setHasShared(false);
            setMyDaily(null);
        } finally {
            setIsLoading(false);
        }
    };

    // 남은 시간 계산
    const calculateRemainingTime = () => {
        if (!todayQuestion?.expiresAt) return;

        const now = dayjs();
        const expiresAt = dayjs(todayQuestion.expiresAt);
        const diff = expiresAt.diff(now);

        if (diff <= 0) {
            setRemainingTime('마감');
            setIsUrgent(false);
            return;
        }

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        // 30분 미만 여부 체크
        setIsUrgent(diff < 30 * 60 * 1000);

        if (hours > 0) {
            setRemainingTime(`${hours}시간 ${minutes}분`);
        } else {
            setRemainingTime(`${minutes}분`);
        }
    };

    useEffect(() => {
        fetchMyDaily();
    }, []);

    useEffect(() => {
        calculateRemainingTime();
        const interval = setInterval(calculateRemainingTime, 60000); // 1분마다 업데이트
        return () => clearInterval(interval);
    }, [todayQuestion]);

    // 로딩 중일 때
    if (isLoading) {
        return (
            <div className="pt-[14rem] px-[24rem] pb-[80rem]">
                <div className="animate-pulse">
                    <div className="h-[96rem] bg-gray-200 rounded-[16rem]"></div>
                </div>
            </div>
        );
    }

    return (
        <>
            {!hasShared ? (
                <div className="daily_none">
                    <div className={`pt-[14rem] px-[24rem] ${dailyListLength > 0 ? 'pb-[44rem]' : 'pb-[80rem]'}`}>
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                {nickname && (
                                    <p className="text-[12rem] text-gray-800 leading-[16rem] mb-[8rem]">
                                        {nickname}님
                                    </p>
                                )}
                                <h1 className="text-[24rem] text-gray-950 leading-[32rem] font-regular">
                                    {todayQuestion?.content ? (
                                        todayQuestion.content.split('\n').map((line, i) => (
                                            <span key={i}>{line}<br /></span>
                                        ))
                                    ) : (
                                        <>오늘 한 일 중에<br />가장 자랑스러운<br />일은 무엇인가요?</>
                                    )}
                                </h1>
                                {isUrgent ? (
                                    <div className="mt-[12rem] inline-flex items-center gap-[4rem] bg-[#7C3AED] text-white px-[8rem] py-[4rem] rounded-[6rem]">
                                        <Icon name="Clock" size={16} />
                                        <p className="text-[12rem] font-medium leading-[16rem]">{remainingTime || '계산중...'}</p>
                                    </div>
                                ) : (
                                    <Label
                                        iconName="Clock"
                                        txt={remainingTime || '계산중...'}
                                        type="text"
                                        className="mt-[12rem]"
                                    />
                                )}
                            </div>
                            {/* 날씨 아이콘 자리 */}
                            <div className="w-[140rem] h-[140rem] flex-shrink-0">
                                {/* TODO: 날씨 아이콘 이미지 추가 */}
                            </div>
                        </div>
                    </div>
                    <div className="flex-shrink-0 flex justify-center p-[16rem]">
                        <Button
                            txt="오늘의 하루 기록하기"
                            iconName="Edit"
                            iconPosition="l"
                            round
                            className="w-full"
                            onClick={() => router.push('regist_daily')}
                        />
                    </div>
                </div>
            ) : (
                <div className="is_daily">
                    {/* <div className="flex items-center justify-between px-[24rem] pt-[14rem] pb-[44rem]">
                        <div className="grid gap-[6rem]">
                            <p className="text-[12rem] font-regular leading-[16rem] text-gray-800">
                                {myDaily?.user?.nickname || '사용자'}님
                            </p>
                            <p className="text-[16rem] font-semibold leading-[24rem] text-gray-950">
                                {currentWeather?.name || '오늘의 날씨'}
                            </p>
                        </div>
                        {currentWeather && (
                            <img
                                src={currentWeather.img}
                                alt={currentWeather.name}
                                className="w-[80rem] h-[80rem] object-contain"
                            />
                        )}
                    </div> */}
                    {myDaily?.content ? (
                        <div className="p-[16rem]">
                            <div className="bg-gray-100 rounded-[16rem] p-[16rem]">
                                <p className="text-[14rem] leading-[20rem] text-gray-800">
                                    {myDaily.content}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="p-[16rem]">
                            <button
                                type="button"
                                className="bg-gray-950 rounded-[16rem] overflow-hidden relative flex w-full"
                                onClick={() => router.push('regist_daily')}
                            >
                                <div className="img_box absolute bottom-0 left-0 w-[70rem]">
                                    <img src="/img/icon/Q.png" alt="question icon" />
                                </div>
                                <div className="w-full grid grid-cols-[1fr_auto] items-center relative">
                                    <div className="box">
                                        <div className="flex items-center gap-[4rem] px-[14rem] pt-[12rem] pb-[6rem] text-tp-w85">
                                            <Icon name="Clock" size={16} />
                                            <p className="text-[12rem] leading-[16rem] font-regular">{remainingTime || '계산중...'}</p>
                                        </div>
                                        <div className="p-[16rem] pt-[6rem]">
                                            <h3 className="font-semibold text-gray-100 text-[14rem] leading-[20rem] text-left">
                                                {todayQuestion?.content || '마음의 에너지를 채워주는 나만의 장소가 있나요?'}
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="rounded-[50%] bg-tp-w16 flex items-center justify-center w-[48rem] h-[48rem] mr-[16rem]">
                                        <Icon
                                            name="Edit"
                                            size={20}
                                            className="text-base-wf"
                                        />
                                    </div>
                                </div>
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
