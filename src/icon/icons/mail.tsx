import { CustomIconProps } from './_common_interface';

export const Mail: React.FC<CustomIconProps> = ({
    size = 48, 
    className, 
    ...props
}) => {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
            <path fillRule="evenodd" clipRule="evenodd" d="M2 15.5C2 10.2533 6.25329 6 11.5 6H36.5C41.7467 6 46 10.2533 46 15.5V32.5C46 37.7467 41.7467 42 36.5 42H11.5C6.25329 42 2 37.7467 2 32.5V15.5ZM5.44262 13.1376C5.15684 13.8699 5 14.6666 5 15.5V32.5C5 36.0899 7.91015 39 11.5 39H36.5C40.0899 39 43 36.0899 43 32.5V15.5C43 14.6666 42.8432 13.8699 42.5574 13.1376L27.4014 25.0652C25.4058 26.6358 22.5942 26.6358 20.5986 25.0652L5.44262 13.1376ZM7.15377 10.6667L22.4539 22.7078C23.361 23.4216 24.639 23.4217 25.5461 22.7078L40.8462 10.6667C39.6947 9.63054 38.171 9 36.5 9H11.5C9.829 9 8.30527 9.63054 7.15377 10.6667Z" fill={className}/>
        </svg>
    );
}