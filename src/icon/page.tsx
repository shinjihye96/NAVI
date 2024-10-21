import React from 'react';
import * as customIcons from './_icon_url';

interface IconProps{
    name: string;
    size: number;
    className?: string;
}
export const Icon: React.FC<IconProps> = ({
    size = 48, 
    className,
    name, 
    ...props
}) => {
    const CustomIcon = customIcons[name as keyof typeof customIcons];

    if (!CustomIcon) {
        console.error(`Icon with name "${name}" does not exist.`);
        return null; // 아이콘이 없을 경우 null을 반환
    }

    return(
        <>
            <CustomIcon size={size} className={className} />
        </>
    );
};
