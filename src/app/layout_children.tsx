'use client';

import BottomNav from 'components/section/bottomNav/page';
import { usePathname } from 'next/navigation'

interface LayoutContainerProps{
    children: React.ReactNode;
}
const LayoutChildren: React.FC<LayoutContainerProps> =({children}) => {
    const pathname = usePathname();

    // 로그인 관련 페이지에서는 BottomNav 숨김
    const hideBottomNav = pathname.startsWith('/login') || pathname.startsWith('/signup');

    return(
        <main className={`max-w-[414rem] m-auto`}>
            <section className={`${!hideBottomNav ? 'pb-[76rem]' : ''} overflow-hidden`}>
                {children}
            </section>
            {!hideBottomNav && <BottomNav />}
        </main>
    );
}

export default LayoutChildren;