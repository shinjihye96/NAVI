import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BottomNavPaths } from 'pages/pages_paths';
import * as Icon from 'assets/icons/icon_paths';
import './bottom_nav.scss';

export default function BottomNav() {
    const bottomNavLength = Object.values(BottomNavPaths);
    const [currentTab, setCurrentTab] = useState(0);

    const navIcons = [Icon.Write, Icon.Chat, Icon.Book, Icon.Hospital, Icon.Person];
    const navActiveIcons = [Icon.WriteFill, Icon.ChatFill, Icon.BookFill, Icon.HospitalFill, Icon.PersonFill];
    const navName = ['하루공유', '커뮤니티', '건강정보', '의료∙후원', '내정보'];

    const changeNav = (index) => {
        setCurrentTab(index);
    }

    return (
        <>
            <nav className="nav_wrap">
                <ul className="nav_tab">
                    {bottomNavLength.map((path, index) => (
                        <li key={index} className='nav_tab_con'>
                            <NavLink
                                to={path}
                                className={`con ${index === currentTab ? 'active' : ''}`} onClick={() => changeNav(index)}
                            >
                                {React.createElement(
                                    index === currentTab ? navActiveIcons[index] : navIcons[index], { size: 24, className: 'nav_icon' })
                                }
                                <p className='nav_name'>{navName[index]}</p>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}
