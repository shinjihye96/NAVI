import { IconButton, TextButton } from "components/ui/button/page";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import AppBar from "components/appBar/page";

export default function DailyShare(){
    const [dailyList, setDailyList] = useState<any[]>([]);

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
            <article>
                <ul className="">
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
            </article>
        </>
    );
}