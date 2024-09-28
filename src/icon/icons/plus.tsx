import { CustomIconProps } from './_common_interface';

export const Plus: React.FC<CustomIconProps> = ({
    size = 48, 
    className, 
    ...props
}) => {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
            <path fillRule="evenodd" clipRule="evenodd" d="M24 8C24.8284 8 25.5 8.67157 25.5 9.5V22.5H38.5C39.3284 22.5 40 23.1716 40 24C40 24.8284 39.3284 25.5 38.5 25.5H25.5V38.5C25.5 39.3284 24.8284 40 24 40C23.1716 40 22.5 39.3284 22.5 38.5L22.5 25.5H9.5C8.67157 25.5 8 24.8284 8 24C8 23.1716 8.67157 22.5 9.5 22.5H22.5L22.5 9.5C22.5 8.67157 23.1716 8 24 8Z" fill={className}/>
        </svg>
    );
}