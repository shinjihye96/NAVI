'use client';

import { usePathname } from 'next/navigation'

interface LayoutContainerProps{
    children: React.ReactNode;
}
const LayoutChildren: React.FC<LayoutContainerProps> =({children}) => {
    const pathname = usePathname();

    return(
        <main>
            <section>
                {children}
            </section>
        </main>
    );
}

export default LayoutChildren;