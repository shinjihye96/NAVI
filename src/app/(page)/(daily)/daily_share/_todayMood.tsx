'use client';

import { Button } from "components/ui/button/page";
import Label from "components/ui/label/page";
import { Icon } from "icon/page";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { dailySharesApi, DailyShare, Mood } from "api";

interface TodayMyMoodProps {
    dailyListLength: number;
}

// const weatherImg: { mood: Mood; name: string; img: string }[] = [
//     {
//         mood: Mood.VERY_GOOD,
//         name: '화창해요',
//         img: '/img/weather/Sun.png'
//     },
//     {
//         mood: Mood.GOOD,
//         name: '조금 맑아요',
//         img: '/img/weather/Sun_and_Cloud.png'
//     },
//     {
//         mood: Mood.NORMAL,
//         name: '흐려요',
//         img: '/img/weather/Cloud.png'
//     },
//     {
//         mood: Mood.BAD,
//         name: '비 내려요',
//         img: '/img/weather/Rain.png'
//     },
//     {
//         mood: Mood.VERY_BAD,
//         name: '번개쳐요',
//         img: '/img/weather/Lightning.png'
//     },
// ];

export default function TodayMyMood({ dailyListLength }: TodayMyMoodProps) {
    const router = useRouter();
    const [myDaily, setMyDaily] = useState<DailyShare | null>(null);
    const [hasShared, setHasShared] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedWeather, setSelectedWeather] = useState<Mood | null>(null);

    const fetchMyDaily = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await dailySharesApi.checkTodayShare();
            setHasShared(response.hasShared);
            if (response.hasShared && response.dailyShare) {
                setMyDaily(response.dailyShare);
            }
        } catch {
            // 백엔드 미실행 시 기본값 유지 (에러 무시)
            setHasShared(false);
            setMyDaily(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMyDaily();
    }, [fetchMyDaily]);

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
                        <h1 className="text-[24rem] text-gray-950 leading-[32rem] font-regular">
                            오늘 한 일 중에<br />
                            가장 자랑스러운<br />
                            일은 무엇인가요?
                        </h1>
                        <Label
                            iconName="Clock"
                            txt={"21시간 6분"}
                            type={"text"}
                            className="mt-[12rem]"
                        />
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
                                            <p className="text-[12rem] leading-[16rem] font-regular">23시간 59분</p>
                                        </div>
                                        <div className="p-[16rem] pt-[6rem]">
                                            <h3 className="font-semibold text-gray-100 text-[14rem] leading-[20rem] text-left">
                                                마음의 에너지를 채워주는 나만의 장소가 있나요?
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
