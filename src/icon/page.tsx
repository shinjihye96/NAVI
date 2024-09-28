import React from 'react';
import * as customIcons from './_icon_url';

interface IconProps{
    size: number;
    className: string;
    name: string;
}
export const Icon: React.FC<IconProps> = ({
    size = 48, 
    className,
    name, 
    ...props

}) => {
    const CustomIcon = customIcons[name as keyof typeof customIcons];

    return(
        <>
            <CustomIcon size={size} className={className} />
        </>
    );
};
