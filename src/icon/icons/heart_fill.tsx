import { CustomIconProps } from './_common_interface';

export const HeartFill: React.FC<CustomIconProps> = ({
    size = 48, 
    className, 
    ...props
}) => {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
            <path fillRule="evenodd" clipRule="evenodd" d="M4 18.0417C4 11.448 9.15173 6 15.631 6C18.9294 6 21.8931 7.42021 24 9.67941C26.1069 7.42021 29.0706 6 32.369 6C38.8483 6 44 11.448 44 18.0417C44 24.3797 40.1236 29.9038 35.9463 33.9568C31.7462 38.0318 26.9648 40.8908 24.5764 41.8848C24.2075 42.0384 23.7925 42.0384 23.4236 41.8848C21.0352 40.8908 16.2538 38.0318 12.0537 33.9568C7.87638 29.9038 4 24.3797 4 18.0417Z" fill={className}/>
        </svg>
    );
}