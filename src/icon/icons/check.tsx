import { CustomIconProps } from './_common_interface';

export const Check: React.FC<CustomIconProps> = ({
    size = 48, 
    className, 
    ...props
}) => {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
            <path fillRule="evenodd" clipRule="evenodd" d="M37.5607 14.4393C38.1464 15.0251 38.1464 15.9749 37.5607 16.5607L20.5607 33.5607C19.9749 34.1464 19.0251 34.1464 18.4393 33.5607L10.4393 25.5607C9.85355 24.9749 9.85355 24.0251 10.4393 23.4393C11.0251 22.8536 11.9749 22.8536 12.5607 23.4393L19.5 30.3787L35.4393 14.4393C36.0251 13.8536 36.9749 13.8536 37.5607 14.4393Z" fill={className}/>
        </svg>
    );
}