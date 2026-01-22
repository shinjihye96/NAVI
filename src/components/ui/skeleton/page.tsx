interface DailyShareSkeletonProps {
    className?: string;
    count?: number;
}
export function DailyShareSkeleton(props: DailyShareSkeletonProps) {
    const { className, count = 5 } = props;
    return (
        <div className={`flex-1 flex flex-col gap-[16rem] px-[16rem] py-[16rem] ${className}`}>
            {[...Array(count)].map((_, i) => (
                <div key={i} className="animate-pulse">
                    <div className="flex items-center gap-[12rem] mb-[12rem]">
                        <div className="w-[40rem] h-[40rem] bg-gray-200 rounded-full" />
                        <div className="flex-1">
                            <div className="h-[16rem] bg-gray-200 rounded w-[80rem] mb-[4rem]" />
                            <div className="h-[12rem] bg-gray-200 rounded w-[60rem]" />
                        </div>
                    </div>
                    <div className="h-[60rem] bg-gray-200 rounded mb-[12rem]" />
                    <div className="h-[120rem] bg-gray-200 rounded" />
                </div>
            ))}
        </div>
    );
}

export function WeatherCard(){
    return (
        <div className="w-[343rem] h-[96rem] bg-gray-200 rounded-[16rem] animate-pulse" />
    );
}

// 날씨 선택 카드 스켈레톤 (regist_daily 페이지용)
interface WeatherCardSkeletonProps {
    count?: number;
    size?: 'large' | 'small';
}

export function WeatherCardSkeleton({ count = 5, size = 'large' }: WeatherCardSkeletonProps) {
    const isLarge = size === 'large';

    return (
        <div className="flex items-center justify-center gap-[24rem] overflow-hidden px-[16rem]">
            {[...Array(count)].map((_, i) => {
                const isCenter = i === Math.floor(count / 2);
                return (
                    <div
                        key={i}
                        className={`
                            animate-pulse flex-shrink-0
                            ${isLarge
                                ? `w-[220rem] rounded-[64rem] ${isCenter ? 'scale-100' : 'scale-75 opacity-50'}`
                                : 'w-[110rem] rounded-[32rem]'
                            }
                            aspect-[2/3] bg-gray-200
                        `}
                    >
                        <div className={`h-full flex flex-col items-center justify-center ${isLarge ? 'gap-[40rem]' : 'gap-[20rem]'}`}></div>
                    </div>
                );
            })}
        </div>
    );
}