import { CustomIconProps } from './_common_interface';

export const HospitalFill: React.FC<CustomIconProps> = ({
    size = 48, 
    className, 
    ...props
}) => {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
            <path d="M44 18V40C44 42.2091 42.2091 44 40 44H37V14H40C42.2091 14 44 15.7909 44 18Z" fill={className}/>
            <path d="M8 14H11V44H8C5.79086 44 4 42.2091 4 40V18C4 15.7909 5.79086 14 8 14Z" fill={className}/>
            <path fillRule="evenodd" clipRule="evenodd" d="M18 4C15.7909 4 14 5.79086 14 8V44H20V34C20 31.7909 21.7909 30 24 30C26.2091 30 28 31.7909 28 34V44H34V8C34 5.79086 32.2091 4 30 4H18ZM20.5 23C19.6716 23 19 23.6716 19 24.5C19 25.3284 19.6716 26 20.5 26H27.5C28.3284 26 29 25.3284 29 24.5C29 23.6716 28.3284 23 27.5 23H20.5ZM24 10C24.7531 10 25.3636 10.6105 25.3636 11.3636V13.6364H27.6364C28.3895 13.6364 29 14.2469 29 15C29 15.7531 28.3895 16.3636 27.6364 16.3636H25.3636V18.6364C25.3636 19.3895 24.7531 20 24 20C23.2469 20 22.6364 19.3895 22.6364 18.6364V16.3636H20.3636C19.6105 16.3636 19 15.7531 19 15C19 14.2469 19.6105 13.6364 20.3636 13.6364H22.6364V11.3636C22.6364 10.6105 23.2469 10 24 10Z" fill={className}/>
        </svg>
    );
}