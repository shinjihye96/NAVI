'use client';

import BottomNav from 'components/section/bottomNav/page';
import { usePathname } from 'next/navigation'

interface LayoutContainerProps{
    children: React.ReactNode;
}
const LayoutChildren: React.FC<LayoutContainerProps> =({children}) => {
    const pathname = usePathname();

    return(
        <main className='w-[360rem] m-auto'>
            <section className='bg-tp-bk8'>
                {children}
            </section>
            <BottomNav />
        </main>
    );
}

export default LayoutChildren;