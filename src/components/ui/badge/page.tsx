interface BadgeProps{
    className?: string;
    txt: string;
    color: boolean;
}
export default function Badge({
    className = '',
    txt = '',
    color = false,
}: BadgeProps){
    return(
        <>
            <div className={`${color ? 'bg-semantic-r300' : 'bg-gray-200'} rounded-[99rem] px-[3rem] ${className}`}>
                <span className={`font-normal text-[10rem] leading-[14rem] ${color ? 'text-gray-700' : 'text-base-wtf'}`}>{txt}</span>
            </div>
        </>
    );
}