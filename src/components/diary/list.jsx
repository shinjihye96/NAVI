import React, { useState, useEffect } from 'react';
import { PrimButton, TextButton, IconButton } from 'styles/components/button';
import Chips from 'styles/components/chip'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './list.scss';


export default function DiaryList() {
    const [userFollow, setUserFollow] = useState(false);
    const followCheck = () => {
        setUserFollow((follow) => !follow);
    };

    const [emojies, setEmojies] = useState([
        {
            id: 0,
            name: "heart",
            icon: "./png_icon/heart.png",
            count: 20,
            isUserChecked: false,
        },
        {
            id: 1,
            name: "likeThumbUp",
            icon: "./png_icon/like-thumb-up.png",
            count: 300,
            isUserChecked: false,
        },
        {
            id: 2,
            name: "loudSpeaker",
            icon: "./png_icon/loud-speaker.png",
            count: 5,
            isUserChecked: false,
        },
        {
            id: 3,
            name: "pray",
            icon: "./png_icon/pray.png",
            count: 2,
            isUserChecked: false,
        },
        {
            id: 4,
            name: "sad",
            icon: "./png_icon/sad.png",
            count: 15,
            isUserChecked: false,
        },
        {
            id: 5,
            name: "congrats",
            icon: "./png_icon/congrats.png",
            count: 0,
            isUserChecked: false,
        },
    ]);

    const [firstEmogi, sefirstEmogi] = useState(false);
    const pushFirstEmogi = () => {
        sefirstEmogi(true);
        console.log(firstEmogi);
    }

    const [toggle, setToggle] = useState(false);
    const iconViewToggle = () => {
        setToggle((prevToggle) => !prevToggle);
    }

    const pushEmoji = (id) => {
        setEmojies((emojiCount) => emojiCount.map((emoji) =>
            emoji.id === id ? {
                ...emoji,
                isUserChecked: !emoji.isUserChecked,
                count: emoji.isUserChecked ? emoji.count + 1 : emoji.count - 1,
            } : emoji
        ));
    };

    const postTimeToWrite = '23시간'

    const emojiRender = () => {
        if(emojies.every(emoji => emoji.count === 0)) {
            return (
                <>
                    {firstEmogi ? null :
                        <PrimButton size='S' title='마음나누기' iconPosition='left' icon='Heart' type='secondary' onClick={pushFirstEmogi}/>
                    }
                    {firstEmogi ? (
                        emojies.sort((a, b) => b.count - a.count).map((emoji, index) => (
                            <Chips icon={emoji.icon} text={emoji.count} key={emoji.id} onclick={() => pushEmoji(emoji.id)} />
                        ))
                    ) : null}
                </>
            );
        } else {
            return(
                <>
                    {toggle ? emojies.sort((a, b) => b.count - a.count).map((emoji, index) => (
                            <Chips icon={emoji.icon} text={emoji.count} key={emoji.id} onclick={() => pushEmoji(emoji.id)} />
                        ))
                        : emojies.sort((a, b) => b.count - a.count).slice(0, 3).map((emoji, index) => (
                            <Chips key={emoji.id} icon={emoji.icon} text={emoji.count ?? 0} onclick={() => pushEmoji(emoji.id)} />
                        ))
                    }
                    <Chips icon={toggle ? './png_icon/emotion-minus.png' : './png_icon/emotion-plus.png'} onclick={iconViewToggle} />
                </>
            );
        }
    }

    return(
        <>
            <div className="list_wrap">
                <div className="profile_wrap">
                    <a className="profile_box">
                        <div className="img_box profile_img">
                            <img src="./img/test.png" alt="profile" />
                        </div>
                        <div className="user_info">
                            <p className='nick_name'>{`닉네임`}</p>
                            <div className="box">
                                <p className='user_type'>{`회원타입`}</p>
                                <p>|</p>
                                <p className='diary_time'>{`${postTimeToWrite} 전`}</p>
                            </div>
                        </div>
                    </a>
                    <TextButton title={userFollow ? `언팔로우` : `팔로우`} type={`secondary`} size={`S`} onClick={followCheck}/>
                </div>
                <div className="img_box">
                    <img src="./img/test.png" className='post_img' alt="post_img" />
                </div>
                <div className="txt_box">
                    <p>{`저에게는 도서관이 마음을 달래주는 곳입니다. 책 속 세계로 빠져들며, 조용함과 지식의 풍부함에서 에너지를 얻습니다.`}</p>
                </div>
                <div className="btn_wrap">
                    {emojiRender()}
                </div>
            </div>
        </>
    );
}