'use client';

import { Button } from "components/ui/button/page";
import Label from "components/ui/label/page";
import { ShareStatus } from "enums/shareStatus";
import { Icon } from "icon/page";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface TodayMyMoodProps{
    dailyListLength: number;
}

const weatherImg = [
    {
        id: 0, 
        name: 'Sun',
        img: '/img/weather/Sun.jpg' 
    },
    {
        id: 1, 
        name: 'SunAndCloud',
        img: '/img/weather/Sun_and_Cloud.jpg' 
    },
    {
        id: 2, 
        name: 'Cloud',
        img: '/img/weather/Cloud.jpg' 
    },
    {
        id: 3, 
        name: 'Rain',
        img: '/img/weather/Rain.jpg' 
    },
    {
        id: 4, 
        name: 'Lightning',
        img: '/img/weather/Lightning.jpg' 
    },
];

export default function TodayMyMood({dailyListLength}: TodayMyMoodProps){
    const router = useRouter();
    const [myDaily, setMyDaily] = useState<any>({});
    const [postStatus, setPostStatus] = useState<ShareStatus>(ShareStatus.NONE);
    const currentWeather = weatherImg.find(weather => weather.name === myDaily.post?.moodStep);

    const myDailyFetch = async () => {
        try{
            const response = await fetch('/api/daily-share/me');
            const json = await response.json();
            console.log('my daily json: ', json);

            setPostStatus(json.status);
            setMyDaily(json);


        } catch(e){
            console.error(e);
        }
    }

    useEffect(() => {
        myDailyFetch();
    }, []);
    
    return(
        <>
            {postStatus === ShareStatus.NONE ? (
                <div className="daily_none">
                    <div className={`pt-[14px] px-[24px] ${dailyListLength > 0 ? 'pb-[44px]' : 'pb-[80px]'}`}>
                        <h1 className="text-[24rem] text-gray-950 leading-[32rem] font-regular">오늘 한 일 중에<br />가장 자랑스러운<br />일은 무엇인가요?</h1>
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
                            onClick={() => {}}
                        />
                    </div>
                </div>
            ) : (
                <div className="is_daily">
                    <div className="flex items-center px-[24rem] pt-[14rem] pb-[44rem]">
                        <div className="grid gap-[6rem]">
                            <p className="text-[12rem] font-regular leading-[16rem] text-gray-800">{myDaily.profile.name}님</p>
                            <p></p>
                        </div>
                        <img src={currentWeather?.img} alt={currentWeather?.name} />
                    </div>
                    <div className="p-[16rem]">
                        <button
                            type="button"
                            className="bg-gray-950 rounded-[16rem] overflow-hidden relative flex w-full"
                            disabled={postStatus === ShareStatus.WEATHER_ONLY ? false : true}
                            onClick={() => router.push('/')}
                        >
                            <div className="img_box absolute bottom-0 left-0 w-[70rem]">
                                <img src="/img/icon/Q.png" alt="question icon" />
                            </div>
                            <div className="w-full grid grid-cols-[1fr_auto] items-center relative">
                                <div className="box">
                                    <div className="flex items-center gap-[4rem] px-[14rem] pt-[12rem] pb-[6rem] text-tp-w85">
                                        <Icon name="Clock" size={16}/>
                                        <p className="text-[12rem] leading-[16rem] font-regular">23시간 59분</p>
                                    </div>
                                    <div className="p-[16rem] pt-[6rem]">
                                        <h3 className="font-semibold text-gray-100 text-[14rem] leading-[20rem] text-left">{'질문이 들어갈 곳임'}</h3>
                                    </div>
                                </div>
                                {postStatus === ShareStatus.WEATHER_ONLY && (
                                    <div className="rounded-[50%] bg-tp-w16 flex items-center justify-center w-[48rem] h-[48rem] mr-[16rem]">
                                        <Icon
                                            name="Edit"
                                            size={20}
                                            className="text-base-wf"
                                        />
                                    </div>
                                )}
                            </div>
                        </button>
                    </div>
                </div>
            )}
            <div className="">
            </div>
        </>
    );
}