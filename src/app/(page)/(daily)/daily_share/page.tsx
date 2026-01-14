'use client';

import AppBar from "components/appBar/page";
import { Button, IconButton, TextButton } from "components/ui/button/page";
import { Checkbox } from "components/ui/checkbox/page";
import { useEffect, useState, useCallback } from "react";
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import TodayMyMood from "./_todayMood";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { dailySharesApi, DailyShare as DailyShareType, DailyShareQuery } from "api";

export default function DailyShare(){
    const router = useRouter();
    const today = dayjs(new Date()).format('M월 DD일');
    const [myDaily, setMyDaily] = useState<DailyShareType | null>(null);
    const [dailyList, setDailyList] = useState<DailyShareType[]>([]);
    const [isLatestFirst, setIsLatestFirst] = useState(false);
    const [sameUserType, setSameUserType] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const shareBg = {
        none: "/img/share_bg/None.jpg",
        sun: "/img/share_bg/Sun.jpg",
        sun_and_cloud: "/img/share_bg/Sun_and_Cloud.jpg",
        cloud: "/img/share_bg/Cloud.jpg",
        rain: "/img/share_bg/Rain.jpg",
        ligtning: "/img/share_bg/Lightning.jpg",
    };

    const fetchMyDailyShare = useCallback(async () => {
        try {
            const response = await dailySharesApi.checkTodayShare();
            if (response.hasShared && response.dailyShare) {
                setMyDaily(response.dailyShare);
            }
        } catch(e) {
            console.error('Failed to fetch my daily share:', e);
        }
    }, []);

    const fetchDailyList = useCallback(async () => {
        try {
            setIsLoading(true);
            const query: DailyShareQuery = {
                sortBy: isLatestFirst ? 'latest' : 'oldest',
                isFollowing: isFollowing || undefined,
            };
            const response = await dailySharesApi.getAll(query);
            setDailyList(response.items);
        } catch (e) {
            console.error('Failed to fetch daily list:', e);
        } finally {
            setIsLoading(false);
        }
    }, [isLatestFirst, isFollowing]);

    const latestSortHandler = () => {
        setIsLatestFirst(!isLatestFirst);
    }

    const sameUserTypeHandler = () => {
        setSameUserType(!sameUserType);
    }

    const isFollowingHandler = () => {
        setIsFollowing(!isFollowing);
    }

    useEffect(() => {
        fetchMyDailyShare();
    }, [fetchMyDailyShare]);

    useEffect(() => {
        fetchDailyList();
    }, [fetchDailyList]);

    return(
        <div className="relative">
            <AppBar
                left={
                    <p className="pl-[24rem] text-regular text-gray-800 text-[14rem] leading-[20rem]">{today}</p>
                }
                right={
                    <div className="flex items-center gap-[]">
                        <IconButton
                            iconName="Follower"
                            size="l"
                            color="tertiary"
                            onClick={() => {}}
                        />
                        <IconButton
                            iconName="Bell"
                            size="l"
                            color="tertiary"
                            onClick={() => {}}
                        />
                    </div>
                }
            />
            <article
                className="flex flex-col w-full bg-cover bg-center"
                style={{ minHeight: 'calc(100vh - 132px)' }}
            >
                <div className="absolute inset-0">
                    <img src={shareBg.none} alt="Navi" />
                </div>
                <div className="relative flex flex-col flex-1">
                    <div className="flex-shrink-0">
                        <TodayMyMood dailyListLength={dailyList.length} />
                    </div>
                    <div className="bg-base-wf rounded-t-[24rem] pt-[8rem] flex flex-col flex-1">
                        <div className="flex items-center justify-between py-[12rem] px-[16rem]">
                            <div className="flex items-center gap-[12rem]">
                                <TextButton
                                    txt="최신순"
                                    color="secondary"
                                    iconName={isLatestFirst ? "ChevronUp" : "ChevronDown"}
                                    iconPosition="r"
                                    onClick={latestSortHandler}
                                />
                                <TextButton
                                    txt="모아보기"
                                    color="secondary"
                                    iconName={sameUserType ? "ChevronUp" : "ChevronDown"}
                                    iconPosition="r"
                                    onClick={sameUserTypeHandler}
                                />
                            </div>
                            <Checkbox
                                label="팔로우"
                                onChange={isFollowingHandler}
                                checked={isFollowing ? true : false}
                                value={''}
                            />
                        </div>
                        {!dailyList.length ? (
                            <div className="flex-1 flex flex-col items-center justify-center gap-[24rem]">
                                <p className="text-base-bk text-[20rem] leading-[28rem] font-semibold text-center">오늘은 첫번째로<br />하루를 공유하는 건 어떨까요?</p>
                                <Button
                                    txt="오늘의 하루 공유하기"
                                    round
                                    size="l"
                                    onClick={() => router.push('regist_daily')}
                                />
                            </div>
                        ) : (
                            <ul className="box">
                                {dailyList.map((post, index) => (
                                    <li key={`${post.id}_${index}`}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex"></div>
                                            <TextButton
                                                txt={"팔로우"}
                                                color="primary"
                                                onClick={() => {}}
                                            />
                                        </div>
                                        <div className="">{post.content}</div>
                                        <Swiper
                                            spaceBetween={16}
                                        >
                                            <SwiperSlide></SwiperSlide>
                                        </Swiper>
                                    </li> 
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </article>
        </div>
    );
}