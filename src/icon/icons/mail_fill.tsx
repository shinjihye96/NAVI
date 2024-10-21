import { CustomIconProps } from './_common_interface';

export const MainFill: React.FC<CustomIconProps> = ({
    size = 48, 
    className, 
    ...props
}) => {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
            <path d="M2.99615 11.2604C2.35866 12.5366 2 13.9764 2 15.5V32.5C2 37.7467 6.25329 42 11.5 42H36.5C41.7467 42 46 37.7467 46 32.5V15.5C46 13.9764 45.6413 12.5366 45.0038 11.2604L43.5518 12.3551L27.4014 25.0653C25.4057 26.6358 22.5942 26.6358 20.5985 25.0653L4.44818 12.3551L2.99615 11.2604Z" fill="currentColor"/>
            <path d="M43.2559 8.82109C41.5338 7.07926 39.1429 6 36.5 6H11.5C8.85705 6 6.46618 7.07927 4.74407 8.82112L6.27902 9.97831L22.4539 22.7078C23.361 23.4217 24.6389 23.4217 25.5461 22.7078L41.7209 9.97831L43.2559 8.82109Z" fill="currentColor"/>
        </svg>
    );
}