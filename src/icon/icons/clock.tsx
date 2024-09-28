import { CustomIconProps } from './_common_interface';

export const Clock: React.FC<CustomIconProps> = ({
    size = 48, 
    className, 
    ...props
}) => {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
            <path fillRule="evenodd" clipRule="evenodd" d="M24 7C14.6112 7 7 14.6112 7 24C7 33.3888 14.6112 41 24 41C33.3888 41 41 33.3888 41 24C41 14.6112 33.3888 7 24 7ZM4 24C4 12.9543 12.9543 4 24 4C35.0457 4 44 12.9543 44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24ZM24 11.4C24.8284 11.4 25.5 12.0716 25.5 12.9V23.3499L32.2886 28.3415C32.956 28.8323 33.0992 29.7712 32.6085 30.4386C32.1177 31.106 31.1788 31.2492 30.5114 30.7585L23.1114 25.3173C22.727 25.0346 22.5 24.586 22.5 24.1088V12.9C22.5 12.0716 23.1716 11.4 24 11.4Z" fill={className}/>
        </svg>
    );
}