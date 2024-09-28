import { CustomIconProps } from './_common_interface';

export const PersonFill: React.FC<CustomIconProps> = ({
    size = 48, 
    className, 
    ...props
}) => {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
            <path d="M31.185 23.3294C33.5214 21.3123 35 18.3288 35 15C35 8.92487 30.0751 4 24 4C17.9249 4 13 8.92487 13 15C13 18.3288 14.4786 21.3123 16.815 23.3294C9.31898 26.216 4 33.4868 4 42V42.3704C4 43.2704 4.72961 44 5.62963 44H42.3704C43.2704 44 44 43.2704 44 42.3704V42C44 33.4868 38.681 26.216 31.185 23.3294Z" fill={className}/>
        </svg>
    );
}