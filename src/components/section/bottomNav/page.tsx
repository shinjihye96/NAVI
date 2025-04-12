'use client';

import { Icon } from "icon/page";
import { routerData } from "./router_data";
import { useEffect, useState } from "react";

export default function BottomNav(){
    const [activeNav, setActiveNav] = useState<any>({});

    const navHandler = (id: number) => {
        const active = routerData.find(nav => nav.id === id);

        setActiveNav(active);
    }

    useEffect(() => {
        if(routerData){
            setActiveNav(routerData[0]);
        }
    }, [routerData]);

    return(
        <nav className='flex items-center justify-between fixed bottom-0 w-[360rem] px-[8rem] py-[16rem] bg-base-wf z-10'>
            {routerData.map((nav, index) => (
                <button 
                    type="button" 
                    key={`${nav.id}_${index}`}
                    className={`grid gap-[4rem] justify-center  text-center ${activeNav.id === nav.id ? 'text-green-500' : 'text-gray-900'}`}
                    onClick={() => navHandler(nav.id)}
                >
                    <Icon
                        name={activeNav.id === nav.id ? (nav.iconName + 'Fill') : nav.iconName}
                        size={24}
                        className="m-auto"
                    />
                    <p className="text-[12rem] leading-[16rem] font-normal">{nav.name}</p>
                </button>
            ))}
        </nav>
    );
}