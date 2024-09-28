import { CustomIconProps } from './_common_interface';

export const CheckCircle: React.FC<CustomIconProps> = ({
    size = 48,
    className,
    ...props
}) => {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
            <path fillRule="evenodd" clipRule="evenodd" d="M24 7C14.6112 7 7 14.6112 7 24C7 33.3888 14.6112 41 24 41C33.3888 41 41 33.3888 41 24C41 14.6112 33.3888 7 24 7ZM4 24C4 12.9543 12.9543 4 24 4C35.0457 4 44 12.9543 44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24Z" fill={className}/>
            <path fillRule="evenodd" clipRule="evenodd" d="M32.5471 18.426C33.1403 19.0043 33.1523 19.954 32.574 20.5472L22.824 30.5471C22.5417 30.8367 22.1544 31 21.75 31C21.3456 31 20.9583 30.8367 20.676 30.5471L15.426 25.1625C14.8477 24.5694 14.8597 23.6197 15.4528 23.0414C16.046 22.4631 16.9957 22.4751 17.574 23.0682L21.75 27.3513L30.426 18.4529C31.0043 17.8597 31.954 17.8477 32.5471 18.426Z" fill={className}/>
        </svg>
    );
}