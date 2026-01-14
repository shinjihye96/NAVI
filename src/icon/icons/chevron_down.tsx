import { CustomIconProps } from './_common_interface';

export const ChevronDown: React.FC<CustomIconProps> = ({
    size = 48, 
    className, 
    ...props
}) => {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
            <path opacity="0.9" fillRule="evenodd" clipRule="evenodd" d="M8.4209 15.4581C8.99632 14.8621 9.94592 14.8455 10.5419 15.4209L24 28.4149L37.4581 15.4209C38.0541 14.8455 39.0037 14.8621 39.5791 15.4581C40.1545 16.0541 40.1379 17.0037 39.5419 17.5791L25.0419 31.5791C24.4607 32.1403 23.5393 32.1403 22.9581 31.5791L8.45811 17.5791C7.86214 17.0037 7.84548 16.0541 8.4209 15.4581Z" fill="currentColor"/>
        </svg>
    );
}