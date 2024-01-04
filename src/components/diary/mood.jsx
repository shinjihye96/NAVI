import React, { useState, useEffect } from 'react';
import {PrimButton, TextButton } from 'styles/components/button';
import Icon from 'styles/components/icon';
import './mood.scss';

export default function MyMood() {
    const todayQuestion = [
        '마음의 에너지를 채워주는 나만의 장소가 있나요?',
    ];

    const userNIckName = '신지혜';

    const weatherTxt = [
        {
            weatherTxt : '화창해요',
            supportMsg: '따뜻한 햇살같은 마음을 나비들에게 나눠보아요!',
            img: './img/mood_weather/Sun.png',
        }
    ];

    return (
        <>
            <div className="mood_wrap">
                {/* 작성 전 */}
                <div className="question_wrap">
                    <a className="mood_common question_disabled">
                        <div className="bg_box">
                            <img src="./img/mood_qna/Question-Disabled.png" alt="question_bg" className='today_mood_bg question_bg'/>
                        </div>
                        <div className="question_head">
                            <div className="countdown_box">
                                <Icon name={'Clock'} size={16} className={'icon'}/>
                                <p className='q_countdown'>{`23시간 59분`}</p>
                            </div>
                        </div>
                        <div className="question_content">
                            <p className='today_q'>{todayQuestion[0]}</p>
                        </div>
                    </a>
                </div>
                {/* 날씨만 작성 */}
                <div className="written_only_wheater">
                    <div className="weather_box">
                        <div className="txt_box">
                            <p className='nickname_view'>{`${userNIckName}님의 날씨는`}</p>
                            <p className='weather_type'>{weatherTxt[0].weatherTxt}</p>
                        </div>
                        <div className="img_box">
                            <img src={weatherTxt[0].img} alt="mood_weather" />
                        </div>
                    </div>
                    <div className="support_message_box">
                        <img src="./png_icon/loud-speaker.png" alt="support_msg" />
                        <p className='message'>{weatherTxt[0].supportMsg}</p>
                    </div>
                </div>
                {/* 글, 사진 작성 전 */}
                <div className="question_wrap">
                    <div className="mood_common question_enabled">
                        <div className="bg_box">
                            <img src="./img/mood_qna/Question-Enabled.png" alt="question_bg" className='today_mood_bg question_bg'/>
                            <div className="answer">
                                <img src="./img/mood_qna/Answer-Left.png" alt="question_bg" className="today_mood_bg answer_bg quotation_marks1" />
                                <img src="./img/mood_qna/Answer-Right.png" alt="question_bg" className="today_mood_bg answer_bg quotation_marks2" />
                            </div>
                        </div>
                        <div className="content_wrap">
                            <div className="context_box">
                                <div className="question_head">
                                    <div className="countdown_box">
                                        <Icon name={'Clock'} size={16} className={'icon'}/>
                                        <p className='q_countdown'>{`23시간 59분`}</p>
                                    </div>
                                </div>
                                <div className="question_content">
                                    <p className='question'>{todayQuestion[0]}</p>
                                </div>
                            </div>
                            <div className="btn_box">
                                <PrimButton href={''} type={'quaternary'} size={'S'} title={'기록하기'} className={'round_btn'} />
                            </div>
                        </div>
                    </div>
                </div>
                {/* 글, 사진 작성 후 */}
                <div className="question_wrap">
                    <div className="mood_common question_enabled">
                        <div className="bg_box">
                            <img src="./img/mood_qna/Question-Enabled.png" alt="question_bg" className='today_mood_bg question_bg'/>
                            <div className="answer">
                                <img src="./img/mood_qna/Answer-Left.png" alt="question_bg" className="today_mood_bg answer_bg quotation_marks1" />
                                <img src="./img/mood_qna/Answer-Right.png" alt="question_bg" className="today_mood_bg answer_bg quotation_marks2" />
                            </div>
                        </div>
                        <div className="question_box">
                            <div className="question_head">
                                <div className="countdown_box">
                                    <Icon name={'Clock'} size={16} className={'icon'}/>
                                    <p className='q_countdown'>{`23시간 59분`}</p>
                                </div>
                                <div className="btn_box">
                                    <TextButton type={'gray'} size={'S'} title={`수정`} href={''}/>
                                    <TextButton type={'gray'} size={'S'} title={`기록보기`} iconPosition={`right`} icon={'ChevronUp'} onClick={() => {console.log('기록보기 toggle');}}/>
                                </div>
                            </div>
                            <div className="question_content">
                                <p className='question'>{todayQuestion[0]}</p>
                                <img src="./img/test.png" alt="today_img" className='today_img'/>
                                <p className="desc">오늘 날씨가 화창하고 너무 좋았어요 친구랑 같이 먹은 밥도 맛있고 얼른 다시 학교 친구들이 보고싶어요! 조금만 더 기다리면 된다고 했어요.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}