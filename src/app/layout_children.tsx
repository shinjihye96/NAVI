'use client';

import BottomNav from 'components/section/bottomNav/page';
import { usePathname } from 'next/navigation'

interface LayoutContainerProps{
    children: React.ReactNode;
}
const LayoutChildren: React.FC<LayoutContainerProps> =({children}) => {
    const pathname = usePathname();

    return(
        <main className='max-w-[414rem] m-auto'>
            <section className='pb-[76rem] overflow-hidden'>
                {children}
            </section>
            <BottomNav />
        </main>
    );
}

export default LayoutChildren;