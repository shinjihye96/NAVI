import React from 'react';
import dayjs from 'dayjs'
import 'dayjs/locale/ko';
import './diary.scss';
import { IconButton } from 'styles/components/button';
import MyMood from 'components/diary/mood'
import DiaryList from 'components/diary/list'

const today = dayjs().format('YYYY년 MM월 DD일');
export default function Diary() {
    const follower = () => {
        console.log('Follower');
    }

    const notification = () => {
        console.log('notification');
    }

    return(
        <>
            <img src="./img/dayshare_top_bg.png" className='diary_bg' alt="diary_bg" />
            <div className="diary_head">
                <p className='today'>{today}</p>
                <div className="btn_box">
                    <IconButton iconName='Follower' type='quaternary' size='L' onClick={follower}/>
                    <IconButton iconName='Bell' type='quaternary' size='L' onClick={notification}/>
                </div>
            </div>
            <MyMood />
            <DiaryList />
            <DiaryList />
            <DiaryList />
            <DiaryList />
            <DiaryList />
        </>
    );
}