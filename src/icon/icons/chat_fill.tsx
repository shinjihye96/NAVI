import { CustomIconProps } from './_common_interface';

export const ChatFill: React.FC<CustomIconProps> = ({
    size = 48,
    className,
    ...props
}) => {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
            <path d="M33.5 4H10C6.68629 4 4 6.68629 4 10V27.75C4 29.8211 5.67893 31.5 7.75 31.5C8.44036 31.5 9 30.9404 9 30.25V18C9 14.6863 11.6863 12 15 12H36.5C37.0523 12 37.5 11.5523 37.5 11V8C37.5 5.79086 35.7091 4 33.5 4Z" fill="currentColor"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M12 21C12 17.6863 14.6863 15 18 15H38C41.3137 15 44 17.6863 44 21V41.7639C44 43.2507 42.4354 44.2177 41.1056 43.5528L36.4223 41.2111C36.1446 41.0723 35.8384 41 35.5279 41H18C14.6863 41 12 38.3137 12 35V21ZM26 28.5C26 29.3284 25.3284 30 24.5 30C23.6716 30 23 29.3284 23 28.5C23 27.6716 23.6716 27 24.5 27C25.3284 27 26 27.6716 26 28.5ZM31.5 30C32.3284 30 33 29.3284 33 28.5C33 27.6716 32.3284 27 31.5 27C30.6716 27 30 27.6716 30 28.5C30 29.3284 30.6716 30 31.5 30Z" fill="currentColor"/>
        </svg>
    );
}