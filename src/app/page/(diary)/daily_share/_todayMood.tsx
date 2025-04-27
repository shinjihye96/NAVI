'use client';

import { Button } from "components/ui/button/page";
import Label from "components/ui/label/page";
import { ShareStatus } from "enums/shareStatus";
import { Icon } from "icon/page";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

export default function TodayMyMood(){
    const router = useRouter();
    const [myDaily, setMyDaily] = useState<any>({});
    const [postStatus, setPostStatus] = useState<ShareStatus>(ShareStatus.WEATHER_ONLY);
    console.log('postStatus: ', postStatus);
    // const currentWeather = weatherImg.find(weather => weather.name === myDaily.post.moodStep);

    const myDailyFetch = async () => {
        try{
            const response = await fetch('/api/daily-share/me');
            const json = await response.json();
            console.log('my daily json: ', json);

            // setPostStatus(json.status);
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
                    <div className="">
                        <h1 className="text-[24px] text-gray-950 leading-[32px] font-regular">오늘 한 일 중에<br />가장 자랑스러운<br />일은 무엇인가요?</h1>
                        <Label
                            iconName="Clock"
                            txt={"21시간 6분"}
                            type={"text"}
                            className="mt-[12px]"
                        />
                    </div>
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
                </div>
            ) : (
                <div className="is_daily">
                    <div className="flex items-center px-[24px] pt-[14px] pb-[44px]">
                        <div className="grid gap-[6px]">
                            {/* <p className="text-[12px] font-regular leading-[16px] text-gray-800">{myDaily.profile.name}님</p> */}
                            <p></p>
                        </div>
                        {/* <img src={currentWeather?.img} alt={currentWeather?.name} /> */}
                    </div>
                    <div className="p-[16px]">
                        <button
                            type="button"
                            className="bg-gray-950 rounded-[16px] overflow-hidden relative flex w-full"
                            disabled={postStatus === ShareStatus.WEATHER_ONLY ? false : true}
                            onClick={() => router.push('/')}
                        >
                            <div className="img_box absolute bottom-0 left-0 w-[70px]">
                                <img src="/img/icon/Q.png" alt="question icon" />
                            </div>
                            <div className="w-full grid grid-cols-[1fr_auto] items-center relative">
                                <div className="box">
                                    <div className="flex items-center gap-[4px] px-[14px] pt-[12px] pb-[6px] text-tp-w85">
                                        <Icon name="Clock" size={16}/>
                                        <p className="text-[12px] leading-[16px] font-regular">23시간 59분</p>
                                    </div>
                                    <div className="p-[16px] pt-[6px]">
                                        <h3 className="font-semibold text-gray-100 text-[14px] leading-[20px] text-left">{'질문이 들어갈 곳임'}</h3>
                                    </div>
                                </div>
                                {postStatus === ShareStatus.WEATHER_ONLY && (
                                    <div className="rounded-[50%] bg-tp-w16 flex items-center justify-center w-[48px] h-[48px] mr-[16px]">
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