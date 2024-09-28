import { CustomIconProps } from './_common_interface';

export const ArrowLeft: React.FC<CustomIconProps> = ({
    size = 48,
    className,
    ...props
}) => {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props} >
            <path fillRule="evenodd" clipRule="evenodd" d="M22.3546 11.4522C22.9333 12.0451 22.9218 12.9947 22.329 13.5734L13.1841 22.5H38.5C39.3284 22.5 40 23.1716 40 24C40 24.8284 39.3284 25.5 38.5 25.5H13.1841L22.329 34.4266C22.9218 35.0053 22.9333 35.9549 22.3546 36.5478C21.776 37.1406 20.8263 37.1521 20.2335 36.5734L8.45223 25.0734C8.16305 24.7911 8 24.4041 8 24C8 23.5959 8.16305 23.2089 8.45223 22.9266L20.2335 11.4266C20.8263 10.8479 21.776 10.8594 22.3546 11.4522Z" fill={className} />
        </svg>
    );
}