'use client';

import { Icon } from "icon/page";
import { routerData } from "./router_data";
import { useRouter, usePathname } from "next/navigation";

export default function BottomNav(){
    const router = useRouter();
    const pathname = usePathname();

    // 현재 경로와 일치하는 nav 찾기
    const getActiveNav = () => {
        return routerData.find(nav => pathname.startsWith(nav.path)) || routerData[0];
    };

    const activeNav = getActiveNav();

    const navHandler = (path: string) => {
        // replace로 이동하여 히스토리에 남기지 않음
        router.replace(path);
    };

    return(
        <nav className='flex items-center justify-between fixed bottom-0 max-w-[414rem] w-full px-[8rem] pt-[16rem] pb-[calc(env(safe-area-inset-bottom)+16px)] bg-base-wf z-10'>
            {routerData.map((nav, index) => (
                <button
                    type="button"
                    key={`${nav.id}_${index}`}
                    className={`grid gap-[4rem] justify-center text-center cursor-pointer ${activeNav.id === nav.id ? 'text-green-500' : 'text-gray-900'}`}
                    onClick={() => navHandler(nav.path)}
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