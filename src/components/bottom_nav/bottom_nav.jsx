import React, { useState } from 'react';
import './bottom_nav.css';


export default function BottomNav() {
    const [bottomNav, setBottomNav] = useState(0);
    
    const TabArr = [
        { name: '하루공유', content: "탭1 보여줄 화면" },
        { name: '커뮤니티', content: "탭2 보여줄 화면" },
        { name: '건강정보', content: "탭3 보여줄 화면" },
        { name: '의료∙후원', content: "탭3 보여줄 화면" },
        { name: '내정보', content: "탭3 보여줄 화면" }
    ];

    return (
        <>
            {TabArr[bottomNav]?.content}
            <nav className="nav_wrap">
                <ul className="nav_tab">
                    {TabArr.map((el, index) => (
                        <li key={index} className='nav_tab_con' onClick={() => {
                            setBottomNav(index);
                            console.log(setBottomNav);
                        }}>
                            <img src="../../assets/img/test.png" alt="test" className='nav_icon'/>
                            <p className='nav_name'>
                                {el.name}
                            </p>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}