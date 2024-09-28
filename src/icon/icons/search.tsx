import { CustomIconProps } from './_common_interface';

export const Search: React.FC<CustomIconProps> = ({
    size = 48, 
    className, 
    ...props
}) => {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
            <path fillRule="evenodd" clipRule="evenodd" d="M19.375 7C12.5405 7 7 12.5405 7 19.375C7 26.2095 12.5405 31.75 19.375 31.75C22.7927 31.75 25.8844 30.3665 28.1254 28.1254C30.3665 25.8844 31.75 22.7927 31.75 19.375C31.75 12.5405 26.2095 7 19.375 7ZM4 19.375C4 10.8836 10.8836 4 19.375 4C27.8664 4 34.75 10.8836 34.75 19.375C34.75 23.0799 33.4381 26.4805 31.2558 29.1345L43.5607 41.4393C44.1464 42.0251 44.1464 42.9749 43.5607 43.5607C42.9749 44.1464 42.0251 44.1464 41.4393 43.5607L29.1345 31.2558C26.4805 33.4381 23.0799 34.75 19.375 34.75C10.8836 34.75 4 27.8664 4 19.375Z" fill={className}/>
        </svg>
    );
}