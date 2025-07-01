'use client';

import AppBar from "components/appBar/page";
import { Button, IconButton } from "components/ui/button/page";
import { MoodType } from "enums/mood";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

const weatherOptions: {
    id: number;
    name: MoodType;
    label: string;
    img: string;
    gradientFrom: string;
    gradientTo: string;
  }[] = [
    {
      id: 0,
      name: MoodType.SUN,
      label: '맑음',
      img: '/img/weather/Sun.png',
      gradientFrom: '#A8EEF7',
      gradientTo:   '#E1F0FF',
    },
    {
      id: 1,
      name: MoodType.SUN_AND_CLOUD,
      label: '구름 조금',
      img: '/img/weather/Sun_and_Cloud.png',
      gradientFrom: '#FFF4E1',
      gradientTo:   '#FCE4A6',
    },
    {
      id: 2,
      name: MoodType.CLOUD,
      label: '흐림',
      img: '/img/weather/Cloud.png',
      gradientFrom: '#E8EAF6',
      gradientTo:   '#C5CAE9',
    },
    {
      id: 3,
      name: MoodType.RAIN,
      label: '비',
      img: '/img/weather/Rain.png',
      gradientFrom: '#BBDEFB',
      gradientTo:   '#64B5F6',
    },
    {
      id: 4,
      name: MoodType.LIGHTNING,
      label: '번개',
      img: '/img/weather/Lightning.png',
      gradientFrom: '#D1C4E9',
      gradientTo:   '#7E57C2',
    },
];

export default function RegistDaily(){
    const router = useRouter();
    const [selectedWeather, setSelected] = useState<number | undefined>(undefined);
    const [textContent, setTextContent] = useState('');
    const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
    const swiperRef = useRef<any>(null);
    const [stepIndex, setStepIndex] = useState(0);
    
    // card state classes
    function cardUiState(index: number){
        const cardSize = selectedMood === null ? 'w-[220rem] rounded-[64rem]' : 'w-[110rem] rounded-[32rem]';
        const cardShadow = selectedMood === null ? (stepIndex === index ? 'scale-100 shadow-l' : '!scale-75 shadow-m') : (stepIndex === index ? 'scale-100 shadow-m' : '!scale-100 shadow-s');

        return [cardSize, cardShadow] as const;
    }

    return(
        <>
            <AppBar
                left={
                    <IconButton
                        iconName="ArrowLeft"
                        size="l"
                        color="tertiary"
                        onClick={() => {
                            router.back();
                            setSelected(undefined);
                            setTextContent('');
                            setSelectedMood(MoodType.SUN);
                            
                        }}
                    />
                }
                right={
                    <Button
                        txt="기록"
                        size="s"
                        onClick={() => {}}
                    />
                }
            />
            <article style={{ minHeight: 'calc(100vh - 132px)' }}>
                <div className="box relative">
                    <Swiper
                        slidesPerView={'auto'}
                        centeredSlides={true}
                        spaceBetween={24}
                        onSwiper={s => (swiperRef.current = s)}
                        onSlideChange={s => setStepIndex(s.activeIndex)}
                        className="!pb-[40rem]"
                    >
                        {weatherOptions.map((opt, index) => {
                            const [cardSize, cardShadow] = cardUiState(index);

                            return <SwiperSlide key={`${opt.id}_${index}`} className='!w-auto'>
                                <div
                                    className={`${cardSize} ${cardShadow} flex-shrink-0 aspect-[2/3]  overflow-hidden transition-all duration-300 ease-in-out origin-center`}
                                    style={selectedMood === opt.name ? {
                                        backgroundImage: `linear-gradient(
                                        to bottom,${opt.gradientFrom},
                                        ${opt.gradientTo}
                                        )`,
                                    }
                                    : {
                                        backgroundColor: '#ffffff',
                                    }}
                                >
                                    <div
                                        onClick={() => setSelectedMood(opt.name)}
                                        className={`relative h-full flex flex-col items-center justify-center  cursor-pointer ${selectedMood === null ? 'gap-[40rem]' : 'gap-[20rem]'}`}
                                        
                                        
                                    >
                                        <div className={`img_box ${selectedMood === null ? 'w-[140rem]' : 'w-[70rem]'}`}>
                                            <img
                                                src={opt.img}
                                                alt={opt.label}
                                                className={``}
                                            />
                                        </div>
                                        <span className={`font-semibold transform transition-transform duration-300  ${selectedMood === null ? 'text-[24rem] leading-[32rem]' : 'text-[12rem] leading-[16rem]'} ${selectedMood === opt.name ? 'text-base-wf' : 'text-gray-800'}`}>{opt.label}</span>
                                    </div>
                                </div>
                            </SwiperSlide>
                        })}
                    </Swiper>
                    {selectedMood === null ? (
                        <div className="nav py-[8rem] absolute bottom-0 left-[50%] transform -translate-x-1/2">
                            <div className="flex items-center justify-center gap-[6rem]">
                                {weatherOptions.map((weather, index) => (
                                    <div className={`w-[8rem] h-[8rem] rounded-[50%] ${stepIndex === index ? 'bg-gray-950' : 'bg-gray-500'}`}></div>
                                ))}
                            </div>
                        </div>
                    ): (
                        <div className="mt-[56rem] px-[16rem]">
                            <h4 className="text-[24rem] leading-[32rem] font-semibold">{'마음의 에너지를 채워주는 나만의 장소가 있나요?'}</h4>
                            <textarea 
                                name="textContent" 
                                className="w-full mt-[8rem] resize-none whitespace-pre-line"
                                value={textContent}
                                placeholder={"오늘의 질문에 대한 답변을\n사진은 1장만 올릴 수 있어요."}
                                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setTextContent(e.target.value)}
                                onInput={(e) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    target.style.height = 'auto'; // 높이 초기화
                                    target.style.height = `${target.scrollHeight}px`; // 내용에 맞춰 높이 설정
                                }}
                            ></textarea>
                        </div>
                    )}
                </div>
            </article>
        </>
    );
}