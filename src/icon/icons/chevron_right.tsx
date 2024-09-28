import { CustomIconProps } from './_common_interface';

export const ChevronRight: React.FC<CustomIconProps> = ({
    size = 48,
    className,
    ...props
}: CustomIconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
            <path opacity="0.9" fillRule="evenodd" clipRule="evenodd" d="M15.4581 8.4209C16.0541 7.84548 17.0037 7.86214 17.5791 8.45811L31.5791 22.9581C32.1403 23.5393 32.1403 24.4607 31.5791 25.0419L17.5791 39.5419C17.0037 40.1379 16.0541 40.1545 15.4581 39.5791C14.8621 39.0037 14.8455 38.0541 15.4209 37.4581L28.4149 24L15.4209 10.5419C14.8455 9.94592 14.8621 8.99632 15.4581 8.4209Z" fill={className}/>
        </svg>
    );
}