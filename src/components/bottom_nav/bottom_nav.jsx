import React from 'react';
import { BrowserRouter as Link } from 'react-router-dom';
import './bottom_nav.css';
import { BottomNavPaths } from 'pages/pages_paths';

export default function BottomNav() {
    const bottomNavLength = Object.values(BottomNavPaths);

    return (
        <>
            <nav className="nav_wrap">
                <ul className="nav_tab">
                    {bottomNavLength.map((path, index) => (
                        <li key={index} className='nav_tab_con'>
                            <Link to={index === 0 ? path : path[0]}>
                                <img src="/assets/img/test.png" alt="test" className='nav_icon'/>
                                <p className='nav_name'>{index}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}