import { CustomIconProps } from './_common_interface';

export const ChevronLeft: React.FC<CustomIconProps> = ({
    size = 48, 
    className, 
    ...props
}) => {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
            <path opacity="0.9" fillRule="evenodd" clipRule="evenodd" d="M32.5419 8.4209C33.1379 8.99632 33.1545 9.94592 32.5791 10.5419L19.5851 24L32.5791 37.4581C33.1545 38.0541 33.1379 39.0037 32.5419 39.5791C31.9459 40.1545 30.9963 40.1379 30.4209 39.5419L16.4209 25.0419C15.8597 24.4607 15.8597 23.5393 16.4209 22.9581L30.4209 8.45811C30.9963 7.86214 31.9459 7.84548 32.5419 8.4209Z" fill={className}/>
        </svg>
    );
}