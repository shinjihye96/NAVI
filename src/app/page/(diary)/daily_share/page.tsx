'use client';

import AppBar from "components/appBar/page";
import { Button, IconButton, TextButton } from "components/ui/button/page";
import { Checkbox } from "components/ui/checkbox/page";
import { useEffect, useState } from "react";
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import TodayMyMood from "./_todayMood";

export default function DailyShare(){
    const [dailyList, setDailyList] = useState<any[]>([]);
    const [isLatestFirst, setIsLatestFirst] = useState(false);
    const [sameUserType, setSameUserType] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);

    const shareBg = {
        none: "/img/share_bg/None.jpg",
        sun: "/img/share_bg/Sun.jpg",
        sun_and_cloud: "/img/share_bg/Sun_and_Cloud.jpg",
        cloud: "/img/share_bg/Cloud.jpg",
        rain: "/img/share_bg/Rain.jpg",
        ligtning: "/img/share_bg/Lightning.jpg",
    };

    const fetchDailyList = async () => {
        try {
          const response = await fetch('/api/daily-share');
          if (!response.ok) throw new Error(response.statusText);
          const json = await response.json();
          console.log('json: ', json);

          setDailyList(json);
        } catch (e) {
          console.error(e);
        }
    }

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
        fetchDailyList();
    }, []);

    return(
        <>
            <AppBar
                left={
                    <p>오늘날짜</p>
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
                className="relative flex flex-col w-full bg-cover bg-center"
                style={{ minHeight: 'calc(100vh - 132px)' }}
            >
                <div className="absolute  inset-0">`ㄴㄴ`
                    <img src={shareBg.none} alt="Navi" />
                </div>
                <div className="relative flex flex-col flex-1">
                    <div className="flex-shrink-0">
                        <TodayMyMood dailyStatus="" />
                    </div>
                    {!dailyList.length && (
                        <div className="flex-shrink-0 flex justify-center p-[16px]">
                            <Button
                                txt="오늘의 하루 기록하기"
                                iconName="Edit"
                                iconPosition="l"
                                round
                                className="w-full"
                                onClick={() => {}}
                            />
                        </div>
                    )}
                    <div className="bg-base-wf rounded-t-[24px] pt-[8px] flex flex-col flex-1">
                        <div className="flex items-center justify-between py-[12px] px-[16px]">
                            <div className="flex items-center gap-[12px]">
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
                            <div className="flex-1 flex flex-col items-center justify-center gap-[24px]">
                                <p className="text-base-bk text-[20px] leading-[28px] font-semibold text-center">오늘은 첫번째로<br />하루를 공유하는 건 어떨까요?</p>
                                <Button
                                    txt="오늘의 하루 공유하기"
                                    round
                                    size="l"
                                    className="w-[166px]"
                                    onClick={() => {}}
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
        </>
    );
}