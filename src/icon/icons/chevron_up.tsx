import { CustomIconProps } from './_common_interface';

export const ChevronUp: React.FC<CustomIconProps> = ({
    size = 48, 
    className, 
    ...props
}) => {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
            <path opacity="0.9" fillRule="evenodd" clipRule="evenodd" d="M8.4209 32.5419C8.99632 33.1379 9.94592 33.1545 10.5419 32.5791L24 19.5851L37.4581 32.5791C38.0541 33.1545 39.0037 33.1379 39.5791 32.5419C40.1545 31.9459 40.1379 30.9963 39.5419 30.4209L25.0419 16.4209C24.4607 15.8597 23.5393 15.8597 22.9581 16.4209L8.45811 30.4209C7.86214 30.9963 7.84548 31.9459 8.4209 32.5419Z" fill={className}/>
        </svg>
    );
}