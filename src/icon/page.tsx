import React from 'react';
import * as customIcons from './_icon_url';

interface IconProps{
    size: number;
    className: string;
    IconName: string;
}
export const Icon: React.FC<IconProps> = ({
    size = 48, 
    className,
    IconName, 
    ...props

}) => {
    const CustomIcon = customIcons[IconName as keyof typeof customIcons];

    return(
        <>
            <CustomIcon size={size} className={className} />
        </>
    );
};
