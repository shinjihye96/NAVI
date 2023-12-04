import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BottomNavPaths } from 'pages/pages_paths';
import * as Icon from 'assets/icons/icon_paths';
import './bottom_nav.scss';

export default function BottomNav() {
    const bottomNavLength = Object.values(BottomNavPaths);
    const [currentTab, setCurrentTab] = useState(0);

    return (
        <>
            <nav className="nav_wrap">
                <ul className="nav_tab">
                    {bottomNavLength.map((path, index) => (
                        <li key={index} className='nav_tab_con'>
                            <NavLink to={path} className='con'>
                                <Icon.Bell size={24} className='nav_icon'/>
                                <p className='nav_name'>{index}</p>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}
