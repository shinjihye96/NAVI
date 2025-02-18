'use client';

import { Icon } from "icon/page";

interface LabelProps{
    className?: string;
    iconName?: string;
    txt?: string;
    type: 'text' | 'box';
}
export default function Label({
    className = '',
    iconName,
    txt = '',
    type = 'text',
}: LabelProps){
    return(
        <>
            <div className={`text-[12rem] text-gray-900 flex items-center gap-[4rem] py-[4rem] ${type === 'box' && 'bg-gray-100 px-[6rem]'} ${className}`}>
                <Icon
                    name={`${iconName}`}
                    size={16}
                />
                <p className="font-medium leading-[16rem]">{txt}</p>
            </div>
        </>
    );
}